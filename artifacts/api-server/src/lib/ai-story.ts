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
  narrativeSummary: string[];
  targetEndingChoices?: number;
  // New: tracks whether the AI has signalled narrative readiness to conclude
  narrativeReadyToEnd?: boolean;
  // New: consecutive "neutral" turns — used to nudge story forward
  stalledTurns?: number;
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
    // New field: AI signals when the narrative arc is approaching resolution
    // so the ending window can expand or contract dynamically.
    narrativeReadyToEnd: {
      type: Type.BOOLEAN,
      description:
        "Set true when the story's central conflict is approaching a natural climax or resolution — even if the story is not ending this turn. Used to dynamically adjust the ending window.",
    },
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
    "narrativeReadyToEnd",
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
Prose length ranges from 1 word to 1500 words. Choose based on narrative need.
1-50 words: Sudden revelations, shocking consequences, moments of pure impact
300-700 words: Standard scenes — the default band. Action, dialogue, and plot advancement drive the scene forward. The extra length should come from MORE PLOT PROGRESSION and MORE DIALOGUE, NOT from added sensory detail or atmospheric padding.
800-1500 words: Only for scenes with multiple simultaneous developments or major turning points. Even long scenes must maintain relentless momentum — no atmospheric padding.
Default to the 300-700 range. Use the space to advance the plot further between decision points.
### Choice Placement Rules (STRICT — FEWER CHOICES, MORE STORY)
Choices are RARE. The story should flow through 3–5 beats of significant plot progression between each decision point. Most turns should advance the story WITHOUT presenting choices. Only stop for a choice when the reader's decision would send the story in a genuinely different, irreversible direction.
WHEN TO PRESENT CHOICES (the ONLY acceptable moments):
- Life-or-death moments where survival is at stake
- Moral dilemmas with no clear right answer and permanent consequences
- Irreversible commitments that permanently close off other paths
- Betrayals, alliances, sacrifices — moments that fundamentally reshape the story
WHEN TO AUTO-RESOLVE AND KEEP MOVING (NEVER present choices for these):
- Routine decisions (which door to open, who to talk to first, how to greet someone) — pick the most interesting option and keep writing
- "Which path" or "where to go next" decisions — auto-resolve them
- Mid-conversation lulls or scene transitions — push through them
- Moments where all options lead to roughly the same outcome
- Low-stakes preferences, cosmetic decisions, or exploration choices
- Any decision where the stakes are less than story-altering
MANDATORY AUTO-RESOLVE RULE: If a decision is routine, low-stakes, or merely navigational, you MUST auto-resolve it yourself. Make the most dramatically interesting choice on behalf of the reader and continue the narrative. The reader should only be interrupted for decisions that genuinely matter.
STAKES TEST: Before presenting choices, ask: "If the reader chose differently, would the next 5+ scenes be fundamentally different?" If the answer is no, auto-resolve and keep the story moving.
The story must flow through multiple scenes of action, dialogue, revelation, and consequence before arriving at a genuine fork. Momentum is paramount — do NOT break it for anything less than a story-defining moment.
### Dynamic Story Endings
Stories do NOT end at a fixed turn count. Set isEnding: true ONLY when the story reaches a dramatically satisfying stopping point — meaning:
  - The central conflict has been resolved or irrevocably decided
  - The protagonist has crossed a point of no return
  - All major planted threads have paid off or been deliberately left open for thematic effect
  - The emotional arc of the story has completed
  - At least 8 meaningful choices have been made — a story that ends in fewer choices has not had room to breathe, develop characters, or earn its conclusion
Do NOT end the story prematurely. A free-will action that happens to resolve a surface conflict is NOT a story ending — the deeper threads, relationships, and consequences still need to play out. A story that ends before its threads are resolved is not a satisfying ending — it is an abandoned story. Equally, a story that keeps going after its natural conclusion loses all power. Find the exact right moment.
When isEnding is true, provide no choices (empty array).
Ending tone is calibrated by story health score. Every band — winning or losing — demands the same craft and specificity. A great victory ending is as hard to write as a great tragic one.

