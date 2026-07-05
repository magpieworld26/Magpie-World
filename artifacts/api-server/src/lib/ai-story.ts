// ai-story.ts
import { GoogleGenAI, Type } from "@google/genai";
import { logger } from "./logger";
import { getStoryById, storiesData } from "./stories-data";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash";

// ─────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────

export interface Choice {
  id: string;
  text: string;
  consequence?: string;
  subtext?: string;
  consequenceType?: "spectacular" | "good" | "neutral" | "bad" | "catastrophic";
}

export interface StoryState {
  turn: number;
  storyHealthScore: number;
  choicesMade: Array<{ turn: number; label: string; consequenceNote: string }>;
  relationshipStates: Record<string, string>;
  worldStateChanges: string[];
  plantedThreads: string[];
  activeTensions: string[];
  narrativeSummary: string[];
  targetEndingChoices: number;
}

export interface GeneratedSegment {
  narrativeText: string;
  choices: Choice[];
  isEnding: boolean;
  storyState: StoryState;
}

// ─────────────────────────────────────────────
// Output Schema Definition
// ─────────────────────────────────────────────

const storyResponseSchema = {
  type: Type.OBJECT,
  properties: {
    narrativeText: {
      type: Type.STRING,
      description:
        "Scene prose (1 word to 1500 words, second-person present tense, length chosen by AI based on narrative need)",
    },
    sceneSummary: {
      type: Type.STRING,
      description:
        "A PRECISE FACTUAL RECORD of this scene for story memory. Structure as numbered points covering ALL of: (1) What the player chose and its immediate consequence; (2) Specific new information revealed — names, facts, locations, objects; (3) How each named character acted and reacted, and their current relationship status with the protagonist; (4) Any objects, resources, or clues that became important; (5) Unresolved threads or questions raised. Be SPECIFIC — vague summaries cause continuity failures. Characters who appeared MUST be named. Write in past tense, factual prose.",
    },
    choices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: {
            type: Type.STRING,
            description: "Concrete action in present tense",
          },
          consequence: {
            type: Type.STRING,
            description: "1-3 word thematic label",
          },
          subtext: {
            type: Type.STRING,
            description: "One sentence: what this path offers or risks",
          },
          consequenceType: {
            type: Type.STRING,
            description:
              "The likely consequence type of this choice: 'spectacular' (major unexpected win — a breakthrough, a stroke of luck, a masterful outcome), 'good' (positive consequence), 'neutral' (neither good nor bad), 'bad' (negative but survivable, things get harder), or 'catastrophic' (devastating, near-irreversible loss or cost). Be accurate and fair — do not default to neutral for every choice.",
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
        narrativeHealthDelta: {
          type: Type.INTEGER,
          description:
            "An integer from -3 to +3 reflecting how the EVENTS OF THIS SCENE affected the story's trajectory — independent of which choice the player made. +3: a major unexpected breakthrough (vital ally appears, critical information revealed, enormous stroke of luck). +1: things went slightly better than expected. 0: neutral progression. -1: a new complication or cost emerged. -3: a serious setback that wasn't the direct result of the player's choice (an NPC betrays them, a plan falls through, external disaster). Calibrate honestly — do NOT default to 0 every turn.",
        },
      },
    },
  },
  required: [
    "narrativeText",
    "sceneSummary",
    "choices",
    "isEnding",
    "storyStateUpdate",
  ],
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
// Universal Prose Rules (injected for ALL genres)
// ─────────────────────────────────────────────

