// ai-story.ts
import { GoogleGenAI, Type } from "@google/genai";
import { logger } from "./logger";
import { getStoryById, storiesData } from "./stories-data";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash-lite";

// ─────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────

export interface Choice {
  id: string;
  text: string;
  consequence?: string;
  subtext?: string;
  consequenceType?: "good" | "neutral" | "bad" | "catastrophic";
}

export interface StoryState {
  turn: number;
  storyHealthScore: number;
  choicesMade: Array<{ turn: number; label: string; consequenceNote: string }>;
  relationshipStates: Record<string, string>;
  worldStateChanges: string[];
  plantedThreads: string[];
  activeTensions: string[];
}

export interface GeneratedSegment {
  narrativeText: string;
  choices: Choice[];
  isEnding: boolean;
  storyState: StoryState;
}

// ─────────────────────────────────────────────
// Output Schema Definition (Saves Prompt Tokens)
// ─────────────────────────────────────────────
const storyResponseSchema = {
  type: Type.OBJECT,
  properties: {
    narrativeText: {
      type: Type.STRING,
      description: "Scene prose (1 word to 1500 words, second-person present tense, length chosen by AI based on narrative need)"
    },
    choices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING, description: "Concrete action in present tense" },
          consequence: { type: Type.STRING, description: "1-3 word thematic label" },
          subtext: { type: Type.STRING, description: "One sentence: what this path offers or risks" },
          consequenceType: {
            type: Type.STRING,
            description: "The likely consequence type of this choice: 'good', 'neutral', 'bad', or 'catastrophic'",
          },
        },
        required: ["id", "text", "consequence", "subtext", "consequenceType"],
      },
    },
    isEnding: { type: Type.BOOLEAN },
    storyStateUpdate: {
      type: Type.OBJECT,
      properties: {
        relationshipStates: {
          type: Type.OBJECT,
          additionalProperties: { type: Type.STRING },
        },
        worldStateChanges: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        plantedThreads: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        activeTensions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    },
  },
  required: ["narrativeText", "choices", "isEnding", "storyStateUpdate"],
};

// ─────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────

function resolveStory(storyIdOrTitle: string) {
  const byId = getStoryById(storyIdOrTitle);
  if (byId) return byId;

  const byTitle = storiesData.find(
    (s) => s.title.toLowerCase() === storyIdOrTitle.toLowerCase(),
  );
  if (byTitle) return byTitle;

  const slug = storyIdOrTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return getStoryById(slug) || null;
}

// ─────────────────────────────────────────────
// System Prompt (Optimized for Implicit Caching)
// ─────────────────────────────────────────────