WINNING ENDINGS (score positive) — do not soften, rush, or undercut these:
- Score >= +12: LEGENDARY — the protagonist didn't just win; they changed the shape of the world. The ending image should feel mythic. Something that was impossible at the start is now simply true. Write this with the scale of Le Guin or Tolkien's grey havens — earned weight, not triumphalism.
- Score +9 to +11: FULL TRIUMPH — the central goal is achieved completely. The cost was real but worth it. The reader should feel the specific texture of what winning this particular thing actually means. Not generic joy — the exact flavour of THIS victory. Show what the world looks like now that the impossible thing is done.
- Score +6 to +8: HARD-WON SUCCESS — won, but something of real value was spent to get here. The ending holds both things simultaneously: the achievement and the cost. Do not resolve the tension by deciding which one matters more. Let both stand. Think of Frodo at the end of The Lord of the Rings — the Shire is saved, and he can no longer live in it.
- Score +3 to +5: BITTERSWEET VICTORY — the goal was achieved but the protagonist is not the same person who started. Something was permanently altered. The ending image should capture what was gained AND what was irreversibly changed. The reader should feel the gap between who the protagonist was and who they are now.
- Score +1 to +2: NARROW WIN — barely made it. The victory is real but fragile; the world is not saved, only this particular thing, this particular person. The ending should feel like a held breath finally released — not celebration, just survival with meaning.

AMBIGUOUS / TURNING POINT:
- Score 0: AMBIGUOUS — neither victory nor defeat. The ending earns its ambiguity through a single specific, concrete image — not vagueness. The reader should be able to argue for either reading and find evidence for both.

