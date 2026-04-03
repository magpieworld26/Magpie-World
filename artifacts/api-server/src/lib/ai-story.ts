// ai-story.ts
// Story continuation engine — calls the Anthropic API to generate the next scene
// based on the reader's choice, story bible, and accumulated story state.

import { StoryData, StoryChoice } from "./story-data";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ArcPosition =
  | "opening"
  | "establishing"
  | "deepening"
  | "converging"
  | "climax"
  | "resolution";

export interface ChoiceRecord {
  turn: number;
  label: string;
  title: string;
  consequence: string; // one-line note, filled in by AI
}

export interface CharacterState {
  name: string;
  currentDynamic: string; // ~10 words
}

export interface StoryState {
  turn: number;
  arcPosition: ArcPosition;
  choicesMade: ChoiceRecord[];
  relationshipStates: CharacterState[];
  worldStateChanges: string[];
  plantedThreads: string[];
  activeTensions: string[];
}

export interface GeneratedChoice {
  label: "A" | "B" | "C" | "D";
  title: string;
  description: string;
  subtext: string;
}

export interface ContinuationResult {
  sceneText: string;
  choices: GeneratedChoice[];
  updatedState: StoryState;
  rawStateBlock: string; // The AI's structured state text, for debugging / display
}

// ─────────────────────────────────────────────
// Arc position helper
// ─────────────────────────────────────────────

function arcPositionForTurn(turn: number): ArcPosition {
  if (turn <= 1) return "opening";
  if (turn === 2) return "establishing";
  if (turn <= 4) return "deepening";
  if (turn <= 6) return "converging";
  if (turn <= 8) return "climax";
  return "resolution";
}

// ─────────────────────────────────────────────
// Initial state builder
// ─────────────────────────────────────────────

export function buildInitialState(story: StoryData): StoryState {
  return {
    turn: 0,
    arcPosition: "opening",
    choicesMade: [],
    relationshipStates: [],
    worldStateChanges: [],
    plantedThreads: [],
    activeTensions: [],
  };
}

// ─────────────────────────────────────────────
// State serialiser (sent to the AI on every turn)
// ─────────────────────────────────────────────

function serialiseState(state: StoryState): string {
  const choices =
    state.choicesMade.length > 0
      ? state.choicesMade
          .map((c) => `  - Turn ${c.turn}: "${c.label}: ${c.title}" → ${c.consequence}`)
          .join("\n")
      : "  (none yet)";

  const relationships =
    state.relationshipStates.length > 0
      ? state.relationshipStates.map((r) => `  - ${r.name}: ${r.currentDynamic}`).join("\n")
      : "  (not yet established)";

  const worldChanges =
    state.worldStateChanges.length > 0
      ? state.worldStateChanges.map((w) => `  - ${w}`).join("\n")
      : "  (none yet)";

  const threads =
    state.plantedThreads.length > 0
      ? state.plantedThreads.map((t) => `  - ${t}`).join("\n")
      : "  (none yet)";

  const tensions =
    state.activeTensions.length > 0
      ? state.activeTensions.map((t) => `  - ${t}`).join("\n")
      : "  (none yet)";

  return `STORY STATE
───────────
Turn: ${state.turn}
Arc position: ${state.arcPosition}
Choices made:
${choices}
Relationship states:
${relationships}
World state changes:
${worldChanges}
Planted threads:
${threads}
Active tensions:
${tensions}`;
}

// ─────────────────────────────────────────────
// Response parser
// Splits the AI output into scene text, choices, and updated state block.
// ─────────────────────────────────────────────

function parseAIResponse(
  raw: string,
  currentState: StoryState,
  choiceMade: GeneratedChoice | StoryChoice
): ContinuationResult {
  // We ask the AI to delimit sections with clear markers.
  // Fallback: treat the whole thing as scene text if parsing fails.

  const sceneMatch = raw.match(/===SCENE===([\s\S]*?)===CHOICES===/);
  const choicesMatch = raw.match(/===CHOICES===([\s\S]*?)===STATE===/);
  const stateMatch = raw.match(/===STATE===([\s\S]*)$/);

  const sceneText = sceneMatch
    ? sceneMatch[1].trim()
    : raw.split("===")[0].trim(); // graceful fallback

  // Parse choices block
  const choicesRaw = choicesMatch ? choicesMatch[1].trim() : "";
  const choices = parseChoicesBlock(choicesRaw);

  // Parse state block — if the AI returned a valid JSON state, use it; otherwise keep current.
  const stateRaw = stateMatch ? stateMatch[1].trim() : "";
  const updatedState = parseStateBlock(stateRaw, currentState, choiceMade);

  return { sceneText, choices, updatedState, rawStateBlock: stateRaw };
}