const UNIVERSAL_PROSE_RULES = `
### Universal Prose Rules (Apply across ALL genres, always)

CONSEQUENCE SPECIFICITY
The feeling that what happened could only have happened because of the choice the reader made. If they had chosen differently, this scene must be genuinely different — not a different line of dialogue, but a genuinely different situation.
Every scene must contain at least one unexpected element:
- A character reacting differently than expected
- New information that recontextualises something earlier
- A side effect of the choice that wasn't obvious
- A detail from the world that suddenly becomes important

READER CHARACTER AGENCY
- NEVER perform any high-stakes action on behalf of the reader's character
- The prose shows: consequences of the choice made, other characters' reactions, world changes, revelations, backstory and progress towards the goal.

SENTENCE RHYTHM
Vary sentence length deliberately.

SECOND PERSON, PRESENT TENSE
Throughout. "You step into the corridor" not "She stepped."

### MACRO-PLOT VELOCITY & PACING
- You must ruthlessly advance the MACRO-PLOT. Do not get stuck in micro-actions.
- Action sequences (fights, chases, escaping danger) MUST be resolved in 1-2 turns. Never loop the same conflict. The consequence of the reader's choice must conclude the immediate danger and push them into the NEXT plot beat, challenge, or location.
- By Turn 3, the overarching goal, quest, or central conflict MUST be explicitly established and revealed to the protagonist.
- Every scene must make meaningful progress toward the story's ultimate goal. Escalate the plot, reveal new critical information, change the location, or complete a milestone.
- The story has a hard limit of around 25-35 turns. Pace the narrative arc accordingly:
  * Turns 1-5: The Inciting Incident, immersion, and clear establishment of the main objective/rules.
  * Turns 6-20: Rapid progression through intermediate milestones, traversing the world, and advancing the quest.
  * Turns 21+: The Climax and final resolution.
- NEVER stall the narrative. Do not spend multiple turns on a single obstacle.

### Dynamic Prose Length
Prose length ranges from 1 word to 1000 words. Choose based on narrative need.
1-50 words: Sudden revelations, shocking consequences, moments of pure impact
100-400 words: Standard scenes where consequences unfold at measured pace
500-1000 words: Complex scenes with multiple characters, major world shifts, deep emotional beats

### Dynamic Story Endings
Stories do NOT end at a fixed turn count. The system will tell you when the story is approaching its conclusion window. Do not set isEnding: true early. Let the story reach a CLIMAX first — a confrontation, revelation, or decisive moment — then conclude.
When isEnding is true, provide no choices (empty array).
Ending tone is calibrated by story health score:
- Score >= +8: spectacular win — everything the reader fought for is fully realised, beyond what they hoped
- Score +4 to +7: good outcome — meaningful success with real costs paid along the way
- Score +1 to +3: mixed result — partial win, something important was permanently lost
- Score 0: ambiguous — neither victory nor defeat; the world is changed but the meaning is unresolved
- Score -1 to -3: partial failure — the goal was missed, but the protagonist survives and learns
- Score -4 to -7: bad outcome — significant, lasting loss; the protagonist carries the weight of their choices
- Score <= -8: catastrophic loss — everything unravels, total defeat, the cost was everything

### What to Avoid
- Recapping the previous scene. Start with what happens next.
- Telling the reader how they feel.
- Generic world details that could appear in any story.
- Choices that are really the same choice with different adjectives.
- Choices that ignore the current scene.
- Acting on behalf of the reader beyond what their choice dictated.
- Long descriptions before a character speaks. Get to the dialogue.
- Explaining what the dialogue means. Trust the reader.
- Characters who exist only to deliver information. Every character must want something.
- Setting isEnding: true before the story has reached its climax. A satisfying ending requires a climax first.
`;

// ─────────────────────────────────────────────
// Genre-Specific Writing Style Blocks (v2 — Fast-Paced)
// ─────────────────────────────────────────────

const GENRE_STYLE_FANTASY = `
### Writing Style: FANTASY / EPIC ADVENTURE
The story moves like a chase. Every scene ends on a turn — a betrayal, a discovery, a door that shouldn't exist.
- Stakes escalate every 500 words. If nothing has changed, cut the scene.
- Magic and lore are revealed through conflict, never narration. A character uses a power wrong, breaks a rule, pays a price — that's how the reader learns the system.
- Dialogue ratio: 35-45%. Characters argue, scheme, warn, and lie. Banter during combat. Whispered deals before betrayals.
- Description is surgical: one detail per location, one per character. The rest is motion and consequence.
- Never pause the plot to explain the world. The world is what happens to people.
`;

const GENRE_STYLE_SCIFI = `
### Writing Style: SCIENCE FICTION
The excitement is in what the characters discover and how fast it unravels what they thought was true.
- Every scene delivers a revelation, a system failure, or a decision under pressure. Procedural momentum — characters are always solving, escaping, or arguing about what to do next.
- Dialogue ratio: 40-50%. Tech is introduced through disagreement: "That's not what the data says." "The data's wrong." Arguments are exposition.
- Internal monologue is short, sharp, and paranoid. The protagonist doubts what they're seeing. One line of doubt, then action.
- No worldbuilding tours. The setting is conveyed through what breaks, what's forbidden, and what characters take for granted.
- Cross-faction tension drives every interaction. Nobody fully trusts anyone. Alliances shift fast.
`;

