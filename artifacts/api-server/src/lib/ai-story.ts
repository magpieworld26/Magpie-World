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
// Output Schema Definition (Saves Prompt Tokens)
// ─────────────────────────────────────────────
const storyResponseSchema = {
  type: Type.OBJECT,
  properties: {
    narrativeText: { 
      type: Type.STRING, 
      description: "Scene prose (600–900 words, second-person present tense)" 
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
        },
        required: ["id", "text", "consequence", "subtext"],
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

function buildSystemInstruction(storyTitle: string, storyGenre: string, worldContext?: string): string {
  const worldContextBlock = worldContext ? `\n## STORY BIBLE (Immutable Canon)\n${worldContext}\n` : "";
  return `STORY: "${storyTitle}" (Genre: ${storyGenre})${worldContextBlock}\n## CONTINUATION DIRECTIVE\n${CONTINUATION_DIRECTIVE}`;
}

// ─────────────────────────────────────────────
// Dynamic User Message (State & Pacing)
// ─────────────────────────────────────────────

function buildUserMessage(
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  storyState: StoryState | null,
  arcPosition: StoryState["arcPosition"]
): string {
  const pacingGuide: Record<StoryState["arcPosition"], string> = {
    opening: "Ground the reader. Direction-based choices, low stakes.",
    establishing: "Introduce tensions. Values-based choices.",
    deepening: "Complicate relationships. Higher stakes.",
    converging: "Threads collide. Dilemmas with real trade-offs.",
    climax: "Peak intensity. Hard choices with no clean options.",
    resolution: "Loops close. Choices resolve rather than open.",
  };

  const stateBlock = storyState
    ? `\n## STORY STATE\nArc: ${arcPosition} (${pacingGuide[arcPosition]})\nChoices made: ${storyState.choicesMade.map((c) => c.label).slice(-3).join(" -> ")}\nRelationships: ${JSON.stringify(storyState.relationshipStates)}\nActive Tensions: ${storyState.activeTensions.join(", ")}`
    : `\n## STORY STATE\nArc: ${arcPosition} (${pacingGuide[arcPosition]})`;

  return `${stateBlock}

## PREVIOUS SCENE CONTEXT:
${previousContext}

## READER CHOSE: "${choiceMade}"

Write scene ${nodeIndex + 1}. Apply all directives and generate the consequence now.`;
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
// Main Generator
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
  const arcPosition = deriveArcPosition(nodeIndex);

  const systemInstruction = buildSystemInstruction(storyTitle, storyGenre, story?.worldContext);
  const userMessage = buildUserMessage(previousContext, choiceMade, nodeIndex, currentStoryState, arcPosition);

  try {
    const response = await executeWithRetry(async () => {
      return await ai.models.generateContent({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        config: {
          systemInstruction,
          maxOutputTokens: 4096,
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

    // Guaranteed safely parsed due to responseMimeType and schema
    const parsed = JSON.parse(response.text);

    const turnNumber = nodeIndex + 1;
    const updatedStoryState: StoryState = {
      turn: turnNumber,
      arcPosition,
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

    // Format choices
    const choices: Choice[] = (parsed.choices ?? []).map((c: any) => ({
      id: c.id,
      text: c.subtext ? `${c.text}\n${c.subtext}` : c.text,
      consequence: c.consequence,
    }));

    return {
      narrativeText: parsed.narrativeText,
      choices,
      isEnding: parsed.isEnding ?? false,
      storyState: updatedStoryState,
    };
  } catch (err) {
    logger.error({ err }, "Fatal error generating story segment");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Cleanup (No longer needed, but kept to prevent breaking imports)
// ─────────────────────────────────────────────
export async function deleteStoryCaches(_storyKeys?: string[]): Promise<void> {
  logger.info("Explicit caching removed; implicit caching active. No manual cleanup needed.");
}