
    newSummary,
  ];

  const updatedStoryState: StoryState = {
    turn: turnNumber,
    storyHealthScore: prevScore + delta,
    choicesMade: [
      ...(currentStoryState?.choicesMade ?? []),
      {
        turn: turnNumber,
        label: choiceMade,
        consequenceNote:
          parsed.storyStateUpdate?.worldStateChanges?.[0] ??
          "Consequence noted",
      },
    ],
    relationshipStates: {
      ...(currentStoryState?.relationshipStates ?? {}),
      ...(parsed.storyStateUpdate?.relationshipStates ?? {}),
    },
    worldStateChanges: [
      ...(currentStoryState?.worldStateChanges ?? []),
      ...(parsed.storyStateUpdate?.worldStateChanges ?? []),
    ],
    plantedThreads: [
      ...(currentStoryState?.plantedThreads ?? []),
      ...(parsed.storyStateUpdate?.plantedThreads ?? []),
    ],
    activeTensions: parsed.storyStateUpdate?.activeTensions ?? [],
    narrativeSummary: updatedNarrativeSummary,
    targetEndingChoices: currentStoryState?.targetEndingChoices,
  };

  const choices: Choice[] = (parsed.choices ?? []).map((c: any) => ({
    id: c.id,
    text: c.text,
    consequence: c.consequence,
    consequenceType: c.consequenceType,
  }));

  return {
    narrativeText: parsed.narrativeText,
    choices,
    isEnding: parsed.isEnding ?? false,
    storyState: updatedStoryState,
  };
}

