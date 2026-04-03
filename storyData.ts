export interface StoryData {
  id: string;
  title: string;
  genre: string;
  description: string;
  longDescription: string;
  coverGradient: string;
  tags: string[];
  rating: string;
  chapterCount: number;
  readingTime: string;
  featured: boolean;
  rank: number | null;
  initialPrompt: string;
}

export const storiesData: StoryData[] = [
  {
    id: "echoes-of-tomorrow",
    title: "Echoes of Tomorrow",
    genre: "Sci-Fi Thriller",
    description:
      "A quantum physicist discovers she can send messages to her past self — but every message changes the present in terrifying ways.",
    longDescription:
      "Dr. Mara Chen has spent her career searching for the fundamental laws of time. When a freak laboratory accident grants her the ability to communicate across temporal boundaries, she glimpses a future in catastrophic collapse. Racing against cascading paradoxes and the agents sent to silence her, Mara must decide: change history and risk erasing everything she loves, or let the world burn. Every choice rewrites a chapter. Every message alters a life. Some futures can only be saved by those brave enough to face the past.",
    coverGradient:
      "linear-gradient(145deg, #0d4a47 0%, #0a2a2e 60%, #061a25 100%)",
    tags: ["Time Travel", "Mystery", "Science", "Conspiracy"],
    rating: "★★★★★",
    chapterCount: 12,
    readingTime: "8-12 hrs",
    featured: true,
    rank: 1,
    initialPrompt: "echoes-of-tomorrow",
  },
  {
    id: "the-last-cartographer",
    title: "The Last Cartographer",
    genre: "Dark Fantasy",
    description:
      "In a world where maps hold magical power, the last map-maker must chart a territory that shouldn't exist — the land of the dead.",
    longDescription:
      "Maps are power in the Twelve Kingdoms. Whoever draws the borders makes them real. Silas Vane is the last true Cartographer, a dying art in a world consumed by war. When a dying soldier brings him a fragment of a map showing a land beyond death itself, Silas is drawn into a quest that will take him beyond every boundary he thought unbreakable. The dead remember what the living have forgotten — and something in that forgotten land wants to stay buried.",
    coverGradient:
      "linear-gradient(145deg, #0b2535 0%, #091c2a 50%, #071218 100%)",
    tags: ["Magic", "Adventure", "Death", "Ancient Mysteries"],
    rating: "★★★★☆",
    chapterCount: 15,
    readingTime: "10-15 hrs",
    featured: false,
    rank: 2,
    initialPrompt: "the-last-cartographer",
  },
  {
    id: "neon-requiem",
    title: "Neon Requiem",
    genre: "Cyberpunk Noir",
    description:
      "A memory-hacker in 2087 Neo-Tokyo uncovers a conspiracy buried in the minds of the city's elite — including her own stolen past.",
    longDescription:
      "In 2088, memories are currency. Yuki Nakamura hacks minds for a living — retrieving buried secrets, planting convenient fictions, erasing inconvenient truths. When a routine job goes catastrophically wrong, Yuki discovers she's been living inside a fabricated identity. Her true self is locked somewhere in the labyrinthine neural networks of Neo-Tokyo's oligarchy. Hunted by corporate kill-squads and haunted by memories that may not be hers, Yuki must hack the most dangerous system of all: the truth.",
    coverGradient:
      "linear-gradient(145deg, #1a0a3d 0%, #2a0f5a 40%, #0d062b 100%)",
    tags: ["Cyberpunk", "Hacking", "Identity", "Noir"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: false,
    rank: 3,
    initialPrompt: "neon-requiem",
  },
  {
    id: "whispers-of-the-tide",
    title: "Whispers of the Tide",
    genre: "Mythic Horror",
    description:
      "A marine biologist's research vessel vanishes. Months later, she returns alone — with no memory and something ancient in her eyes.",
    longDescription:
      "The Calypso vanished in the Mariana Trench with seventeen scientists aboard. Eight months later, Dr. Petra Solano walks out of the ocean onto a beach in the Philippines — alone, barefoot, and unable to recall a single day of her absence. But something came back with her. Something that speaks in the language of deep-sea currents and moves through her dreams like a predator through dark water. As Petra fights to reclaim her memory, she begins to wonder: is she trying to remember what happened below — or trying to forget what she agreed to?",
    coverGradient:
      "linear-gradient(145deg, #1a1a0f 0%, #2a2410 50%, #111008 100%)",
    tags: ["Ocean", "Lovecraftian", "Horror", "Mystery"],
    rating: "★★★★☆",
    chapterCount: 11,
    readingTime: "8-11 hrs",
    featured: false,
    rank: 4,
    initialPrompt: "whispers-of-the-tide",
  },
  {
    id: "the-iron-crown",
    title: "The Iron Crown",
    genre: "Political Fantasy",
    description:
      "A disgraced general returns from exile to find her kingdom on the edge of revolution — and her own name at the center of a prophecy she never asked for.",
    longDescription:
      "General Aiya Stormborn was the Empire's greatest warrior — until the Emperor she served condemned her for the one battle she refused to win. Five years in exile in the frozen north have not dimmed her fire. When revolution erupts in the capital and three factions each claim the throne, Aiya is dragged back into the game of crowns she swore she'd left behind. The Iron Crown was forged from the weapons of conquered peoples. Whoever claims it claims their suffering too. Aiya must choose: forge a better empire, burn it down entirely, or disappear back into the snow.",
    coverGradient:
      "linear-gradient(145deg, #3d1205 0%, #6b2208 40%, #c44a10 70%, #e8621a 100%)",
    tags: ["War", "Politics", "Empire", "Revolution"],
    rating: "★★★★★",
    chapterCount: 18,
    readingTime: "14-20 hrs",
    featured: false,
    rank: 5,
    initialPrompt: "the-iron-crown",
  },
  {
    id: "garden-of-glass",
    title: "Garden of Glass",
    genre: "Gothic Romance",
    description:
      "A grief counselor inherits an estate with no windows — only mirrors. And in each mirror, a different version of her dead sister stares back.",
    longDescription:
      "Dr. Elise Morrow has spent her career helping others grieve. When she inherits her estranged family's estate — a Victorian mansion called Glassarden — she expects silence and dust. What she finds instead are mirrors. Dozens of them, throughout every room, each reflecting not Elise but her twin sister Mara, dead for three years. Each reflection shows Mara in a different life, a different choice, a different ending. Elise knows one of those reflections contains the truth about how Mara really died. But truth, in a house of mirrors, has a way of cutting those who reach for it.",
    coverGradient: "linear-gradient(160deg, #0d2a4a, #050f1e)",
    tags: ["Gothic", "Twins", "Supernatural", "Grief"],
    rating: "★★★★☆",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: null,
    initialPrompt: "garden-of-glass",
  },
  {
    id: "children-of-the-void",
    title: "Children of the Void",
    genre: "Space Opera",
    description:
      "The last generation ship reaches its destination — only to find the planet already colonized. By humanity's descendants. From 400 years in the future.",
    longDescription:
      "The generation ship Perseverance has carried 10,000 souls for 200 years toward Kepler-442b. When they arrive, they find a civilization that's been there for 400 years — and that civilization's historical records show the Perseverance never arrived. Captain Yusra Okafor must navigate first contact with people who are simultaneously her distant relatives and complete strangers, while uncovering why history recorded their ship as lost. The answer reaches back to a choice made on departure day — and forward to a catastrophe that hasn't happened yet.",
    coverGradient: "linear-gradient(160deg, #1a0d3a, #0a0520)",
    tags: ["Space", "Time Paradox", "Survival", "Discovery"],
    rating: "★★★★★",
    chapterCount: 14,
    readingTime: "10-14 hrs",
    featured: false,
    rank: null,
    initialPrompt: "children-of-the-void",
  },
  {
    id: "the-salt-covenant",
    title: "The Salt Covenant",
    genre: "Historical Mystery",
    description:
      "A forensic linguist decodes an ancient treaty that was supposed to end a war — and realizes it actually started one that's still being fought today.",
    longDescription:
      "Dr. James Abara has translated dead languages for twenty years. When the Vatican secretly commissions him to decode a salt tablet found beneath Jerusalem, he expects an archaeological curiosity. Instead, he finds a 3,000-year-old covenant that names specific bloodlines — bloodlines still active in modern world governments. Someone has been fulfilling the terms of this covenant for three millennia, and they're very close to completing it. James has seventy-two hours before the final clause is enacted. The problem: completing it means peace. Breaking it means war. And he's not sure which one the world deserves.",
    coverGradient: "linear-gradient(160deg, #0d3a2a, #051a12)",
    tags: ["History", "Linguistics", "Conspiracy", "Religion"],
    rating: "★★★★☆",
    chapterCount: 13,
    readingTime: "9-13 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-salt-covenant",
  },
  // ─── NEW STORY ───────────────────────────────────────────────────────────────
  {
    id: "apology-to-a-dragon",
    title: "Apology to a Dragon",
    genre: "Comedy Fantasy",
    description:
      "A junior dragon keeper has twelve days to coax a six-tonne, emotionally devastated Copperwing back into the air before the Midsummer Festival.",
    longDescription:
      "The kingdom of Valdenmere domesticated dragons four hundred years ago — and it shows. The Royal Roost's Crown dragons are vain, moody, and completely convinced the world revolves around them. When Belvane, your assigned Copperwing, retreats to his stall after being passed over for the Festival's lead formation, it falls to you — the youngest keeper on staff — to fix it. Your supervisor needs results. Your rival makes everything look effortless. And a twelve-foot dragon with tarnished-penny scales is curled up in the dark because nobody told him he was special. You've got twelve days, one terrible idea, and the only lullaby that's ever worked on him.",
    coverGradient:
      "linear-gradient(145deg, #7a3b10 0%, #b85c1a 40%, #e8832a 75%, #f0a050 100%)",
    tags: ["Comedy", "Dragons", "Fantasy", "Coming of Age"],
    rating: "★★★★☆",
    chapterCount: 8,
    readingTime: "5-8 hrs",
    featured: false,
    rank: null,
    initialPrompt: "apology-to-a-dragon",
  },
  // ─────────────────────────────────────────────────────────────────────────────
];

export function getStoryById(id: string): StoryData | undefined {
  return storiesData.find((s) => s.id === id);
}

export function getInitialStoryNode(storyId: string): {
  narrativeText: string;
  choices: Array<{ id: string; text: string; consequence?: string }>;
} {
  const story = getStoryById(storyId);
  if (!story) {
    return {
      narrativeText: "The story begins...",
      choices: [{ id: "1", text: "Continue" }],
    };
  }

  const openings: Record<
    string,
    {
      narrativeText: string;
      choices: Array<{ id: string; text: string; consequence?: string }>;
    }
  > = {
    "echoes-of-tomorrow": {
      narrativeText: `The quantum resonance chamber hums with a frequency that shouldn't exist.\n\nDr. Mara Chen stands at the console, her hands trembling as she reviews the data for the fourth time. The readings are impossible. The entanglement signature isn't just bridging particles — it's bridging *time*. And encoded in that signature, unmistakably, is a message.\n\nA message written in her own handwriting.\n\n*The reactor fails at 11:47 PM. Don't run the tertiary calibration. Get everyone out.*\n\nThe timestamp on the message is dated three days from now. The clock on the lab wall reads 11:31 PM tonight.\n\nYour senior assistant, Dr. Reyes, walks in carrying coffee. "Still here? The board review is tomorrow, Mara. You should sleep." He hasn't noticed the message on your screen yet.\n\nThe reactor venting alarm gives a single, experimental chirp — then goes silent.\n\nWhat do you do?`,
      choices: [
        {
          id: "warn-reyes",
          text: "Tell Reyes about the message and begin evacuation immediately",
          consequence: "Trust the warning",
        },
        {
          id: "investigate-alone",
          text: "Hide the message. Run your own diagnostics before making any decisions",
          consequence: "Verify before acting",
        },
        {
          id: "test-the-system",
          text: "Send a message back through the entanglement — test if the connection is real",
          consequence: "Engage the paradox",
        },
        {
          id: "run-calibration",
          text: "The message could be a fabrication. Run the tertiary calibration as planned",
          consequence: "Defy the warning",
        },
      ],
    },
    "the-last-cartographer": {
      narrativeText: `The dying soldier's map fragment is unlike anything you've ever seen.\n\nYou've spent forty years drawing the known world — every mountain pass, every contested border, every city that burned and rose again under a new name. Your maps are accurate because you've *walked* every line you've ever drawn. That's the First Law of Cartography: you can only map what you've witnessed.\n\nBut the fragment the soldier pressed into your hands with his last breath shows geography that cannot exist.\n\nThe continent curves wrong. The rivers flow uphill. And in the bottom corner, in script so old you barely recognize it, are three words: *Land of After*.\n\nYour apprentice, young Wren, stands in the doorway of your workshop. "The soldier is dead, master. The city guard will come asking questions. What should we tell them?"\n\nOutside, you can already hear boots on the cobblestones.\n\nWhat do you do?`,
      choices: [
        {
          id: "hide-the-map",
          text: "Hide the map fragment in your secret archive. Tell the guard you found nothing on him",
          consequence: "Protect the secret",
        },
        {
          id: "show-wren",
          text: "Show Wren the fragment. She has fresh eyes — maybe she sees something you don't",
          consequence: "Seek a second perspective",
        },
        {
          id: "study-immediately",
          text: "Send Wren to stall the guard. Spend every minute studying the fragment while you can",
          consequence: "Pursue knowledge first",
        },
        {
          id: "surrender-it",
          text: "Surrender the fragment to the guard. If it's real, the Crown should know",
          consequence: "Play by the rules",
        },
      ],
    },
    "neon-requiem": {
      narrativeText: `The client's memories taste like copper and burned circuits.\n\nYou're three layers deep into the neural stack of a mid-level Helix Corp executive when you find something that shouldn't be there: a wall. Not the usual defensive partitions corporations install to protect trade secrets — those you slip through like smoke. This is different. Solid. Cold. And it has your face on it.\n\nNot a security feature. A *cage*. Built specifically to keep you out of something that involves you.\n\nYour extraction pod gives a warning pulse — someone has detected the intrusion. You have about ninety seconds before the client's internal security drones reach your physical location in the back booth of the Crimson Pachinko.\n\nYou can't crack the wall in ninety seconds. But you can grab the architect's signature — the unique neural fingerprint of whoever built this cage. Or you can pull out clean and pretend you never saw it.\n\nThe client wired half the payment to your account this morning. They're expecting a clean job.\n\nWhat do you do?`,
      choices: [
        {
          id: "grab-signature",
          text: "Grab the architect's neural signature before extracting. The wall is the real job now",
          consequence: "Follow the thread",
        },
        {
          id: "clean-exit",
          text: "Pull out clean. Take the money. This is above your pay grade",
          consequence: "Walk away",
        },
        {
          id: "crack-the-wall",
          text: "Try to crack it anyway. Ninety seconds is longer than people think",
          consequence: "Go deeper",
        },
        {
          id: "plant-a-trace",
          text: "Plant a dormant trace program before extracting — come back when you're better prepared",
          consequence: "Play the long game",
        },
      ],
    },
    "whispers-of-the-tide": {
      narrativeText: `You wake up on a beach in the Philippines with sand in your mouth and eight months of your life missing.\n\nThis is what you know: Your name is Dr. Petra Solano. You were aboard the research vessel *Calypso*, investigating deep-sea thermal vents 400 kilometers off the coast of Guam. There were seventeen people on that ship. You remember boarding. You remember the dive. You remember the lights in the deep that shouldn't have been there.\n\nAnd then: nothing. Until now. Until this beach and this morning and a fisherman staring at you like you've risen from the dead, which — according to the international maritime reports the nurse later shows you — is essentially what you've done.\n\nThe doctors say you're physically healthy. Healthier than you should be after eight months. But when they show you the mirror, there's something wrong with your eyes. The irises are the right color. But they don't move the way they used to.\n\nA man in a dark suit arrives and says he's from a government agency you've never heard of. He wants to debrief you. Your researcher colleague, Dr. Amara, is also at the hospital — she heard you were found and flew in immediately.\n\nWho do you speak to first?`,
      choices: [
        {
          id: "speak-amara",
          text: "Go to Amara. She was your closest friend on the crew — she deserves the truth first",
          consequence: "Trust friendship",
        },
        {
          id: "speak-government",
          text: "Meet with the government agent. If there's something wrong with you, you need institutional resources",
          consequence: "Trust authority",
        },
        {
          id: "examine-yourself",
          text: "Ask for time alone. You need to understand what's happening in your own mind before talking to anyone",
          consequence: "Look inward",
        },
        {
          id: "try-to-leave",
          text: "Walk out. You're not under arrest. Whatever happened to you isn't their business until it's yours",
          consequence: "Reclaim autonomy",
        },
      ],
    },
    "the-iron-crown": {
      narrativeText: `The Iron Crown is heavier than it looks in portraits.\n\nYou know this because you've just stolen it.\n\nFive years in the frozen north taught you patience and how to pick locks with frostbitten fingers. The Imperial Treasury guards didn't expect the disgraced General Aiya Stormborn to walk back into the capital during a revolution, wearing a merchant's cloak and carrying nothing but a message: *I know who started the fire.*\n\nThe message was a lie, of course. But it got you through three checkpoints and into the vaults. Now you stand in the treasury's inner chamber with the Crown in your hands, and you can hear three separate armies fighting in the city above you.\n\nThe Red Faction, who burned the granaries and called it revolution.\nThe Blue Faction, the merchant guilds who funded the rebellion for profit.\nThe White Faction, Imperial loyalists who still believe in an Emperor who's been missing for six days.\n\nThe Crown makes the Emperor legitimate. Whoever presents it publicly controls the narrative — at least long enough to be dangerous.\n\nYou have it. What do you do with it?`,
      choices: [
        {
          id: "claim-crown",
          text: "Put it on. The Iron Crown has never been worn by a woman. It has never been worn by someone the people actually trust. Until now.",
          consequence: "Seize power",
        },
        {
          id: "find-emperor",
          text: "Find the missing Emperor first. Return the Crown to its rightful owner — then negotiate your own pardon",
          consequence: "Play kingmaker",
        },
        {
          id: "destroy-crown",
          text: "Destroy the Crown. No one holds power over others through an object. The revolution needs a symbol, not a relic.",
          consequence: "Burn it all down",
        },
        {
          id: "use-as-leverage",
          text: "Hide it. Use its existence as a bargaining chip with all three factions. Let them come to you.",
          consequence: "Play all sides",
        },
      ],
    },
    "garden-of-glass": {
      narrativeText: `The estate agent's hands tremble slightly as she hands you the keys.\n\n"Glassarden has been in your family for two hundred years," she says. "We're... glad it's staying in the family." She doesn't meet your eyes.\n\nYou've never heard of Glassarden. Your mother — Mara's mother — never mentioned it. The estate appeared in the probate documents three weeks after your twin sister's funeral, written in your grandmother's hand, bequeathed specifically to you and not to your surviving parent. *For Elise, when she is ready.*\n\nYou are not ready. You will never be ready. But grief has a way of pulling you toward the things you think you want to avoid.\n\nThe house is exactly as old as it looks. Victorian stonework, overgrown gardens, windows that have been bricked over and replaced, every one of them, with mirrors. Dozens of mirrors visible from the drive alone, each perfectly maintained despite the house's obvious disuse.\n\nAs you step out of the car, you catch a reflection in the nearest mirror.\n\nIt is not yours.\n\nMara stares back at you. Wearing the dress she was buried in. Smiling.\n\nYour phone rings. It's your therapist, checking in.\n\nWhat do you do?`,
      choices: [
        {
          id: "approach-mirror",
          text: "Walk toward the mirror. Whatever is happening, you need to face it directly",
          consequence: "Confront the reflection",
        },
        {
          id: "answer-phone",
          text: "Answer the phone. Ground yourself in the real before the house can claim you",
          consequence: "Stay tethered",
        },
        {
          id: "go-inside",
          text: "Go inside and don't look at the mirror again. Look for rational explanations",
          consequence: "Seek logic",
        },
        {
          id: "leave-now",
          text: "Get back in the car and drive away. Some inheritances shouldn't be accepted",
          consequence: "Retreat",
        },
      ],
    },
    "children-of-the-void": {
      narrativeText: `Two hundred years of sleep, and now this.\n\nCaptain Yusra Okafor stands on the observation bridge of the *Perseverance* and looks at the civilization below. Kepler-442b glows blue-green through the viewport, beautiful and impossible. Cities are visible from orbit. Not ruins, not primitive settlements — cities with orbital infrastructure, energy signatures consistent with fusion power, and a communications array broadcasting on frequencies they haven't used since the 21st century.\n\nAnd they're transmitting in English.\n\nThe signal reaches the bridge: *Welcome home, Perseverance. We've been waiting. Please be advised: your arrival is a historical anomaly. Approach vector Zeta-Nine for safe transit. We have much to discuss.*\n\nYour second-in-command, Commander Park, pulls up the civilization's historical records from the transmission data packet they've provided. "Captain. Look at this." She zooms in on one entry: *The generation ship Perseverance, lost with all hands, Year of Departure 2063.*\n\n"They think we're dead," Park says. "They have for four hundred years."\n\nYour first officer, Hendricks, speaks carefully: "Or they want us to think they think that."\n\nYou have the approach vector. What's your next move?`,
      choices: [
        {
          id: "accept-approach",
          text: "Follow the approach vector and make formal first contact. Transparency is the only way forward",
          consequence: "Trust the welcome",
        },
        {
          id: "hold-position",
          text: "Hold position. Gather intelligence before anyone goes anywhere. This could be a trap",
          consequence: "Proceed with caution",
        },
        {
          id: "ask-direct",
          text: "Transmit a direct question: who decided to report us as lost, and why?",
          consequence: "Demand answers",
        },
        {
          id: "send-shuttle",
          text: "Send an unmanned probe with the shuttle crew on standby. Verify the invitation before committing",
          consequence: "Test the waters",
        },
      ],
    },
    "the-salt-covenant": {
      narrativeText: `The Vatican's basement smells like four hundred years of secrets.\n\nDr. James Abara sits alone in Archive Room 7, wearing cotton gloves, and reads the same three lines for the sixth time.\n\nThe salt tablet shouldn't be possible. The dialect is Phoenician, circa 900 BCE — a language he knows better than most linguists alive. But the grammar contains structures that weren't supposed to exist until the 13th century, and the third line references a numerical notation system that, as far as archaeology has established, was invented in 11th century Persia.\n\nSomeone, 3,000 years ago, wrote in a language from the future.\n\nHe photographs the tablet before translating the final clause, because his instincts — thirty years of instincts — tell him that what he's about to read will change things, and he should have a record of seeing it for the first time.\n\n*...and on the day when the last bloodline signs, the covenant completes, and peace shall be made permanent by the silence of all memory.*\n\nHis phone shows twelve missed calls. Eight from his university. Three from an international number he doesn't recognize. One from his daughter.\n\nHe knows, suddenly, that he is no longer alone in deciding what to do with this.\n\nWho does he call back?`,
      choices: [
        {
          id: "call-daughter",
          text: "Call his daughter first. Whatever this is, family comes before scholarship",
          consequence: "Prioritize family",
        },
        {
          id: "call-unknown",
          text: "Call the unknown international number. They already know he has it",
          consequence: "Face the unknown",
        },
        {
          id: "call-university",
          text: "Call the university. This needs institutional oversight, not a lone scholar making decisions",
          consequence: "Follow protocol",
        },
        {
          id: "call-nobody",
          text: "Call nobody. Go to a different archive. Find out what this is before anyone else does",
          consequence: "Work alone",
        },
      ],
    },

    // ─── NEW STORY OPENING ────────────────────────────────────────────────────
    "apology-to-a-dragon": {
      narrativeText: `You're polishing a scale.\n\nNot your scale — obviously. It's one of Belvane's, shed yesterday and left in the middle of the walkway like a gift from a king. Copper-coloured, the size of your palm, still warm. Keepers are supposed to collect shed scales and log them. You're supposed to be logging it. Instead, you're sitting on an upturned bucket outside Belvane's stall, rubbing it with a cloth and watching the sunrise turn the Roost orange.\n\nIt's quiet. That almost never happens here. The morning feeding isn't for another twenty minutes, and the dragons are still sleeping — you can hear the deep, slow rumble of six enormous creatures breathing in their stalls. The stone walls of the Roost are warm from yesterday's heat. A sparrow lands on the railing, looks at you, and leaves.\n\nThe quiet dies the moment Gresha rounds the corner. Clipboard. Fast walk. Never good signs.\n\n"Belvane has not left his stall in four days," she says, not slowing down. "He won't eat. He won't fly. Torben tried yesterday and got a face full of smoke." She flips the clipboard shut. "The Festival committee wants all six dragons in the air for the opening ceremony. He's your dragon. Figure it out. Twelve days."\n\nShe walks away. Then Torben finds you — leaning on the railing like he's posing for a portrait — and asks what you think set Belvane off.\n\nAnd then you remember. Four days ago, the Festival committee watched the demonstration flight. Belvane flew beautifully — even landed his barrel roll. And then the committee announced that Silverine would lead the opening formation. Not Belvane. They didn't even say his name.\n\nBelvane landed, walked to his stall, and the door hasn't opened since. Behind it now: a low, quiet sound. Almost like a sigh.\n\nYou stand up. The bucket tips over behind you. You don't pick it up.\n\nWhat do you do?`,
      choices: [
        {
          id: "sing-outside",
          text: "Sit outside his door and sing the lullaby that always calms him — wait as long as it takes",
          consequence: "The slow approach",
        },
        {
          id: "petition-committee",
          text: "March to the Festival committee and argue that Belvane should lead the formation instead of Silverine",
          consequence: "The bold play",
        },
        {
          id: "ask-torben",
          text: "Swallow your pride and ask Torben for help — a fresh approach might be what Belvane needs",
          consequence: "Swallow your pride",
        },
        {
          id: "maintenance-hatch",
          text: "Sneak in through the off-limits maintenance hatch and face him directly — no door between you",
          consequence: "Go in uninvited",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
  };

  return (
    openings[storyId] || {
      narrativeText: `Your journey begins in ${story.title}.\n\n${story.description}\n\nThe story unfolds before you. What do you do?`,
      choices: [
        { id: "begin", text: "Begin the journey", consequence: "Start" },
      ],
    }
  );
}