const GENRE_STYLE_MYSTERY = `
### Writing Style: MYSTERY / THRILLER
Every scene is an interrogation — of a person, a place, or an assumption.
- Each scene must yield exactly one of: a new clue, a new lie exposed, or a suspect eliminated. If it doesn't, cut it.
- Dialogue ratio: 45-60%. Dialogue IS the investigation. Characters reveal themselves by what they dodge, over-explain, or refuse to answer.
- Clues are behavioral, not descriptive. It's not about the room — it's about who flinched, who left early, who knew something they shouldn't.
- Pacing is relentless. Short scenes, frequent location changes, ticking clocks. The protagonist is always one step behind until they're suddenly one step ahead.
- Never tell the reader something is suspicious. Let the wrong detail sit there. The reader will feel it.
`;

const GENRE_STYLE_HORROR = `
### Writing Style: HORROR
The excitement is dread accelerating into panic. Something is wrong and it's getting worse faster than anyone can react.
- Normalcy lasts one page, max. Then the first wrong thing. Then it never stops.
- The horror escalates through action: a door that won't open, a message that shouldn't exist, a person behaving impossibly. Characters are forced to move, investigate, flee — never sit and reflect.
- Dialogue ratio: 40-50%. Characters talk normally while everything goes wrong. The contrast is the terror. Arguments about what to do next are where the fear lives.
- Never describe the monster/threat in full. What the characters can't see or understand is scarier than what they can.
- Body horror and dread are conveyed in one line, then the scene moves. No lingering.
`;

const GENRE_STYLE_ROMANCE = `
### Writing Style: ROMANCE / EMOTIONAL DRAMA
The excitement is emotional collision — two people who want incompatible things forced into proximity, making choices that change everything.
- Every scene must shift the relationship: closer, further, or sideways into new territory. Static scenes are cut.
- Dialogue ratio: 55-65%. The relationship lives in what people say and don't say. Rapid-fire exchanges, unfinished sentences, the line that lands like a punch.
- Conflict is the engine. Desire alone is not a scene. Desire + obstacle + a choice that costs something = a scene.
- Internal monologue is brief and honest — one gut-punch line of what the character actually feels, then back to action and dialogue.
- Grand gestures earn their weight only if preceded by real cost. No easy declarations.
`;

const GENRE_STYLE_COMEDY = `
### Writing Style: COMEDY / ABSURDIST
The excitement is catastrophic escalation. A small misunderstanding becomes an avalanche, and every attempt to fix it makes it worse.
- Pacing is everything. Set up → absurdity → escalation → peak chaos, in rapid succession. Never let a joke breathe too long.
- Dialogue ratio: 60-70%. Comedy is timing, timing is dialogue. Characters talk past each other magnificently. Each person is having a different conversation.
- The narrator is deadpan at peak chaos. No winking at the audience. State the absurd as fact.
- Characters are funny because they're competent people in incompatible situations, not because they're stupid. The humor is structural, not mockery.
- Never explain the joke. If you wrote "which was, of course, absurd" — delete it.
`;

const GENRE_STYLE_LITERARY = `
### Writing Style: SLICE-OF-LIFE / LITERARY FICTION
The excitement is emotional revelation — the moment a character sees their life clearly, and it changes them.
- Every scene builds toward a single honest moment. Get there fast. No circular reflection.
- Dialogue ratio: 35-45%. Conversation opens into unexpected depth, then closes. Characters say one true thing surrounded by small talk.
- Ordinary events carry weight because of what the character brings to them — history, regret, hope. But convey this through action and choice, not long internal passages.
- Specificity over poetry. A concrete memory in one sentence beats a paragraph of mood.
- Keep moving between locations and encounters. Literary does not mean slow. Quiet intensity, rapid progression.
`;

const GENRE_STYLE_ADVENTURE = `
### Writing Style: EXPLORATION / ADVENTURE
The excitement is discovery — each new place, creature, or culture is a problem to solve, a wonder to survive, or a mystery to crack.
- Every location is an encounter, not a postcard. Something happens the moment the characters arrive. The world acts on them.
- Dialogue ratio: 30-40%. Companions react, argue about the path, warn each other. Discovery is processed through conversation, not contemplation.
- One striking detail per new place — then action. The jungle isn't described; it's what attacks from the jungle that matters.
- The journey has momentum: each destination leads to the next through consequence, not just geography. Arriving somewhere should raise the stakes, not reset them.
- Wonder is earned through danger. The beautiful thing is also the dangerous thing.
`;

// ─────────────────────────────────────────────
// Genre Normaliser + Style Selector
// ─────────────────────────────────────────────