// ─────────────────────────────────────────────
// Main Generator
// ─────────────────────────────────────────────
export async function generateStorySegment(
  storyIdOrTitle: string,
  genre: string,
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  currentStoryState: StoryState | null = null,
  totalWordCount: number = 0,
  chosenConsequenceType?: string,
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title ?? storyIdOrTitle;
  const storyGenre = story?.genre ?? genre;
  const forceEnding = totalWordCount >= 47000;

  const systemInstruction = buildSystemInstruction(
    storyTitle,
    storyGenre,
    story?.worldContext,
  );

  const cachedContentName = await getOrCreateSystemCache(
    storyIdOrTitle,
    storyGenre,
    systemInstruction,
  );

  const userMessage = buildUserMessage(
    previousContext,
    choiceMade,
    nodeIndex,
    currentStoryState,
    totalWordCount,
    forceEnding,
    story?.storyArc,
  );

  try {
    const response = await executeWithRetry(async () => {
      return await ai.models.generateContent({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        config: buildGenerateConfig(cachedContentName, systemInstruction),
      });
    });

    if (!response.text) throw new Error("Empty response from Gemini");

    logger.info(
      {
        storyId: storyIdOrTitle,
        turn: nodeIndex + 1,
        promptTokens: response.usageMetadata?.promptTokenCount,
        outputTokens: response.usageMetadata?.candidatesTokenCount,
        cachedTokens: response.usageMetadata?.cachedContentTokenCount,
        cacheHit: !!cachedContentName,
      },
      "Gemini generation successful",
    );

    const parsed = JSON.parse(response.text);
    return buildGeneratedSegment(
      parsed,
      choiceMade,
      nodeIndex,
      currentStoryState,
      chosenConsequenceType,
    );
  } catch (err) {
    logger.error({ err }, "Fatal error generating story segment");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Streaming Generator
// ─────────────────────────────────────────────
export async function generateStorySegmentStream(
  storyIdOrTitle: string,
  genre: string,
  previousContext: string,
  choiceId: string,
  choiceMade: string,
  nodeIndex: number,
  onChunk: (text: string) => void,
  currentStoryState: StoryState | null = null,
  totalWordCount: number = 0,
  chosenConsequenceType?: string,
  choiceCount: number = 0,
  targetEndingChoices: number = 40,
  forceEndingByChoices: boolean = false,
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title ?? storyIdOrTitle;
  const storyGenre = story?.genre ?? genre;
  const forceEnding = totalWordCount >= 47000;

  const isFreeWill = choiceId === "free-will";
  const effectiveChoiceMade = isFreeWill
    ? `The reader invented their own action: "${choiceMade}". Treat this as a fully consequential player decision and honour it directly in the narrative.`
    : choiceMade;

  const systemInstruction = buildSystemInstruction(
    storyTitle,
    storyGenre,
    story?.worldContext,
  );

  const cachedContentName = await getOrCreateSystemCache(
    storyIdOrTitle,
    storyGenre,
    systemInstruction,
  );

  const userMessage = buildUserMessage(
    previousContext,
    effectiveChoiceMade,
    nodeIndex,
    currentStoryState,
    totalWordCount,
    forceEnding,
    story?.storyArc,
    choiceCount,
    targetEndingChoices,
    forceEndingByChoices,
  );

  try {
    const stream = await executeWithRetry(async () => {
      return await ai.models.generateContentStream({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        config: buildGenerateConfig(cachedContentName, systemInstruction),
      });
    });

    let accumulated = "";
    const NARRATIVE_PREFIX_RE = /"narrativeText"\s*:\s*"/;
    let narrativeStarted = false;
    let narrativeEnded = false;
    let prefixBuf = "";
    let pendingBackslash = false;
    let unicodePending = "";

    function processNarrativeChars(chars: string): boolean {
      let out = "";
      let i = 0;
      while (i < chars.length) {
        if (unicodePending.length > 0) {
          while (unicodePending.length < 4 && i < chars.length) {
            unicodePending += chars[i++];
          }
          if (unicodePending.length === 4) {
            out += String.fromCharCode(parseInt(unicodePending, 16));
            unicodePending = "";
          }
          continue;
        }
        if (pendingBackslash) {
          pendingBackslash = false;
          const esc = chars[i];
          if (esc === "n") {
            out += "\n";
            i++;
          } else if (esc === "t") {
            out += "\t";
            i++;
          } else if (esc === "r") {
            out += "\r";
            i++;
          } else if (esc === "u") {
            i++;
            const remaining = chars.slice(i, i + 4);
            if (remaining.length === 4) {
              out += String.fromCharCode(parseInt(remaining, 16));
              i += 4;
            } else {
              unicodePending = remaining;
              i += remaining.length;
            }
          } else {
            out += esc;
            i++;
          }
          continue;
        }
        if (chars[i] === "\\") {
          if (i + 1 < chars.length) {
            const esc = chars[i + 1];
            if (esc === "n") {
              out += "\n";
              i += 2;
            } else if (esc === "t") {
              out += "\t";
              i += 2;
            } else if (esc === "r") {
              out += "\r";
              i += 2;
            } else if (esc === "u") {
              i += 2;
              const remaining = chars.slice(i, i + 4);
              if (remaining.length === 4) {
                out += String.fromCharCode(parseInt(remaining, 16));
                i += 4;
              } else {
                unicodePending = remaining;
                i += remaining.length;
              }
            } else {
              out += esc;
              i += 2;
            }
          } else {
            pendingBackslash = true;
            i++;
          }
          continue;
        }
        if (chars[i] === '"') {
          if (out) onChunk(out);
          return true;
        }
        out += chars[i];
        i++;
      }
      if (out) onChunk(out);
      return false;
    }

    for await (const chunk of stream) {
      const text = chunk.text ?? "";
      accumulated += text;
      if (narrativeEnded) continue;
      if (!narrativeStarted) {
        prefixBuf += text;
        const match = NARRATIVE_PREFIX_RE.exec(prefixBuf);
        if (match) {
          narrativeStarted = true;
          const afterOpeningQuote = prefixBuf.slice(
            match.index + match[0].length,
          );
          if (afterOpeningQuote.length > 0) {
            narrativeEnded = processNarrativeChars(afterOpeningQuote);
          }
        }
      } else {
        narrativeEnded = processNarrativeChars(text);
      }
    }

    if (!accumulated) throw new Error("Empty response from Gemini");

    logger.info(
      { storyId: storyIdOrTitle, turn: nodeIndex + 1 },
      "Gemini streaming generation successful",
    );

    const parsed = JSON.parse(accumulated);
    return buildGeneratedSegment(
      parsed,
      choiceMade,
      nodeIndex,
      currentStoryState,
      chosenConsequenceType,
    );
  } catch (err) {
    logger.error({ err }, "Fatal error streaming story segment");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Cache Cleanup
//
// Call this to explicitly delete caches from Gemini's servers before their
// TTL expires — useful on story completion or server shutdown to avoid
// unnecessary storage billing.
// ─────────────────────────────────────────────
export async function deleteStoryCaches(storyKeys?: string[]): Promise<void> {
  const keysToDelete = storyKeys ?? [...systemPromptCacheRegistry.keys()];

  for (const key of keysToDelete) {
    const entry = systemPromptCacheRegistry.get(key);
    if (!entry) continue;

    try {
      await ai.caches.delete({ name: entry.name });
      systemPromptCacheRegistry.delete(key);
      logger.info(
        { key, cacheName: entry.name },
        "Deleted system prompt cache",
      );
    } catch (err) {
      logger.warn(
        { key, err },
        "Failed to delete cache — may have already expired",
      );
      systemPromptCacheRegistry.delete(key);
    }
  }
}