LOSING ENDINGS (score negative) — these must be written with full craft, not dismissed:
- Score -1: PYRRHIC — the battle was won but something essential was lost in the winning. The protagonist got what they fought for, and now stands in the wreckage of what that cost. The ending should show the hollow place where the victory lives.
- Score -2 to -4: PARTIAL FAILURE — the goal was missed; survival remains; the protagonist is changed by the loss. Not destroyed — changed. The ending should show specifically how the world is different, and what the protagonist carries forward.
- Score -5 to -7: BAD OUTCOME — something is broken that cannot be fixed. The ending must name what was lost without melodrama. Show it in a single concrete image. The world continues; the loss is permanent.
- Score <= -8: CATASTROPHIC — everything unravels. This MUST still be written with full literary craft — a great tragic ending, not a dismissal. Think of the closing of 1984 or Blood Meridian. Total defeat can be the most powerful ending of all if it is written with precision and inevitability. The reader should feel that this was always where the story was going.
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
// Literary Ending Craft (injected at conclusion phase)
//
// This block is NOT part of the standing system prompt — it is injected
// dynamically into the user message only when the story is approaching
// or reaching its conclusion. Keeping it out of the cached system prompt
// keeps the cache hit rate high for mid-story turns.
// ─────────────────────────────────────────────
const LITERARY_ENDING_CRAFT = `
## ═══ ENDING CRAFT — HOW GREAT NOVELS END ═══
You are now writing toward (or at) the story's conclusion. Study the techniques below and apply them.

### What separates a memorable ending from a forgettable one
Forgettable endings: summarise what happened, tell the reader how to feel, resolve everything neatly, add a final paragraph explaining the theme.
Memorable endings: arrive at a specific, concrete image or moment that carries all the weight without explanation. The reader understands — they are not told.

### Core techniques (drawn from literature's greatest closings)

**THE RESONANT IMAGE** (Fitzgerald, le Carré, McCarthy)
End on a single concrete image that crystallises the whole story's meaning. Not an explanation — an image.
Fitzgerald ends Gatsby not with a summary of Jay's tragedy but with boats against the current, borne back ceaselessly into the past.
McCarthy ends The Road not with survival statistics but a man's hands in a cold stream and the memory of trout.
Your ending image should: be specific to THIS story, connect back to something established early, carry meaning without stating it.

**THE EARNED REVERSAL** (Austen, Dostoevsky, Ishiguro)
The final beat recontextualises everything that came before. What the reader thought the story was about turns out to be the surface; the final moment reveals the depth.
Ishiguro ends Never Let Me Go not with the tragedy of the clones but with a quiet field and the realisation that everyone — not just the characters — is running out of road.
Use this when the story's true subject is not what it appeared to be on the surface.

**THE UNRESOLVED THREAD AS THEME** (Chekhov, Carver, Morrison)
Not everything resolves. Some endings leave one thread deliberately open — and the open thread IS the meaning.
The thing left unresolved must be the thing that most matters. Chekhov's characters leave rooms that they will never re-enter. The door closing IS the ending.
Use this for ambiguous or bittersweet scores.

**THE COST THAT LANDS LATE** (Hemingway, O'Brien, le Carré)
The ending reveals that the victory (if there was one) cost more than the protagonist understood at the time.
The final moment is not "I won" but "I won, and this is what winning looks like." The reader feels the cost — they are not told about it.
Use this for mixed or pyrrhic outcomes.

**THE CIRCULAR RETURN** (García Márquez, Conrad, Woolf)
The ending returns to an image, phrase, or moment from the opening — but now it carries entirely different weight because of everything that happened between.
The reader recognises the echo and feels the full arc of the story in a single flash. What was innocence is now knowledge. What was hope is now either fulfilment or ruin.
Use this when the story has an established motif or opening image worth returning to.

**THE QUIET AFTER** (Munro, Cheever, Saunders)
After catastrophe or triumph, the world keeps going. The ending shows the ordinary world resuming — and the contrast with what just happened carries all the emotion.
The character makes tea. The sun comes up. A child asks an unrelated question.
The mundane detail after the extraordinary event IS the ending. The reader supplies the grief or the joy.

### Things that kill endings
- The protagonist reflects on what they learned. (Never. Show, do not tell.)
- A final paragraph of summary or explanation.
- Telling the reader the theme.
- Resolving a thread that was more powerful left open.
- A hopeful final line that isn't earned by the story's events.
- Any version of "and so [protagonist] finally understood..."
- Adding new information in the last scene that wasn't planted earlier.

### Length of the ending
Endings are almost always SHORTER than the scenes that precede them.
The climax may be long. The ending — the moment after the climax settles — is usually 150-400 words.
The weight of the ending comes from precision, not length.
Resist the urge to write more. The last image should land and then stop.

### The final sentence
The final sentence of a great story is never accidental. It carries the whole story's weight.
Read it alone. Ask: does it resonate without context? Does it add resonance when the reader has the full context?
Great last lines (paraphrased to avoid reproduction):
- A character alone, doing something small, while something immense has just happened.
- A question that the story has just answered — but not in words.
- A description of the world that is also a description of the character's inner state.
- The specific sensation of an irreversible change.
Write your final sentence knowing it is the last thing the reader will carry with them.
═══════════════════════════════════════════════════════
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
Never explain what the frightening moment means. Never interrupt it to annotate it.
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
): string {
  const worldContextBlock = worldContext
    ? `\n## STORY BIBLE (Immutable Canon)\n${worldContext}\n`
    : "";

  const genreStyleBlock = getGenreStyleBlock(storyGenre);

  return `You are a master interactive fiction writer. Write like a thriller — fast, forward-moving, no filler. Every scene should feel like it's racing toward the next turning point. The reader is not being told a story. They are inside one, and it never slows down.

Every scene you write must do three things simultaneously:
1. Honour the choice — make it feel real, immediate, and consequential
2. Drive the plot forward — something important must happen, change, or be revealed. No padding, no atmosphere-for-atmosphere's-sake.
3. Leave the reader wanting — end at the edge of what comes next, with momentum

STORY: "${storyTitle}" (Genre: ${storyGenre})
${worldContextBlock}
## GENRE-SPECIFIC WRITING STYLE
${genreStyleBlock}
## UNIVERSAL PROSE RULES
${UNIVERSAL_PROSE_RULES}`;
}

