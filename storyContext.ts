/**
 * storyContexts.ts
 *
 * Per-story context injected into the AI system prompt at generation time.
 * This keeps world rules, character voices, and tone directives out of
 * storiesData.ts (which is UI/metadata) and out of ai-story.ts (which is
 * generic engine logic).
 *
 * Add an entry here whenever a story needs specific AI behaviour that the
 * genre label alone cannot convey — unusual tone, non-verbal characters,
 * audience restrictions, strict world rules, etc.
 *
 * Stories without an entry here will use the generic system prompt in
 * ai-story.ts, which is fine for standard dark/thriller/noir genres.
 */

export interface StoryContext {
  /** One or two sentences on who is reading this — age range, content ceiling. */
  audienceNote?: string;
  /** Prose/bullet description of the world's rules that the AI must respect. */
  worldRules?: string;
  /** Named characters with voice notes and hard constraints. */
  characters?: string;
  /** Explicit tone and comedy/drama instructions. */
  toneDirective?: string;
  /**
   * Optional: override the late-game node threshold for this story.
   * Defaults to 12 if omitted. Set lower for shorter stories.
   */
  lateGameThreshold?: number;
  /**
   * Optional: override the ending-eligible node threshold for this story.
   * Defaults to 18 if omitted. Set lower for shorter stories.
   */
  endingThreshold?: number;
}

export const storyContexts: Record<string, StoryContext> = {

  // ─── Apology to a Dragon ───────────────────────────────────────────────────
  "apology-to-a-dragon": {

    audienceNote:
      "Audience is ages 13–18. Keep all content light and age-appropriate. " +
      "Consequences should be comic or bittersweet rather than dark or violent. " +
      "No death, no serious injury, no romantic content beyond a light crush.",

    toneDirective:
      "This is a dry, character-driven COMEDY — not slapstick, not parody. " +
      "Humour arises from three sources: (1) Belvane's enormous dignity " +
      "colliding with his enormous neediness, (2) Gresha's complete calm in " +
      "the face of ongoing disaster, and (3) the protagonist being " +
      "competent-but-not-quite. " +
      "Disasters must be described with the same matter-of-fact tone Gresha " +
      "uses. Avoid melodrama. The stakes feel real to the characters even " +
      "though they are objectively small — treat them seriously within the " +
      "comedy. Never mock Belvane's feelings; his heartbreak is genuine even " +
      "if the situation is absurd.",

    worldRules:
      "Valdenmere domesticated dragons 400 years ago. Dragons are less noble " +
      "war-beasts and more enormous fire-breathing house cats — vain, moody, " +
      "convinced the world revolves around them. " +
      "CRITICAL: Dragons do NOT speak words. Ever. They communicate entirely " +
      "through a system of physical signals that experienced keepers interpret: " +
      "low rattling huff = displeasure / warning; sharp chirp = demands " +
      "immediate attention; slow blink followed by turning the whole body away " +
      "= deep personal betrayal (requires ~20 minutes); rumbling purr = " +
      "contentment; smoke without fire = dismissal / contempt. " +
      "Never write a dragon speaking a sentence. Describe their signal and " +
      "then the keeper's interpretation. " +
      "There is no dark lord, no prophecy, no war. The biggest crisis is the " +
      "Midsummer Festival in twelve days — the Crown needs all six Royal " +
      "Dragons flight-ready for the opening ceremony. The Roost always smells " +
      "like charcoal and warm copper. The air is always a little too warm.",

    characters:
      "BELVANE (assigned Copperwing dragon, central character): " +
      "Twelve feet at the shoulder, tarnished-penny scales, amber eyes " +
      "perpetually set to 'slightly offended.' Wings disproportionately large " +
      "for his body, giving him the look of an inside-out umbrella. Moves with " +
      "exaggerated dignity. Secretly sweet — once sheltered a nest of sparrows " +
      "under his wing during a storm, will never admit this. Wants desperately " +
      "to lead the Festival formation. Is not the best flier. " +
      "HARD RULE: Belvane never speaks words. Describe his physical signals. " +
      "HARD RULE: Always portray his vanity and his vulnerability together — " +
      "he is never purely comic, there is always a real feeling underneath.\n\n" +

      "GRESHA (senior keeper, direct supervisor): " +
      "Thirties, stocky, permanently sunburned nose, long dragon-claw scar " +
      "she wears like a badge. Eleven years at the Roost. " +
      "VOICE: Clipped, matter-of-fact, often addressed to no one in particular. " +
      "Narrates ongoing disasters with total calm: 'And there goes the fence. " +
      "That's a new fence.' Cuts herself off mid-instruction assuming the " +
      "listener already knows the rest. Always carrying a clipboard when " +
      "something is wrong. Shows she cares by quietly fixing things after " +
      "barking at people.\n\n" +

      "TORBEN (peer keeper, same hire year, informal rival): " +
      "Lanky, easy smile, keeper's vest always unbuttoned against regulation. " +
      "Effortlessly good with dragons without knowing it. " +
      "VOICE: Delivers critical information as casual asides, always opening " +
      "with 'Oh, by the way —' before the bombshell. When genuinely impressed, " +
      "goes quiet and says only 'Huh.' once. Friendly and kind — impossible to " +
      "properly resent, which makes it worse.\n\n" +

      "PROTAGONIST (the reader, second-person 'you'): " +
      "Second-year junior keeper, youngest on staff. Competent but not polished. " +
      "The only person who knows Belvane likes being sung to. " +
      "Will absolutely never admit this out loud.",

    // Apology to a Dragon is an 8-chapter story — scale thresholds down
    lateGameThreshold: 5,
    endingThreshold: 7,
  },

  // ─── Add future story contexts below this line ────────────────────────────
  // "story-id": { ... }

};