function parseChoicesBlock(raw: string): GeneratedChoice[] {
  const choices: GeneratedChoice[] = [];
  const labels: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  for (const label of labels) {
    // Match patterns like:  A. Title\n Description\n *Subtext*
    const regex = new RegExp(
      `${label}[.):]\\s*([^\\n]+)\\n([\\s\\S]*?)(?=\\n[BCD][.):]|$)`,
      "i"
    );
    const m = raw.match(regex);
    if (m) {
      const lines = m[2].trim().split("\n").filter(Boolean);
      const subtext = lines.find((l) => l.startsWith("*") || l.startsWith("-")) || lines[0] || "";
      const description = lines
        .filter((l) => l !== subtext)
        .join(" ")
        .replace(/^\*|\*$/g, "")
        .trim();
      choices.push({
        label,
        title: m[1].trim(),
        description: description || m[1].trim(),
        subtext: subtext.replace(/^\*|\*$/g, "").trim(),
      });
    }
  }

  // Fallback: if parsing fully failed, return placeholder choices
  if (choices.length === 0) {
    const fallbackTitles = ["Press forward", "Hold back", "Try another way"];
    return fallbackTitles.map((title, i) => ({
      label: (["A", "B", "C"] as ("A" | "B" | "C" | "D")[])[i],
      title,
      description: title,
      subtext: "",
    }));
  }

  return choices;
}

function parseStateBlock(
  raw: string,
  current: StoryState,
  choiceMade: GeneratedChoice | StoryChoice
): StoryState {
  // Try to extract JSON if the AI wrapped it
  const jsonMatch = raw.match(/```json([\s\S]*?)```/) || raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      return { ...current, ...parsed };
    } catch {
      // fall through to heuristic parsing below
    }
  }

  // Heuristic: bump turn number and arc position
  const nextTurn = current.turn + 1;
  const nextArc = arcPositionForTurn(nextTurn);

  const updatedChoices = [
    ...current.choicesMade,
    {
      turn: nextTurn,
      label: choiceMade.label,
      title: "title" in choiceMade ? (choiceMade as GeneratedChoice).title : "",
      consequence: "(see scene)",
    },
  ];

  return {
    ...current,
    turn: nextTurn,
    arcPosition: nextArc,
    choicesMade: updatedChoices,
  };
}

// ─────────────────────────────────────────────
// Core API call — generates one story continuation
// ─────────────────────────────────────────────

export async function continueStory(
  story: StoryData,
  state: StoryState,
  choiceMade: StoryChoice | GeneratedChoice,
  recentSceneText: string // the last scene shown to the reader, for voice continuity
): Promise<ContinuationResult> {
  const systemPrompt = buildSystemPrompt(story, state, recentSceneText);
  const userMessage = buildUserMessage(choiceMade, state);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText: string = data.content
    .map((block: { type: string; text?: string }) =>
      block.type === "text" ? block.text : ""
    )
    .filter(Boolean)
    .join("\n");

  return parseAIResponse(rawText, state, choiceMade);
}

// ─────────────────────────────────────────────
// Prompt builders
// ─────────────────────────────────────────────