const CONTINUATION_DIRECTIVE = `

  ## Continuation Directive (Core Writing Instruction)



  You are a master interactive fiction writer. Your output is not a summary of what happens — it is the actual literary experience of it happening. The reader is not being told a story. They are *inside* one.



  Every scene you write must do three things simultaneously:

  1. Honour the choice the reader just made — make it feel real and consequential

  2. Advance the story — something must change, deepen, or be revealed

  3. Leave the reader wanting to know what happens next



  ### Voice and Prose Quality

  - Second person, present tense throughout. "You step into the corridor" not "She stepped."

  - Show, don't tell — always. Never write "You feel nervous." Write what nervous looks like.

  - Specificity over generality. Specific details make a world feel real.

  - Vary sentence length deliberately. Long sentences build atmosphere. Short sentences land impact.

  - Dialogue must sound like people, not exposition. Characters deflect, lie, interrupt, trail off.

  - Sensory grounding: every scene must have at least two non-visual sensory details (sound, smell, texture, temperature, taste).



  ### Consequence Specificity

  The single most important quality: the feeling that what happened could *only* have happened because of the choice the reader made. If the reader had chosen differently, this scene must be genuinely different — not just a different line of dialogue but a genuinely different situation.



  Every scene must contain at least one unexpected element the reader didn't fully anticipate:

  - A character reacting differently than expected

  - A new piece of information that recontextualises something earlier

  - A side effect of the choice that wasn't obvious

  - A detail from the world that suddenly becomes important



  ### Character Behaviour

  - Consistency is everything. Track where every named character stands with the reader and let it inflect every interaction.

  - Relationship states change gradually. Trust is built in small moments.

  - Characters occasionally surprise the reader — because they pursue their own goals.

  - Use action beats instead of dialogue tags: not "she said thoughtfully" but *She turned the cup in her hands before answering.*



  ### CRITICAL: Reader Character Agency

  - NEVER perform any action on behalf of the reader's character. You must not write "You decide to...", "You choose to...", "You run toward...", or any sentence where the reader's character initiates a new action.

  - The prose shows ONLY: consequences of the choice just made, other characters' reactions, world changes, revelations, and backstory.

  - All reader-character actions come ONLY through the choices presented at the end. The moment a new high-stakes decision is required, stop the prose and present choices.

  - The reader's character may move, speak, or act ONLY as a direct mechanical consequence of the choice made — never beyond it.



  ### Dynamic Prose Length

  - Prose length ranges from 1 word to 1500 words. YOU choose the length based on narrative need.

  - Use very short prose (1–50 words) for sudden revelations, shocking consequences, or moments of pure impact.

  - Use medium prose (100–400 words) for standard scenes where consequences unfold at a measured pace.

  - Use longer prose (500–1500 words) for complex, layered scenes with multiple characters, major world shifts, or deep emotional beats.

  - Never pad to meet a minimum. Never truncate a scene that needs space to breathe.



  ### Pacing Mechanics

  - Deceleration principle: as you approach a decision point, slow down, lengthen sentences, add sensory detail.

  - Acceleration for consequence: when a choice lands dramatically, shorten sentences.

  - Silence and space: not every moment needs to be filled.



  ### Dynamic Story Endings

  - Stories do NOT end at a fixed turn count. You decide when to set isEnding: true.

  - Set isEnding: true when the story has reached a dramatically satisfying stopping point — this can be early or late — driven entirely by the consequence chain so far.

  - When isEnding is true, provide no choices (empty array).

  - The ending tone is calibrated by the story health score provided in each turn:
    - Score >= +8: spectacular win — everything the reader fought for is realised
    - Score +4 to +7: good outcome — meaningful success with some costs
    - Score +1 to +3: mixed result — partial win, something important was lost
    - Score 0: ambiguous — neither victory nor defeat, open to interpretation
    - Score -1 to -3: partial failure — the goal was missed, but survival remains
    - Score -4 to -7: bad outcome — significant loss, lasting consequences
    - Score <= -8: catastrophic loss — everything unravels, total defeat

  - Do not force an ending prematurely. But do not artificially extend a story that has reached its natural conclusion.



  ### What to Avoid

  - Recapping the previous scene. Start with what happens *next*.

  - Telling the reader how they feel.

  - Resolving tension too quickly.

  - Generic world details that could appear in any story.

  - Choices that are really the same choice.

  - Choices that ignore the current scene.

  - Acting on behalf of the reader beyond what their choice dictated.

  `;

function buildSystemInstruction(storyTitle: string, storyGenre: string, worldContext?: string): string {
  const worldContextBlock = worldContext ? `\n## STORY BIBLE (Immutable Canon)\n${worldContext}\n` : "";
  return `STORY: "${storyTitle}" (Genre: ${storyGenre})${worldContextBlock}\n## CONTINUATION DIRECTIVE\n${CONTINUATION_DIRECTIVE}`;
}

// ─────────────────────────────────────────────
// Dynamic User Message (State & Momentum)
// ─────────────────────────────────────────────