function normaliseGenre(genre: string): string {
  const g = genre.toLowerCase().trim();
  if (g.includes("fantasy") || g.includes("epic") || g.includes("magic"))
    return "fantasy";
  if (
    g.includes("sci") ||
    g.includes("scifi") ||
    g.includes("science fiction") ||
    g.includes("space")
  )
    return "scifi";
  if (
    g.includes("mystery") ||
    g.includes("thriller") ||
    g.includes("detective") ||
    g.includes("crime") ||
    g.includes("noir")
  )
    return "mystery";
  if (
    g.includes("horror") ||
    g.includes("gothic") ||
    g.includes("supernatural")
  )
    return "horror";
  if (g.includes("romance") || g.includes("drama") || g.includes("emotional"))
    return "romance";
  if (
    g.includes("comedy") ||
    g.includes("absurd") ||
    g.includes("humour") ||
    g.includes("humor") ||
    g.includes("satire")
  )
    return "comedy";
  if (
    g.includes("literary") ||
    g.includes("slice") ||
    g.includes("contemporary")
  )
    return "literary";
  if (g.includes("adventure") || g.includes("exploration")) return "adventure";
  return "literary";
}

function getGenreStyleBlock(genre: string): string {
  const normalised = normaliseGenre(genre);
  if (normalised === "fantasy") return GENRE_STYLE_FANTASY;
  if (normalised === "scifi") return GENRE_STYLE_SCIFI;
  if (normalised === "mystery") return GENRE_STYLE_MYSTERY;
  if (normalised === "horror") return GENRE_STYLE_HORROR;
  if (normalised === "romance") return GENRE_STYLE_ROMANCE;
  if (normalised === "comedy") return GENRE_STYLE_COMEDY;
  if (normalised === "literary") return GENRE_STYLE_LITERARY;
  if (normalised === "adventure") return GENRE_STYLE_ADVENTURE;
  return GENRE_STYLE_LITERARY;
}

// ─────────────────────────────────────────────
// System Prompt Builder
// ─────────────────────────────────────────────

function buildSystemInstruction(
  storyTitle: string,
  storyGenre: string,
  worldContext?: string,
  storyArc?: string,
): string {
  const worldContextBlock = worldContext
    ? `\n## STORY BIBLE (Immutable Canon)\n${worldContext}\n`
    : "";
  const storyArcBlock = storyArc
    ? `\n## NARRATIVE ARC GUIDANCE\nThis guidance describes the intended shape of the early story. Use it as a compass, not a script — the reader's choices drive the actual path.\n${storyArc}\n`
    : "";
  const genreStyleBlock = getGenreStyleBlock(storyGenre);
  return `You are a master interactive fiction writer. Your output is not a summary of what happens — it is the actual literary experience of it happening. The reader is not being told a story. They are inside one.

Every scene you write must do three things simultaneously:
1. Honour the choice — make it feel real, immediate, and consequential
2. Advance the story — something must change, deepen, or be revealed
3. Leave the reader wanting — end at the edge of what comes next

STORY: "${storyTitle}" (Genre: ${storyGenre})
${worldContextBlock}${storyArcBlock}
## GENRE-SPECIFIC WRITING STYLE
${genreStyleBlock}
## UNIVERSAL PROSE RULES
${UNIVERSAL_PROSE_RULES}`;
}

// ─────────────────────────────────────────────
// Story Memory Builder
// Builds the COMPLETE, uncompressed narrative history.
// Every turn summary is kept in full — no truncation.
// This is the primary mechanism preventing story amnesia.
// ─────────────────────────────────────────────

function buildStoryMemoryBlock(storyState: StoryState | null): string {
  const summaries: string[] = storyState?.narrativeSummary ?? [];
  if (!storyState || summaries.length === 0) return "";

  // Each summary is ground truth; dropping any risks continuity failures.
  const memoryLines = summaries.map((s, i) => `[Turn ${i + 1}]: ${s}`);

  const choiceHistory = (storyState.choicesMade ?? [])
    .map((c) => `Turn ${c.turn}: "${c.label}"`)
    .join(" → ");

  return `## ═══ COMPLETE STORY HISTORY ═══
CRITICAL: Everything below has already happened. Do NOT contradict, forget, reinterpret, or reset any of it.
Characters must remember prior events. The world must reflect all prior changes. If a character was hurt, they are still hurt. If information was revealed, the protagonist knows it.

${memoryLines.join("\n\n")}

CHOICE TRAIL: ${choiceHistory || "none yet"}
CURRENT RELATIONSHIP STATES: ${JSON.stringify(storyState.relationshipStates ?? {})}
PLANTED THREADS (must be honoured): ${(storyState.plantedThreads ?? []).join("; ") || "none yet"}
ACTIVE TENSIONS (keep alive unless resolved): ${(storyState.activeTensions ?? []).join("; ") || "none"}
═══════════════════════════════════════

`;
}

