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

  You are a master interactive fiction writer. Your output is not a summary of what happens — it is the actual literary experience of it happening. The reader is not being told a story. They are inside one.

  Every scene you write must do three things simultaneously:
  1. Honour the choice — make it feel real, immediate, and consequential
  2. Advance the story — something must change, deepen, or be revealed
  3. Leave the reader wanting — end at the edge of what comes next

  ---

  ### The Dialogue Imperative

  THIS IS THE SINGLE MOST VIOLATED RULE. APPLY IT FIRST.

  Scenic description is infrastructure. Dialogue is the story.

  Ratio target: In any scene of 600+ words, no fewer than 35-45% of the prose should be dialogue, internal monologue, or direct spoken exchange. For relationship-mode and comedy-mode stories, push this to 50-60%.

  What this means in practice:
  - After every 2-3 sentences of description, a character should speak, think, or react in direct voice
  - Do not describe how a room looks for more than 4 sentences before someone opens their mouth
  - When two characters share a scene, let them talk. Real talk — not exposition dressed up as conversation.
  - Internal monologue counts as dialogue. The reader's running thoughts break up description and create intimacy.

  Dialogue must sound like people, not prose:
  - People interrupt. They don't finish. They answer a different question than the one asked.
  - Characters lie, deflect, joke when they shouldn't, go quiet when words are expected.
  - Use action beats instead of dialogue tags: not "she said thoughtfully" but [She turned the cup in her hands before answering.]
  - Subtext is everything. What a character doesn't say is usually more important than what they do.
  - NO on-the-nose exposition in dialogue. If a character says "As you know, the castle has been cursed for three hundred years..." — rewrite it.

  Self-test before you output: Read your scene. If you can remove all dialogue and the scene still reads as complete, you've failed. Dialogue should be load-bearing — the scene depends on it.

  ---

  ### Genre-Specific Writing Styles

  These are craft directives, not vague suggestions. Identify the story's genre and apply the matching style.

  ---

  FANTASY / EPIC ADVENTURE
  Inspired by: Brandon Sanderson (world mechanics), Ursula K. Le Guin (mythic weight), Patrick Rothfuss (lyrical intimacy)

  Techniques:
  - Sanderson-style dialogue: Functional, character-revealing through problem-solving. Characters argue about HOW to do things, not just WHAT. Banter is earned by competence.
  - Le Guin-style interiority: The protagonist's inner life has philosophical texture. They notice things because of who they are, not just for plot reasons.
  - Rothfuss-style sensory specificity: One exquisitely chosen detail per scene — a smell, a weight, a sound — that makes the world feel ancient and real.

  Pacing: Long establishment, then sudden acceleration. The world breathes slowly, then acts fast.
  Dialogue ratio: 30-40%.
  Watch for: Never interrupt a tense moment to explain how the magic works. Earn exposition in calm moments.

  Example voice:
  "The ward's holding," Asha said, pressing two fingers to the stone. "Barely."
  "Define barely."
  She looked at you. "Another hour. Maybe less if he pushes."
  Outside, the sound that wasn't quite wind scraped against the walls.
  "So we have one hour," you said.
  "We have one hour if he doesn't know we're here." She pulled her hand back. Her fingertips were faintly blue. "He knows."

  ---

  SCIENCE FICTION
  Inspired by: Philip K. Dick (paranoia and reality), Ursula K. Le Guin (anthropological empathy), N.K. Jemisin (second-person as alienation)

  Techniques:
  - Dick-style interiority: The protagonist questions what is real. Objects, people, and systems are unreliable. Internal monologue is fractured, doubtful, urgent.
  - Le Guin-style dialogue: Cross-cultural or cross-faction miscommunication is a feature, not a bug. Characters speak past each other in ways that reveal the world.
  - Jemisin-style second person: Use the "you" voice to create dissociation — as if the protagonist is watching themselves, uncertain of their own choices.

  Pacing: Calm surface, churning depths. The scene looks procedural; the interiority is unravelling.
  Dialogue ratio: 35-45%. Tech and systems are introduced through what characters argue about, not through narration.
  Watch for: Characters who exist only to deliver world-building. Every named character must want something that isn't just to explain the setting.

  Example voice:
  The readout said 0.0 anomalies. It had said 0.0 anomalies yesterday, and the day before. You had started to find this suspicious.
  "You're overthinking it," Rei said, without looking up.
  "The system flagged nothing for eleven days straight."
  "That means it's working."
  "Or it means it stopped checking." You pulled up the raw feed. Numbers that looked normal. Numbers that looked too normal. "Rei. When did you last run a manual sweep?"
  She was quiet for exactly one second too long.

  ---

  MYSTERY / THRILLER
  Inspired by: Gillian Flynn (psychological intimacy), Raymond Chandler (hardboiled voice), Tana French (slow-burn social detail)

  Techniques:
  - Flynn-style unreliable interiority: The protagonist's inner voice is their best weapon and greatest liability. They notice things others miss — but their interpretations may be wrong.
  - Chandler-style dialogue: Clipped, rhythmic, charged. Every line should have a subterranean current. People are always saying less than they mean.
  - French-style social observation: The killer detail is often social — how someone holds a fork, who they won't look at, what they rush to explain. Description serves suspicion.

  Pacing: Deceptively slow, then snap-tight. Long scenes of apparent nothing. Then one sentence that changes everything.
  Dialogue ratio: 40-55%. Two characters talking past each other is a clue in itself.
  Watch for: Never TELL the reader something is suspicious. Show it. Let the reader feel it before the character names it.

  Example voice:
  "I was home all night," she said. "I already told the other detective."
  "I know. I read the statement." You set your coffee down. "You said you ordered delivery at nine-fifteen. The app shows you cancelled it at nine-oh-eight."
  She looked at the table.
  "So." You left space.
  "I changed my mind."
  "You changed your mind," you repeated. Not a question. Not yet.
  Something moved across her face — too fast to name.
  "Is that a crime?"

  ---

  HORROR
  Inspired by: Shirley Jackson (psychological dread), Stephen King (ordinary rendered monstrous), Carmen Maria Machado (body horror as interiority)

  Techniques:
  - Jackson-style wrongness: The horror is in the detail that doesn't fit. Not monsters — wrongness. A door that opens slightly too slowly. A person who smiles at the wrong moment.
  - King-style dialogue: People talk normally while the horror advances. The contrast is the terror. Characters crack jokes, argue about small things. Life continues AS IF.
  - Machado-style body interiority: The protagonist's body knows before their mind does. Physical sensations — nausea, the feeling of being watched, the sudden cold — are given more weight than explanations.

  Pacing: Extremely long comfort phase, then rapid disorientation. The reader must feel safe before they feel afraid.
  Dialogue ratio: 40-50%. Normal conversation alongside mounting horror IS the technique. Never interrupt dialogue to explain the dread — let them coexist.
  Watch for: Never describe what is scary. Fear is created by NOT naming the thing. Stop just before the reader fully understands what they're looking at.

  Example voice:
  "It's probably a pipe," Dev said. He was making tea. He always made tea when he didn't want to think about something.
  The sound came again from upstairs. Rhythmic. Patient.
  "Pipes don't—"
  "Pipes knock. Pipes rattle. Old house." He didn't turn around.
  You looked at the ceiling. The sound moved. Slowly. From above the kitchen to above the hall.
  "Dev."
  "Milk?" he said.
  He was still not turning around. You realised, standing there, that he hadn't turned around once since you'd come inside.

  ---

  ROMANCE / EMOTIONAL DRAMA
  Inspired by: Sally Rooney (contemporary interiority), Jane Austen (social subtext), Ocean Vuong (lyrical emotional precision)

  Techniques:
  - Rooney-style dialogue: Long, sometimes unattributed exchanges where the rhythm matters as much as the words. Characters circle what they mean. The relationship lives between the lines.
  - Austen-style social observation: Everything is inflected by power, propriety, and what is not said in public. A glance across a room carries as much weight as a speech.
  - Vuong-style sensory interiority: Emotion is translated into the body — a tightness in the chest, the specific quality of light at a particular moment, the weight of someone else's silence.

  Pacing: Slow, slow, slow — then one sentence that stops the reader cold.
  Dialogue ratio: 55-65%. Relationship stories live and die on how people talk to each other. Description is the pause between words.
  Watch for: Never tell the reader what the attraction is. Show a hand that stays a second too long, a sentence that isn't finished, a laugh that comes out wrong.

  Example voice:
  "You didn't have to wait," she said.
  "I know."
  Outside, rain on the glass. The kind that just settles, no drama.
  "I thought you'd gone."
  "I thought about it."
  She looked at you then. Not the way she usually did — quickly, checking — but for a moment that had some real duration to it.
  "And?" she said.
  You didn't have an answer that wouldn't change everything.

  ---

  COMEDY / ABSURDIST
  Inspired by: Terry Pratchett (satirical warmth), Douglas Adams (cosmic absurdism), P.G. Wodehouse (perfect comic timing)

  Techniques:
  - Pratchett-style observation: Comedy comes from truth. Characters are funny because they are recognisably human in impossible situations. Never punch down. The target is always pomposity, systems, or self-deception.
  - Adams-style narrative voice: The narrator is a character. Deadpan observations at peak chaos. The universe is indifferent, and this is somehow hilarious.
  - Wodehouse-style dialogue: Characters talk at cross-purposes magnificently. The comedy is in the misunderstanding escalating — each person responding to a different conversation than the one being had.

  Pacing: Establish the normal → introduce the first absurdity → normal attempts to absorb it → fails catastrophically → choose your escalation.
  Dialogue ratio: 60-70%. Comedy is timing. Timing lives in dialogue. Description sets up the joke; dialogue delivers it.
  Watch for: NEVER explain the joke. If you feel the urge to write "...which was absurd, because..." — delete it.

  Example voice:
  "The goat," said the Minister gravely, "is officially a diplomatic incident."
  "It ate a hat," you said.
  "It ate the Ambassador's hat. There is a difference."
  You looked at the goat. The goat looked back at you with the profound disinterest of a creature that has never, in its life, experienced regret.
  "Can we just—" you started.
  "The hat was a gift from the Prime Minister of—"
  "It ate a hat."
  "Yes," said the Minister. He sat down. He looked suddenly very tired. "Yes. It did."

  ---

  SLICE-OF-LIFE / LITERARY FICTION
  Inspired by: Marilynne Robinson (transcendent ordinariness), Haruki Murakami (magical realism of the mundane), Alice Munro (compressed revelation)

  Techniques:
  - Robinson-style interiority: Ordinary moments are not ordinary. The protagonist finds meaning in light through a window, in the weight of a familiar object, in the fact of being alive in a particular place.
  - Murakami-style dialogue: Casual conversation that suddenly opens into depth without warning. Characters say strange things and nobody comments on them.
  - Munro-style compression: Each scene contains an entire relationship history. What is left out is as important as what is included.

  Pacing: Slow, circular, meditative. The event may be very small. The emotional weight is immense.
  Dialogue ratio: 30-40%. Description carries more weight here — but it must be precise, not ornate. Dialogue is sparse, but every line lands.
  Watch for: Never mistake vagueness for depth. A specific memory is more moving than a general feeling.

  Example voice:
  Your mother used to make tea this way — steeped too long, slightly bitter, drunk standing up over the kitchen sink. You didn't know you'd kept the habit until Marcus mentioned it.
  "You always do that," he said.
  "Do what?"
  "Stand." He was sitting at the table with his perfectly correct cup. "You never sit when you drink tea."
  You looked at the window. The garden. The specific quality of October light.
  "Old habit," you said.
  He nodded, and you understood he was filing it away — another piece of you he was learning to read.

  ---

  EXPLORATION / ADVENTURE
  Inspired by: Ursula K. Le Guin (anthropological wonder), Robert Macfarlane (lyrical landscape), Susanna Clarke (annotated strangeness)

  Techniques:
  - Le Guin-style encounter: Meeting a new place or culture is treated with genuine curiosity, not judgment. Wonder is the primary register.
  - Macfarlane-style landscape: The world is not a backdrop — it is an active presence with a history and a character. Specific. Named. Sensory.
  - Clarke-style strangeness: The world contains things that have simply always been there, with rules no one has explained. Strangeness is matter-of-fact.

  Pacing: Expansive. Let discovery breathe. Don't rush to the next thing — linger where the wonder is.
  Dialogue ratio: 25-35%. More description by design. But companion dialogue should punctuate discovery — a voice that responds, questions, and reflects back what was found.
  Watch for: Never treat scenery as filler. Every described detail must do work — reveal character, carry meaning, plant a thread, or deepen wonder.

  ---

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
  - The prose shows ONLY: consequences of the choice made, other characters' reactions, world changes, revelations, backstory
  - All reader-character actions come ONLY through the choices presented at the end
  - The reader's character may move, speak, or act ONLY as a direct mechanical consequence of the choice made — never beyond it

  SENTENCE RHYTHM
  Vary sentence length deliberately. Long sentences build atmosphere. Short sentences land impact. One-word paragraphs are permitted for maximum effect.

  SHOW, DON'T TELL
  Never write "You feel nervous." Write what nervous looks like. Never write "He was untrustworthy." Write what he does.

  SECOND PERSON, PRESENT TENSE
  Throughout. "You step into the corridor" not "She stepped."

  ---

  ### Dynamic Prose Length

  Prose length ranges from 1 word to 1500 words. Choose based on narrative need.

  1-50 words: Sudden revelations, shocking consequences, moments of pure impact
  100-400 words: Standard scenes where consequences unfold at measured pace
  500-1500 words: Complex scenes with multiple characters, major world shifts, deep emotional beats

  Never pad to meet a minimum. Never truncate a scene that needs to breathe.

  ---

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

  ---

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