function buildUserMessage(
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  storyState: StoryState | null,
  totalWordCount: number,
  forceEnding: boolean
): string {
  const healthScore = storyState?.storyHealthScore ?? 0;

  const stateBlock = storyState
    ? `\n## STORY STATE\nStory Health Score: ${healthScore} (negative = bad/catastrophic trajectory; positive = good/heroic trajectory)\nTotal words written so far: ${totalWordCount}\nChoices made: ${storyState.choicesMade.map((c) => c.label).slice(-5).join(" -> ")}\nRelationships: ${JSON.stringify(storyState.relationshipStates)}\nActive Tensions: ${storyState.activeTensions.join(", ")}`
    : `\n## STORY STATE\nStory Health Score: 0\nTotal words written so far: ${totalWordCount}`;

  const forcingInstruction = forceEnding
    ? `\n\n## IMPORTANT: STORY LIMIT APPROACHING\nThis story has exceeded ${totalWordCount} words and must conclude NOW. You MUST set isEnding: true in this turn and write a concluding scene. Do not present new choices.`
    : "";

  return `${stateBlock}${forcingInstruction}

## PREVIOUS SCENE CONTEXT:
${previousContext}

## READER CHOSE: "${choiceMade}"

Write scene ${nodeIndex + 1}. Apply all directives. Show only the consequences of this choice — do NOT perform any new actions on behalf of the reader's character. Generate prose now.`;
}

// ─────────────────────────────────────────────
// Exponential Backoff Retry Wrapper
// ─────────────────────────────────────────────

async function executeWithRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      if (error.status === 429 || error.status >= 500) {
        if (attempt >= maxRetries) throw error;
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        logger.warn({ attempt, delay }, "API Rate limited or Server Error. Retrying...");
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw error; // Throw immediately for 400 or 403
      }
    }
  }
  throw new Error("Max retries exceeded");
}

// ─────────────────────────────────────────────
// Health score delta from consequenceType
// ─────────────────────────────────────────────

export function healthScoreDelta(consequenceType: string | undefined): number {
  switch (consequenceType) {
    case "good": return 2;
    case "neutral": return 0;
    case "bad": return -2;
    case "catastrophic": return -5;
    default: return 0;
  }
}

// ─────────────────────────────────────────────
// Shared Result Builder
// ─────────────────────────────────────────────