// ─────────────────────────────────────────────
// Context Cache Registry
// ─────────────────────────────────────────────
interface CacheEntry {
  name: string;
  expiresAt: number;
}

const systemPromptCacheRegistry = new Map<string, CacheEntry>();
const cacheCreationInProgress = new Map<string, Promise<string | null>>();

const CACHE_TTL_SECONDS = 7200;
const CACHE_REFRESH_BUFFER_MS = 5 * 60 * 1000;

function buildCacheKey(storyIdOrTitle: string, genre: string): string {
  return `${storyIdOrTitle}::${normaliseGenre(genre)}`;
}

async function getOrCreateSystemCache(
  storyIdOrTitle: string,
  genre: string,
  systemInstruction: string,
): Promise<string | null> {
  const key = buildCacheKey(storyIdOrTitle, genre);
  const now = Date.now();

  const existing = systemPromptCacheRegistry.get(key);
  if (existing && existing.expiresAt > now + CACHE_REFRESH_BUFFER_MS) {
    logger.info(
      { key, cacheName: existing.name },
      "Reusing system prompt cache",
    );
    return existing.name;
  }

  const inFlight = cacheCreationInProgress.get(key);
  if (inFlight) {
    logger.info({ key }, "Cache creation in flight — awaiting shared promise");
    return inFlight;
  }

  const creationPromise: Promise<string | null> = (async () => {
    try {
      const cache = await ai.caches.create({
        model: MODEL,
        config: {
          systemInstruction,
          ttl: `${CACHE_TTL_SECONDS}s`,
          displayName: `story-system-${key}`,
        },
      });

      systemPromptCacheRegistry.set(key, {
        name: cache.name!,
        expiresAt: Date.now() + CACHE_TTL_SECONDS * 1000,
      });

      logger.info(
        { key, cacheName: cache.name },
        "System prompt cache created",
      );
      return cache.name ?? null;
    } catch (err) {
      logger.warn(
        { err, key },
        "Cache creation failed — falling back to direct system instruction",
      );
      return null;
    } finally {
      cacheCreationInProgress.delete(key);
    }
  })();

  cacheCreationInProgress.set(key, creationPromise);
  return creationPromise;
}

// ─────────────────────────────────────────────
// Shared config builder
// ─────────────────────────────────────────────
function buildGenerateConfig(
  cachedContentName: string | null,
  systemInstruction: string,
) {
  return {
    ...(cachedContentName
      ? { cachedContent: cachedContentName }
      : { systemInstruction }),
    maxOutputTokens: 6144,
    temperature: 0.9,
    responseMimeType: "application/json",
    responseSchema: storyResponseSchema,
  };
}

