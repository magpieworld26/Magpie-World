// ai-story.ts
// Story continuation engine — calls the Anthropic Claude API to generate the next scene.
//
// Cost optimizations applied:
//  1. PROMPT CACHING — the large static system prompt (continuation directive + story bible)
//     is marked with cache_control so it's only billed at 10% on cache hits.
//  2. STORY SUMMARY — instead of passing raw transcript, we maintain a rolling compressed
//     summary (~150 words) + only the immediately previous scene (~600 words).
//     This keeps the user-message token count flat across a long playthrough.
//  3. SPLIT SYSTEM PROMPT — static content is in one cached block; dynamic
//     (arc position, late-game flags) is in a second un-cached block so the cache
//     key stays stable for every call that shares the same story.

import Anthropic from "@anthropic-ai/sdk";
import { logger } from "./logger";
import { getStoryById, storiesData } from "./stories-data";

const anthropic = new Anthropic();
// Uses ANTHROPIC_API_KEY from environment automatically

// ─────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────

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

  // Rolling compressed summary of all scenes so far (kept ≤ 200 words by Claude).
  // Replaces raw transcript to keep token cost flat across long playthroughs.
  rollingSummary: string;

  // The prose of only the most recent scene (for voice continuity).
  // We do NOT accumulate all previous scenes — just the last one.
  lastSceneProse: string;

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

// ─────────────────────────────────────────────────────────────
// Story lookup
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// Arc position derived from turn number
// ─────────────────────────────────────────────────────────────

function deriveArcPosition(nodeIndex: number): StoryState["arcPosition"] {
  const turn = nodeIndex + 1;
  if (turn <= 1) return "opening";
  if (turn <= 2) return "establishing";
  if (turn <= 4) return "deepening";
  if (turn <= 6) return "converging";
  if (turn <= 8) return "climax";
  return "resolution";
}

// ─────────────────────────────────────────────────────────────
// BLOCK 1 (CACHED) — Story bible + continuation directive
//
// This block is IDENTICAL for every continuation call on the
// same story, so it will hit the cache after the first request.
// At ~1 000–1 500 tokens it saves ~90% on those tokens from
// the second request onward.
// ─────────────────────────────────────────────────────────────

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

### Pacing Over Multiple Scenes
- Scenes 1–2: Establish world, characters, tone
- Scenes 3–4: Deepen, complicate, reveal
- Scenes 5–6: Converge, escalate, approach climax
- Scene 7+: Resolution arc — choices begin to close loops rather than open them
`;

function buildCachedSystemBlock(
  storyTitle: string,
  storyGenre: string,
  worldContext: string | undefined,
): string {
  const worldContextBlock = worldContext
    ? `\n## STORY BIBLE (IMMUTABLE CANON — never contradict this)\n${worldContext}\n`
    : "";

  return `You are a master storyteller powering "Magpie — The Home of Breathing Books", an interactive choice-based reading platform.

STORY: "${storyTitle}" (Genre: ${storyGenre})
${worldContextBlock}
${CONTINUATION_DIRECTIVE}

## OUTPUT FORMAT
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
    "rollingSummary": "Updated compressed summary of the whole story so far (≤ 200 words). Merge the previous summary with what just happened. Preserve: key events, character relationship states, world changes, planted threads.",
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
- Format: "You [action verb]..." — second person, present tense, concrete physical or social action`;
}

// ─────────────────────────────────────────────────────────────
// BLOCK 2 (NOT CACHED) — Dynamic per-call system instructions
//
// Arc position and late-game flags change each turn, so they
// must live outside the cached block to avoid poisoning the
// cache key for all other calls.
// ─────────────────────────────────────────────────────────────

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

function buildDynamicSystemBlock(
  arcPosition: StoryState["arcPosition"],
  isLateGame: boolean,
  mayEnd: boolean,
): string {
  return `## CURRENT ARC POSITION: ${arcPosition.toUpperCase()}
Pacing guide: ${pacingGuide[arcPosition]}
${isLateGame ? "⚠ LATE GAME — choices must feel higher stakes; plot is accelerating toward resolution." : ""}
${mayEnd ? 'If the story has reached a satisfying conclusion, set "isEnding": true and omit choices.' : ""}`;
}

// ─────────────────────────────────────────────────────────────
// User message — uses rolling summary instead of full transcript
//
// Token cost breakdown per call (approx):
//   Static system block  ~1 200 tokens  → 120 tokens on cache hit (10%)
//   Dynamic system block ~  100 tokens  → always billed
//   User message         ~  600 tokens  → always billed (summary + last scene + choice)
//   Output               ~1 000 tokens  → always billed
//
// Compare to the original approach (full transcript):
//   Turn 10 transcript could be 8 000+ tokens input. With summary it stays ~600.
// ─────────────────────────────────────────────────────────────

