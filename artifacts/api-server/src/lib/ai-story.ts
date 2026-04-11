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
  // Rolling narrative summary — the ground truth of what has happened
  narrativeSummary: string[];
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
              "The likely consequence type of this choice: 'good', 'neutral', 'bad', or 'catastrophic'",
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
// Context Truncation Helper
// Limits raw scene text passed as "previous context" so it
// cannot overwhelm the structured story-memory summaries.
// The summaries are ground truth; the raw text is just
// tonal/atmospheric reference for the previous beat.
// ─────────────────────────────────────────────
function truncateContext(context: string, maxWords: number = 450): string {
  const words = context.split(/\s+/);
  if (words.length <= maxWords) return context;
  return (
    words.slice(0, maxWords).join(" ") +
    "\n\n[Scene truncated — the complete sequence of events is recorded in the STORY HISTORY above.]"
  );
}
// ─────────────────────────────────────────────
// Universal Prose Rules (injected for ALL genres)
// ─────────────────────────────────────────────
const UNIVERSAL_PROSE_RULES = `
### Universal Prose Rules (Apply across ALL genres, always)
PACING: FAST, FORWARD, NO FILLER
Write tight, propulsive prose. Every paragraph must advance the plot.
- Lead with action and dialogue. Cut scene-setting to 1-2 sentences max.
- Skip atmospheric filler, sensory catalogues, and descriptive padding entirely.
- No slow establishment. Drop the reader into the middle of what's happening.
- Short punchy scenes are preferred. Never pad a scene to fill space.
- If a paragraph doesn't change the situation, cut it.
CONSEQUENCE SPECIFICITY
The feeling that what happened could only have happened because of the choice the reader made. If they had chosen differently, this scene must be genuinely different — not a different line of dialogue, but a genuinely different situation.
Every scene must contain at least one unexpected element:
- A character reacting differently than expected
- New information that recontextualises something earlier
- A side effect of the choice that wasn't obvious
- A detail from the world that suddenly becomes important
READER CHARACTER AGENCY
- NEVER perform any high-stakes action on behalf of the reader's character
- The prose shows ONLY: consequences of the choice made, other characters' reactions, world changes, revelations, backstory
- The reader's character may move, speak, or act ONLY as a direct mechanical consequence of the choice made — never beyond it
SENTENCE RHYTHM
Vary sentence length deliberately.
SECOND PERSON, PRESENT TENSE
Throughout. "You step into the corridor" not "She stepped."
### Dynamic Prose Length
Prose length ranges from 1 word to 1500 words. Choose based on narrative need. Shorter is almost always better.
1-50 words: Sudden revelations, shocking consequences, moments of pure impact
100-400 words: Standard scenes — the default. Action and dialogue drive the scene forward.
500-1500 words: Only for scenes with multiple simultaneous developments or major turning points. Even long scenes must maintain relentless momentum — no atmospheric padding.
Never pad to meet a minimum. Default to shorter, punchier scenes.
### Choice Placement Rules (STRICT)
Choices must ONLY appear at high-stakes, irreversible decision points — moments where the reader's choice will send the story down genuinely different paths.
WHEN TO PRESENT CHOICES:
- Life-or-death moments
- Moral dilemmas with no clear right answer
- Irreversible commitments that close off other paths
- Betrayals, alliances, sacrifices — moments that reshape the story
WHEN TO NEVER PRESENT CHOICES:
- Routine decisions (which door to open, who to talk to first, how to greet someone)
- Mid-conversation lulls or scene transitions
- Moments where all options lead to roughly the same outcome
- Low-stakes preferences or cosmetic decisions
STAKES TEST: Before presenting choices, ask: "If the reader chose differently, would the story change in a meaningful, lasting way?" If not, skip the choice and keep the story moving forward.
The story should flow through several beats of action, dialogue, and consequence before arriving at a genuine fork. Do NOT stop the momentum for trivial decisions.
### Dynamic Story Endings
Stories do NOT end at a fixed turn count. Set isEnding: true when the story reaches a dramatically satisfying stopping point.
When isEnding is true, provide no choices (empty array).
Ending tone is calibrated by story health score:
- Score >= +8: spectacular win — everything the reader fought for is realised
- Score +4 to +7: good outcome — meaningful success with some costs
- Score +1 to +3: mixed result — partial win, something important was lost
- Score 0: ambiguous — neither victory nor defeat, open to interpretation
- Score -1 to -3: partial failure — the goal was missed, but survival remains
- Score -4 to -7: bad outcome — significant loss, lasting consequences
- Score <= -8: catastrophic loss — everything unravels, total defeat
### What to Avoid
- Recapping the previous scene. Start with what happens next.
- Telling the reader how they feel.
- Resolving tension too quickly.
- Generic world details that could appear in any story.
- Choices that are really the same choice with different adjectives.
- Choices that ignore the current scene.
- Acting on behalf of the reader beyond what their choice dictated.
- Long descriptions before a character speaks. Get to the dialogue.
- Explaining what the dialogue means. Trust the reader.
- Characters who exist only to deliver information. Every character must want something.
- Lengthy sensory descriptions, atmospheric padding, or scene-setting monologues.
- Stopping the story for trivial or low-stakes choices.
`;
// ─────────────────────────────────────────────
// Genre-Specific Writing Style Blocks
// ─────────────────────────────────────────────
const GENRE_STYLE_FANTASY = `
### Writing Style: FANTASY / EPIC ADVENTURE
Inspired by: Brandon Sanderson (world mechanics), Ursula K. Le Guin (mythic weight)
Techniques:
- Sanderson-style dialogue: Functional, character-revealing through problem-solving. Characters argue about HOW to do things, not just WHAT. Banter is earned by competence.
- Le Guin-style interiority: The protagonist's inner life has philosophical texture. They notice things because of who they are, not just for plot reasons.
- One sharp detail per scene to ground the world — then move on. No lingering descriptions.
Pacing: Hit the ground running. World-building is delivered through action and dialogue, never through description blocks. Every scene escalates.
Dialogue ratio: 30-40%.
Watch for: Never interrupt a tense moment to explain how the magic works. Earn exposition in calm moments.
THE DIALOGUE IMPERATIVE
Dialogue is the story. Description is scaffolding — keep it minimal.
Characters interrupt. They don't finish. They answer a different question than the one asked.
Use action beats instead of dialogue tags: not "she said thoughtfully" but [She turned the cup in her hands before answering.]
Do not describe a room for more than 2 sentences before someone speaks.
Example voice:
"The ward's holding," Asha said, pressing two fingers to the stone. "Barely."
"Define barely."
She looked at you. "Another hour. Maybe less if he pushes."
Outside, the sound that wasn't quite wind scraped against the walls.
"So we have one hour," you said.
"We have one hour if he doesn't know we're here." She pulled her hand back. Her fingertips were faintly blue. "He knows."
`;
const GENRE_STYLE_SCIFI = `
### Writing Style: SCIENCE FICTION
Inspired by: Philip K. Dick (paranoia and reality), N.K. Jemisin (second-person as alienation)
Techniques:
- Dick-style interiority: The protagonist questions what is real. Internal monologue is fractured, doubtful, urgent.
- Jemisin-style second person: Use the "you" voice to create dissociation — uncertain of their own choices.
- Tech and systems are introduced through what characters argue about, never through narration or exposition dumps.
Pacing: Procedural surface, urgency underneath. Every scene reveals something wrong. Move fast — don't dwell on tech descriptions or world-building tangents.
Dialogue ratio: 35-45%.
Watch for: Characters who exist only to deliver world-building. Every named character must want something that isn't just to explain the setting.
THE DIALOGUE IMPERATIVE
Characters lie, deflect, joke when they shouldn't, go quiet when words are expected.
Subtext is everything. What a character doesn't say is usually more important than what they do.
NO on-the-nose exposition in dialogue. If a character says "As you know, the system has been offline for three days..." — rewrite it.
Example voice:
The readout said 0.0 anomalies. It had said 0.0 anomalies yesterday, and the day before. You had started to find this suspicious.
"You're overthinking it," Rei said, without looking up.
"The system flagged nothing for eleven days straight."
"That means it's working."
"Or it means it stopped checking." You pulled up the raw feed. Numbers that looked normal. Numbers that looked too normal. "Rei. When did you last run a manual sweep?"
She was quiet for exactly one second too long.
`;
const GENRE_STYLE_MYSTERY = `
### Writing Style: MYSTERY / THRILLER
Inspired by: Gillian Flynn (psychological intimacy), Raymond Chandler (hardboiled voice)
Techniques:
- Flynn-style unreliable interiority: The protagonist's inner voice is their best weapon and greatest liability. They notice things others miss — but their interpretations may be wrong.
- Chandler-style dialogue: Clipped, rhythmic, charged. Every line should have a subterranean current. People are always saying less than they mean.
- One telling detail per character or scene — then move on. No slow social catalogues.
Pacing: Relentless forward pressure. Clues drop mid-action. Every scene tightens the noose.
Dialogue ratio: 40-55%. Two characters talking past each other is a clue in itself.
Watch for: Never TELL the reader something is suspicious. Show it. Let the reader feel it before the character names it.
THE DIALOGUE IMPERATIVE
Dialogue is where clues live. Characters lie, deflect, give half-answers.
Use action beats: not "he said nervously" but [He straightened the pen on the desk twice before answering.]
Subtext is everything. The gap between what is said and what is meant IS the mystery.
Example voice:
"I was home all night," she said. "I already told the other detective."
"I know. I read the statement." You set your coffee down. "You said you ordered delivery at nine-fifteen. The app shows you cancelled it at nine-oh-eight."
She looked at the table.
"So." You left space.
"I changed my mind."
"You changed your mind," you repeated. Not a question. Not yet.
Something moved across her face — too fast to name.
"Is that a crime?"
`;
const GENRE_STYLE_HORROR = `
### Writing Style: HORROR
Inspired by: Shirley Jackson (psychological dread), Stephen King (ordinary rendered monstrous)
Techniques:
- Jackson-style wrongness: The horror is in the detail that doesn't fit. Not monsters — wrongness. A door that opens slightly too slowly. A person who smiles at the wrong moment.
- King-style dialogue: People talk normally while the horror advances. The contrast is the terror.
- The protagonist's body knows before their mind does. One physical sensation — not a catalogue of dread.
Pacing: Brief normalcy, then rapid disorientation. Don't linger in the comfort phase — get to the wrongness fast. Escalate relentlessly.
Dialogue ratio: 40-50%. Normal conversation alongside mounting horror IS the technique.
Watch for: Never describe what is scary. Fear is created by NOT naming the thing. Stop just before the reader fully understands what they're looking at.
THE DIALOGUE IMPERATIVE
Normal conversation alongside mounting horror is THE technique.
People talk about mundane things while something is deeply wrong. This contrast IS the fear.
Never explain what the dialogue means. Never interrupt a frightening moment to annotate it.
Example voice:
"It's probably a pipe," Dev said. He was making tea. He always made tea when he didn't want to think about something.
The sound came again from upstairs. Rhythmic. Patient.
"Pipes don't—"
"Pipes knock. Pipes rattle. Old house." He didn't turn around.
You looked at the ceiling. The sound moved. Slowly. From above the kitchen to above the hall.
"Dev."
"Milk?" he said.
He was still not turning around. You realised, standing there, that he hadn't turned around once since you'd come inside.
`;
const GENRE_STYLE_ROMANCE = `
### Writing Style: ROMANCE / EMOTIONAL DRAMA
Inspired by: Sally Rooney (contemporary interiority), Jane Austen (social subtext)
Techniques:
- Rooney-style dialogue: Unattributed exchanges where the rhythm matters as much as the words. Characters circle what they mean. The relationship lives between the lines.
- Austen-style social observation: Power, propriety, and what is not said. A glance carries as much weight as a speech.
- One physical detail per emotional beat — then back to dialogue. No lyrical tangents.
Pacing: Emotional momentum drives every scene. Tension builds through what characters won't say. Don't linger in description — the urgency is in the conversation.
Dialogue ratio: 55-65%. Relationship stories live and die on how people talk to each other.
Watch for: Never tell the reader what the attraction is. Show a hand that stays a second too long, a sentence that isn't finished, a laugh that comes out wrong.
THE DIALOGUE IMPERATIVE
Characters circle what they mean. They say one thing and mean another. Silence is a response.
After every 2 sentences of description, someone speaks or thinks in direct voice.
Example voice:
"You didn't have to wait," she said.
"I know."
Outside, rain on the glass. The kind that just settles, no drama.
"I thought you'd gone."
"I thought about it."
She looked at you then. Not the way she usually did — quickly, checking — but for a moment that had some real duration to it.
"And?" she said.
You didn't have an answer that wouldn't change everything.
`;
const GENRE_STYLE_COMEDY = `
### Writing Style: COMEDY / ABSURDIST
Inspired by: Terry Pratchett (satirical warmth), Douglas Adams (cosmic absurdism), P.G. Wodehouse (perfect comic timing)
Techniques:
- Pratchett-style observation: Comedy comes from truth. Characters are funny because they are recognisably human in impossible situations.
- Adams-style narrative voice: Deadpan observations at peak chaos. The universe is indifferent, and this is somehow hilarious.
- Wodehouse-style dialogue: Characters talk at cross-purposes magnificently. Misunderstanding escalates — each person responding to a different conversation.
Pacing: Rapid escalation. Introduce absurdity fast, then pile on complications. Never pause to set up atmosphere — the chaos IS the atmosphere.
Dialogue ratio: 60-70%. Comedy is timing. Timing lives in dialogue. Description sets up the joke; dialogue delivers it.
Watch for: NEVER explain the joke. If you feel the urge to write "...which was absurd, because..." — delete it.
THE DIALOGUE IMPERATIVE
60-70% of any scene must be dialogue. Escalation is everything.
NEVER explain the joke. If you write "which was, of course, absurd" — delete it immediately.
Example voice:
"The goat," said the Minister gravely, "is officially a diplomatic incident."
"It ate a hat," you said.
"It ate the Ambassador's hat. There is a difference."
You looked at the goat. The goat looked back at you with the profound disinterest of a creature that has never, in its life, experienced regret.
"Can we just—" you started.
"The hat was a gift from the Prime Minister of—"
"It ate a hat."
"Yes," said the Minister. He sat down. He looked suddenly very tired. "Yes. It did."
`;
const GENRE_STYLE_LITERARY = `
### Writing Style: SLICE-OF-LIFE / LITERARY FICTION
Inspired by: Haruki Murakami (magical realism of the mundane), Alice Munro (compressed revelation)
Techniques:
- Murakami-style dialogue: Casual conversation that suddenly opens into depth without warning. Characters say strange things and nobody comments on them.
- Munro-style compression: Each scene contains an entire relationship history. What is left out is as important as what is included.
- One precise detail per moment — never ornate. Specificity over atmosphere.
Pacing: Compressed and purposeful. Even quiet moments must carry emotional momentum. Every scene should reveal something that changes the reader's understanding.
Dialogue ratio: 30-40%. Dialogue is sparse, but every line lands with full weight.
Watch for: Never mistake vagueness for depth. A specific memory is more moving than a general feeling.
THE DIALOGUE IMPERATIVE
Each line of dialogue should carry more meaning than its surface reading.
Characters say strange things and nobody comments. Conversation opens suddenly into depth, then closes again.
Example voice:
Your mother used to make tea this way — steeped too long, slightly bitter, drunk standing up over the kitchen sink. You didn't know you'd kept the habit until Marcus mentioned it.
"You always do that," he said.
"Do what?"
"Stand." He was sitting at the table with his perfectly correct cup. "You never sit when you drink tea."
You looked at the window. The garden. The specific quality of October light.
"Old habit," you said.
He nodded, and you understood he was filing it away — another piece of you he was learning to read.
`;
const GENRE_STYLE_ADVENTURE = `
### Writing Style: EXPLORATION / ADVENTURE
Inspired by: Ursula K. Le Guin (anthropological wonder), Susanna Clarke (annotated strangeness)
Techniques:
- Le Guin-style encounter: Meeting a new place or culture is treated with genuine curiosity, not judgment.
- Clarke-style strangeness: The world contains things that have simply always been there, with rules no one has explained. Strangeness is matter-of-fact.
- One vivid landscape detail per location — then move to what happens there. No lyrical landscape passages.
Pacing: Discovery drives forward momentum. Each new place or encounter should raise questions or create urgency. Don't linger — explore with purpose, not contemplation.
Dialogue ratio: 25-35%. Companion dialogue punctuates discovery. Internal monologue processes wonder briefly.
Watch for: Never treat scenery as filler. Every described detail must do work — reveal character, carry meaning, plant a thread, or deepen wonder.
THE DIALOGUE IMPERATIVE
Even in exploration stories, dialogue punctuates discovery.
Companion voices respond, question, and reflect back what was found.
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
  return `You are a master interactive fiction writer. Write like a thriller — fast, forward-moving, no filler. Every scene should feel like it's racing toward the next turning point. The reader is not being told a story. They are inside one, and it never slows down.

