import OpenAI from "openai";
import { logger } from "./logger";
import { StoryContext } from "./storyContexts";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "dummy",
});

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

/**
 * Builds the optional context block injected into the system prompt.
 * Returns an empty string for stories that have no StoryContext entry,
 * so the generic prompt works exactly as before for all existing stories.
 */
function buildContextBlock(storyContext?: StoryContext): string {
  if (!storyContext) return "";

  const sections: string[] = [];

  if (storyContext.audienceNote) {
    sections.push(`AUDIENCE & CONTENT RULES:\n${storyContext.audienceNote}`);
  }

  if (storyContext.toneDirective) {
    sections.push(`TONE DIRECTIVE:\n${storyContext.toneDirective}`);
  }

  if (storyContext.worldRules) {
    sections.push(`STORY WORLD & RULES:\n${storyContext.worldRules}`);
  }

  if (storyContext.characters) {
    sections.push(`KEY CHARACTERS (follow voice notes exactly):\n${storyContext.characters}`);
  }

  if (sections.length === 0) return "";

  return `\n${"─".repeat(60)}\n${sections.join("\n\n")}\n${"─".repeat(60)}\n`;
}

export async function generateStorySegment(
  storyTitle: string,
  genre: string,
  previousContext: string,
  choiceMade: string,
  nodeIndex: number,
  // Optional — pass storyContexts[story.id] at the call site.
  // Undefined is safe: the function falls back to generic behaviour.
  storyContext?: StoryContext
): Promise<GeneratedSegment> {

  // Use per-story thresholds if provided, otherwise fall back to defaults.
  const lateGameThreshold = storyContext?.lateGameThreshold ?? 12;
  const endingThreshold   = storyContext?.endingThreshold   ?? 18;

  const isLateGame = nodeIndex >= lateGameThreshold;

  // Build the optional story-specific context block.
  const contextBlock = buildContextBlock(storyContext);

  const systemPrompt = `You are a master storyteller writing an interactive, choice-based narrative for the platform "Magpie — The Home of Breathing Books". You write in the tradition of great literary fiction — rich, atmospheric, emotionally resonant prose that also moves with the pace and tension of a thriller.

STORY: "${storyTitle}" (Genre: ${genre})
${contextBlock}
WRITING RULES:
- Write 3-5 paragraphs of immersive, vivid narrative prose
- Second-person perspective ("you"), present tense — the reader IS the protagonist
- Match the genre's tone exactly — see TONE DIRECTIVE above if provided, otherwise default to dark and atmospheric
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

${isLateGame && nodeIndex >= endingThreshold ? "This may be an appropriate moment for an ending. Set isEnding: true if the story has reached a satisfying conclusion." : ""}

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
      model: "gpt-5.2",
      max_completion_tokens: 2048,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userMessage  }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(content);

    return {
      narrativeText: parsed.narrativeText || "The story continues...",
      choices:       parsed.choices       || [{ id: "continue", text: "Continue", consequence: "Forward" }],
      isEnding:      parsed.isEnding      || false
    };

  } catch (err) {
    logger.error({ err }, "Error generating story segment");
    throw err;
  }
}