function buildUserMessage(
  choiceMade: string,
  nodeIndex: number,
  storyState: StoryState | null,
): string {
  const storyStateBlock = storyState
    ? `## STORY STATE (use this as ground truth — do not contradict it)
Turn: ${storyState.turn}
Arc position: ${storyState.arcPosition}

Story so far (compressed summary — all key events, characters, world changes):
${storyState.rollingSummary}

Relationship states:
${Object.entries(storyState.relationshipStates)
  .map(([name, state]) => `  - ${name}: ${state}`)
  .join("\n")}

Planted threads (pay off at least one if appropriate):
${storyState.plantedThreads.map((t) => `  - ${t}`).join("\n")}

Active tensions:
${storyState.activeTensions.map((t) => `  - ${t}`).join("\n")}

## Previous scene (for voice continuity only — do NOT recap it):
${storyState.lastSceneProse}
`
    : "## First continuation — no previous state yet.\n";

  return `${storyStateBlock}
## The reader chose: "${choiceMade}"

Story beat ${nodeIndex + 1}. Write the next scene. Honour the choice, advance the story, end at a new decision point. Remember to update rollingSummary in storyStateUpdate.`;
}

// ─────────────────────────────────────────────────────────────
// generateStorySegment — main export
// ─────────────────────────────────────────────────────────────

export async function generateStorySegment(
  storyIdOrTitle: string,
  genre: string,
  choiceMade: string,
  nodeIndex: number,
  currentStoryState: StoryState | null = null,
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title || storyIdOrTitle;
  const storyGenre = story?.genre || genre;
  const arcPosition = deriveArcPosition(nodeIndex);
  const isLateGame = nodeIndex >= 12;
  const mayEnd = nodeIndex >= 18;

  // ── Prompt caching: split system into two content blocks ──
  //
  // Block 1: large static block → marked cache_control: ephemeral
  //   Anthropic caches everything up to this breakpoint.
  //   On cache hit, these ~1 200 tokens cost ~120 tokens (10%).
  //
  // Block 2: small dynamic block → NOT cached
  //   Changes every turn so must stay outside the cache key.

  const systemBlocks: Anthropic.Beta.PromptCaching.PromptCachingBetaTextBlockParam[] =
    [
      {
        type: "text",
        text: buildCachedSystemBlock(
          storyTitle,
          storyGenre,
          story?.worldContext,
        ),
        cache_control: { type: "ephemeral" }, // ← cache breakpoint
      },
      {
        type: "text",
        text: buildDynamicSystemBlock(arcPosition, isLateGame, mayEnd),
        // No cache_control here — this block changes every turn
      },
    ];

  const userMessage = buildUserMessage(
    choiceMade,
    nodeIndex,
    currentStoryState,
  );

  try {
    const message = await anthropic.beta.promptCaching.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemBlocks,
      messages: [{ role: "user", content: userMessage }],
    });

    // Log cache performance so you can verify savings in dev
    const usage =
      message.usage as Anthropic.Beta.PromptCaching.PromptCachingBetaUsage;
    logger.info(
      {
        input_tokens: usage.input_tokens,
        cache_read_input_tokens: usage.cache_read_input_tokens ?? 0,
        cache_creation_input_tokens: usage.cache_creation_input_tokens ?? 0,
        output_tokens: usage.output_tokens,
      },
      "Claude API usage (cache_read > 0 means savings are active)",
    );

    const content = message.content[0];
    if (content.type !== "text" || !content.text) {
      throw new Error("Empty or unexpected response from Claude");
    }

    // Strip any accidental markdown fences before parsing
    const cleaned = content.text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // ── Build updated story state ──────────────────────────────
    //
    // rollingSummary comes back from Claude (it merged the previous
    // summary + this turn's events). We store ONLY the new scene
    // prose as lastSceneProse — not the accumulation — so the
    // user-message stays bounded.

    const turnNumber = nodeIndex + 1;
    const updatedStoryState: StoryState = {
      turn: turnNumber,
      arcPosition,

      // Claude-generated compressed summary (≤ 200 words, all history)
      rollingSummary:
        parsed.storyStateUpdate?.rollingSummary ||
        currentStoryState?.rollingSummary ||
        "",

      // Only the scene we just generated — NOT the full history
      lastSceneProse: parsed.narrativeText || "",

      choicesMade: [
        ...(currentStoryState?.choicesMade || []),
        {
          turn: turnNumber,
          label: choiceMade,
          consequenceNote:
            parsed.storyStateUpdate?.worldStateChanges?.[0] ||
            "Choice consequence noted",
        },
      ],
      relationshipStates: {
        ...(currentStoryState?.relationshipStates || {}),
        ...(parsed.storyStateUpdate?.relationshipStates || {}),
      },
      worldStateChanges: [
        ...(currentStoryState?.worldStateChanges || []),
        ...(parsed.storyStateUpdate?.worldStateChanges || []),
      ],
      plantedThreads: [
        ...(currentStoryState?.plantedThreads || []),
        ...(parsed.storyStateUpdate?.plantedThreads || []),
      ],
      activeTensions: parsed.storyStateUpdate?.activeTensions || [],
    };

    // Format choices: append subtext to the choice text for richer display
    const choices: Choice[] = (parsed.choices || []).map(
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
      narrativeText: parsed.narrativeText || "The story continues...",
      choices,
      isEnding: parsed.isEnding || false,
      storyState: updatedStoryState,
    };
  } catch (err) {
    logger.error({ err }, "Error generating story segment with Claude");
    throw err;
  }
}
