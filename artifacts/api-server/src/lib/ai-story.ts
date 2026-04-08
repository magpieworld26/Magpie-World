// ai-story.ts
// Story continuation engine — calls the Google Gemini API (gemini-2.5-flash-lite) to generate
// the next scene based on the reader's choice, story world context, and previous scenes.
// Implements the 4-Layer Prompt System from the story-continuation skill.
//
// PROMPT CACHING STRATEGY
// ───────────────────────
// The system prompt (Layer 1 story bible + Layer 3 continuation directive) is large (~2 000+
// tokens) and identical for every turn of the same story. We use Gemini's **explicit context
// caching** via `ai.caches.create()` to store it once and reference it by name on every
// subsequent `generateContent` call. This avoids re-billing those tokens on every turn.
//
// Cache lifetime: 60 minutes (refreshed on each use so an active session never expires).
// Cache key: one cache per story ID — stored in `storySystemPromptCacheNames`.
//
// Implicit caching (automatic on Gemini 2.5 models) is also active as a free bonus; if the
// same tokens appear in the request prefix they may be served from the implicit cache too.
//
// SDK: @google/genai  (npm install @google/genai)
// Uses GEMINI_API_KEY from environment automatically.

import { GoogleGenAI } from "@google/genai";
import { logger } from "./logger";
import { getStoryById, storiesData } from "./stories-data";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = "gemini-2.5-flash-lite";

// ─────────────────────────────────────────────
// In-process cache registry
// Maps storyId → Gemini cachedContent resource name
// ─────────────────────────────────────────────
const storySystemPromptCacheNames = new Map<string, string>();

// ─────────────────────────────────────────────
// Public types (unchanged from original)
// ─────────────────────────────────────────────

export interface Choice {
  id: string;
  text: string;
  consequence?: string;
}

export interface StoryState {
  turn: number;
  arcPosition:
    | "opening"
    | "establishing"
    | "deepening"
    | "converging"
    | "climax"
    | "resolution";
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
// Story lookup — accepts story ID or exact title
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
// Arc position derived from turn number
// ─────────────────────────────────────────────

function deriveArcPosition(nodeIndex: number): StoryState["arcPosition"] {
  const turn = nodeIndex + 1;
  if (turn <= 1) return "opening";
  if (turn <= 2) return "establishing";
  if (turn <= 4) return "deepening";
  if (turn <= 6) return "converging";
  if (turn <= 8) return "climax";
  return "resolution";
}

// ─────────────────────────────────────────────
// Layer 3 — Continuation Directive
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

### Pacing Mechanics
- Deceleration principle: as you approach a decision point, slow down, lengthen sentences, add sensory detail.
- Acceleration for consequence: when a choice lands dramatically, shorten sentences.
- Silence and space: not every moment needs to be filled.

### Scene Architecture (600–900 words)
Structure every scene in three beats:
- Beat 1 — Immediate consequence (2–3 sentences, no recap, show choice in motion)
- Beat 2 — Consequence unfolds (200–300 words, at least one unexpected element)
- Beat 3 — New ground (200–300 words, story genuinely advances)
- Deceleration (final 2–3 paragraphs, slow to decision point)

### What to Avoid
- Recapping the previous scene. Start with what happens *next*.
- Telling the reader how they feel.
- Resolving tension too quickly.
- Generic world details that could appear in any story.
- Choices that are really the same choice.
- Choices that ignore the current scene.
`;

// ─────────────────────────────────────────────
// Build static system prompt text (Layers 1 + 3)
// This is the content we will cache.
// ─────────────────────────────────────────────

function buildStaticSystemPromptText(
  storyTitle: string,
  storyGenre: string,
  worldContext: string | undefined,
): string {
  const worldContextBlock = worldContext
    ? `\n## LAYER 1 — STORY BIBLE (IMMUTABLE CANON — never contradict this)\n${worldContext}\n`
    : "";

  return `You are a master storyteller powering "Magpie — The Home of Breathing Books", an interactive choice-based reading platform.

STORY: "${storyTitle}" (Genre: ${storyGenre})
${worldContextBlock}

## LAYER 3 — CONTINUATION DIRECTIVE
${CONTINUATION_DIRECTIVE}

## LAYER 4 — OUTPUT FORMAT
Respond ONLY with a valid JSON object. No markdown fences, no preamble. Schema:

{
  "narrativeText": "Scene prose here (600–900 words, second-person present tense)...",
  "choices": [
    {
      "id": "choice-1",
      "text": "You [concrete action in present tense]...",
      "consequence": "1–3 word thematic label",
      "subtext": "One sentence: what this path offers or risks."
    },
    {
      "id": "choice-2",
      "text": "You [concrete action in present tense]...",
      "consequence": "1–3 word thematic label",
      "subtext": "One sentence: what this path offers or risks."
    },
    {
      "id": "choice-3",
      "text": "You [concrete action in present tense]...",
      "consequence": "1–3 word thematic label",
      "subtext": "One sentence: what this path offers or risks."
    }
  ],
  "isEnding": false,
  "storyStateUpdate": {
    "relationshipStates": { "CharacterName": "current dynamic in ~10 words" },
    "worldStateChanges": ["what changed this turn"],
    "plantedThreads": ["new detail/hint dropped that should pay off later"],
    "activeTensions": ["unresolved pressure driving reader forward"]
  }
}

CHOICE RULES:
- Exactly 3 choices (4 only if situation genuinely demands it)
- Each choice must be meaningfully distinct — different values, risks, types of engagement
- No choice should be obviously superior
- At least one choice must feel unexpected or surprising
- Every choice must reference specific details from the current scene
- Format: "You [action verb]..." — second person, present tense, concrete physical or social action
`;
}