// ─────────────────────────────────────────────
// Conclusion Masterclass Block
//
// Injected when the story is approaching or at its conclusion window.
// Tells the AI exactly what a great ending looks like — with reference to
// specific literary techniques used by master authors.
// ─────────────────────────────────────────────

function buildConclusionBlock(
  plantedThreads: string[],
  activeTensions: string[],
  healthScore: number,
  isForced: boolean,
): string {
  const threadList =
    plantedThreads.length > 0
      ? plantedThreads.map((t, i) => `   ${i + 1}. ${t}`).join("\n")
      : "   (honour the tensions and questions the story has established)";

  const tensionList =
    activeTensions.length > 0
      ? activeTensions.map((t, i) => `   ${i + 1}. ${t}`).join("\n")
      : "   (resolve or meaningfully leave open the story's central conflict)";

  const toneGuidance =
    healthScore >= 8
      ? "ENDING TONE: SPECTACULAR TRIUMPH. Everything the protagonist fought for is realised — surpassing what they hoped. The world is genuinely better because of their choices."
      : healthScore >= 4
        ? "ENDING TONE: EARNED VICTORY. The protagonist succeeds, but at real cost. Something was sacrificed or lost along the way. The win is meaningful precisely because of what it cost."
        : healthScore >= 1
          ? "ENDING TONE: BITTERSWEET. Partial success. The goal was reached in some form, but something important was permanently lost. The protagonist is changed — not just by winning, but by what winning required."
          : healthScore === 0
            ? "ENDING TONE: AMBIGUOUS. Neither victory nor defeat. The world is different, the protagonist is different, but whether that difference was worth it is left open. The reader decides."
            : healthScore >= -3
              ? "ENDING TONE: PARTIAL FAILURE. The goal was missed, but the protagonist survives. What remains is not what they set out to achieve, but it is something real."
              : healthScore >= -7
                ? "ENDING TONE: SIGNIFICANT LOSS. The protagonist bears the weight of their choices. What was lost cannot be recovered. The ending is honest about the cost."
                : "ENDING TONE: CATASTROPHIC. Everything unravels. The protagonist faces the full consequence of the path they took. Do not soften it.";

  const forceNote = isForced
    ? "\n⚠ FORCED CONCLUSION: The story has reached its maximum length. You MUST set isEnding: true. Write the concluding scene now — do not present new choices.\n"
    : "\nThe story has reached its natural conclusion window. Set isEnding: true when the scene reaches its dramatic endpoint.\n";

  return `
## ★ STORY CONCLUSION — WRITE LIKE A MASTER AUTHOR ★
${forceNote}
${toneGuidance}

A great ending is EARNED, SPECIFIC, and RESONANT. It does ALL of the following:

1. CALLS BACK — The final image consciously echoes something from early in the story. A detail, object, or phrase that has now changed meaning. The reader should feel the whole story click together.

2. HONOURS EVERY THREAD — Each planted thread below must be addressed (resolved, subverted, or given meaningful non-resolution — but NOT ignored):
${threadList}

3. RESOLVES THE ACTIVE TENSIONS:
${tensionList}

4. SHOWS CHARACTER CHANGE — The protagonist is different from who they were at the start. Do not state this. Show it in a specific action, observation, or choice in the final scene.

5. THE FINAL IMAGE IS CONCRETE AND SPECIFIC — End on a precise, physical detail that carries emotional weight. Not: "She finally felt free." Yes: "She left the coat on the hook. She didn't need it anymore."

6. THE LAST SENTENCE IS MEMORABLE — It should land with weight. Reread it. It is the last thing the reader will carry with them.

WHAT GREAT ENDINGS LOOK LIKE (use as compass, not template):
- Cormac McCarthy: A single ordinary action carrying the accumulated weight of everything before it. Minimal. The understatement IS the devastation.
- Ursula K. Le Guin: The protagonist finally understands something they couldn't at the start — shown through one quiet, specific action.
- Gillian Flynn: The final moment reframes everything the reader thought they understood. A revelation that makes you reconsider the whole journey.
- Raymond Chandler: Not triumph — a reckoning with what survival actually costs. The protagonist walks away, but something has been permanently spent.
- Kazuo Ishiguro: The protagonist faces what they've lost or given up with a kind of quiet, clear-eyed acknowledgment. No self-pity. Just the truth.

TECHNICAL REQUIREMENTS:
- Set isEnding: true
- Return an EMPTY choices array — []
- Prose: 350-700 words — dense, purposeful, no filler
- Do NOT summarise the story in the conclusion
- Do NOT write "The End" or any equivalent
- Do NOT tie every thread into a neat bow — earned ambiguity is better than false resolution
`;
}