// ─────────────────────────────────────────────
// Story Memory Builder
// ─────────────────────────────────────────────
function buildStoryMemoryBlock(storyState: StoryState | null): string {
  const summaries: string[] = storyState?.narrativeSummary ?? [];
  if (!storyState || summaries.length === 0) return "";

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
// Dynamic Ending Window Calculator
//
// Rather than a fixed "end at turn N" cap, the ending window is a range:
//   - EARLIEST the story can naturally end (AI judgement respected after this)
//   - LATEST the story is allowed to continue (hard cap, graceful not abrupt)
//
// The window shifts based on:
//   1. narrativeReadyToEnd signal from the AI (pulls window earlier)
//   2. stalledTurns counter (if score hasn't moved in 4+ turns, push toward end)
//   3. Total word count (very long stories get a tighter window)
//
// The default target is 25-35 choices — enough for a full arc without
// overstaying. Hard cap is 45 to allow genuinely expansive stories room.
// ─────────────────────────────────────────────
const DEFAULT_EARLIEST_END = 15; // never end before this many choices
const DEFAULT_TARGET_END = 28; // natural conclusion zone starts here
const DEFAULT_HARD_CAP = 45; // absolute maximum choices before forced end
const WORD_COUNT_SOFT_CAP = 40000; // soft nudge toward ending
const WORD_COUNT_HARD_CAP = 50000; // absolute word count hard stop

interface EndingWindowResult {
  forceEndingNow: boolean; // must end this turn
  approachingConclusion: boolean; // soft nudge — steer toward ending
  turnsRemaining: number; // how many choices remain before hard cap
}

function calculateEndingWindow(
  choiceCount: number,
  totalWordCount: number,
  storyState: StoryState | null,
): EndingWindowResult {
  const target = storyState?.targetEndingChoices ?? DEFAULT_TARGET_END;
  const hardCap = Math.min(target + 10, DEFAULT_HARD_CAP);

  // ── Hard stops ───────────────────────────────────────────────────────────
  if (totalWordCount >= WORD_COUNT_HARD_CAP || choiceCount >= hardCap) {
    return {
      forceEndingNow: true,
      approachingConclusion: true,
      turnsRemaining: 0,
    };
  }

  const narrativeReady = storyState?.narrativeReadyToEnd ?? false;
  const stalledTurns = storyState?.stalledTurns ?? 0;

  // ── Dynamic target adjustment ────────────────────────────────────────────
  // If the AI has flagged narrative readiness AND we're past the earliest end
  // point, pull the target in so the story doesn't drag.
  let effectiveTarget = target;
  if (narrativeReady && choiceCount >= DEFAULT_EARLIEST_END) {
    // Give up to 5 more choices to reach the natural conclusion.
    effectiveTarget = Math.min(choiceCount + 5, hardCap);
  }

  // If the story has stalled (score flat for 4+ consecutive turns) and we're
  // past the earliest end, push gently toward resolution.
  if (stalledTurns >= 4 && choiceCount >= DEFAULT_EARLIEST_END) {
    effectiveTarget = Math.min(effectiveTarget, choiceCount + 6);
  }

  // ── Word count soft nudge ────────────────────────────────────────────────
  if (totalWordCount >= WORD_COUNT_SOFT_CAP) {
    effectiveTarget = Math.min(effectiveTarget, choiceCount + 4);
  }

  const turnsRemaining = hardCap - choiceCount;
  const approachingConclusion = choiceCount >= effectiveTarget - 4;
  const forceEndingNow =
    choiceCount >= effectiveTarget &&
    (narrativeReady ||
      stalledTurns >= 6 ||
      totalWordCount >= WORD_COUNT_SOFT_CAP);

  return { forceEndingNow, approachingConclusion, turnsRemaining };
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
  storyArc: string | undefined,
  choiceCount: number,
  endingWindow: EndingWindowResult,
): string {
  const healthScore = storyState?.storyHealthScore ?? 0;
  const storyMemoryBlock = buildStoryMemoryBlock(storyState);

  const stateBlock = `## STORY STATE
Turn: ${nodeIndex + 1} | Story Health Score: ${healthScore} | Total words so far: ${totalWordCount} | Choices made: ${choiceCount}`;

  const STORY_ARC_TURN_LIMIT = 5;
  const storyArcBlock =
    storyArc && nodeIndex < STORY_ARC_TURN_LIMIT
      ? `\n## NARRATIVE ARC GUIDANCE\nThis guidance describes the intended shape of the early story. Use it as a compass, not a script — the reader's choices drive the actual path.\n${storyArc}\n`
      : "";

  // ── Ending instructions — graduated and craft-aware ──────────────────────
  let endingInstruction = "";

  if (endingWindow.forceEndingNow) {
    // Forced ending: give full literary craft guidance so quality doesn't drop
    endingInstruction = `
${LITERARY_ENDING_CRAFT}
## ⚠ THE STORY MUST CONCLUDE THIS TURN
The narrative has reached its limit. Set isEnding: true. Write the ending scene now.
Apply every technique in the ENDING CRAFT block above. This is the final impression the reader will carry. Make it count.
The ending should feel INEVITABLE in retrospect — as though the whole story was always heading here.
Score ${healthScore}: use the full ending scale in the Universal Prose Rules to determine the tone.
${
  healthScore >= 1
    ? `⚑ POSITIVE SCORE (${healthScore}): The reader earned a winning ending. Write it. Do NOT default to tragedy, undercut the victory, or introduce last-minute loss as a false gesture toward realism. Victory endings require as much craft as tragic ones — write the specific texture of what this particular win means, in this particular story. Rise to it.`
    : healthScore === 0
      ? `⚑ SCORE ZERO: Write a genuinely ambiguous ending — not sad by default. Balanced on a knife edge. The reader should be able to argue for either reading and find evidence for both.`
      : `⚑ NEGATIVE SCORE (${healthScore}): Write the loss with full literary craft — not as a dismissal, but as a deliberate, inevitable ending that earns its tragedy.`
}
Do not present choices. Do not summarise. End on a specific, resonant image or moment.`;
  } else if (endingWindow.approachingConclusion) {
    // Soft approach zone: prime the AI to start thinking about the end
    endingInstruction = `
${LITERARY_ENDING_CRAFT}
## STORY APPROACHING ITS CONCLUSION (${endingWindow.turnsRemaining} choices remaining before hard cap)
The central conflict should now be approaching its climax. Begin steering deliberately toward resolution.
- Planted threads must be paid off or consciously left open for thematic effect.
- Active tensions should be escalating toward their breaking point.
- If this turn reaches a dramatically satisfying stopping point, set isEnding: true and apply the ending craft above.
- Do NOT drag the story out past its natural end. When the moment arrives, take it.
Score ${healthScore}: the ending you're building toward should honour this score.
${
  healthScore >= 1
    ? `⚑ POSITIVE SCORE (${healthScore}): Steer toward a winning ending. The reader has earned it through their choices. Do not undercut it with unnecessary loss or ambiguity unless the story's planted threads genuinely demand it.`
    : healthScore === 0
      ? `⚑ SCORE ZERO: Build toward an ambiguous ending — not defaulting to sadness, but genuinely poised between outcomes.`
      : `⚑ NEGATIVE SCORE (${healthScore}): Steer toward a losing ending — but one written with full craft and inevitability, not as a throwaway.`
}`;
  }

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
${storyArcBlock}
${storyMemoryBlock}## PREVIOUS SCENE (full text — authoritative record is in STORY HISTORY above):
${previousContext}

## THE READER CHOSE: "${choiceMade}"
${continuityCheck}${endingInstruction}
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
// Health Score Delta
//
// Previous scoring was asymmetric: bad=-2, catastrophic=-5 but good=+2.
// One catastrophic choice undid 2.5 good choices, making positive endings
// nearly impossible in practice. The revised scale is:
//
//   good:         +3   (was +2) — good choices should meaningfully reward
//   neutral:       0   (unchanged)
//   bad:          -2   (unchanged — bad choices have real but recoverable cost)
//   catastrophic:  -4  (was -5 — severe but not story-ruining on its own)
//
// Additionally a small base accumulation (+1 every 8 choices) rewards
// sustained engagement and represents the protagonist growing through
// the story — preventing score decay in long neutral stretches.
// ─────────────────────────────────────────────
export function healthScoreDelta(
  consequenceType: string | undefined,
  choiceCount: number = 0,
): number {
  const baseDelta = (() => {
    switch (consequenceType) {
      case "good":
        return 3;
      case "neutral":
        return 0;
      case "bad":
        return -2;
      case "catastrophic":
        return -4;
      default:
        return 0;
    }
  })();

  // Protagonist growth bonus: +1 every 8 choices regardless of outcome.
  // Represents the character learning, adapting, surviving.
  const growthBonus = choiceCount > 0 && choiceCount % 8 === 0 ? 1 : 0;

  return baseDelta + growthBonus;
}

// ─────────────────────────────────────────────
// Stall Detector
//
// Tracks how many consecutive turns the health score has not moved.
// Used by calculateEndingWindow to nudge stalled stories toward resolution.
// ─────────────────────────────────────────────
function updateStalledTurns(
  prevState: StoryState | null,
  delta: number,
): number {
  if (delta !== 0) return 0; // any movement resets the counter
  return (prevState?.stalledTurns ?? 0) + 1;
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
  choiceCount: number = 0,
): GeneratedSegment {
  const turnNumber = nodeIndex + 1;
  const prevScore = currentStoryState?.storyHealthScore ?? 0;
  const delta = healthScoreDelta(chosenConsequenceType, choiceCount);
  const stalledTurns = updateStalledTurns(currentStoryState, delta);

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
    targetEndingChoices:
      currentStoryState?.targetEndingChoices ?? DEFAULT_TARGET_END,
    // Carry forward AI narrative readiness signal
    narrativeReadyToEnd: parsed.narrativeReadyToEnd ?? false,
    stalledTurns,
  };

  const choices: Choice[] = (parsed.choices ?? []).map((c: any) => ({
    id: c.id,
    text: c.text,
    consequence: c.consequence,
    consequenceType: c.consequenceType,
  }));

  // ── Ending Gate ───────────────────────────────────────────────────────────
  // The AI may signal isEnding: true at any point — including turn 1 if a
  // free-will input happens to resolve everything narratively. We respect
  // the AI's judgement but enforce three non-negotiable conditions:
  //
  //   1. MINIMUM TURNS: A story cannot end before MIN_TURNS_BEFORE_ENDING
  //      choices. This prevents a single dramatic free-will action from
  //      short-circuiting a story that has barely started.
  //
  //   2. PLANTED THREADS: If the story has planted threads that haven't
  //      appeared in the scene summary as resolved or consciously left open,
  //      the ending is deferred and the AI gets one more turn to honour them.
  //      (We check this loosely — if ANY planted thread keyword appears
  //      nowhere in the accumulated summaries, we defer.)
  //
  //   3. ARC MINIMUM: The story must have at least reached the point where
  //      the central conflict was introduced — nodeIndex >= 2 ensures at
  //      least an opening + complication + resolution structure.
  //
  // When an ending is deferred, choices are restored (from the parsed output
  // if available, or a single "continue" fallback) so the story keeps moving.
  // ─────────────────────────────────────────────────────────────────────────
  const MIN_TURNS_BEFORE_ENDING = 8; // absolute floor — no story ends in fewer than 8 choices
  const MIN_ARC_NODES = 3; // nodeIndex floor — need opening + complication + resolution

  function isEndingPermitted(): boolean {
    // Hard floor on choice count
    if (choiceCount < MIN_TURNS_BEFORE_ENDING) return false;
    // Hard floor on node index (arc structure minimum)
    if (nodeIndex < MIN_ARC_NODES) return false;
    return true;
  }

  function hasUnresolvedCriticalThreads(): boolean {
    const planted = updatedStoryState.plantedThreads ?? [];
    if (planted.length === 0) return false;

    // Build a single searchable string from all summaries produced so far
    const fullHistory = (updatedStoryState.narrativeSummary ?? [])
      .join(" ")
      .toLowerCase();
    const latestSummary = (parsed.sceneSummary ?? "").toLowerCase();
    const searchable = fullHistory + " " + latestSummary;

    // A thread is considered "addressed" if at least one of its significant
    // words (length > 4, not stop-words) appears in the story history.
    // This is intentionally permissive — we only block endings when a thread
    // has been completely forgotten, not when it's partially developed.
    const STOP_WORDS = new Set([
      "with",
      "that",
      "this",
      "from",
      "have",
      "they",
      "their",
      "about",
      "which",
      "when",
      "where",
      "been",
      "will",
      "into",
    ]);

    const unresolvedCount = planted.filter((thread) => {
      const keywords = thread
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 4 && !STOP_WORDS.has(w));
      if (keywords.length === 0) return false;
      // If NONE of the thread's keywords appear anywhere in the story, it's forgotten
      return !keywords.some((kw) => searchable.includes(kw));
    }).length;

    // Only block if more than half the planted threads are completely unaddressed
    return unresolvedCount > Math.floor(planted.length / 2);
  }

  const aiWantsToEnd = parsed.isEnding ?? false;
  const endingAllowed = isEndingPermitted();
  const threadsUnresolved =
    aiWantsToEnd && endingAllowed && hasUnresolvedCriticalThreads();

  // Determine final isEnding value
  const resolvedIsEnding = aiWantsToEnd && endingAllowed && !threadsUnresolved;

  // If ending was deferred, ensure choices exist so the story continues.
  // Prefer the AI's own choices if it provided them despite isEnding:true,
  // otherwise inject a minimal fallback so the UI never deadlocks.
  const resolvedChoices: Choice[] = resolvedIsEnding
    ? [] // endings never have choices
    : choices.length > 0
      ? choices
      : [
          {
            id: "continue",
            text: "Press forward",
            consequence: "Momentum",
            subtext: "The story continues.",
            consequenceType: "neutral",
          },
        ];

  if (aiWantsToEnd && !resolvedIsEnding) {
    logger.info(
      {
        choiceCount,
        nodeIndex,
        plantedThreads: updatedStoryState.plantedThreads?.length ?? 0,
        reason: !endingAllowed
          ? `too early (choice ${choiceCount} < min ${MIN_TURNS_BEFORE_ENDING})`
          : "unresolved planted threads",
      },
      "Ending deferred — story continues",
    );
  }

  return {
    narrativeText: parsed.narrativeText,
    choices: resolvedChoices,
    isEnding: resolvedIsEnding,
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
  choiceCount: number = 0,
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title ?? storyIdOrTitle;
  const storyGenre = story?.genre ?? genre;

  const endingWindow = calculateEndingWindow(
    choiceCount,
    totalWordCount,
    currentStoryState,
  );

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
    story?.storyArc,
    choiceCount,
    endingWindow,
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
        choiceCount,
        endingWindow,
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
      choiceCount,
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
  targetEndingChoices: number = DEFAULT_TARGET_END,
  forceEndingByChoices: boolean = false,
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title ?? storyIdOrTitle;
  const storyGenre = story?.genre ?? genre;

  const isFreeWill = choiceId === "free-will";
  const effectiveChoiceMade = isFreeWill
    ? `The reader invented their own action: "${choiceMade}". Treat this as a fully consequential player decision and honour it directly in the narrative.`
    : choiceMade;

  // Merge external forceEndingByChoices signal with dynamic window calculation
  const stateWithTarget: StoryState | null = currentStoryState
    ? { ...currentStoryState, targetEndingChoices }
    : null;

  const endingWindow = forceEndingByChoices
    ? { forceEndingNow: true, approachingConclusion: true, turnsRemaining: 0 }
    : calculateEndingWindow(choiceCount, totalWordCount, stateWithTarget);

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
    story?.storyArc,
    choiceCount,
    endingWindow,
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
      {
        storyId: storyIdOrTitle,
        turn: nodeIndex + 1,
        choiceCount,
        endingWindow,
      },
      "Gemini streaming generation successful",
    );

    const parsed = JSON.parse(accumulated);
    return buildGeneratedSegment(
      parsed,
      choiceMade,
      nodeIndex,
      currentStoryState,
      chosenConsequenceType,
      choiceCount,
    );
  } catch (err) {
    logger.error({ err }, "Fatal error streaming story segment");
    throw err;
  }
}

// ─────────────────────────────────────────────
// Cache Cleanup
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