// ─────────────────────────────────────────────
// Build the dynamic system instruction addendum
// (arc position, late-game flag, may-end flag)
// These change per-turn so they are NOT cached.
// ─────────────────────────────────────────────

function buildDynamicSystemAddendum(
  arcPosition: StoryState["arcPosition"],
  isLateGame: boolean,
  mayEnd: boolean,
): string {
  const pacingGuide: Record<StoryState["arcPosition"], string> = {
    opening:
      "Ground the reader, establish world feel. Direction-based choices, low stakes.",
    establishing:
      "Introduce key characters and tensions. Values-based choices, beginning to diverge.",
    deepening:
      "Complicate, reveal, deepen relationships. Higher stakes, more morally textured choices.",
    converging:
      "Threads start to collide, pressure rises. Dilemma-based choices with real trade-offs.",
    climax:
      "Peak intensity, major consequences. Hard choices with no clean options.",
    resolution:
      "Loops close, consequences land. Choices resolve rather than open.",
  };

  return [
    `## CURRENT ARC POSITION: ${arcPosition.toUpperCase()}`,
    `Pacing guide for this position: ${pacingGuide[arcPosition]}`,
    isLateGame
      ? "⚠ This is the late game — choices must feel higher stakes, the plot is accelerating toward resolution."
      : "",
    mayEnd
      ? 'If the story has reached a satisfying conclusion, set "isEnding": true and omit choices.'
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// ─────────────────────────────────────────────
// Build the user message (Layer 2 — Story State)
// ─────────────────────────────────────────────

function buildUserMessage(
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  storyState: StoryState | null,
  arcPosition: StoryState["arcPosition"],
  isLateGame: boolean,
  mayEnd: boolean,
): string {
  const storyStateBlock = storyState
    ? `
## LAYER 2 — STORY STATE (living memory — use this, not the raw transcript)
Turn: ${storyState.turn}
Arc position: ${storyState.arcPosition}
Choices made:
${storyState.choicesMade.map((c) => `  - Turn ${c.turn}: "${c.label}" → ${c.consequenceNote}`).join("\n")}
Relationship states:
${Object.entries(storyState.relationshipStates)
  .map(([name, state]) => `  - ${name}: ${state}`)
  .join("\n")}
World state changes:
${storyState.worldStateChanges.map((w) => `  - ${w}`).join("\n")}
Planted threads:
${storyState.plantedThreads.map((t) => `  - ${t}`).join("\n")}
Active tensions:
${storyState.activeTensions.map((t) => `  - ${t}`).join("\n")}
`
    : "";

  const dynamicAddendum = buildDynamicSystemAddendum(
    arcPosition,
    isLateGame,
    mayEnd,
  );

  return `${storyStateBlock}
${dynamicAddendum}

## Previous story context (last 1–2 scenes for voice continuity):
${previousContext}

## The reader chose: "${choiceMade}"

Story beat ${nodeIndex + 1}. Continue the story based on this choice. Apply all four layers. Write the next scene now.`;
}

// ─────────────────────────────────────────────
// Resolve or create the cached system prompt
// for a given story. Returns the cache name.
// ─────────────────────────────────────────────

async function getOrCreateSystemPromptCache(
  storyKey: string,
  storyTitle: string,
  storyGenre: string,
  worldContext: string | undefined,
): Promise<string> {
  // Return existing in-process cache name if available
  const existing = storySystemPromptCacheNames.get(storyKey);
  if (existing) {
    // Refresh TTL so an active session never expires mid-play.
    // Fire-and-forget; don't block the generation call.
    ai.caches
      .update({
        name: existing,
        config: { ttl: "3600s" },
      })
      .catch((err) =>
        logger.warn({ err, storyKey }, "Failed to refresh cache TTL"),
      );
    return existing;
  }

  // Build the large static text that we want cached
  const staticSystemText = buildStaticSystemPromptText(
    storyTitle,
    storyGenre,
    worldContext,
  );

  // Create a Gemini explicit context cache for this story's system prompt.
  // The minimum cacheable size is 1 024 tokens for Flash-Lite; our prompt
  // comfortably exceeds this with the full Continuation Directive.
  const cache = await ai.caches.create({
    model: MODEL,
    config: {
      systemInstruction: staticSystemText,
      ttl: "3600s", // 60 minutes; refreshed above on reuse
    },
  });

  const cacheName = cache.name!;
  storySystemPromptCacheNames.set(storyKey, cacheName);
  logger.info(
    { storyKey, cacheName, tokens: cache.usageMetadata?.totalTokenCount },
    "Created Gemini context cache for story system prompt",
  );

  return cacheName;
}

// ─────────────────────────────────────────────
// generateStorySegment — main export
// ─────────────────────────────────────────────

export async function generateStorySegment(
  storyIdOrTitle: string,
  genre: string,
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  currentStoryState: StoryState | null = null,
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title ?? storyIdOrTitle;
  const storyGenre = story?.genre ?? genre;
  const storyKey = story?.id ?? storyIdOrTitle;
  const arcPosition = deriveArcPosition(nodeIndex);
  const isLateGame = nodeIndex >= 12;
  const mayEnd = nodeIndex >= 18;

  // ── Step 1: ensure the static system prompt is cached ──
  let cachedContentName: string | undefined;
  try {
    cachedContentName = await getOrCreateSystemPromptCache(
      storyKey,
      storyTitle,
      storyGenre,
      story?.worldContext,
    );
  } catch (cacheErr) {
    // If caching fails (e.g. token count below minimum), fall back to
    // including the system prompt inline. This keeps the story running.
    logger.warn(
      { cacheErr, storyKey },
      "Context cache creation failed — falling back to inline system prompt",
    );
  }

  // ── Step 2: build the per-turn user message (Layer 2 + dynamic arc) ──
  const userMessage = buildUserMessage(
    previousContext,
    choiceMade,
    nodeIndex,
    currentStoryState,
    arcPosition,
    isLateGame,
    mayEnd,
  );

  // ── Step 3: call Gemini ──
  try {
    const generationConfig: Record<string, unknown> = {
      maxOutputTokens: 4096,
      temperature: 1.0,
    };

    // If we have a cache, reference it; otherwise include the system prompt inline
    if (cachedContentName) {
      generationConfig.cachedContent = cachedContentName;
    }

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      // When no cache, attach the static system prompt inline
      ...(cachedContentName
        ? {}
        : {
            config: {
              systemInstruction: buildStaticSystemPromptText(
                storyTitle,
                storyGenre,
                story?.worldContext,
              ),
            },
          }),
      config: generationConfig,
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("Empty response from Gemini");
    }

    logger.info(
      {
        storyKey,
        nodeIndex,
        cachedTokens: response.usageMetadata?.cachedContentTokenCount ?? 0,
        totalInputTokens: response.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
      },
      "Gemini generation complete",
    );

    // Strip any accidental markdown fences before parsing
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Build updated story state from Gemini's response + existing state
    const turnNumber = nodeIndex + 1;
    const updatedStoryState: StoryState = {
      turn: turnNumber,
      arcPosition,
      choicesMade: [
        ...(currentStoryState?.choicesMade ?? []),
        {
          turn: turnNumber,
          label: choiceMade,
          consequenceNote:
            parsed.storyStateUpdate?.worldStateChanges?.[0] ??
            "Choice consequence noted",
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

    // Format choices: append subtext to choice text for richer display
    const choices: Choice[] = (parsed.choices ?? []).map(
      (c: {
        id: string;
        text: string;
        consequence?: string;
        subtext?: string;
      }) => ({
        id: c.id,
        text: c.subtext ? `${c.text}\n${c.subtext}` : c.text,
        consequence: c.consequence,
      }),
    );

    return {
      narrativeText: parsed.narrativeText ?? "The story continues...",
      choices,
      isEnding: parsed.isEnding ?? false,
      storyState: updatedStoryState,
    };
  } catch (err) {
    logger.error({ err }, "Error generating story segment with Gemini");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Cleanup helper — call on server shutdown or
// when you want to explicitly evict a story cache
// ─────────────────────────────────────────────

export async function deleteStoryCaches(storyKeys?: string[]): Promise<void> {
  const keys = storyKeys ?? [...storySystemPromptCacheNames.keys()];
  await Promise.allSettled(
    keys.map(async (key) => {
      const name = storySystemPromptCacheNames.get(key);
      if (!name) return;
      try {
        await ai.caches.delete({ name });
        storySystemPromptCacheNames.delete(key);
        logger.info({ key, name }, "Deleted Gemini context cache");
      } catch (err) {
        logger.warn({ err, key }, "Failed to delete Gemini context cache");
      }
    }),
  );
}