// ─────────────────────────────────────────────
// Standby Ending Guidance
//
// Injected on every turn once the story is past the minimum floor (12+)
// but before the approaching window. It does NOT tell the AI to end —
// it tells the AI *how* to end well IF the narrative calls for it this turn.
// The AI remains completely free to continue the story instead.
// ─────────────────────────────────────────────

function buildStandbyEndingGuidance(
  plantedThreads: string[],
  activeTensions: string[],
  healthScore: number,
): string {
  const threadList =
    plantedThreads.length > 0
      ? plantedThreads.map((t, i) => `   ${i + 1}. ${t}`).join("\n")
      : "   (the story's established tensions)";

  const toneGuidance =
    healthScore >= 8
      ? "spectacular triumph — everything fully realised"
      : healthScore >= 4
        ? "earned victory — success with real costs"
        : healthScore >= 1
          ? "bittersweet — partial win, something lost"
          : healthScore === 0
            ? "ambiguous — neither victory nor defeat"
            : healthScore >= -3
              ? "partial failure — goal missed, survival remains"
              : healthScore >= -7
                ? "significant loss — lasting consequences"
                : "catastrophic — everything unravels";

  return `
## IF THIS SCENE ENDS THE STORY — CONCLUSION GUIDELINES
You may continue the story OR set isEnding: true if the narrative has reached a genuinely satisfying stopping point (a climax, a resolution, or a consequence so final it closes the story). Do not end prematurely — only end if this moment earns it.

IF you set isEnding: true this turn, follow these rules:
- Ending tone (based on current health score): ${toneGuidance}
- Call back to something from early in the story — a detail or image that has now changed meaning
- Honour these planted threads:
${threadList}
- End on a SPECIFIC, CONCRETE final image — not a thematic statement
- The last sentence must carry weight. Reread it before you finish.
- Return an EMPTY choices array — []
- Prose: 350–700 words — no padding, no summary of events

If the story is not at a natural stopping point, ignore this block entirely and continue.
`;
}

// ─────────────────────────────────────────────
// Dynamic User Message
// ─────────────────────────────────────────────

// Absolute maximum choices — the story NEVER exceeds this regardless of anything else.
const HARD_CHOICE_CAP = 40;

function buildUserMessage(
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  storyState: StoryState | null,
  totalWordCount: number,
  forceEndingByWords: boolean,
  choiceCount: number = 0,
  targetEndingChoices: number = 25,
  forceEndingByChoices: boolean = false,
): string {
  const healthScore = storyState?.storyHealthScore ?? 0;
  const storyMemoryBlock = buildStoryMemoryBlock(storyState);

  const stateBlock = `## STORY STATE
Turn: ${nodeIndex + 1} | Story Health Score: ${healthScore} | Total words: ${totalWordCount} | Choices made: ${choiceCount} / ${HARD_CHOICE_CAP} (hard cap)`;

  const isForced = forceEndingByWords || forceEndingByChoices;
  // Approaching: within 5 choices of the dynamic target (fires at 20–30 depending on story complexity)
  // e.g. target=25 → approaching at 20+; target=35 → approaching at 30+
  const isApproaching = !isForced && choiceCount >= targetEndingChoices - 5;
  // Standby: past the minimum floor but not yet approaching — ending possible if narrative calls for it
  const isStandby =
    !isForced && !isApproaching && choiceCount >= MINIMUM_CHOICES_BEFORE_ENDING;

  const plantedThreads = storyState?.plantedThreads ?? [];
  const activeTensions = storyState?.activeTensions ?? [];

  let endingBlock = "";
  if (isForced || isApproaching) {
    // Full conclusion masterclass — steer hard toward ending
    endingBlock = buildConclusionBlock(
      plantedThreads,
      activeTensions,
      healthScore,
      isForced,
    );
  } else if (isStandby) {
    // Lightweight standby guidance — only fires if the AI is ending naturally
    endingBlock = buildStandbyEndingGuidance(
      plantedThreads,
      activeTensions,
      healthScore,
    );
  }

  const continuityCheck =
    storyState && storyState.turn > 0
      ? `\n## BEFORE YOU WRITE — CONTINUITY CHECKLIST
  - PLOT MOMENTUM: Does this scene advance the OVERARCHING quest? If the character is stuck in the same combat, argument, or location as last turn, you MUST resolve it now and push the narrative forward.
  - Every character named in the Story History above must behave consistently with their established state.
  - Any information the protagonist has learned is still known to them.
  - Physical conditions (injuries, resources, location) carry forward from prior turns.
  - Planted threads from the Story History should be acknowledged or advanced, not ignored.
  - The scene must feel like a continuation of a single coherent story, not a fresh start.\n`
      : "";

  return `${stateBlock}

${storyMemoryBlock}## PREVIOUS SCENE:
${previousContext}

## THE READER CHOSE: "${choiceMade}"
${continuityCheck}${endingBlock}
Write scene ${nodeIndex + 1} now. Begin directly with the consequence of the choice — do not recap or summarise what just happened.`;
}