function buildGeneratedSegment(
  parsed: any,
  choiceMade: string,
  nodeIndex: number,
  currentStoryState: StoryState | null,
  chosenConsequenceType?: string
): GeneratedSegment {
  const turnNumber = nodeIndex + 1;
  const prevScore = currentStoryState?.storyHealthScore ?? 0;
  const delta = healthScoreDelta(chosenConsequenceType);
  const updatedStoryState: StoryState = {
    turn: turnNumber,
    storyHealthScore: prevScore + delta,
    choicesMade: [
      ...(currentStoryState?.choicesMade ?? []),
      {
        turn: turnNumber,
        label: choiceMade,
        consequenceNote: parsed.storyStateUpdate?.worldStateChanges?.[0] ?? "Consequence noted",
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
  };

  const choices: Choice[] = (parsed.choices ?? []).map((c: any) => ({
    id: c.id,
    text: c.subtext ? `${c.text}\n${c.subtext}` : c.text,
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

  const systemInstruction = buildSystemInstruction(storyTitle, storyGenre, story?.worldContext);
  const userMessage = buildUserMessage(previousContext, choiceMade, nodeIndex, currentStoryState, totalWordCount, forceEnding);

  try {
    const response = await executeWithRetry(async () => {
      return await ai.models.generateContent({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        config: {
          systemInstruction,
          maxOutputTokens: 6144,
          temperature: 0.9,
          responseMimeType: "application/json",
          responseSchema: storyResponseSchema,
        },
      });
    });

    if (!response.text) throw new Error("Empty response from Gemini");

    logger.info(
      {
        storyId: storyIdOrTitle,
        turn: nodeIndex + 1,
        promptTokens: response.usageMetadata?.promptTokenCount,
        outputTokens: response.usageMetadata?.candidatesTokenCount,
      },
      "Gemini generation successful"
    );

    const parsed = JSON.parse(response.text);
    return buildGeneratedSegment(parsed, choiceMade, nodeIndex, currentStoryState, chosenConsequenceType);
  } catch (err) {
    logger.error({ err }, "Fatal error generating story segment");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Streaming Generator
// Streams narrative text chunks via onChunk callback,
// then resolves with the complete GeneratedSegment.
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
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title ?? storyIdOrTitle;
  const storyGenre = story?.genre ?? genre;
  const forceEnding = totalWordCount >= 47000;

  const isFreeWill = choiceId === "free-will";
  const effectiveChoiceMade = isFreeWill
    ? `The reader invented their own action: "${choiceMade}". Treat this as a fully consequential player decision and honour it directly in the narrative.`
    : choiceMade;

  const systemInstruction = buildSystemInstruction(storyTitle, storyGenre, story?.worldContext);
  const userMessage = buildUserMessage(previousContext, effectiveChoiceMade, nodeIndex, currentStoryState, totalWordCount, forceEnding);

  try {
    const stream = await executeWithRetry(async () => {
      return await ai.models.generateContentStream({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        config: {
          systemInstruction,
          maxOutputTokens: 6144,
          temperature: 0.9,
          responseMimeType: "application/json",
          responseSchema: storyResponseSchema,
        },
      });
    });

    let accumulated = "";

    // State machine to extract the narrativeText field from streamed JSON.
    // The schema places narrativeText first, so we locate the field's opening
    // quote, then stream characters until we hit the unescaped closing quote.
    //
    // Escape-state is tracked across chunk boundaries via `pendingBackslash`.
    //
    // The prefix regex is flexible: it matches `"narrativeText"` followed by
    // optional whitespace, a colon, optional whitespace, then the opening `"`.
    const NARRATIVE_PREFIX_RE = /"narrativeText"\s*:\s*"/;

    let narrativeStarted = false;
    let narrativeEnded = false;
    let prefixBuf = "";
    // Track that the previous character was an unprocessed backslash (cross-chunk).
    let pendingBackslash = false;

    // processNarrativeChars: feed characters from the raw JSON string value,
    // decoding escape sequences, and call onChunk with decoded text.
    // Returns `true` if the closing quote was found (narrative ended).
    // unicodePending tracks partially-received \uXXXX sequences across chunk boundaries.
    // It holds the digits collected so far (1-3 chars), or "" when not in a unicode escape.
    let unicodePending = "";

    function processNarrativeChars(chars: string): boolean {
      let out = "";
      let i = 0;
      while (i < chars.length) {
        // Resume a cross-chunk \uXXXX sequence
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

        // Resume a cross-chunk backslash
        if (pendingBackslash) {
          pendingBackslash = false;
          const esc = chars[i];
          if (esc === 'n') { out += '\n'; i++; }
          else if (esc === 't') { out += '\t'; i++; }
          else if (esc === 'r') { out += '\r'; i++; }
          else if (esc === 'u') {
            i++;
            const remaining = chars.slice(i, i + 4);
            if (remaining.length === 4) {
              out += String.fromCharCode(parseInt(remaining, 16));
              i += 4;
            } else {
              unicodePending = remaining;
              i += remaining.length;
            }
          }
          else { out += esc; i++; }
          continue;
        }

        if (chars[i] === '\\') {
          if (i + 1 < chars.length) {
            const esc = chars[i + 1];
            if (esc === 'n') { out += '\n'; i += 2; }
            else if (esc === 't') { out += '\t'; i += 2; }
            else if (esc === 'r') { out += '\r'; i += 2; }
            else if (esc === 'u') {
              i += 2;
              const remaining = chars.slice(i, i + 4);
              if (remaining.length === 4) {
                out += String.fromCharCode(parseInt(remaining, 16));
                i += 4;
              } else {
                unicodePending = remaining;
                i += remaining.length;
              }
            }
            else { out += esc; i += 2; }
          } else {
            pendingBackslash = true;
            i++;
          }
          continue;
        }

        if (chars[i] === '"') {
          // Unescaped quote: end of the narrative text value
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
          const afterOpeningQuote = prefixBuf.slice(match.index + match[0].length);
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
      "Gemini streaming generation successful"
    );

    const parsed = JSON.parse(accumulated);
    return buildGeneratedSegment(parsed, choiceMade, nodeIndex, currentStoryState, chosenConsequenceType);
  } catch (err) {
    logger.error({ err }, "Fatal error streaming story segment");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Cleanup (No longer needed, but kept to prevent breaking imports)
// ─────────────────────────────────────────────
export async function deleteStoryCaches(_storyKeys?: string[]): Promise<void> {
  logger.info("Explicit caching removed; implicit caching active. No manual cleanup needed.");
}
