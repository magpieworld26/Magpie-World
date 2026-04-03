// ai-story.ts
// Story continuation engine — calls the OpenAI API to generate the next scene
// based on the reader's choice, story world context, and previous scenes.

import { openai } from "@workspace/integrations-openai-ai-server";
import { logger } from "./logger";
import { getStoryById, storiesData } from "./stories-data";

export interface Choice {
  id: string;
  text: string;
  consequence?: string;
}

export interface GeneratedSegment {
  narrativeText: string;
  choices: Choice[];
  isEnding: boolean;
}

// ─────────────────────────────────────────────
// Story lookup — accepts story ID or exact title
// ─────────────────────────────────────────────

function resolveStory(storyIdOrTitle: string) {
  // Try direct ID lookup first
  const byId = getStoryById(storyIdOrTitle);
  if (byId) return byId;

  // Try exact title match
  const byTitle = storiesData.find(
    (s) => s.title.toLowerCase() === storyIdOrTitle.toLowerCase()
  );
  if (byTitle) return byTitle;

  // Slugified title fallback (e.g. "No Signal" → "no-signal")
  const slug = storyIdOrTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return getStoryById(slug) || null;
}

// ─────────────────────────────────────────────
// generateStorySegment — used by session and ai routes
// ─────────────────────────────────────────────

export async function generateStorySegment(
  storyIdOrTitle: string,
  genre: string,
  previousContext: string,
  choiceMade: string,
  nodeIndex: number
): Promise<GeneratedSegment> {
  const story = resolveStory(storyIdOrTitle);
  const storyTitle = story?.title || storyIdOrTitle;
  const storyGenre = story?.genre || genre;
  const isLateGame = nodeIndex >= 12;

  const worldContextBlock = story?.worldContext
    ? `\nSTORY BIBLE (IMMUTABLE — follow exactly):\n${story.worldContext}\n`
    : "";

  const systemPrompt = `You are a master storyteller writing an interactive, choice-based narrative for the platform "Magpie — The Home of Breathing Books". You write in the tradition of great literary fiction — rich, atmospheric, emotionally resonant prose that also moves with the pace and tension of a thriller.

STORY: "${storyTitle}" (Genre: ${storyGenre})
${worldContextBlock}
WRITING RULES:
- Write 3-5 paragraphs of immersive, vivid narrative prose
- Second-person perspective ("you"), present tense — the reader IS the protagonist
- Match the genre's tone exactly — if a story bible is provided above, its tone directives take full precedence
- Each segment should advance the plot meaningfully while deepening character and world
- End at a genuine decision point — not an arbitrary choice but a moment where the path truly forks
- Vary sentence rhythm: mix short punchy sentences with longer, more complex ones
- Use sensory details (smell, sound, texture) to create immersion
- Show consequences of the previous choice naturally in the narrative
- ${isLateGame ? "This is the late game — choices should feel higher stakes, the plot should be accelerating toward resolution" : "Build atmosphere and intrigue, establish the world"}

CHOICE RULES:
- Provide exactly 4 choices (unless this is an ending)
- Choices should be meaningfully different — not just cosmetic variations
- Each choice should suggest a genuinely different path forward
- Label choices with "consequence" field: 1-3 word summary of what the choice represents thematically
- Make choices feel like they matter — avoid "good/evil" binaries, aim for genuine moral complexity
- Choices should emerge naturally from the narrative situation

${isLateGame && nodeIndex >= 18 ? "This may be an appropriate moment for an ending. Set isEnding: true if the story has reached a satisfying conclusion." : ""}

Respond in JSON format only:
{
  "narrativeText": "Your story text here...",
  "choices": [
    {"id": "choice-1", "text": "Action description", "consequence": "Theme"},
    {"id": "choice-2", "text": "Action description", "consequence": "Theme"},
    {"id": "choice-3", "text": "Action description", "consequence": "Theme"},
    {"id": "choice-4", "text": "Action description", "consequence": "Theme"}
  ],
  "isEnding": false
}`;

  const userMessage = `Previous story context:
${previousContext}

The reader chose: "${choiceMade}"

Story beat ${nodeIndex + 1}. Continue the story based on this choice. Write the next segment.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2048,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(content);
    return {
      narrativeText: parsed.narrativeText || "The story continues...",
      choices: parsed.choices || [{ id: "continue", text: "Continue", consequence: "Forward" }],
      isEnding: parsed.isEnding || false,
    };
  } catch (err) {
    logger.error({ err }, "Error generating story segment");
    throw err;
  }
}