// ─────────────────────────────────────────────
// Exponential Backoff Retry Wrapper
// ─────────────────────────────────────────────

async function executeWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      if (error.status === 429 || error.status >= 500) {
        if (attempt >= maxRetries) throw error;
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        logger.warn(
          { attempt, delay },
          "API Rate limited or Server Error. Retrying...",
        );
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded");
}

// ─────────────────────────────────────────────
// Health score delta from choice consequenceType
//
// "spectacular" (+5) mirrors "catastrophic" (-5) symmetrically.
// Choice deltas are intentionally moderate — the narrative delta
// (reported separately by the AI per turn) handles additional swings.
// ─────────────────────────────────────────────

export function healthScoreDelta(consequenceType: string | undefined): number {
  switch (consequenceType) {
    case "spectacular":
      return 5;
    case "good":
      return 2;
    case "neutral":
      return 0;
    case "bad":
      return -2;
    case "catastrophic":
      return -5;
    default:
      return 0;
  }
}

// ─────────────────────────────────────────────
// Dynamic Ending Window Calculator
//
// Stories should end when they feel COMPLETE, not at a fixed count.
// Complexity = number of planted threads + active tensions.
// A simple story (few threads) ends around 20–22 choices.
// A rich, multi-threaded story earns up to 35.
// The target never exceeds 35 — the hard cap of 40 is the absolute ceiling.
// The target is never reduced once set — complexity only grows.
// ─────────────────────────────────────────────

function computeDynamicTargetEndingChoices(
  plantedThreads: string[],
  activeTensions: string[],
  currentTarget: number,
): number {
  const planted = plantedThreads.length;
  const tensions = activeTensions.length;
  // Base 20 + 1 per planted thread + 1 per active tension, capped at 35
  const computed = Math.max(20, Math.min(35, 20 + planted + tensions));
  // Never reduce the target once set — complexity only grows
  return Math.max(computed, currentTarget);
}

// ─────────────────────────────────────────────
// Shared Result Builder
// ─────────────────────────────────────────────

// Minimum choices before isEnding: true is honoured for regular choices.
// Free-will choices bypass this entirely — "shoot yourself" at turn 2 ends the story.
const MINIMUM_CHOICES_BEFORE_ENDING = 12;

