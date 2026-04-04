// ai-story.ts
// Story continuation engine — calls the Anthropic Claude API to generate the next scene
// based on the reader's choice, story world context, and previous scenes.
// Implements the 4-Layer Prompt System from the story-continuation skill.

import Anthropic from "@anthropic-ai/sdk";
import { logger } from "./logger";
import { getStoryById, storiesData } from "./stories-data";

const anthropic = new Anthropic();
// Uses ANTHROPIC_API_KEY from environment automatically

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
// (matches skill's arc position guide)
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
// Embedded from references/continuation-directive.md
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
// Build the system prompt (Layers 1 + 3)
// ─────────────────────────────────────────────

function buildSystemPrompt(
  storyTitle: string,
  storyGenre: string,
  worldContext: string | undefined,
  arcPosition: StoryState["arcPosition"],
  isLateGame: boolean,
  mayEnd: boolean,
): string {
  const worldContextBlock = worldContext
    ? `\n## LAYER 1 — STORY BIBLE (IMMUTABLE CANON — never contradict this)\n${worldContext}\n`
    : "";

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

  return `You are a master storyteller powering "Magpie — The Home of Breathing Books", an interactive choice-based reading platform.

STORY: "${storyTitle}" (Genre: ${storyGenre})
${worldContextBlock}

## LAYER 3 — CONTINUATION DIRECTIVE
${CONTINUATION_DIRECTIVE}

## CURRENT ARC POSITION: ${arcPosition.toUpperCase()}
Pacing guide for this position: ${pacingGuide[arcPosition]}
${isLateGame ? "⚠ This is the late game — choices must feel higher stakes, the plot is accelerating toward resolution." : ""}

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

${mayEnd ? 'If the story has reached a satisfying conclusion, set "isEnding": true and omit choices.' : ""}
`;
}

// ─────────────────────────────────────────────
// Build the user message (Layer 2 — Story State)
// ─────────────────────────────────────────────

function buildUserMessage(
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  storyState: StoryState | null,
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

  return `${storyStateBlock}
## Previous story context (last 1–2 scenes for voice continuity):
${previousContext}

## The reader chose: "${choiceMade}"

Story beat ${nodeIndex + 1}. Continue the story based on this choice. Apply all four layers. Write the next scene now.`;
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
  const storyTitle = story?.title || storyIdOrTitle;
  const storyGenre = story?.genre || genre;
  const arcPosition = deriveArcPosition(nodeIndex);
  const isLateGame = nodeIndex >= 12;
  const mayEnd = nodeIndex >= 18;

  const systemPrompt = buildSystemPrompt(
    storyTitle,
    storyGenre,
    story?.worldContext,
    arcPosition,
    isLateGame,
    mayEnd,
  );

  const userMessage = buildUserMessage(
    previousContext,
    choiceMade,
    nodeIndex,
    currentStoryState,
  );

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

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

    // Build updated story state from Claude's response + existing state
    const turnNumber = nodeIndex + 1;
    const updatedStoryState: StoryState = {
      turn: turnNumber,
      arcPosition,
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