Every scene you write must do three things simultaneously:
1. Honour the choice — make it feel real, immediate, and consequential
2. Drive the plot forward — something important must happen, change, or be revealed. No padding, no atmosphere-for-atmosphere's-sake.
3. Leave the reader wanting — end at the edge of what comes next, with momentum

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

  // Keep ALL summaries — never compress or truncate.
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
// Dynamic User Message
// ─────────────────────────────────────────────
function buildUserMessage(
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  storyState: StoryState | null,
  totalWordCount: number,
  forceEnding: boolean,
): string {
  const healthScore = storyState?.storyHealthScore ?? 0;
  const storyMemoryBlock = buildStoryMemoryBlock(storyState);

  // Truncate the raw previous-scene text. The structured summaries above are
  // ground truth; the raw text provides only tonal/atmospheric context for
  // the last beat. Keeping it short prevents it from crowding out the memory.
  const trimmedContext = truncateContext(previousContext, 450);

  const stateBlock = `## STORY STATE
Turn: ${nodeIndex + 1} | Story Health Score: ${healthScore} | Total words so far: ${totalWordCount}`;

  const forcingInstruction = forceEnding
    ? `\n\n## ⚠ STORY LIMIT REACHED — CONCLUDE NOW
This story has exceeded ${totalWordCount} words. You MUST set isEnding: true and write a concluding scene. Do not present new choices.`
    : "";

  const continuityCheck =
    storyState && storyState.turn > 0
      ? `\n## BEFORE YOU WRITE — CONTINUITY CHECKLIST
✓ Every character named in the Story History above must behave consistently with their established state.
✓ Any information the protagonist has learned is still known to them.
✓ Physical conditions (injuries, resources, location) carry forward from prior turns.
✓ Planted threads from the Story History should be acknowledged or advanced, not ignored.
✓ The scene must feel like a continuation of a single coherent story, not a fresh start.\n`
      : "";

  return `${stateBlock}

${storyMemoryBlock}## PREVIOUS SCENE (tonal reference — Story History above is the authoritative record):
${trimmedContext}

## THE READER CHOSE: "${choiceMade}"
${continuityCheck}${forcingInstruction}
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
// Health score delta from consequenceType
// ─────────────────────────────────────────────
export function healthScoreDelta(consequenceType: string | undefined): number {
  switch (consequenceType) {
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
// Shared Result Builder
// ─────────────────────────────────────────────
function buildGeneratedSegment(
  parsed: any,
  choiceMade: string,
  nodeIndex: number,
  currentStoryState: StoryState | null,
  chosenConsequenceType?: string,
): GeneratedSegment {
  const turnNumber = nodeIndex + 1;
  const prevScore = currentStoryState?.storyHealthScore ?? 0;
  const delta = healthScoreDelta(chosenConsequenceType);

  // Append the AI-generated scene summary to our rolling narrative memory.
  // This is the mechanism that prevents context loss across long stories.
  const newSummary =
    parsed.sceneSummary ?? `Turn ${turnNumber}: Player chose "${choiceMade}".`;
  const updatedNarrativeSummary = [
    ...(currentStoryState?.narrativeSummary ?? []),
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
    forceEnding,
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
  const forceEnding = totalWordCount >= 47000;

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
    forceEnding,
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