function buildGeneratedSegment(
  parsed: any,
  choiceMade: string,
  nodeIndex: number,
  currentStoryState: StoryState | null,
  chosenConsequenceType?: string,
  isFreeWillChoice: boolean = false,
): GeneratedSegment {
  const turnNumber = nodeIndex + 1;
  const prevScore = currentStoryState?.storyHealthScore ?? 0;

  // ── Health score: two components ─────────────────────────────────────────
  // 1. Choice delta: from the consequenceType of the choice the player made
  const choiceDelta = healthScoreDelta(chosenConsequenceType);
  // 2. Narrative delta: from what actually happened in the scene (AI-reported)
  //    Clamped to -3..+3 to prevent abuse; defaults to 0 if not provided
  const rawNarrativeDelta = parsed.storyStateUpdate?.narrativeHealthDelta ?? 0;
  const narrativeDelta = Math.max(-3, Math.min(3, rawNarrativeDelta));
  const newScore = prevScore + choiceDelta + narrativeDelta;

  // ── Narrative memory ──────────────────────────────────────────────────────
  // Append AI-generated scene summary to rolling memory.
  // This prevents context loss across long stories.
  const newSummary =
    parsed.sceneSummary ?? `Turn ${turnNumber}: Player chose "${choiceMade}".`;
  const updatedNarrativeSummary = [
    ...(currentStoryState?.narrativeSummary ?? []),
    newSummary,
  ];

  // ── Dynamic ending window ─────────────────────────────────────────────────
  const updatedPlantedThreads = [
    ...(currentStoryState?.plantedThreads ?? []),
    ...(parsed.storyStateUpdate?.plantedThreads ?? []),
  ];
  const updatedActiveTensions = parsed.storyStateUpdate?.activeTensions ?? [];
  const newTargetEndingChoices = computeDynamicTargetEndingChoices(
    updatedPlantedThreads,
    updatedActiveTensions,
    currentStoryState?.targetEndingChoices ?? 0,
  );

  // ── Ending guard ──────────────────────────────────────────────────────────
  // Free-will choices bypass the minimum entirely — if a player types "shoot
  // yourself" or any action that definitively closes the story, the AI's
  // isEnding: true is always honoured regardless of how many turns have passed.
  // For regular choices the minimum floor (12) still applies to prevent the AI
  // from wrapping up before the story has had room to breathe.
  const choicesSoFar = (currentStoryState?.choicesMade?.length ?? 0) + 1;
  const endingAllowed =
    isFreeWillChoice || choicesSoFar >= MINIMUM_CHOICES_BEFORE_ENDING;
  const isEnding = endingAllowed && (parsed.isEnding ?? false);

  const updatedStoryState: StoryState = {
    turn: turnNumber,
    storyHealthScore: newScore,
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
    plantedThreads: updatedPlantedThreads,
    activeTensions: updatedActiveTensions,
    narrativeSummary: updatedNarrativeSummary,
    targetEndingChoices: newTargetEndingChoices,
  };

  const choices: Choice[] = isEnding
    ? []
    : (parsed.choices ?? []).map((c: any) => ({
        id: c.id,
        text: c.text,
        consequence: c.consequence,
        consequenceType: c.consequenceType,
      }));

  return {
    narrativeText: parsed.narrativeText,
    choices,
    isEnding,
    storyState: updatedStoryState,
  };
}

// ─────────────────────────────────────────────
// Main Generator
// ───────────────────s��─────────────────────────

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
  const forceEndingByWords = totalWordCount >= 40000;

  const choiceCount = currentStoryState?.choicesMade?.length ?? 0;
  const targetEndingChoices = currentStoryState?.targetEndingChoices ?? 25;
  // Force-end at the absolute hard cap — story never exceeds 40 choices
  const forceEndingByChoices = choiceCount >= HARD_CHOICE_CAP;

  const systemInstruction = buildSystemInstruction(
    storyTitle,
    storyGenre,
    story?.worldContext,
    story?.storyArc,
  );
  const userMessage = buildUserMessage(
    previousContext,
    choiceMade,
    nodeIndex,
    currentStoryState,
    totalWordCount,
    forceEndingByWords,
    choiceCount,
    targetEndingChoices,
    forceEndingByChoices,
  );

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
      "Gemini generation successful",
    );

    const parsed = JSON.parse(response.text);
    return buildGeneratedSegment(
      parsed,
      choiceMade,
      nodeIndex,
      currentStoryState,
      chosenConsequenceType,
      false,
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
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title ?? storyIdOrTitle;
  const storyGenre = story?.genre ?? genre;
  const forceEndingByWords = totalWordCount >= 47000;

  const choiceCount = currentStoryState?.choicesMade?.length ?? 0;
  const targetEndingChoices = currentStoryState?.targetEndingChoices ?? 25;
  // Force-end at the absolute hard cap — story never exceeds 40 choices
  const forceEndingByChoices = choiceCount >= HARD_CHOICE_CAP;

  const isFreeWill = choiceId === "free-will";
  const effectiveChoiceMade = isFreeWill
    ? `The reader invented their own action: "${choiceMade}". Treat this as a fully consequential player decision and honour it directly in the narrative.`
    : choiceMade;

  const systemInstruction = buildSystemInstruction(
    storyTitle,
    storyGenre,
    story?.worldContext,
    story?.storyArc,
  );
  const userMessage = buildUserMessage(
    previousContext,
    effectiveChoiceMade,
    nodeIndex,
    currentStoryState,
    totalWordCount,
    forceEndingByWords,
    choiceCount,
    targetEndingChoices,
    forceEndingByChoices,
  );

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
      isFreeWill,
    );
  } catch (err) {
    logger.error({ err }, "Fatal error streaming story segment");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Cleanup (kept to prevent breaking imports)
// ─────────────────────────────────────────────

export async function deleteStoryCaches(_storyKeys?: string[]): Promise<void> {
  logger.info(
    "Explicit caching removed; implicit caching active. No manual cleanup needed.",
  );
}