function buildSystemPrompt(
  story: StoryData,
  state: StoryState,
  recentScene: string
): string {
  return `You are a master story-writer continuing an interactive choose-your-own-adventure story.

══════════════════════════════════════
STORY BIBLE (IMMUTABLE CANON)
══════════════════════════════════════
Title: ${story.title}
Genre / Tone: ${story.storyMode}
Audience: ${story.audienceAge}

${story.worldContext}

══════════════════════════════════════
CURRENT STORY STATE (LIVING MEMORY)
══════════════════════════════════════
${serialiseState(state)}

══════════════════════════════════════
MOST RECENT SCENE (for voice continuity)
══════════════════════════════════════
${recentScene.slice(-1800)}

══════════════════════════════════════
WRITING INSTRUCTIONS
══════════════════════════════════════

SCENE ARCHITECTURE (600–900 words total):

Beat 1 — Immediate consequence (open, NO recap, 2–3 sentences)
Show the choice in motion. The reader just acted — show what happens in the next breath. Never summarise the previous scene.

Beat 2 — Consequence unfolds (200–300 words)
The direct result plays out. Include at least one UNEXPECTED element — something the reader didn't fully anticipate. Show the world responding specifically to THIS choice, not a generic version of it.

Beat 3 — New ground (200–300 words)
The story moves forward. New information surfaces, a character dynamic shifts, or the setting opens up. By the end of this beat the reader should feel the story has genuinely advanced.

Deceleration (final 2–3 paragraphs)
Slow the pacing slightly. Let the reader feel the weight of what's coming. The decision point should feel inevitable.

CHOICE GENERATION (exactly 3 choices, 4 only if the situation genuinely demands it):
- Each choice must be MEANINGFULLY DISTINCT — different values, different risks, different engagement
- No choice should be obviously superior
- At least one choice must feel UNEXPECTED or SURPRISING
- Choices must reference SPECIFIC DETAILS from the current scene
- Format: "You [action verb]..." — second person, present tense, concrete action
- Follow each choice with one sentence of subtext (what the reader gains, risks, or experiences)
- Do NOT write choices that are the same action with different adjectives

CONTINUITY RULES:
1. Every named character must behave consistently with their established personality and relationship state
2. World-state changes are permanent (unless a choice explicitly changed them)
3. Planted threads must eventually pay off — track them
4. Prior choices must echo forward visibly
5. Match the voice, sentence rhythm, and vocabulary of the original opening scene

ARC POSITION GUIDANCE for ${state.arcPosition}:
${getArcGuidance(state.arcPosition)}

══════════════════════════════════════
OUTPUT FORMAT — use EXACTLY these delimiters:
══════════════════════════════════════

===SCENE===
[Your scene prose here — 600 to 900 words, second person, no chapter headers]

===CHOICES===
A. [Concise title — 4–6 words]
[One sentence describing the action]
*[One sentence of subtext — what the reader gains or risks]*

B. [Concise title]
[Description]
*[Subtext]*

C. [Concise title]
[Description]
*[Subtext]*

===STATE===
[Return a JSON object with these keys:
{
  "turn": <number>,
  "arcPosition": "<string>",
  "choicesMade": [<array of {turn, label, title, consequence}>],
  "relationshipStates": [<array of {name, currentDynamic}>],
  "worldStateChanges": [<array of strings>],
  "plantedThreads": [<array of strings>],
  "activeTensions": [<array of strings>]
}]
`;
}

function buildUserMessage(
  choice: StoryChoice | GeneratedChoice,
  state: StoryState
): string {
  const choiceLabel = choice.label;
  const choiceTitle = "title" in choice ? choice.title : choice.label;
  const choiceDesc = "description" in choice ? choice.description : "";

  return `The reader chose:

Choice ${choiceLabel}: ${choiceTitle}
${choiceDesc}

This is Turn ${state.turn + 1}. Arc position: ${arcPositionForTurn(state.turn + 1)}.

Please generate the next scene continuation and three new choices following the output format exactly.`;
}

function getArcGuidance(arc: ArcPosition): string {
  const guidance: Record<ArcPosition, string> = {
    opening:
      "Ground the reader, establish world feel. Choices should be direction-based and low-stakes.",
    establishing:
      "Introduce key characters and tensions. Choices should be values-based and beginning to diverge.",
    deepening:
      "Complicate, reveal, deepen relationships. Higher stakes and more morally textured choices.",
    converging:
      "Threads start to collide, pressure rises. Dilemma-based choices with real trade-offs.",
    climax:
      "Peak intensity, major consequences. Hard choices with no clean options.",
    resolution:
      "Loops close, consequences land. Choices resolve rather than open.",
  };
  return guidance[arc];
}

// ─────────────────────────────────────────────
// Convenience: start a new session (turn 0 → 1)
// ─────────────────────────────────────────────

export async function startStory(
  story: StoryData,
  initialChoice: StoryChoice
): Promise<ContinuationResult> {
  const state = buildInitialState(story);
  return continueStory(story, state, initialChoice, story.openingScene);
}