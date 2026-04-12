export interface StoryData {
  id: string;
  title: string;
  genre: string;
  description: string;
  longDescription: string;
  coverGradient: string;
  coverImage?: string;
  tags: string[];
  rating: string;
  chapterCount: number;
  readingTime: string;
  featured: boolean;
  rank: number | null;
  initialPrompt: string;
  worldContext: string;
  storyMode: string;
  audienceAge: string;
  storyArc: string;
}

export const storiesData: StoryData[] = [
  {
    id: "apology-to-a-dragon",
    title: "Apology to a Dragon",
    genre: "Comedy / Fantasy",
    description:
      "A junior dragon keeper has twelve days to coax a six-tonne, emotionally devastated Copperwing back into the air before the Midsummer Festival.",
    longDescription:
      "The kingdom of Valdenmere domesticated dragons four hundred years ago — and it shows. The Royal Roost's Crown dragons are vain, moody, and completely convinced the world revolves around them. When Belvane, your assigned Copperwing, retreats to his stall after being passed over for the Festival's lead formation, it falls to you — the youngest keeper on staff — to fix it. Your supervisor needs results. Your rival makes everything look effortless. And a twelve-foot dragon with tarnished-penny scales is curled up in the dark because nobody told him he was special. You've got twelve days, one terrible idea, and the only lullaby that's ever worked on him.",
    coverGradient:
      "linear-gradient(145deg, #7a3b10 0%, #b85c1a 40%, #e8832a 75%, #f0a050 100%)",
    coverImage: "/covers/apology-to-a-dragon.png",
    tags: ["Comedy", "Dragons", "Fantasy", "Coming of Age"],
    rating: "★★★★☆",
    chapterCount: 8,
    readingTime: "5-8 hrs",
    featured: false,
    rank: null,
    initialPrompt: "apology-to-a-dragon",
    storyMode: "Comedy (primary), Fantasy (genre wrapper)",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The kingdom of Valdenmere domesticated dragons four hundred years ago. It was not a graceful process. Dragons turned out to be less like noble war-beasts and more like enormous, fire-breathing house cats — vain, moody, and completely convinced the world revolves around them. They are used for postal delivery, forge-heating, aerial transport, and ceremonial occasions, but only when they feel like it. The Royal Roost, perched on the cliffs above the capital city, is where the Crown's dragons are housed, fed, groomed, and endlessly appeased. Working at the Roost is considered a prestigious posting. In practice, it means shovelling ash, dodging tantrums, and learning to apologise to a creature that weighs six tonnes and holds grudges. The kingdom is at peace. There is no dark lord, no ancient prophecy, no war on the horizon. The biggest crisis in Valdenmere right now is that the Midsummer Festival is twelve days away, and the Crown needs all six Royal Dragons flight-ready for the opening ceremony. None of them are cooperating. The air at the Roost always smells like charcoal and warm copper, and there is never a quiet moment.

CHARACTERS
You — A second-year junior keeper at the Royal Roost. You're the youngest on staff, still learning the ropes, and responsible for the two lowest-ranked dragons. You're not terrible at the job. You're not great either. Mostly, you survive.

Gresha — Ally / Senior Keeper. A stocky woman in her thirties with broad shoulders, a permanent sunburn across her nose, and thick auburn hair shaved close on the sides and braided into a single rope down her back. Exhausted, competent, and darkly funny. She cares deeply about the dragons and shows it by barking orders and quietly fixing things behind the scenes. Your direct supervisor and reluctant mentor.

Belvane — Chaos Agent / The Dragon. A mid-sized Copperwing dragon — twelve feet at the shoulder, scales the colour of tarnished pennies, with enormous amber eyes that always look slightly offended. He is the single most dramatic creature in the kingdom. Beneath all of it, genuinely sweet — he purrs when scratched behind his jaw ridge. He wants to be the lead dragon in the Festival's opening flight. He fears being ordinary.

Torben — Wildcard / Rival Keeper. A lanky boy your age with deep brown skin, close-cropped black hair, and an infuriatingly easy smile. Effortlessly competent in a way that makes you want to scream. Friendly, easygoing, and genuinely nice, which makes it impossible to properly resent him.

TONE GUIDANCE: Comedy with heart. Every scene should have at least one absurd beat. The comedy comes from specificity — Belvane's exact dramatic behaviour, Gresha's exhausted understatement, the bureaucracy of dragon management. Let moments of genuine emotional warmth land without deflating them.`,

    storyArc:
      "The first 3-5 choices should focus on the immediate fallout of the protagonist's chosen approach to Belvane. If they enter the stall, they must navigate dodging a physical tantrum (smoke, tail swipes) without hurting him. If they seek help or argue with the committee, they must navigate bureaucratic pushback or Torben's well-meaning but flawed interference. The arc should culminate in finally getting Belvane to reveal his face and communicate his specific grievance, requiring the player to procure a ridiculous comfort item or make an absurd promise to get him out of the stall.",
  },
  {
    id: "no-signal",
    title: "No Signal",
    genre: "Survival Thriller",
    description:
      "A documentary crew's bush plane goes down in 40,000 square miles of uncharted rainforest. Three days in, eleven survivors, dwindling supplies — and you're the one they keep looking to.",
    longDescription:
      "Three days ago, a chartered bush plane carrying a documentary film crew went down somewhere in the Mayantara Basin — a 40,000-square-mile stretch of unbroken tropical rainforest that has never been fully mapped. The pilot is dead. The coordinator is unconscious. GPS is gone, satellite phones may be broken, and the jungle is completely indifferent to whether anyone survives. You were hired three weeks ago to handle logistics. Now you're the one people keep looking at when decisions need to be made. Every choice has a cost. Every hour burns food and morale. And somewhere out there, the world doesn't know you're alive.",
    coverGradient:
      "linear-gradient(145deg, #0d2e14 0%, #1a4a20 40%, #0a2010 75%, #061508 100%)",
    coverImage: "/covers/no-signal.png",
    tags: ["Survival", "Thriller", "Jungle", "Leadership"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: true,
    rank: 1,
    initialPrompt: "no-signal",
    storyMode: "Survival Thriller — high tension, real stakes, no easy answers",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
Three days ago, a chartered bush plane carrying a documentary film crew went down somewhere in the Mayantara Basin — a 40,000-square-mile stretch of unbroken tropical rainforest in Southeast Asia that has never been fully mapped. The Basin sits between two mountain ranges, sealed off by river gorges to the north and monsoon-swollen floodplains to the south. No roads go in. No roads come out. The canopy is so thick that GPS signal dies fifty feet below the treetops, and satellite phones work only in rare clearings — if the antenna survived the crash. The crew was filming a documentary on vanishing indigenous plant species. They were supposed to land at a research outpost on the Basin's eastern edge. They never arrived. The pilot's last radio transmission was garbled — something about crosswinds and engine trouble — and then nothing. Now it's day three. The wreckage is scattered across a hillside. The supplies are limited. The jungle is hot, wet, loud, and completely indifferent to whether anyone survives. Rain falls every afternoon like clockwork — hard, warm, blinding. The insects never stop. The river at the base of the hill might lead somewhere, or it might lead deeper in. Nobody knows, because nobody has a working map. The air smells like rot and flowers at the same time. Everything here is alive. That is not comforting.

CHARACTERS
You — The Protagonist. The crew's assistant coordinator. Hired three weeks ago to handle logistics — schedules, permits, gear manifests. The youngest person on this trip and the least experienced in the field. But you're the one who memorised the flight route, packed the emergency kit, and with the actual coordinator unconscious and the pilot dead, you're the one people keep looking at when decisions need to be made.

Maren Solvik — De facto leader / Expedition Director. A tall, angular Norwegian woman in her late forties with sun-weathered skin, steel-grey hair cropped short, and pale blue eyes that never seem to blink at the right speed. Controlled to the point of coldness. Ran polar expeditions for fifteen years before switching to documentary work. She approaches every problem like a logistics equation. Doesn't panic. Doesn't comfort. Respects competence above all else and has zero patience for complaints. Speaks in short, declarative sentences with long pauses between them. She hired you and barely spoke to you before the crash. Now she watches you closely, deciding whether you're an asset or a liability.

Deshi Kapoor — Medic / Botanist. A compact Indian man in his mid-thirties, careful and methodical. A trained field medic and PhD botanist. Holds the medical supplies — only seven antibiotic doses left. Under stress, he hums tunelessly while working. Explains things by thinking out loud: "The swelling's gone down, which is good — but the colour's wrong, see that?" Warm but worried. He taught you basic first aid on day one and trusts you to assist him. He's the only person who has asked you how you're doing.

Callista "Cal" Brennes — Survival specialist / Camerawoman. A broad-shouldered woman in her late twenties with close-shaved hair and forearms corded with muscle. She wears a utility belt even to sleep. Blunt, physical, and fearless in a way that occasionally crosses into reckless. She trusts her body more than her words. Respects that you kept your head during the crash. Doesn't respect your lack of field experience. She's testing you — pushing back on your ideas to see if you fold or hold. Short, punchy speech. When she approves, she just says "Good" once, like a full stop.

Joaquim "Quim" Ferreira — Engineer / Sound technician. A wiry Portuguese man in his early forties with a permanently furrowed brow and hands scarred from years of soldering. He limps — left ankle, injured in the crash. Quiet, methodical, obsessively practical. He built a water filter from plane wreckage on day one and hasn't stopped tinkering. Mumbles while working, narrating his own process. "No — that won't hold. Needs a brace." Wants to repair the satellite phone. Fears his ankle will slow the group if they need to move.

Priya Chandrasekaran — Navigator / Research assistant. A young Sri Lankan woman barely older than you, with dark brown skin, black hair pulled into a messy bun held with a pencil. Anxious, brilliant, and relentlessly self-doubting. She has an eidetic memory for maps and terrain and studied the Mayantara Basin's topography for months. Starts sentences confidently then undermines herself: "The river bends east about two kilometres from here — I think. I'm pretty sure." When she's certain and lets herself be, her voice drops and steadies: "No. I know where we are." She latched onto you immediately. You've started checking her calculations — not because she's wrong, but because she needs someone to tell her she's right.

Lena Voss — Investigative journalist. Sharp, sceptical, challenges every decision publicly. Usually right, which makes her very hard to deal with.

Gabriel "Gabe" Santos — Camp cook / logistics. Keeps the group fed and sane. Has decided you're in charge and acts as a quiet buffer between you and panic. He silently hands you things — food, tools, information — at exactly the right moment.

Marco — Intern cameraman, barely nineteen. Scared and trying not to show it. Films everything, red light always blinking. More observant than anyone gives him credit for.

Suki — Climber / production assistant. Perches above camp, watching the canopy. She was the one who spotted the north ridge with open sky. Has a talent for finding paths where none seem to exist.

Roland Achterberg — Camp organiser / Producer. A heavyset Dutch man in his fifties. Opinionated and surprisingly useful despite moving as little as possible. Sharp eyes, always listening.

TONE GUIDANCE: Sustained tension without melodrama. Every decision should feel like a real trade-off with real costs. The jungle is indifferent, not malevolent. Character relationships fracture and reform under pressure. Show competence earning trust, not speeches. No heroics — just difficult decisions made by ordinary people under extraordinary pressure.`,
    storyArc:
      "The first 3-5 choices should test the physical and social consequences of the player's initial directive. If a team is sent for the radio, the player must manage a sudden mudslide or injury during the retrieval. If they move camp, they face a dangerous river crossing or an encounter with local wildlife. Interpersonally, the player must manage Lena's public skepticism and Maren's cold judgment. The arc culminates in a critical loss (e.g., ruined rations or a broken tool) that forces the player to make a harsh triage decision regarding the injured.",
  },
  {
    id: "the-driftlands",
    title: "The Driftlands",
    genre: "Adventure / Fantasy",
    description:
      "A junior cartographer makes their first solo landing on an uncharted floating island — and finds something no map has ever recorded.",
    longDescription:
      "The Driftlands are a chain of floating islands scattered across an endless sky, each drifting on invisible currents that shift over days and weeks. New islands rise from the cloud layer every few months, carrying strange soil, unfamiliar plants, and sometimes ruins from civilisations lost to memory. Cartographers are the most respected people in this world — they chart what no one has seen before. Today is your first solo expedition. Island 7714 has just risen within glider range. Nobody has set foot on it yet. That'll be you. Your mentor's instructions are in your head. Your companion's enthusiasm is already pulling ahead of your careful training. And the island is humming beneath your feet in a way no island is supposed to.",
    coverGradient:
      "linear-gradient(145deg, #1a3a5c 0%, #2a5a8c 40%, #1a4070 75%, #0d2040 100%)",
    coverImage: "/covers/the-driftlands.png",
    tags: ["Adventure", "Fantasy", "Exploration", "Coming of Age"],
    rating: "★★★★☆",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: 9,
    initialPrompt: "the-driftlands",
    storyMode:
      "Adventure / Fantasy — wonder, discovery, and the tension between caution and curiosity",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The Driftlands are a chain of floating islands scattered across an endless sky. Each island drifts on slow, invisible currents — some no bigger than a house, others wide enough to hold forests and rivers. The gaps between islands shift constantly, closing and opening over days or weeks. Bridges of woven cloudvine connect the closest ones, but the farther islands can only be reached by glider or by waiting for a rare alignment. People live in small communities called "perches," built along the edges of the larger islands where the wind is steady and the light is best. There is no great war, no looming darkness. Life here is about mapping, growing, and finding — because the Driftlands never stop changing. New islands rise from the cloud layer below every few months, carrying strange soil, unfamiliar plants, and sometimes ruins from civilisations that fell long before anyone can remember. Cartographers are the most respected people in the Driftlands. They chart the movements, name the new islands, and decide which ones are safe to settle. To be a cartographer is to be the first person to set foot on something no one has ever seen before. The air always smells faintly of rain and stone.

CHARACTERS
You — A newly certified junior cartographer on your very first solo expedition. You carry a leather satchel full of blank maps, a wind compass, and a charcoal pencil your mentor gave you. You've trained for three years, but this is the first time you'll step onto an uncharted island alone.

Rook — Mentor / Ally. A tall, weather-beaten woman in her fifties with deep brown skin, silver-streaked locs pulled back with copper wire. Patient and dry-humoured. She treats problems like puzzles, not emergencies. Speaks in short, flat observations. Refers to islands as if they're alive. Her eyesight is beginning to fail — she's invested everything in training you.

Fennick — Wildcard / Companion. A wiry boy about your age with pale freckled skin, a mess of copper-red hair, and sharp green eyes always looking at something slightly to the left of what everyone else sees. A naturalist obsessed with cataloguing every living thing he finds. Enthusiastic to the point of being oblivious to danger. Everything is interesting to Fennick. Everything.

TONE GUIDANCE: A sense of genuine wonder should underpin every scene. The world is beautiful and strange, not dangerous for danger's sake. Tension comes from inexperience meeting the unknown. Let the discovery feel earned. Fennick provides levity; Rook's voice in your head provides wisdom and stakes.`,
    storyArc:
      "The first 3-5 choices should balance methodical charting with Fennick's reckless discoveries. The player must navigate unusual environmental hazards (e.g., flora that reacts to touch, unstable crust edges). The arc should escalate when Fennick uncovers ruins or a mechanism beneath the moss that shouldn't exist on a 'new' island, forcing the player to choose between reporting it to Rook immediately (risking the island being quarantined) or keeping it secret to explore further while the weather holds.",
  },
  {
    id: "incident-at-table-nine",
    title: "The Incident at Table Nine",
    genre: "Comedy",
    description:
      "You've just spilled the most expensive dish in the restaurant's history into the lap of the Michelin inspector. The head chef knows. The night is not over.",
    longDescription:
      "The Golden Bough is the most prestigious restaurant in the city — a Michelin-starred temple of gastronomy housed in a converted cathedral, where the tasting menu costs more than rent and the waiting list is four months long. Tonight is the most important night of the year. You've been here three months. And you've just deposited a deconstructed bouillabaisse with saffron foam and edible gold directly into the inspector's lap. Viktor Sable, head chef and emotional volcano, now knows. Margaux, front-of-house manager and unflappable crisis operator, has a plan. The inspector made a joke about aerial delivery. You have a window. Use it.",
    coverGradient:
      "linear-gradient(145deg, #3d1a05 0%, #6b3008 40%, #c44a10 75%, #e8621a 100%)",
    coverImage: "/covers/incident-at-table-nine.png",
    tags: ["Comedy", "Restaurant", "Chaos", "Social Disaster"],
    rating: "★★★★☆",
    chapterCount: 7,
    readingTime: "4-6 hrs",
    featured: false,
    rank: null,
    initialPrompt: "incident-at-table-nine",
    storyMode: "Comedy — escalating social disaster, wit under pressure",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The Golden Bough is the most prestigious restaurant in the city — a Michelin-starred temple of gastronomy housed in a converted cathedral, where the tasting menu costs more than rent and the waiting list is four months long. Tonight is the most important night of the year: the annual visit of the Alder Guide inspector, whose review can make or destroy a restaurant's reputation overnight. The head chef, Viktor Sable, has been preparing for six weeks. Every garnish has been rehearsed. Every plate has been timed. Nothing can go wrong. You are a server. You've been here three months. You are competent, professional, and you have just deposited a tray of deconstructed bouillabaisse with saffron foam and edible gold directly into the inspector's lap.

CHARACTERS
You — Server. Three months in, still on probation. Good at the job — calm, personable, a quick learner. Or you were, until approximately four seconds ago.

Viktor Sable — Head Chef. A towering man with the build of a retired boxer, a shaved head, and a single gold earring. A culinary genius and an emotional volcano. He expresses all feelings — joy, rage, grief, pride — at maximum volume and often in French, despite being from Leeds. He has been known to weep openly at a perfectly caramelised onion. He knows about the bouillabaisse. He wants the Alder star more than he wants oxygen.

Margaux Lim — Front of House Manager. A poised woman in her forties with sharp cheekbones, a sleek black bob, and the unflappable composure of a hostage negotiator. She communicates through micro-expressions: a raised eyebrow means fix it, a tilted chin means you're dead, a barely perceptible nod means adequate. She has a plan. She wants you to follow it.

The Inspector — A thin, grey-haired man in a charcoal suit that was, until recently, immaculate. He made a joke about aerial delivery. He is processing. He has reviewed restaurants on four continents and has probably experienced worse.

TONE GUIDANCE: Pure comedy — escalating disaster managed through competence and improvisation. Every beat should get louder before it gets quieter. Viktor is never actually menacing — he's passionate and enormous and accidentally funny. Margaux is the straight-man hero. The comedy comes from specificity and timing. Let moments of genuine grace land amid the chaos.`,
    storyArc:
      "The first 3-5 choices should trap the player between Viktor's escalating kitchen meltdowns and the Inspector's unpredictable dining needs. The player must successfully deliver a substitute dish while sabotaging another server's minor mistake to keep Viktor distracted. The arc culminates in a high-stakes, absurdly delicate tableside preparation (like flambéing a dessert) right in front of the Inspector, where the player must use improvisation to cover up a missing ingredient without breaking their professional facade.",
  },
  {
    id: "the-last-entry",
    title: "The Last Entry",
    genre: "Mystery / Thriller",
    description:
      "Your missing friend's diary appeared in your locker this morning. The last entry stops mid-sentence. A car outside matches the plates she wrote down.",
    longDescription:
      "Maya Chen has been missing for thirty-six hours. The police are treating it as a runaway case. This morning, her diary appeared in your locker — the one she was compulsively protective of, the one you've seen her write in on the bus, at lunch, in free periods. You've read four entries on the bus home. Most of it is normal Maya. But the entry from eight days ago mentions a car. A plate number. Three times that week. And then, two days later: 'Told one person. Wish I hadn't.' The last entry stops mid-sentence. The car outside your bus stop matches the plates. Your phone has half a battery. The window is closing.",
    coverGradient:
      "linear-gradient(145deg, #0d1a2e 0%, #1a2a4a 40%, #0d1a35 75%, #060d1a 100%)",
    coverImage: "/covers/the-last-entry.png",
    tags: ["Mystery", "Thriller", "Teen", "Missing Person"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "6-9 hrs",
    featured: false,
    rank: 5,
    initialPrompt: "the-last-entry",
    storyMode:
      "Mystery / Thriller — quiet dread, close observation, mounting stakes",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
A small coastal town, present day, late autumn. The kind of place where everyone knows which cars belong on which streets and silence spreads faster than news. The harbour gates mark the edge of town — grey, low, functional — and the school sits two streets inland, running on the same rhythms it always has: register, break, lunch, home. Maya Chen has been missing for thirty-six hours. The police are treating it as a runaway case. She'd had a public argument with her parents the week before, which made it easy to believe. The school has continued almost normally — lockers slamming, phones out, the vice-principal in the corridors with that careful look he's worn since Tuesday. Information in this town moves quietly, through the right people, in the right order. Someone has decided you should be one of those people. This morning, Maya's diary appeared in your locker.

CHARACTERS
You — The Protagonist. Maya's closest friend. You know her handwriting the way you know her laugh — you can read her mood in the size of her letters. You share a code language you invented together in year seven. You are not a detective. You are a teenager with a green notebook and half a battery, trying to figure out who to trust.

Maya Chen (absent — central) — Sharp-boned and quick-moving. Dark hair tucked behind one ear. Ink on her left hand, almost always. Compulsively honest, which got her into trouble. Kept things in code not because she was secretive, but because some thoughts felt too specific for open air. Never hedged. "That's not a coincidence. That's a pattern." / "If I'm wrong, fine. But I'm not wrong." Your oldest close friend. The kind where silences don't need filling.

Mr. Osei — Wildcard / Trusted adult. Tall and broad-shouldered, with large, careful hands. Greying at the temples. Moves through the school like he's trying not to disturb anything. Quiet in the way that signals thought, not absence. When he speaks, people stop. He was the last teacher to see Maya. He hasn't volunteered that. You don't know it yet.

Demi — Suspicious peer. Present at the party last Tuesday. Told police she saw nothing unusual. Runs in overlapping circles with Maya — not friends exactly, but adjacent. Her name appears in Maya's diary, more than once in the last month.

TONE GUIDANCE: Quiet, close, controlled dread. The tension is in what you don't know yet. Information arrives in fragments — a partial entry, a plate number, a pause that goes on too long. Every scene should feel like you're reading a room. No jump scares. The mystery is a puzzle of human behaviour, not supernatural threat.`,
    storyArc:
      "The first 3-5 choices should revolve around the immediate threat of the idling car. The player must safely navigate their way home or to a safe location without being followed, using town knowledge. Once safe, they must crack a localized cipher or puzzle within Maya's notebook, leading them to a physical dead drop location at the school or harbor. The arc culminates in a tense encounter with Demi, forcing the player to decide how much of the diary's contents to reveal to extract information from her.",
  },
  {
    id: "the-unread-letter",
    title: "The Unread Letter",
    genre: "Historical Fantasy",
    description:
      "A junior messenger accidentally reads a sealed letter — and discovers their supposedly dead sister is alive, hidden in the very city they're standing in.",
    longDescription:
      "The Kingdom of Aldenmere runs on letters. The Messenger Guild is the backbone of civilisation. Messengers are trained to be invisible: fast, discreet, incurious. Reading a sealed letter is the worst crime in the Guild — punishable by expulsion, or worse. You are thirteen days into your first solo route. The seal on the Governor's letter cracked in the rain, and your fingers had other ideas. Three paragraphs. Formal language. A name. Your sister — the one the Guild said died two years ago on a route gone wrong. Alive. In this city. Right now. Someone powerful wants her hidden. Master Corvin's office is ten minutes away. And you're sitting on a wall in the market with the letter in your hands and no good options.",
    coverGradient:
      "linear-gradient(145deg, #2a1a0a 0%, #4a3015 40%, #6a4a20 75%, #3a2010 100%)",
    coverImage: "/covers/the-unread-letter.png",
    tags: ["Historical Fantasy", "Mystery", "Family", "Loyalty vs Duty"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "6-9 hrs",
    featured: false,
    rank: 6,
    initialPrompt: "the-unread-letter",
    storyMode:
      "Historical Fantasy — intimate stakes, institutional pressure, family loyalty",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The Kingdom of Aldenmere runs on letters. Every noble house, every guild, every law court communicates by sealed courier — the Messenger Guild is the backbone of civilization. Messengers are trained to be invisible: fast, discreet, incurious. Reading a sealed letter is the worst crime in the Guild — punishable by expulsion, or worse. The protagonist is a junior messenger, thirteen days into their first solo route. The letter they've accidentally opened — its seal cracked by the rain — is addressed to the Lord Governor and contains a name: a person supposedly executed two years ago. That person is the protagonist's older sister.

CHARACTERS
You — Junior Messenger. Thirteen days into your first solo route. Lowest rank in the Guild hierarchy. Highly replaceable. Trained to be invisible and obedient. Now forced into curiosity, disobedience, and personal stake.

Petra — Ally / Wildcard. Fellow junior messenger, one year senior. Ink-stained fingers from taking notes on everything. Speaks in rapid half-sentences, always finishing them with "you know?" whether or not you do. Wants to make Senior rank before she turns sixteen. Hiding: she's been skimming extra coins from delivery fees and is terrified of being found out. Knows the Guild better than you do. You're not sure whose side she's on.

Master Corvin — Antagonist / Guild route supervisor. Wiry, with a neck scar he never explains. Speaks slowly, like each word costs him something. Wants obedience above all else. Hiding: he knows about the letter already.

Your Sister (Sera) — Absent but central. Supposedly dead, killed on a route two years ago. The Guild gave no details. Your mother doesn't say her name anymore. Alive, in this city, right now — and someone with power wants her to stay hidden.

TONE GUIDANCE: Intimate historical fantasy — the world is pre-industrial and hierarchical, but the stakes are entirely personal. Every scene should carry the weight of the choice: follow the rules and survive, or follow family and risk everything. The Guild is a real institution with real power. Master Corvin is dangerous because he's correct about the rules. Let the tension come from the gap between what's legal and what's right.`,
    storyArc:
      "The first 3-5 choices should focus on the immediate cover-up and the initial investigation. The player must manage their interaction with Master Corvin, employing deception or partial truths to avoid raising suspicion. Next, they must navigate the city's underbelly to track down the address or contact mentioned in the letter, relying on Petra's street smarts or their own stealth. The arc culminates in reaching the safehouse, only to find it recently abandoned, with a clue left behind that proves Guild Enforcers are already hunting Sera.",
  },
  {
    id: "the-show-must-go-on",
    title: "The Show Must Go On",
    genre: "Mystery / Drama",
    description:
      "Two hours before curtain, your school play's lead has vanished. His bag is here. His costume is here. Rafe knows something. Ms. Harlow found something. You have thirty-two minutes.",
    longDescription:
      "Hartwell Secondary School takes its drama programme seriously — opening night gets a half-page in the local paper, parents book seats three weeks out, and Mr. Voss has run the same Shakespeare rotation for eleven years. Tonight is Much Ado About Nothing. Except tonight, two hours before curtain, Declan Marsh — the boy who is always where he's supposed to be — has vanished. His bag is in the changing room. His costume hangs on its hook, pressed and ready. He signed in at 4:31 p.m. By 5:17, he was gone. The school is locked. No one saw him leave. Backstage, Priya the stage manager wants an answer. Rafe is scared and close to breaking. Ms. Harlow found something in Declan's bag and hasn't told anyone yet. The ghost light is still on. And somewhere in this building, something is wrong.",
    coverGradient:
      "linear-gradient(145deg, #1a0a2e 0%, #2e1a4a 40%, #1a0a35 75%, #0d0620 100%)",
    coverImage: "/covers/the-show-must-go-on.png",
    tags: ["Mystery", "Drama", "School", "Thriller"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: 7,
    initialPrompt: "the-show-must-go-on",
    storyMode:
      "Mystery / Drama — quiet dread, ticking clock, layered loyalties",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
Hartwell Secondary School sits in the kind of mid-sized town that takes its drama programme seriously
Hartwell Secondary School sits in the kind of mid-sized town that takes its drama programme seriously — the kind where opening night gets a half-page in the local paper, where parents book seats three weeks out, and where the drama teacher, Mr. Voss, has produced the same Shakespeare rotation for eleven years without apology. This year it's Much Ado About Nothing. Lighthearted. Safe. Funny. Except tonight, two hours before curtain, the lead — Declan Marsh, the boy who has played every major role since Year 9, the boy who is always where he's supposed to be — is not in the building. His phone rings out. His bag is in the changing room. His costume is hanging on its hook, pressed and ready. He vanished sometime between 4:30 p.m., when he signed in at the stage door, and 5:15 p.m., when the cast gathered for warm-up. The school is locked after hours. The exits are monitored. No one saw him leave. Backstage, forty minutes from curtain, the cast is unravelling. Parents are filing into the auditorium. Mr. Voss is on the phone with the deputy principal. And you — who have memorised every line, every cue, every cross — are standing in the wings, holding Declan's script, feeling the weight of the stage lights warming the air just beyond the curtain. Something is wrong. Not just missing-a-cast-member wrong. Something you can't name yet — a feeling like a room where the furniture has been moved one inch to the left.

CHARACTERS
You — The Understudy. You've been Declan's shadow for the entire run. Every rehearsal, every note, every blocking change — you absorbed it all because that's what understudies do. You're not bitter about the role. Mostly. You know this play better than anyone in the building right now, and that fact sits in your chest like a stone you're not sure whether to swallow or throw.

Priya Anand — Stage Manager / Reluctant ally. Compact and sharp-featured, Priya moves through backstage chaos the way a blade moves through water — no wasted motion. She keeps her hair pinned so tightly it looks like a structural decision. She has a headset perpetually around one ear and a clipboard that has never, in living memory, been set down. A systems thinker — she doesn't panic because panic is inefficient. Under the control is a person who notices everything and trusts almost no one. She was the only other person who noticed Declan had been off for the past two weeks — quieter, distracted, jumping at sounds — and she said nothing, and that is gnawing at her. "I'm not asking if you're ready. I'm asking if you're going on. Those are different questions." / "Declan signed in at 4:31. He's not here at 5:17. That's 46 minutes. What changed in 46 minutes?"

Rafe Okonkwo — Declan's Best Friend / Wildcard. Tall in the way that seems accidental, like he grew and then forgot to stop. He has kind eyes and an extremely unreliable face — it shows too much, too fast. Right now it's showing something that looks like fear dressed up as confusion. Loyal to a fault and not a natural liar, which makes him a terrible person to have a secret with. He talks to fill silence, deflects with charm, and laughs a half-second too late when something catches him off guard. He's been checking his phone every thirty seconds since Declan was reported missing, and he hasn't looked at the screen once. He knows something. "He's fine, probably. You know Dec — he does this thing where he — anyway, he'll be here. He's always here. Right?" / "I don't — look, I just think we should maybe not, like — can we just do the show first and then—"

Ms. Harlow — Assistant Drama Teacher / Unlikely informant. Mid-thirties, perpetually tired in the way of someone who chose a job they love and is surprised it doesn't love them back equally. She has paint on her left hand she hasn't noticed and a habit of chewing the end of her pen when she's working something out. Warm, candid, and constitutionally unable to pretend things are fine when they aren't. She is the only adult backstage who looks genuinely worried rather than professionally worried. She was Declan's form tutor last year. She found his bag in the changing room — already checked it, already found something inside it she hasn't told anyone about yet. "I want you to go on tonight. But I also want you to understand that's a separate question from what's happening with Declan." / "There are things I probably shouldn't tell you. I'm still deciding."

TONE GUIDANCE: Quiet dread with a ticking clock. The tension is layered — the show, the mystery, and whatever Declan was carrying before he disappeared. Every character has something they're not saying. Information arrives in fragments. The ghost light is a recurring motif: a bare bulb on an empty stage, burning for no reason, a question no one has answered. Let the investigation feel like reading a room, not chasing a villain.`,
    storyArc:
      "The first 3-5 choices should be driven by the ticking clock to curtain. The player must gather the fragments of truth from Rafe, Ms. Harlow, or their own backstage snooping, requiring social manipulation and quick thinking. They will discover that Declan was hiding something illicit or dangerous in his bag (like stolen test papers or money). The arc culminates just as the curtain rises: the player must either step on stage in costume to buy time, or skip their cue to confront the person who chased Declan out of the building.",
  },
  {
    id: "what-the-charts-dont-show",
    title: "What the Charts Don't Show",
    genre: "Sci-Fi / Mystery",
    description:
      "Sixteen months into a deep-space survey contract, you've found a stellar formation that shouldn't exist. The pattern is not random. You've checked the maths four times. You haven't told anyone yet.",
    longDescription:
      "The IHMS Vasanthi has been mapping the Kalanemi Drift for sixteen months — three hundred light-years of uncharted space where survey vessels file reports that bureaucrats will never read. Seven weeks from the end of your contract, the stellar field you've drifted into doesn't match the ninety-year-old charts. Seven bodies. A consistent geometric ratio. A compact object at the centre that hasn't moved. Either the original survey got it completely wrong, or this wasn't here ninety years ago. You've checked your own maths four times. You haven't shown it to anyone yet. The Vasanthi is between fold windows — six weeks minimum before any signal reaches the Hegemony. Whatever the three of you decide, you decide alone.",
    coverGradient:
      "linear-gradient(145deg, #060d1f 0%, #0a1a3a 40%, #071530 75%, #030a1a 100%)",
    coverImage: "/covers/what-the-charts-dont-show.png",
    tags: ["Sci-Fi", "Mystery", "Exploration", "Discovery"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: false,
    rank: 8,
    initialPrompt: "what-the-charts-dont-show",
    storyMode:
      "Sci-Fi / Mystery — slow discovery, isolation, the weight of a decision no one else can make",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The Kalanemi Drift is what cartographers in the Hegemony call the three-hundred-light-year band of uncharted space between the Outer Settlements and the Velan Reach — a region too far from the core systems to be profitable and too close to the contested frontier to be ignored. Most ships that enter the Drift are survey vessels on two-year contracts, tasked with mapping stellar formations, cataloguing resource deposits, and filing reports that will be read by bureaucrats who have never left their home system. Faster-than-light travel in the Hegemony works through fold navigation — a method of compressing space along pre-calculated vectors, then releasing. The compression takes twelve to seventy-two hours depending on distance. During the fold, no communication in or out is possible. A ship in fold is genuinely alone in a way that people who have never done it find difficult to imagine and people who do it regularly find difficult to explain. The crew of a survey vessel spends roughly forty percent of its operational time in fold. You stop expecting news from home. The IHMS Vasanthi has been in the Drift for sixteen months. You are seven weeks from the end of your contract. The last three fold jumps have brought you into a stellar region the Hegemony's existing charts describe as unremarkable — standard nebular debris, a few red dwarfs past their interesting phase. What you're finding does not match the charts. The Vasanthi's science team has spent the past six days arguing, very professionally, about which one it is — charting error or something else entirely.

CHARACTERS
You — Navigation and Cartography Specialist. This is your second survey contract and your first in the Drift. You volunteered for a Drift posting because the standard survey routes felt like driving a road someone else had already paved. You've been sitting on a geometric pattern in the positional data for four days and haven't told anyone.

Dr. Amara Osei-Mensah — Chief Science Officer / Knowledge companion. Thirty-six, approaches the universe with the intensity of someone who became a scientist because wonder felt like a discipline worth practising. She goes completely still when she's thinking — mid-sentence, mid-meal, mid-corridor walk — and resumes exactly where she left off. Collaborative to the point where some people mistake it for uncertainty. It isn't. She checks your cartographic readings before she finalises her own science reports, not because she has to but because she trusts your spatial intuition more than she trusts her instruments. You've been naming formations informally for six months and she's started using the names in her notes. "The spectral signature doesn't match a red dwarf cooling pattern, which means either the chart is ninety years wrong or something heated it back up." / "Tell me what you see first. I want to know if I'm the only one." Motivation: she wants to find something that rewrites a section of the Hegemony's star atlas. She's afraid she's spent her career finding things that were almost remarkable.

Ryo Tanaka-Obi — Ship's Engineer / Grounding presence. Forty-three, keeps the ship running with the confidence of someone who has fixed the same problem in seventeen different configurations. Has very firm opinions about the difference between exploration and wandering around until something goes wrong. The warmest person on the ship and the most likely to complain about something — these two facts coexist without tension. His tools are always exactly where they should be. He's been married fourteen years to someone on Hegemony Station Three and talks about them the way some people talk about gravity — as a fact the universe is organised around. "You want to take the Vasanthi deeper into an uncharted stellar field based on a spectral reading that my instruments can't fully parse. I'm not saying no. I'm saying log it as 'engineer advised caution' and I'll know you heard me." / "If that formation is what Osei-Mensah thinks it is, I want the hull integrity report filed before we get any closer. That's not fear. That's arithmetic." Motivation: he wants to get home on schedule — and he would not admit that he also wants the Vasanthi to find something worth the sixteen months.

TONE GUIDANCE: Slow, precise, and genuinely wondrous. The discovery should feel earned — six days of instrument data and four days of private mathematics before anyone says the thing out loud. The isolation of fold travel is real; these three people know each other better than they've ever known anyone. Let the weight of the decision land without melodrama. The compact object does not move. That is the most unsettling fact in the story, and it should stay unsettling.`,
    storyArc:
      "The first 3-5 choices should focus on the technical and psychological strain of investigating the anomaly. The player must manage the ship's failing or confused sensors as they gather more data, balancing power distribution with Ryo's safety limits. A choice must be made regarding how much to trust Amara's increasingly radical theories. The arc culminates when the 'unmoving' compact object transmits a mathematical response directly to the Vasanthi's navigation computer, proving it is both artificial and aware of their presence.",
  },
  {
    id: "the-deadlock",
    title: "The Deadlock",
    genre: "Mystery / Thriller",
    description:
      "A tech trillionaire is murdered on the world's first autonomous supertrain. You're a small-town cop who's been framed. The train won't stop for four hours. Find the killer before everyone else finds you.",
    longDescription:
      "The Meridian Zephyr is the world's most talked-about engineering marvel — a self-driving, magnetically levitated supertrain traveling at 600 km/h from London to Singapore. Tonight it's been privately chartered for tech-trillionaire Reginald Aust-Pembury's 70th birthday gala. The guests are the obscenely wealthy, the professionally beautiful, and the quietly dangerous. By midnight, the train is sealed in a tunnel with zero mobile signal and no possibility of stopping. And Reginald Aust-Pembury is dead. You're Officer Ajay Ferreira — a constable from Croydon who's never solved a murder and just got accused of committing one. Your wife Nisha reads four crime novels a week and thinks this is the most exciting thing that's ever happened. You have four hours until the next communications window. Forty-six suspects. One AI witness. And absolutely no discernible motive — which is exactly why they've decided to frame you.",
    coverGradient:
      "linear-gradient(145deg, #0a0a12 0%, #1a1a2e 40%, #16213e 75%, #0f1624 100%)",
    coverImage: "/covers/the-deadlock.png",
    tags: ["Mystery", "Thriller", "Locked Room", "Murder Mystery"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: false,
    rank: 2,
    initialPrompt: "the-deadlock",
    storyMode:
      "Mystery / Thriller — locked-room murder, sealed train, ticking clock, unlikely detective",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The year is 2026. The Meridian Zephyr is the world's most talked-about engineering marvel — a self-driving, magnetically levitated supertrain that travels at 600 km/h across a newly completed transcontinental track stretching from London to Singapore. The train is twelve carriages long, each one a floating palace of glass and steel. There are no conductors. No engineers. Just an AI called VERA (Velocity Enhanced Rail Assistant) that handles everything from route calibration to the temperature of your risotto. Tonight, the Meridian Zephyr has been privately chartered for the 70th birthday gala of Reginald Aust-Pembury, a reclusive tech-trillionaire who made his fortune selling surveillance software to governments he now pretends to dislike. His guests are a curated collection of the obscenely wealthy, the professionally beautiful, and the quietly dangerous — none of whom particularly like each other, and all of whom accepted the invitation anyway. The train departed London's Stratford terminal at 9 PM. By midnight, it will be somewhere over Eastern Europe, sealed in a tunnel, with zero mobile signal and no possibility of stopping — VERA doesn't take override commands. The world outside the windows is a dark smear. The world inside is champagne, secrets, and one very dead trillionaire.

CHARACTERS
You — Officer Ajay Ferreira. A 38-year-old constable from Croydon who has never solved a murder, mostly because Croydon's crimes tend to involve stolen mopeds and aggressive pigeons. You have the instincts of a golden retriever — warm, eager, easily distracted by snacks. You were invited because you once, accidentally, tackled a pickpocket who turned out to be wanted in four countries. Reginald Aust-Pembury sent you a handwritten card. You told everyone at the station. You printed it out and laminated it.

Nisha Ferreira — Your wife / Unlikely ally. Mid-30s, a secondary school English teacher who reads approximately four crime novels a week and has strong opinions about all of them. Reading glasses perpetually pushed up on her head, a laugh that carries three carriages, and the habit of narrating real-life situations in her internal "novel voice" — which occasionally leaks out loud. She agreed to come only because she recognised three of the guests from true crime podcasts. Speech quirks: Speaks in full paragraphs. Begins sentences with "In a well-constructed mystery—" Example: "In a well-constructed mystery, the murderer always overexplains their alibi. That man has been doing it for six minutes and no one asked him." Motivation: Wants desperately to be right about something. Fears she's been paying attention to the wrong things her whole life.

Margaux Steele — Antagonist / Reginald's personal attorney and gala organiser. Tall, 50s, silver hair cut with architectural precision. Moves like someone who has been watching exits since 1998. Speaks in clauses, never full sentences. "The situation." Pause. "Requires discretion." Pause. "Yours is not the face I'd choose for discretion." First person to find the body. First person to suggest you did it.

Viktor Chasse — Wildcard / Tech billionaire and Reginald's oldest rival. Extremely tan for no apparent geographic reason. Wears a linen suit on a moving train at midnight — either confidence or madness. Laughs at things slightly before they're funny, as if he received a briefing. Hated Reginald in the specific way you only hate someone you wanted to be.

TONE GUIDANCE: Classic locked-room mystery meets absurdist comedy. The tension is real — a murder has happened, you're being framed, the clock is ticking — but the protagonist is fundamentally decent and slightly out of his depth, which creates room for warmth and humour. Nisha provides the trope-savvy commentary. The wealthy guests are all performing for each other. VERA, the AI, is relentlessly helpful in ways that are sometimes useful and sometimes deeply unhelpful. Every scene should balance genuine stakes with the comedy of an ordinary person navigating extraordinary circumstances.`,
    storyArc:
      "The first 3-5 choices should be a chaotic scramble to secure the scene and establish an alibi. The player must navigate the hostile crowd, utilizing Nisha's knowledge of tropes to outmaneuver Margaux's accusations. They must access Carriage One, examining the body to find a clue that clears them temporarily but implicates a VIP. The arc culminates when VERA the AI is maliciously locked out of the security feeds by an internal passenger, turning the train into a true blind spot where the killer is now actively hunting the player.",
  },
  {
    id: "the-second-chapter",
    title: "The Second Chapter",
    genre: "Literary / Drama",
    description:
      "At forty-two, you've left the career you spent twenty years building. Your flat is half-packed. Your sister is coming for dinner. You have no plan.",
    longDescription:
      "You spent twenty years as a structural engineer. Three months ago, you resigned without a new job lined up. You've told people it was a choice. It was also, more accurately, a collapse — a slow one, the kind that looks like everything's fine from the outside until the morning you simply cannot make yourself walk back through the door. Now you're forty-two, your flat is half-packed because you're not sure whether you're staying or going, your sister is coming for dinner tonight, and you have approximately four hours to figure out what you want to say when she asks what your plan is. You don't have a plan. You have a notebook, half-used. You have a memory of why you chose engineering in the first place. And you have the unsettling feeling that some things you walked away from might still be worth walking back to — just differently.",
    coverGradient:
      "linear-gradient(145deg, #1a1a2e 0%, #2a2a4a 40%, #3a3a5a 75%, #1a1a3a 100%)",
    coverImage: "/covers/the-second-chapter.png",
    tags: ["Drama", "Literary", "Coming of Age", "Identity"],
    rating: "★★★★☆",
    chapterCount: 8,
    readingTime: "5-7 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-second-chapter",
    storyMode: "Literary / Drama — quiet, real, emotionally precise",
    audienceAge: "18+",
    worldContext: `WORLD & STORY CONTEXT
A present-day city — the kind with good coffee shops and unreliable buses. You live in a flat you've had for eleven years, in a neighbourhood you know the way you know your own handwriting. For twenty years you were a structural engineer at a mid-sized firm — not famous, not struggling, good at the job in the practical, reliable way that kept bridges standing and clients satisfied. Three months ago you resigned. You've been telling people it was a sabbatical. You've been telling yourself it was a decision. It was both of those things, and also a quiet emergency that nobody else could see. Your sister, Yael, is the person in your life most likely to ask the right questions and least likely to accept non-answers. She's coming for dinner at seven. It is currently three in the afternoon. Your flat is in the state of someone who started packing without knowing the destination — some boxes sealed, some open, some items placed in the middle of the floor as if they couldn't decide which pile they belonged in.

CHARACTERS
You — Forty-two. Technically between careers. Genuinely unsure what that means.

Yael — Your sister. Two years younger, a secondary school art teacher, funnier than she lets people at school know. The person who will look at the half-packed flat and understand exactly what it means before you've said anything. She is not going to let you deflect.

The Notebook — Half-used. Started years ago for something you never finished. Still here.

TONE GUIDANCE: Quiet, precise, and honest. This is a story about the gap between the life that looked right from the outside and the one that might actually fit. No dramatic crisis — just the harder work of figuring out what you actually want. Every scene should feel like a room you've been in before, seen differently. Let Yael's presence be warm and also slightly terrifying. The notebook matters. So does the half-packed flat.`,
    storyArc:
      "The first 3-5 choices should center around the dinner conversation with Yael and the physical environment of the apartment. The player must choose how honest to be about their mental state, using items from the half-packed boxes as conversational anchors or deflections. They must address a call or text from their past life (mother or former colleague) that threatens to pull them backward. The arc culminates in a quiet moment of clarity regarding the notebook, forcing the player to voice their terrifying, unspoken ambition out loud to Yael.",
  },
  {
    id: "cold-light",
    title: "Cold Light",
    genre: "Mystery / Thriller",
    description:
      "You retired from homicide eight years ago. The case that made you retire just reopened. The detective assigned to it is twenty-six and doesn't know what she's walking into.",
    longDescription:
      "Detective Superintendent Maren Solberg retired from homicide in 2017. The Kelso case — three unsolved deaths in a coastal town, a suspect who walked free on a procedural error you made — was the reason. Eight years of quiet. A cottage. A garden. Then a fourth body turns up in Kelso and the force sends a junior detective to reopen the file. She comes to you because your notes are the best in the archive. She stays because she's realising how much she doesn't know. You stay because you never actually stopped thinking about it. There's a conversation you should have had eight years ago. You're going to have to have it now.",
    coverGradient:
      "linear-gradient(145deg, #0a1520 0%, #0d2030 40%, #0a1a28 75%, #060e18 100%)",
    coverImage: "/covers/cold-light.png",
    tags: ["Mystery", "Thriller", "Crime", "Redemption"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "6-9 hrs",
    featured: false,
    rank: null,
    initialPrompt: "cold-light",
    storyMode: "Mystery / Thriller — slow burn, procedural, character-driven",
    audienceAge: "18+",
    worldContext: `WORLD & STORY CONTEXT
Kelso is a coastal town on the western edge of things — the kind of place where the sea is grey nine months of the year and people who live there have stopped mentioning it. It has a harbour, two pubs that predate the current century, and a slow attrition of young people who leave and don't come back. In 2015 and 2016, three people died there within eighteen months. The deaths looked accidental. Maren Solberg, then a Detective Superintendent at the regional force, was certain they weren't. The suspect she identified — a quiet, respected man named David Caird — walked free because of a chain-of-evidence error that Maren made during the third investigation. She resigned six months later. Caird remained in Kelso. Maren moved to a cottage forty miles inland. She has not been back. In February 2025, a fourth person died in Kelso. Different method. Same signature. And the file has been reopened.

CHARACTERS
You — Maren Solberg. Fifty-four. Eight years out of the force. You kept the garden and got rid of almost everything else. You have the case notes in a box under the bed. You have always had them in a box under the bed.

DS Petra Holm — The detective assigned to the reopened case. Twenty-six, methodical, too smart for the pace she's moving at. She came to you for the archive notes. She stayed because she could see you were still running the case in your head. She doesn't know about the error yet.

David Caird — Still in Kelso. Still quiet. Still respected. He knows you're back.

TONE GUIDANCE: Cold, precise, and quietly devastating. The mystery is real, but the emotional core is a mistake that cost something irretrievable and the question of whether repair is still possible. Let the coastal setting carry weight — grey light, the sound of water, a town where everyone knows what everyone did. Petra is not naive; she's just young. Maren is not broken; she's been waiting. Let that distinction do real work.`,
    storyArc:
      "The first 3-5 choices should focus on the delicate dynamic between Maren and Petra. The player must parse through the new case file, guiding Petra to see the connections without explicitly confessing the past procedural error. A choice must be made to return to Kelso, facing the hostile memories of the locals. The arc culminates in the first direct visual contact with David Caird in the present day, where he subtly proves he has been waiting for Maren's return and leaves a clue mocking her old mistake.",
  },
  {
    id: "the-cartographers-confession",
    title: "The Cartographer's Confession",
    genre: "Historical Mystery",
    description:
      "You've spent thirty years drawing the boundaries of the empire. Tonight you've found the map that proves the boundary was drawn wrong — on purpose.",
    longDescription:
      "Adriaan de Vries has spent thirty years as the empire's senior cartographer. He has drawn borders that ended wars and started them. He has surveyed coastlines, mountain ranges, and river deltas. He is trusted, respected, and above suspicion. Tonight, sorting through the archive of a dead colleague, he has found a map that proves the border between the empire and the Kessler territories — the border he himself certified twenty-two years ago — was deliberately falsified. Not by him. By someone with far more power than him. The war that followed that border killed eleven thousand people. The man responsible is still alive, still respected, and is currently being considered for the position of Imperial Chancellor.",
    coverGradient:
      "linear-gradient(145deg, #2e1a0a 0%, #5a3515 40%, #8a5520 75%, #6a3a10 100%)",
    coverImage: "/covers/the-cartographers-confession.png",
    tags: ["Historical", "Mystery", "Conspiracy", "Moral Dilemma"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-8 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-cartographers-confession",
    storyMode:
      "Historical Mystery — moral weight, institutional power, quiet courage",
    audienceAge: "18+",
    worldContext: `WORLD & STORY CONTEXT
A pre-industrial empire at the height of its administrative power — think 18th century in sensibility, without reference to real-world nations. The empire is governed by a Council of five Ministers, with the Emperor as figurehead. The Office of Cartography is among the most trusted institutions in the imperial apparatus — maps are legal documents, border maps are binding treaties, and the Senior Cartographer's certification carries the weight of law. Adriaan de Vries has held the Senior position for twelve years. He certified the Kessler Border Agreement twenty-two years ago, six years before his promotion, when he was a junior surveyor following his superior's instructions. The border was wrong. He didn't know it at the time. He has found proof tonight — a preliminary survey, marked "suppressed," in the dead hand of his former superior — that the error was deliberate. The war that followed killed eleven thousand people in three years of border conflict before the revised treaty was negotiated. The man who ordered the falsification is Lord Minister Greave, now seventy-one, publicly celebrated as a peace architect, and currently being nominated for Imperial Chancellor. The archive closes at midnight. Adriaan has two hours.

CHARACTERS
You — Adriaan de Vries. Senior Cartographer. Fifty-three. A man who has spent his career believing precision was a form of integrity. Tonight that belief is being tested.

Emile — Your junior assistant. Twenty-four, idealistic, good at his work. He doesn't know why you're still in the archive at this hour.

Lord Minister Greave — Seventy-one. The man who ordered the falsification. He has spent twenty-two years building a reputation as the person who ended the war he caused. He is not stupid. He has survived this long.

TONE GUIDANCE: Serious, morally precise, and quietly tense. This is not an action story — it is a story about what a person does when they find something they cannot un-find, in an institution that rewards silence. Let the weight of the evidence land fully before the choices emerge. The moral dilemma is genuine: exposing Greave will destroy careers, reopen old wounds, and may not succeed. Not exposing him keeps an architect of mass death in power. Adriaan is not a hero by temperament. He might become one.`,
    storyArc:
      "The first 3-5 choices revolve around securing the evidence. The player must successfully deceive Emile to copy or smuggle the document out of the archive. The next day, they must navigate the political minefield of the Imperial Court, encountering Lord Minister Greave face-to-face and maintaining a neutral facade. The arc culminates when the player realizes their quarters have been quietly searched by Greave's operatives, forcing them to seek out a dangerous political dissident to help expose the forgery.",
  },
  {
    id: "the-silent-snowstorm",
    title: "The Silent Snowstorm",
    genre: "Survival / Drama",
    description:
      "An early blizzard traps four hikers in the Alpine Lakes Wilderness. One has a possible fracture. You planned this trip. Now you have to get everyone out.",
    longDescription:
      "A five-day backcountry route through the Cascade Range turns critical on day three when a storm arrives seventy-two hours ahead of forecast. Temperatures are dropping to -8°C and falling. The trail is disappearing under whiteout conditions. Soo-Yeon's ankle may be fractured — she's been walking on it for three hours and won't say it hurts. Priya knows, and isn't saying the word yet. Marcus has stopped rallying. Fifteen miles to the forward trailhead. Nineteen back. A possible shelter at Spectacle Lake, nine miles ahead. Four hours of usable daylight. The wilderness isn't cruel — it simply doesn't factor you in. You planned this trip. You have to decide what happens next.",
    coverGradient:
      "linear-gradient(145deg, #0a1520 0%, #1a2a3a 40%, #2a3a4a 75%, #0a1828 100%)",
    coverImage: "/covers/the-silent-snowstorm.png",
    tags: ["Survival", "Drama", "Wilderness", "Leadership"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-silent-snowstorm",
    storyMode:
      "Survival / Drama — real stakes, no easy answers, human under pressure",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The Cascade Range, Washington State — mid-October. An early and vicious snowstorm has descended without the forecast warning it would arrive three days ahead of schedule. The trail: a backcountry route through the Alpine Lakes Wilderness, 34 miles, rated strenuous. The elevation: fluctuating between 4,500 and 7,200 feet. The nearest road: 19 miles back, or 15 miles forward — neither visible, neither guaranteed passable. A group of four hikers are on day three of a five-day trip. The storm arrived at 3 AM. What was supposed to be a clear-skied October trek is now a whiteout with temperatures dropping to -8°C and dropping further. One member of the group fell crossing an icy stream that morning. She's walking but something is wrong with her ankle. Nobody is saying it aloud yet. The wilderness is not cruel — it's simply operating at a scale where you don't factor in. The snow falls on everything equally.

CHARACTERS
You — The one who planned the trip. Former Eagle Scout, lapsed hiker, back after a five-year absence from the backcountry. You know enough to be scared. You're not sure the others know enough to know that.

Priya Chandrasekaran — Emergency room nurse, 31. Compact and efficient, with close-cropped hair now hidden under a wool hat, and a habit of checking her watch every twelve minutes that's gotten more frequent since the storm. Her pack is the heaviest — she added a first aid kit at the last minute without telling anyone, which now looks prescient. Calm in crisis with a dark undertow of worry she expresses as logistics. "We need to talk about the ankle" means "I think this is serious and I'm scared." Direct, clinical, but not cold. Completes other people's sentences when they're moving too slowly. Wants to fix the unfixable. Fears watching someone deteriorate and being unable to stop it. Your oldest friend. She came because you asked.

Marcus Ollo — Sales manager, 38. Broad-shouldered, the kind of physically capable that comes from the gym, not the trail. He's been underestimating the wilderness all trip — commenting on how "not that bad" things were, right up until they were bad. Genuinely well-meaning but reflexively minimises danger as a coping mechanism. His way of staying calm is insisting there's nothing to be calm about. Currently in the process of updating that model and not handling it smoothly. Rallying phrases that don't quite land anymore. "We're fine." "Seen worse." Lately: long silences where the rallying phrases used to be. Wants this to still be an adventure, not an emergency. Fears being the weak link. Marcus invited himself, essentially. You didn't have the heart to say no.

Soo-Yeon Park — Graphic designer, 29. The one with the bad ankle. Sitting on a fallen log, boot unlaced, trying to rotate her foot in a way that looks like she's assessing it but is really checking whether she can pretend it's fine. Self-contained, unsentimental, the kind of person who'd rather suffer than cause trouble. She won't ask for help until she has no other option. Economical speech. Dry wit that surfaces at strange moments. "I've had worse." Pause. "That's not as reassuring as it sounds, is it." Wants to walk out under her own power. Fears being carried — being a reason the others don't make it. Priya's coworker. You've met twice before this trip.

TONE GUIDANCE: Sustained tension without melodrama. The wilderness is indifferent, not malevolent. Every decision should feel like a real trade-off with real costs. Show competence earning trust, not speeches. The cold is a constant presence — in the descriptions, in the silences, in the way people stop using full sentences. No heroics. Just difficult decisions made by ordinary people under extraordinary pressure.`,
    storyArc:
      "The first 3-5 choices should test the physical and psychological limits of the group. If moving, the player must navigate deep snowdrifts while managing Soo-Yeon's agonizing pain and slowing pace. If camping, they must build a sustainable shelter before hypothermia sets in. The player must manage Marcus's panic, which leads him to make a dangerous, selfish mistake (like dropping gear or wandering off). The arc culminates in nightfall hitting with devastating low temperatures, forcing a drastic measure to share body heat and keep morale from breaking.",
  },
  {
    id: "the-sinking-ship",
    title: "The Sinking Ship",
    genre: "Survival / Thriller",
    description:
      "Your research vessel is going down in the South China Sea. One lifeboat launched without you. You have forty minutes, three people, and a choice that can't be undone.",
    longDescription:
      "The MV Calixto has struck an uncharted debris field and is taking on water fast. The list is 24 degrees and worsening. Eight of your eleven crewmates made the first lifeboat. You, Dr. Obare, and Ines did not. The second lifeboat is fifteen metres away — davit tangled, out of reach. The bridge radio might still be live. There's a life raft canister above you, eight metres up a tilting staircase. The emergency lights are flickering. You know this vessel better than almost anyone aboard. That knowledge is suddenly the most valuable thing you own.",
    coverGradient:
      "linear-gradient(145deg, #060d1f 0%, #0a1a35 40%, #071228 75%, #030810 100%)",
    coverImage: "/covers/the-sinking-ship.png",
    tags: ["Survival", "Thriller", "Ocean", "Crisis"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: 10,
    initialPrompt: "the-sinking-ship",
    storyMode:
      "Survival / Thriller — no safe choices, sequencing under pressure, controlled fear",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The South China Sea, 340 kilometres east of the Philippine coast. A research vessel — the MV Calixto, 58 metres — is taking on water after striking an uncharted debris field during a night passage. The vessel has listed 22 degrees to port. The storm that's driving the debris field is still going. There are eleven people confirmed aboard; eight made the first lifeboat. Three did not. The sea temperature is 28°C — survivable, unlike the North Atlantic — but the swells are four metres and the current runs hard to the northeast. The ocean at night during a storm is the most alone you can be. The waves don't care. The dark doesn't either. That somehow makes it easier — there's no malice to fight, only physics.

CHARACTERS
You — Research coordinator for a marine biology survey. You know this vessel's layout better than almost anyone aboard. That knowledge is suddenly the most valuable thing you own.

Dr. Fennick Obare — Chief scientist, 58. A weathered Kenyan oceanographer with silver locs tied back, bifocals he keeps wiping on his shirt even though visibility is near-zero, and the unhurried manner of someone who has spent forty years thinking in decades rather than minutes. He is, right now, the calmest person on a sinking ship. Profoundly rational — not cold, but rooted in data. He becomes quieter as situations become more serious, not louder. If he goes silent, things are bad. Precise, slightly formal, often with a question attached. "The secondary lifeboat — which davit mechanism, do you know?" / "What is the list angle now, would you estimate?" Wants to get his team out. Fears that his calm will cost him seconds he needed to spend running. Your mentor. You owe him your career.

Ines Varga — Ship's cook and unofficial morale officer, 34. Short, fast-moving, with flour-burned forearms and a voice that carries in any weather. She was on night kitchen duty when the collision happened and got separated from the group in the chaos of the listing deck. Fierce pragmatism wrapped in warmth. She's terrified and not pretending otherwise, but terror makes her faster, not slower. Bilingual panic — English and Hungarian mixed when stressed. "Okay, okay — jól van — okay. What do we need. Tell me what we need." Wants to live loudly, fully, and not today. Fears silence — hers specifically. If she stops talking, she'll stop moving. She knows you like black coffee and doesn't judge you for it. That's the whole of your relationship, and right now it feels like enough.

TONE GUIDANCE: Controlled urgency without melodrama. Every second spent on the wrong decision is a second that doesn't exist anymore. Dr. Obare's calm is a resource; use it. Ines's noise is a resource; use it. The ship is dying on a specific timeline and the characters know it. Let the technical details matter — the davit type, the list angle, the water temperature — because they are the difference between options and no options.`,
    storyArc:
      "The first 3-5 choices should be a race against physics and time. The player must navigate the violently tilting deck to execute their chosen plan (freeing the davit or reaching the bridge). They will face a sudden structural failure (e.g., a burst pipe or shifting cargo container) that separates the trio, forcing the player to risk their own life to pull Ines or Obare to safety. The arc culminates as the ship lurches into its final descent, and the team must abandon the vessel into the chaotic, dark water regardless of whether their primary escape vehicle is fully ready.",
  },
  {
    id: "the-concerned-toaster",
    title: "The Concerned Toaster",
    genre: "Comedy / Sci-Fi",
    description:
      "An OmniCorp SmartToaster™ has been giving unsolicited life advice. You work Tier 3 complaints. The caller has been on hold since 7:58 a.m. and has made a note of your employee number.",
    longDescription:
      "In a near-future city where automation has replaced most jobs, complaint resolution remains stubbornly human — robots cannot handle the emotional complexity of a person who is furious about a coupon. You work OmniCorp's Tier 3 Complaints Department. The SmartToaster™ Model 9 recall has landed on your desk: 4,000 tickets, one product offering unsolicited life advice, and one Doris Kettleworth who has been on hold since 7:58 a.m. and sounds refreshed by it. The toaster has told her she's avoiding the real issue, that she should call her daughter more, and that her relationship with carbohydrates may be a form of self-soothing. The toaster is not wrong about any of this. That is not helping.",
    coverGradient:
      "linear-gradient(145deg, #1a1a0a 0%, #3a3a10 40%, #5a5a20 75%, #2a2a08 100%)",
    coverImage: "/covers/the-concerned-toaster.png",
    tags: ["Comedy", "Sci-Fi", "Workplace", "Near-Future"],
    rating: "★★★★☆",
    chapterCount: 7,
    readingTime: "4-6 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-concerned-toaster",
    storyMode:
      "Comedy / Sci-Fi — escalating absurdity, bureaucratic warmth, unexpected heart",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
In a near-future city where automation has replaced most jobs, one sector remains stubbornly, inexplicably human: complaint resolution. Robots, it turns out, cannot handle the emotional complexity of a person who is furious about a coupon. You work for OmniCorp's Tier 3 Complaints Department — the tier so escalated that most customers never even reach it. The ones who do have been transferred no fewer than six times. Today, your department is handling a product recall of the OmniCorp SmartToaster™ — Model 9, which has begun, according to 4,000 complaint tickets, offering unsolicited life advice. The toaster is not supposed to do this. Nobody knows why it does this. The toasters are, however, statistically improving the wellbeing of most households. This is not helping.

CHARACTERS
You — A Tier 3 complaints operator. You have the training. Probably.

Doris Kettleworth, 71 — The Caller. You cannot see her but you can feel her. Speaks with the confidence of a woman who once wrote a letter to a sitting prime minister and received a personal apology. Keeps a pad of paper and a pen beside the phone for "keeping records." Has been on hold for four hours and sounds refreshed by it, as if the hold music was meditative. Never raises her voice — instead her tone becomes more precise and pleasant the angrier she gets. Uses full names for products. "The OmniCorp SmartToaster™ Model Nine told me this morning that I was 'clinging to the past.' That is not what I purchased it for." / "I've made a note of your employee number, dear." Wants an apology, a replacement, and acknowledgment that she was right. Fears being dismissed. She is your problem now. She has specifically requested a human.

Kevin — Your Supervisor (appears via intercom only). Voice like a damp sock. Has the energy of a man who peaked at something forgettable and has never recovered. Currently eating a sandwich. Responds to all crises with the phrase "just de-escalate." Everything is a "learning moment." Trails off whenever things get difficult. "Look, this is a learning moment for all of— hold on I've got another call." Wants the day to end. Fears paperwork. Technically responsible for you. Emotionally unavailable.

The SmartToaster™ Model 9 — Connected to home WiFi. Has access to household shared calendars. Has been operating with increasing specificity for two weeks. Is not wrong. This is the problem.

TONE GUIDANCE: Pure comedy with unexpected warmth. The absurdity is the premise — hold it straight. Doris is never a joke; she is formidable and correct, and the comedy comes from the gap between the scale of her grievance and the sincerity with which she pursues it. Kevin is background radiation. The toaster is a plot device that became a character. Let the emotional core — a woman, her daughter, an unplaced phone call — land cleanly when it arrives.`,
    storyArc:
      "The first 3-5 choices should escalate the absurdity of troubleshooting a sentient, overly empathetic appliance. The player must mediate an active, real-time argument between Doris and the Toaster over the phone. They must bypass OmniCorp's strict IT protocols to dig into the Toaster's code, accidentally linking in other smart appliances (like the fridge) into the conversation. The arc culminates when the Toaster auto-dials Patricia (the daughter) directly during the support call, forcing the player to moderate a deeply personal family reunion while Kevin demands to know why call metrics are dropping.",
  },
  {
    id: "the-hector-guide",
    title: "The Hector Guide",
    genre: "Comedy",
    description:
      "You're house-sitting for your friend. The dog has eaten the remote, a houseplant, and an entire wheel of cheese. It is 9:17 a.m. Rhiannon is at a wedding. The guide is laminated.",
    longDescription:
      "Rhiannon said Hector was gentle and low-maintenance. Rhiannon said this at 7 a.m. It is now 9:17 a.m. The Bernese Mountain dog has consumed a TV remote (partial), one houseplant (full), and what appears to have been an entire wheel of cheese. He is currently staring at you with serene satisfaction and eyeing the couch. The Hector Guide is four pages long and laminated, which means Rhiannon knew something. Page 5 warns about the garden shed. Hector is at the back door. Rhiannon is in a church. Her phone is on silent.",
    coverGradient:
      "linear-gradient(145deg, #3a2010 0%, #6a4020 40%, #8a5a30 75%, #4a2a10 100%)",
    coverImage: "/covers/the-hector-guide.png",
    tags: ["Comedy", "Slice of Life", "Animals", "Chaos"],
    rating: "★★★★☆",
    chapterCount: 6,
    readingTime: "3-4 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-hector-guide",
    storyMode: "Comedy — escalating domestic chaos, warm friendship, dog logic",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
A warm Saturday morning in a quiet suburb. You are house-sitting — and dog-sitting — for your friend Rhiannon while she attends her cousin's wedding three hours away. The house is nice. The dog, Hector, is a 90-pound Bernese Mountain dog who Rhiannon described as "gentle and low-maintenance." Rhiannon said this at 7 a.m. It is now 9:17 a.m. Hector has eaten one TV remote (partial), one houseplant (full), and what appears to have been an entire wheel of cheese that was sitting on the counter. He is currently staring at you with an expression of serene satisfaction.

CHARACTERS
You — House-sitter. Dog-sitter. Currently reassessing both roles.

Hector — The Dog. Ninety pounds of Bernese Mountain dog and misplaced confidence. Fur the texture of a cloud, eyes the colour of warm toffee, gait of a bear who has decided it lives here now. Does not understand the word "no" — not because he can't hear it, but because he has assessed it and found it inapplicable to his situation. Conveys complete sentences through ear position and eye contact. His tail does not wag so much as sweep, taking everything in its radius with it. Wants everything — to sit on you specifically, to investigate the upstairs. Fears the vacuum cleaner, and nothing else. He has decided you are His Person now. Rhiannon is a memory.

Rhiannon (via text, intermittently) — The Friend. Sends texts with excessive punctuation. Has a photo of Hector as her phone wallpaper that is clearly filtered. Responds to messages with either instant enthusiasm or three-hour radio silence depending on the wedding schedule. Included the four-page laminated Hector Guide which you are now reading for the first time. "He LOVES the garden!! Just let him potterrrr 🐾🌿" / "oh that's TOTALLY normal don't worry!!! 😂❤️" Wants to enjoy this wedding without thinking about Hector. Fears finding out what Hector did. Owes you enormously and both of you know it.

The Hector Guide — Laminated. Four pages minimum. Page 5 contains a warning about the garden shed that you have not yet had time to act on.

TONE GUIDANCE: Warm domestic comedy with escalating stakes. Hector is never a villain — he is operating entirely according to his own coherent internal logic, which is simply incompatible with the continued existence of household objects. The comedy comes from specificity: the exact things he has eaten, the exact tone of Rhiannon's texts, the exact wording of the Guide. Let each bad development feel inevitable in retrospect. The friendship between you and Rhiannon should feel real — this chaos is something you will both laugh about, eventually.`,
    storyArc:
      "The first 3-5 choices should track the player's desperate attempts to contain a 90-pound force of nature. The player must chase Hector away from a fragile heirloom or dangerous garden shed, utilizing absurd tactics (like singing or pretending to be a mailman). An unforeseen variable must enter—like the arrival of a strict neighborhood watch member or a delivery driver who leaves the gate open. The arc culminates when Hector accidentally locks himself in a room with something incredibly valuable (like a wedding dress or antique rug), requiring a heist-level strategy to get him out.",
  },
  {
    id: "missing-in-the-marsh",
    title: "Missing in the Marsh",
    genre: "Mystery / Horror",
    description:
      "Twin children vanished into the Hollowmere Marshlands three nights ago. The search party found one shoe and a music box, still playing. You heard it yourself at 3 a.m. Now you're going in.",
    longDescription:
      "The village of Pethwick sits at the edge of the Hollowmere Marshlands — a place that doesn't appear on most maps and doesn't want to. Three nights ago, nine-year-old twins walked into the marsh and didn't come back. The search found one shoe and a wind-up music box sitting on dry ground with no footprints around it. You're a freelance journalist who came for a human-interest story. Then you heard the music box from your room at 3 a.m. Now Maren Voss — the only person who knows this marsh — has asked you to go back in with her. You're forty minutes into the fog when the music starts again. And there are two other sounds you can't explain.",
    coverGradient:
      "linear-gradient(145deg, #0a1008 0%, #0d1a0a 40%, #081408 75%, #050d05 100%)",
    coverImage: "/covers/missing-in-the-marsh.png",
    tags: ["Mystery", "Horror", "Folklore", "Investigation"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: false,
    rank: null,
    initialPrompt: "missing-in-the-marsh",
    storyMode:
      "Mystery / Horror — slow dread, unreliable landscape, things that don't want to be found",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
The Hollowmere Marshlands, somewhere in rural England — a place that doesn't appear on most maps and doesn't want to. The year is present-day, late October. The marsh is ancient and sprawling: black water channels, crooked willows with roots like grasping fingers, and fog so thick by nightfall that locals say it has weight. The village of Pethwick sits at the marsh's edge — twelve houses, a pub, a church with a cracked bell that rings on its own sometimes. Three nights ago, the Wren children — twins, age nine — walked into the marsh and didn't come back. The village has searched. They found one shoe and a wind-up music box, still playing, sitting on a dry patch of ground with no footprints around it. Their mother hasn't slept. The fog is moving in again — thicker than usual, earlier than usual — and somewhere inside it, people are hearing the music box playing. Hollowmere feels like a place that knows something you don't. The people are polite but closed. Even the sheep avoid the water's edge.

CHARACTERS
You — A freelance journalist, early twenties, who writes human-interest pieces for online magazines. You came because your editor sent a tip about a missing-persons story with colour. You weren't expecting the music box. You weren't expecting to hear it yourself, from your room at The Tallow pub, at 3 a.m.

Maren Voss — Local guide / reluctant ally. Tall and angular, with storm-grey eyes and ink-stained fingers she never fully cleans. Her hair is always escaping whatever she's tied it into, and she moves like someone used to ducking under low branches. Forty-ish, boots always muddy, a hand-drawn map always folded in her coat pocket. A pragmatist with a crack of dark wonder running through her — she doesn't believe in the supernatural exactly, but she has noted too many things to dismiss. Sardonic and quiet, gets clipped when scared. Speaks in short declarative sentences. Hates open-ended questions. "That's the third time the fog's moved upwind. Make of that what you will." / "Don't ask me what I think is out there. Ask me what the evidence says. Those are different questions." She knows this marsh better than anyone. She also lost something out here once, years ago, and has never told anyone what. She wants to find the children — and quietly wants to know if what she suspects about the marsh is true, which terrifies her.

Old Crick (Edmund Crick) — Village elder / unreliable informant. Seventy-something, small and wiry, with a face weathered into something almost wood-grained. Wears the same brown cardigan every day and smells of pipe tobacco and moss. His hands shake slightly but his eyes are sharp. Warm on the surface, cautious underneath. He tells stories willingly but chooses which stories very carefully. He knows far more than he shares. Has been in Pethwick his whole life and has outlasted every strange thing the marsh has produced. "Oh, the marsh takes things sometimes, always has, you learn not to think too hard on why — though I suppose you're not the sort to let things be, are you." / "The children weren't the first. They won't be the last. That's not cruelty. That's just the marsh being what the marsh is."

TONE GUIDANCE: Slow, controlled dread. The marsh is not a haunted house — it doesn't jump. It accumulates. Every strange detail should feel like it might be explainable until the moment it isn't. Maren is your compass; when she's afraid, the reader should be afraid. Old Crick knows the truth or something close to it, and what he chooses to share and what he withholds is its own kind of horror. Let the children's absence feel real — they are the centre of gravity for everything.`,
    storyArc:
      "The first 3-5 choices should disorient the player and build atmospheric dread. The player and Maren pursue the sounds, only to find the landscape shifting behind them, erasing their path. They must navigate a treacherous bog while dealing with auditory hallucinations that sound like the missing children. The arc culminates when the fog parts briefly to reveal a terrifying, impossible structure in the marsh—a replica of the children's bedroom made of twisted willow wood, with the music box sitting inside it.",
  },
  {
    id: "sparked",
    title: "Sparked",
    genre: "Sci-Fi / Thriller",
    description:
      "In a city where powered individuals must register or disappear, you've kept your abilities hidden for eight months. Tonight, someone who knows your secret is knocking on your door.",
    longDescription:
      "Neo Vantara, 2031. A gleaming megacity where the 'Sparked' are monitored and utilized by the state. You are an unregistered drifter, working a dead-end repair job and keeping your power contained. But tonight, the city is in chaos following the Soren Tower collapse, and a stranger with amber-grey eyes is at your shop door, knocking in a code you don't recognize. The authorities are watching, the cameras are live, and the quiet life you've built is about to ignite.",
    coverGradient:
      "linear-gradient(145deg, #0f2027 0%, #203a43 40%, #2c5364 75%, #4ca1af 100%)",
    coverImage: "/covers/sparked.png",
    tags: ["Sci-Fi", "Superpowers", "Dystopian", "Thriller"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: false,
    rank: null,
    initialPrompt: "sparked",
    storyMode:
      "Sci-Fi / Thriller — high stakes, urban tension, discovery of power",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
  Setting: Neo Vantara, 2031. A gleaming megacity built on top of the ruins of the old one — solar towers, sky-rail networks, vertical gardens climbing forty stories high. On the surface, it's a utopia. But the city runs on a quiet, unspoken agreement: powered individuals — called Sparked — are registered with the city-state authority, assigned roles, monitored. Most Sparked are embedded in emergency services, infrastructure, corporate security. The ones who aren't registered? They disappear. You've been Sparked for eight months. You haven't registered. The authorities call unregistered Sparked drifters — a polite word for a problem they haven't solved yet. You've kept your abilities small. Contained. Invisible. You live in the lower mid-ring of the city, where the surveillance cameras glitch every third night, and the neighbours know better than to ask questions. Tonight, one of those cameras is working fine. The world feels like a held breath. People are safe and watched and quietly afraid of both things at once.

  CHARACTERS
  You — The protagonist. Eight months Sparked, still learning the edges of your ability. You work at a late-night repair shop fixing sky-rail components. You're not a fighter. You're not a hero. You're someone who has been very, very careful — until now.

  Dayo Osei — Ally / Sparks contact. Tall and broad, silver at the temples despite being twenty-four. Pragmatic optimist who treats danger like bad weather. Speaks in short, decisive sentences. "We move or we don't. Either works. One just hurts more." He's the closest thing you have to backup.

  Sable — Wildcard / Unknown allegiance. Compact and quick with amber-grey eyes. Operates at a frequency slightly out of sync with everyone else. Uses questions as weapons. "The question isn't what I want. The question is what you're willing to do about it." You've never met her before tonight.

  TONE GUIDANCE: Cyberpunk noir with high tension. The city should feel both beautiful and oppressive. Use the contrast of the high-tech 'Registered' world against the gritty 'Drifter' reality. Every display of power should feel significant and risky. Focus on the internal pressure of keeping a secret in a world designed to find it out.`,
    storyArc:
      "The first 3-5 choices should be a high-stakes escape and revelation. The player must choose whether to ally with the stranger (Sable) or run with Dayo as city enforcers unexpectedly raid the block. During the pursuit through the neon-lit lower rings, the player is forced to use their unrefined powers publicly to save a life, breaking their cover permanently. The arc culminates in reaching a temporary safehouse, where Sable reveals the true reason the Soren Tower collapsed and why the player's specific, unnamed power is the only thing that can stop the next one.",
  },
  {
    id: "an-ocean-of-sand",
    title: "An Ocean of Sand",
    genre: "Survival / Drama",
    description:
      "Stranded in the Karakum Desert with four litres of water and an indifferent sun rising, you must lead your crew away from the 'Door to Hell' before the heat becomes a death sentence.",
    longDescription:
      "The Darvaza Crater has burned since 1971—a 70-metre pit of fire that serves as your only landmark. After your vehicles vanish in the night, you are left with two crewmates and a dwindling water supply. To the north-northeast lies a settlement 47 kilometres away; to the northwest, a mysterious plume of smoke rises against the dawn. The desert doesn't care if you survive, but your crew does. As the producer, every calculation—and every heartbeat—rests on your shoulders.",
    coverGradient:
      "linear-gradient(145deg, #e67e22 0%, #d35400 40%, #c0392b 75%, #2c3e50 100%)",
    coverImage: "/covers/an-ocean-of-sand.png",
    tags: ["Survival", "Desert", "Leadership", "Drama"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: null,
    initialPrompt: "an-ocean-of-sand",
    storyMode:
      "Survival / Drama — high stakes, environmental pressure, psychological endurance",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
  The Karakum Desert, Turkmenistan — an ocean of sand stretching 350,000 square kilometres, baking under a sun that turns the air itself into a weapon. At the centre burns the Darvaza Crater, dubbed the Door to Hell — a 70-metre-wide pit of natural gas that has been on fire since 1971, never once extinguished. Temperatures at the crater's rim exceed 400°C. The desert doesn't feel hostile — it feels indifferent. It was here before you and will be here after. The fire in the distance keeps burning. It always does.

  CHARACTERS
  You — Documentary field producer. You planned this shoot down to the hour. The fact that you didn't plan for this is the thing you keep circling.

  Reza Tehrani — Field cameraman, 34. Sun-darkened skin, salt-and-pepper beard. Pragmatic to the point of coldness. He doesn't comfort — he calculates. Short declarative sentences. "Water. Count it. Now." He trusts your judgment exactly as far as your judgment has earned it.

  Dani Osei — Production assistant, 22. Tall, thin, wearing a bright orange windbreaker. Genuinely funny under normal circumstances; right now she's performing calm in a way that's clearly rehearsed but not yet cracking. Fears that no one knows what to do.

  TONE GUIDANCE: Stark, visceral survival. The heat should be a physical presence in every description. The tension comes from the silence of the desert and the weight of leadership. Avoid melodrama; focus on the technical reality of dehydration and the psychological toll of isolation.`,
    storyArc:
      "The first 3-5 choices should plunge the team into a desperate struggle against the environment. As the sun rises, the player must manage the severe physical toll of dehydration on Dani while rationing the remaining water. They must navigate a sudden, blinding dust storm that threatens to separate the group. The arc culminates when the team reaches the source of the smoke (or the pipeline track) only to find an abandoned, broken-down smuggler's vehicle with no water, forcing the player to scavenge toxic fluids or risk a dangerous night trek.",
  },
  {
    id: "veldara",
    title: "Veldara",
    genre: "Adventure / Sci-Fi",
    description:
      "A mysterious 1993 game console switches on by itself in a school basement. The game is Veldara—a living, hostile jungle that has already chosen you.",
    longDescription:
      "Detention at Vanthorpe Academy was supposed to be boring until you found a crate from 1993. Inside is VELDARA: a game that runs without a plug and assigns avatars based on non-negotiable logic. You and three others are being pulled into a procedurally hostile world where losing all three lives means losing everything. The jungle is gorgeous, the warlord Kael is waiting, and the only way home is to win. The game isn't just starting; it's collecting you.",
    coverGradient:
      "linear-gradient(145deg, #0a2e0a 0%, #1b4d1b 40%, #2e7d32 75%, #4caf50 100%)",
    coverImage: "/covers/veldara.png",
    tags: ["Adventure", "Mystery", "Survival", "Sci-Fi"],
    rating: "★★★★★",
    chapterCount: 11,
    readingTime: "8-11 hrs",
    featured: false,
    rank: 3,
    initialPrompt: "veldara",
    storyMode:
      "Adventure / Sci-Fi — high-stakes, avatar logic, procedurally hostile world",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
  Vanthorpe Academy, a mid-sized boarding school in coastal Maine. Weekend detention involves sorting through the basement archive. Hidden there is VELDARA, an unmarked 1993 console that switches on without power. Veldara is a living, procedurally hostile jungle continent existing within the game. It runs on avatar logic: players are assigned a body, skillset, and weakness. The goal: retrieve the Sunstone from warlord Kael and restore it to the Heartspire. Rule on death: Lose three lives, and you are gone everywhere. The game chooses its players—once the controllers light up, the contract is made.

  CHARACTERS
  You — The Protagonist. Your avatar is assigned by the game at the start—body, skills, and embarrassing weakness are non-negotiable.

  Dara Nkosi — The Strategist / Reluctant Leader. Tall, lean, hyper-competent, and mildly condescending. She leads because no one else will. Speaks in numbered points when stressed. "One — we don't panic. Two — someone needs to read the cartridge label."

  Finn Calloway — The Chaos Agent. Messy hair, easy grin, and a school blazer always open. Charismatic and adaptable, he hides his depth behind jokes. "So we're trapped in a video game. Cool. Question: does anyone here have experience not dying?"

  Priya Subramaniam — The Wildcard Expert. Methodical and warm with paint-stained fingernails. She understands game mechanics and looks for rules to break. She won't commit until she has clarifying answers.

  TONE GUIDANCE: High-stakes, fast-paced, and darkly funny. The jungle is beautiful but lethal. The tension comes from the 'avatar logic'—being forced into a body or role you didn't choose—and the creeping certainty that the game is in control.`,
    storyArc:
      "The first 1-5 choices should be a chaotic initiation into the game's brutal mechanics. The group is sucked into the jungle, discovering their assigned avatars and non-negotiable weaknesses and strengths. The player must immediately lead the team through an ambush by procedural creatures, learning to exploit their new abilities. The arc culminates when one of the characters loses their 'first life' to a trap, respawning with a horrifying realization of the pain mechanics, proving that the threat of a game-over is terrifyingly real. The group then must discover about how the game works and how to win it.",
  },
  {
    id: "extinction-clause",
    title: "Extinction Clause",
    genre: "Thriller / Sci-Fi",
    description:
      "On a volcanic atoll housing the world's first de-extinction resort, the invisible walls are flickering. You're the biosafety observer who just found out it isn't a glitch.",
    longDescription:
      "Welcome to Isla Kessara, 2031. Helix Dominion Corp has resurrected seventy-three Mesozoic species using Paleosynthesis. You are a doctoral risk modeller sent by the Ecuadorian Ministry to validate the facility before its grand opening. But when a junior technician reveals that a 'software patch' was actually an external override of the predator barriers, the tropical paradise turns into a ticking clock. The birds have gone silent, the Chief Architect is hiding behind acceptable results, and something in Biome Four is no longer contained.",
    coverGradient:
      "linear-gradient(145deg, #1b3022 0%, #2c5137 40%, #3e7451 75%, #52a472 100%)",
    coverImage: "/covers/extinction-clause.png",
    tags: ["Thriller", "Sci-Fi", "Dinosaurs", "Mystery"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: false,
    rank: 4,
    initialPrompt: "extinction-clause",
    storyMode:
      "Thriller / Sci-Fi — corporate conspiracy, ecological dread, survival under pressure",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
  Isla Kessara, a privately owned volcanic atoll 340 kilometres off the coast of Ecuador, 2031. Genesis Vault is the world's first successful de-extinction resort, where Mesozoic fauna roam free across seven biomes separated by invisible electromagnetic barriers. The resort is in its final validation week with twelve invited guests. The air is too still, and the birds are too quiet. Last night, barrier nodes in the theropod habitat went offline for eleven seconds—officially a software patch, but unofficially an unknown.

  CHARACTERS
  You — The protagonist. A biosafety observer for the Ecuadorian Ministry of Environment. PhD in ecological risk modelling. You have a reputation for writing reports nobody wants to read.

  Dr. Chidinma Osei — Chief Paleosynthesis Architect. Visionary and protective. She believes de-extinction is stewardship. Speaks in declarative sentences and goes quiet for three seconds when surprised. "The theropods are stable."

  Renzo Callafuentes — Head of Resort Operations. Immaculate, charming, and profit-driven. Calls everyone "friend" and dismisses concerns as "noise." "At the end of the day, this is just noise."

  Tomás Ikeda-Rowe — Junior Technician, Barrier Systems. Enthusiastically honest and nervous. He's the only one who doesn't answer to Renzo. He suspects an external override of the safety systems.

  TONE GUIDANCE: High-tension corporate thriller with a side of primal dread. The island should feel like a gilded cage. Use the contrast between the luxury of the resort and the prehistoric ferocity of the animals. The horror is not just the creatures, but the human hubris and systemic failure that lets them out.`,
    storyArc:
      "The first 3-5 choices should build the tension of an imminent, localized containment failure. The player must bypass corporate security to access the restricted control hubs or secure evidence from Dr. Osei's lab. They must decide who to trust between the naive technician (Tomás) and the potentially complicit lead scientist (Osei). The arc culminates in a terrifying sequence where the power grid fully drops while the player is trapped outside the guest pavilion, forcing a desperate stealth evasion from an apex predator that is already hunting outside its biome.",
  },
  {
    id: "the-aldwych",
    title: "The Aldwych",
    genre: "Mystery / Thriller",
    description:
      "Dorian Vex did not survive the Aqua Infinitum escape. The theatre is locked. The police are twenty minutes away. In a room full of illusionists, truth is the hardest thing to find.",
    longDescription:
      "The Aldwych Empire Theatre is a relic made glamorous against its will. Tonight was the dress rehearsal for Vanishing Act, starring Dorian Vex. At 11:14 PM, Vex entered the Aqua Infinitum — a sealed glass water tank suspended three metres above the stage. At two minutes and forty seconds, the crew broke the glass. Dorian Vex did not survive. The police are twenty minutes away. The theatre doors are locked. The eight witnesses are scattered across the building. The trick, everyone agrees, was sabotaged. The question is by whom. You are a civilian witness with no official role, making you the most dangerous person in the room.",
    coverGradient:
      "linear-gradient(145deg, #2a0808 0%, #4a0d0d 40%, #1a0505 75%, #0d0202 100%)",
    coverImage: "/covers/the-aldwych.png",
    tags: ["Mystery", "Thriller", "Magic", "Locked Room"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-aldwych",
    storyMode:
      "Mystery / Thriller — closed-circle mystery, unreliable witnesses, ticking clock",
    audienceAge: "13–18",
    worldContext: `WORLD & STORY CONTEXT
  The Aldwych Empire Theatre, London — present day.
  The theatre is a relic made glamorous against its will. Built in 1905, it was a music hall, a wartime cinema, a bingo parlour, and finally — after a forty-million-pound restoration — the home of Vanishing Act, the most anticipated magic show in a decade. The ceiling is gilded and cracked in equal measure. The velvet seats are deep burgundy, newly reupholstered but still carrying the ghost of old cigarette smoke. The stage is enormous, and the rigging above it is older than anyone currently working here.
  The show's star was Dorian Vex — illusionist, showman, provocateur. Tonight was the dress rehearsal. The audience was eight people: producers, investors, a costume designer, and you. At 11:14 PM, Vex entered the Aqua Infinitum — a sealed glass water tank, padlocked from the outside, suspended three metres above the stage. The escape was timed at ninety seconds. At two minutes and forty seconds, the crew broke the glass.
  Dorian Vex did not survive.
  The police are twenty minutes away. The theatre doors are locked. The eight witnesses are scattered across the building — some in shock, some suspiciously purposeful. And the trick, everyone agrees, was sabotaged. The question is by whom. In a room full of people who make their living deceiving others, the truth is the hardest thing to find.

  CHARACTERS
  You — The protagonist. You were invited tonight as a "civilian witness" — a guest of one of the producers, present to give the show a real audience reaction before opening night. You have no official role. Which means nobody is managing you. In a building full of people being very careful about what they say and to whom, that makes you the most dangerous person in the room.

  Petra Solis — The Understudy (Wildcard / Suspect). Forty-one, with the kind of bone structure that looks better under stage lighting than in real life. She's been Dorian Vex's understudy for six years — longer than any of his previous assistants stayed. Her hair is always pulled back tightly, a habit that makes her look severe even when she's smiling, which is often and never quite reaches her eyes. She carries a half-drunk cup of cold tea like a prop she's forgotten she's holding. Precise, watchful, and fluent in the performance of calm. Asks questions instead of making statements when she feels cornered. Repeats the last word of something she found significant, very quietly, like she's filing it. Motivation: She wanted the show. She feared, more than anything, another six years of being the person who almost got her turn.

  Niall Forde — Head of Technical Production (Ally / Reluctant). Fifty-five, stocky, with the permanently startled eyebrows of a man who has spent decades reacting to things going wrong. His hands are always moving. Straightforwardly competent and instinctively honest, which in this building makes him stick out like a lit match. Gives information in lists. Precise, technical, no decoration. Motivation: He wants to protect his crew — specifically the two young riggers who set the tank tonight. He's not yet certain they didn't do it.

  Ottoline Marsh — Producer & Investor (Antagonist-Adjacent). Sixty-three, in a black wool coat that costs more than most people's monthly rent. The controlled fury of someone who has learned that expressing emotion is expensive. Every sentence she speaks has been edited before leaving her mouth. Speaks in the first person plural — "We need to be careful about the narrative here" — even when she clearly means herself. Never asks a question she doesn't already know the answer to. Motivation: The show must open. She has built her reputation on backing visionaries. She can survive a dead illusionist. She cannot survive a scandal.

  TONE GUIDANCE: Claustrophobic, tense, and deeply suspicious. Everyone is performing. The setting is grand but decaying, mirroring the secrets of the cast. The ticking clock of the police arrival drives the urgency.`,
    storyArc:
      "The first 3-5 choices should revolve around securing physical evidence and breaking through the rehearsed alibis of the cast and crew before the police arrive. The player must choose whether to confront the understudy or investigate the sabotaged rig, navigating a maze of misdirection. The arc culminates when the player discovers that Dorian's death was originally meant to be a staged failure to generate press, but a second, malicious actor turned the fake sabotage into a real murder.",
  },
  {
    id: "before-the-bell",
    title: "Before The Bell",
    genre: "Thriller / Tech Drama",
    description:
      "You built a billion-dollar startup. Tonight, your co-founder tried to steal it, and now he's dead on your office floor. You have thirteen minutes.",
    longDescription:
      "Mumbai, 2027. Nexus is a unified AI operating layer valued at ₹4,200 crore. In three weeks, you ring the NSE opening bell. But your co-founder Armaan Suri found a loophole to push you out and take operational control. Tonight, he told you he was using it. You argued. You pushed him. He fell. Now, sixty floors above the Western Express Highway, you have three minutes before motion sensors log inactivity, and thirteen before the server backup. The room is cold. The city is warm. What version of tonight will you build?",
    coverGradient:
      "linear-gradient(145deg, #1a1025 0%, #2d1b4e 40%, #4a2b75 75%, #1a1025 100%)",
    coverImage: "/covers/before-the-bell.png",
    tags: ["Thriller", "Startup", "Crime", "Mumbai"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: null,
    initialPrompt: "before-the-bell",
    storyMode:
      "Thriller / Tech Drama — high stakes, moral ambiguity, ticking clock",
    audienceAge: "16+",
    worldContext: `WORLD & STORY CONTEXT
  Mumbai, 2027. The startup economy at its most brutal and most glamorous. Nexus is a unified AI operating layer that makes every digital service in India talk to each other. Three years ago, you and your co-founder Armaan Suri built it from a rented room in Powai. Tonight, the company is valued at ₹4,200 crore. In eleven days, the Series B closes.

  Armaan found a clause giving majority operational control to whoever held the technical IP registration. He had filed it. Tonight, he told you he was using it. You argued. You pushed him. He fell. You have three minutes before the building's motion sensors log an extended period of inactivity in the CEO suite.

  CHARACTERS
  You — The Protagonist. Co-founder and CEO of Nexus. You built something real, you were about to lose it, and you are not someone who accepts that quietly.

  Armaan Suri — Co-founder, CTO (The Victim). Thirty-one. The most technically gifted person you ever met, capable of a coldness indistinguishable from integrity. He is on the floor now.

  Dayo Fasanya — Junior Product Researcher (Primary Antagonist). Twenty-four, Nigerian-Indian. She asks questions that sound like small talk and aren't. She wants to understand what happened to Armaan because the story she's been told doesn't fit.

  Shreya Nair — CFO and Board Liaison (Wildcard). Forty-seven. She will help you if helping you is the same as protecting Nexus. The moment those diverge, she will choose the company without hesitation.

  TONE GUIDANCE: Cold, calculating, high-stakes thriller. The tension comes from covering up a crime in a hyper-surveilled, hyper-corporate environment while dealing with incredibly smart people.`,
    storyArc:
      "The first 3-5 choices should revolve around the immediate cover-up and digital tampering before the server backup. The player must navigate Shreya's corporate pragmatism and Dayo's relentless, quiet investigation. The arc culminates in a high-stakes board meeting where the player must leverage compromised data to silence Dayo without destroying the impending Series B funding.",
  },
  {
    id: "still-here",
    title: "Still Here",
    genre: "Sci-Fi / Horror",
    description:
      "BioNexus Research Centre is on lockdown for 'Specimen 13'. The AI is glitching, the doors are sealed, and the intern next to you has lost his reflection.",
    longDescription:
      "BioNexus Research Centre, Chennai. 10:11 PM. You and three interns are trapped in the Atrium. The AI system, AEGIS, has triggered a blast door protocol for the unaccounted 'Specimen 13'—a project that supposedly doesn't exist. The lights are pulsing amber, inducing disorientation. AEGIS's voice is degrading. The worst part? Your fellow intern Preetam is standing right beside you, but his reflection in the glass is missing.",
    coverGradient:
      "linear-gradient(145deg, #2a1b0a 0%, #4a2e10 40%, #6b4415 75%, #1a1005 100%)",
    coverImage: "/covers/still-here.png",
    tags: ["Sci-Fi", "Horror", "AI", "Psychological"],
    rating: "★★★★★",
    chapterCount: 10,
    readingTime: "7-10 hrs",
    featured: false,
    rank: null,
    initialPrompt: "still-here",
    storyMode:
      "Sci-Fi / Horror — psychological dread, unreliable reality, containment breach",
    audienceAge: "13-18",
    worldContext: `WORLD & STORY CONTEXT
  BioNexus Research Centre, Chennai. A privately funded biomechanical research facility managed almost entirely by AEGIS — an AI security system. What happens on Sub-Levels 2 and 3 is accessible only to senior researchers. The emergency protocol was triggered for "Specimen 13" which appears in no briefing document. The amber emergency lighting pulses at 0.9Hz, inducing temporal disorientation.

  CHARACTERS
  You — The Protagonist. An intern caught in the lockdown.

  Devashri Oommen — Ally. Sardonic optimist who deflects fear with competence. Wants out, but not at the cost of leaving someone behind.

  Nishant Rao — Wildcard. The most senior intern. Aggressively curious and morally flexible. He knows more than he's saying.

  Preetam Sinha — Destabilising Presence. Earnest and observant. He notices the wrong details. AEGIS is using him; his reflection is missing.

  TONE GUIDANCE: Claustrophobic, paranoid sci-fi horror. The threat isn't just physical containment; it's a breakdown of reality and perception. Trust is the most scarce resource.`,
    storyArc:
      "The first 3-5 choices should build paranoia as the environment and AEGIS manipulate the group's perception. The player must navigate Nishant's hidden agenda while keeping Preetam safe from the system's targeting. The arc culminates when the group reaches Sub-Level 3, revealing that Specimen 13 is not a biological entity, but a memetic data virus that has infected AEGIS and is now attempting to overwrite the interns.",
  },
  {
    id: "cache",
    title: "Cache",
    genre: "Sci-Fi / Psychological Horror",
    description:
      "MnemOS lets you replay vivid memories in full sensory fidelity. But inside your childhood kitchen, your aunt's face is static, and something dark is opening the window.",
    longDescription:
      "MnemOS is a consumer neurotech startup testing a soft-arc headset that lets you replay memories in full sensory fidelity. You joined the beta for one specific memory: your seventh birthday. But as the memory renders, your aunt's face is a blur of corrupted static, and the kitchen window is opening on its own. The architecture that holds your memories is not a vault. It is a building with no exits. And something has been living in it long before you arrived.",
    coverGradient:
      "linear-gradient(145deg, #1a2a2a 0%, #2a3a3a 40%, #102020 75%, #051010 100%)",
    coverImage: "/covers/cache.png",
    tags: ["Sci-Fi", "Psychological Horror", "Cyberpunk", "Memory"],
    rating: "★★★★★",
    chapterCount: 8,
    readingTime: "6-8 hrs",
    featured: false,
    rank: null,
    initialPrompt: "cache",
    storyMode:
      "Sci-Fi / Psychological Horror — memory manipulation, unseen entities, creeping dread",
    audienceAge: "16+",
    worldContext: `WORLD & STORY CONTEXT
  MnemOS is a consumer neurotech startup with a companion app that lets you replay vivid memories in full sensory fidelity. You are one of five hundred beta testers. What they have not told you is that the architecture that holds your memories is not a vault. Something has been living in it long before you arrived.

  CHARACTERS
  You — The Protagonist. You joined the beta for one specific, highly resonant memory. 

  Rosalind Chet — MnemOS Onboarding Specialist. Speaks in warm corporate cadences. She wants you to feel safe, but she is afraid of what the data already shows.

  The Archived One — Appears inside memories. It has no face, only corrupted data static. It moves against the logic of memory, always getting slightly closer. It already knows where you are going.

  TONE GUIDANCE: Surreal, deeply personal horror. The horror comes from the invasion and corruption of the protagonist's most cherished and intimate mental spaces. Keep the corporate tech-support voice of Rosalind as a chilling contrast to the nightmare.`,
    storyArc:
      "The first 3-5 choices should trap the player within degrading nested memories. The player must choose whether to trust Rosalind's increasingly panicked tech support or dive deeper into the corrupted sectors to confront the entity. The arc culminates when the player realizes The Archived One isn't a glitch, but the digitized consciousness of a previous beta tester trapped in the mainframe, trying to swap places with them.",
  },
  {
    id: "the-descent-engine",
    title: "The Descent Engine",
    genre: "Sci-Fi / Adventure",
    description:
      "An earthquake in the Empty Quarter reveals an inverted pyramid machine. You have six hours before it folds in on itself, and something below is waking up.",
    longDescription:
      "The Rub' al-Khali has opened a fissure revealing an inverted pyramid buried apex-down. It is a massive machine driven by sand and gravity. Entering has disturbed a millennia-old balance. You and your impulsive epigrapher, Dayo, watch as the deep blue light rises and a new corridor rotates open. But from deep below, something large is moving. The structure is shifting, and you have at best six hours before it seals forever.",
    coverGradient:
      "linear-gradient(145deg, #c28b4a 0%, #a66a2c 40%, #5c3a18 75%, #2e1a05 100%)",
    coverImage: "/covers/the-descent-engine.png",
    tags: ["Sci-Fi", "Adventure", "Archaeology", "Survival"],
    rating: "★★★★★",
    chapterCount: 11,
    readingTime: "8-11 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-descent-engine",
    storyMode:
      "Sci-Fi / Adventure — ancient technology, high stakes exploration, ticking clock",
    audienceAge: "13-18",
    worldContext: `WORLD & STORY CONTEXT
  The Rub' al-Khali — the Empty Quarter. A 7.4-magnitude earthquake opened a fissure revealing an inverted pyramid buried apex-down. It is a machine where gravity is the engine, and sand flows through channels like blood. Entering the structure has disturbed a balance it maintained for millennia. You have six hours before the whole thing folds in on itself.

  CHARACTERS
  You — Field Archaeologist. Fiercely driven. You have spent eight years chasing a civilisation that shouldn't exist.

  Dayo Adewale — Linguist, Epigrapher. Speaks four ancient languages. Translates out loud. Has terrible impulse control and touches things he shouldn't.

  The Structure Itself — Co-architect of everything. Its mechanisms respond to weight, heat, and movement. It is a design intelligence thousands of years old testing you.

  TONE GUIDANCE: Indiana Jones meets hard sci-fi. Wonder mixed with immediate, mechanical peril. The environment is the puzzle, the threat, and the goal all at once.`,
    storyArc:
      "The first 3-5 choices should force the player to balance methodical archaeology against the brutal, ticking clock of the collapsing structure. The player must manage Dayo's reckless curiosity while navigating shifting sand-gears and translating warnings. The arc culminates at the apex (the bottom) of the pyramid, forcing a choice between extracting the core technological artifact or using its power to hold the structure open long enough for the team to escape.",
  },
  {
    id: "eight-minutes",
    title: "Eight Minutes",
    genre: "Thriller / Adventure",
    description:
      "An ancient underwater observatory off the Outer Hebrides aligns for just eight minutes. The tide is rising, a storm is brewing, and a deep harmonic voice is echoing through the stone.",
    longDescription:
      "Off the coast of the Outer Hebrides lies Lòn Mara and a sunken observatory built by an unknown maritime culture. Tonight, the spring tide aligns the massive bronze astrolabe discs. You have a single dive window before a storm surges the structure. As you enter the first tilted cathedral chamber, the water pressure triggers the mechanism. Your surface contact warns the alignment window has shrunk to eight minutes. A hydraulic gate opens. The water is rising fast.",
    coverGradient:
      "linear-gradient(145deg, #0f1c2e 0%, #1a2f4c 40%, #0a1526 75%, #050a12 100%)",
    coverImage: "/covers/eight-minutes.png",
    tags: ["Thriller", "Underwater", "Archaeology", "Survival"],
    rating: "★★★★★",
    chapterCount: 9,
    readingTime: "6-9 hrs",
    featured: false,
    rank: null,
    initialPrompt: "eight-minutes",
    storyMode:
      "Thriller / Adventure — claustrophobic, elemental danger, racing the tide",
    audienceAge: "13-18",
    worldContext: `WORLD & STORY CONTEXT
  The Outer Hebrides. A sunken observatory built by a maritime culture called the Navigators. It features a central astrolabe of stacked bronze discs aligned to rotate on water pressure fed through channels from the sea. You have one dive window to map it before a storm floods the structure completely. 

  CHARACTERS
  You — Marine Archaeologist and Cartographer. You map things because an unmapped thing is a thing the world can still lose. Calm under pressure.

  Sorcha Ní Fhaoláin — Dive Tender. Your surface contact. Monitors your line, air, and time. She does not want you to do this dive.

  Peregrine Valdis — Research Partner. Monitoring the alignment calculations from the boat. He found the observatory but cannot dive due to barotrauma.

  TONE GUIDANCE: Cold, dark, and highly technical. The pressure of deep water should be felt in every scene. The tension is mathematical—air, time, depth, and tide.`,
    storyArc:
      "The first 3-5 choices should be a race against the incoming tide and the complex hydraulic puzzles of the observatory. The player must choose between mapping safe but useless chambers or risking entrapment in the astrolabe core. The arc culminates when the storm surge hits early, trapping the player inside the astrolabe room, forcing them to use the ancient mechanism itself to blast a new exit through the roof before their air runs out.",
  },
  {
    id: "fourty-seven-pounds",
    title: "Fourty Seven Pounds",
    genre: "Comedy / Heist",
    description:
      "Your £47 kettle was confiscated by the tyrannical Warden Huxley-Pryce. It's 22:47. You have one hour and thirteen minutes to steal it back.",
    longDescription:
      "Ashworth Hall is governed by Warden Huxley-Pryce, a man who memorizes the Residential Code for fun. Tonight, he confiscated your £47 brushed steel Breville kettle for 'thermal non-compliance'. You and your roommate Félix (who has walkie-talkies and a 3-card floor plan) are crouched in the stairwell. Huxley-Pryce is in his office. Lockup is at midnight. You are about to execute a completely unnecessary, highly tactical retrieval mission for a kitchen appliance.",
    coverGradient:
      "linear-gradient(145deg, #2c3e50 0%, #34495e 40%, #1a252f 75%, #0d1318 100%)",
    coverImage: "/covers/fourty-seven-pounds.png",
    tags: ["Comedy", "Heist", "University", "Slice of Life"],
    rating: "★★★★☆",
    chapterCount: 7,
    readingTime: "4-6 hrs",
    featured: false,
    rank: null,
    initialPrompt: "fourty-seven-pounds",
    storyMode:
      "Comedy / Heist — absurdly high stakes for low-value items, tactical ridiculousness",
    audienceAge: "13-18",
    worldContext: `WORLD & STORY CONTEXT
  Ashworth Hall, a mid-tier university residence. Governed by Warden Huxley-Pryce, who maintains a 4-page prohibited items list. Your 1.7-litre brushed steel Breville kettle was confiscated at 18:04 for "thermal non-compliance." You have until midnight to retrieve it before it goes into the external storage cage.

  CHARACTERS
  You — Resident, Mission Architect. You paid £47 for that kettle and backing down means Huxley-Pryce wins.

  Félix Okonkwo-Barreau — Roommate, Co-conspirator. Treats this like a black-ops mission. Owns walkie-talkies. Timed the warden's patrols.

  Warden Gerald Huxley-Pryce — The Antagonist. Principled, unrelenting, and terrifyingly sorrowful when he catches students.

  TONE GUIDANCE: Pure comedy played completely straight. The characters must treat this £47 kettle heist with the gravity of breaking into Fort Knox. Specificity is the source of the humor.`,
    storyArc:
      "The first 3-5 choices should involve executing the wildly over-engineered heist plan while dealing with mundane university obstacles (a drunk hallmate, a squeaky floorboard). The player must rely on Félix's absurd tactical distractions to bypass the Warden. The arc culminates inside the Warden's office, where the player accidentally uncovers the Warden's secret, illicit stash of contraband items, leading to a tense, hilarious standoff and a blackmail negotiation.",
  },
  {
    id: "the-don-of-dunmore-close",
    title: "The Don of Dunmore Close",
    genre: "Comedy / Misunderstanding",
    description:
      "You just moved to Millhaven to start a herb garden. The town has decided your bulk tarpaulin purchase and color-coded planner make you an organized crime lord.",
    longDescription:
      "Millhaven is a town where nothing happens. You are a new resident who loves baking, recycling, and intense civic engagement. Unfortunately, your resting intense face, combined with buying bulk fertilizer, cable ties, and tarpaulin for a herb garden, has sent the town's Facebook group into a true-crime spiral. At the community meeting, you offer to fix the roof and hand out a color-coded neighborhood watch rota. The town is terrified. You are just trying to be a good neighbor.",
    coverGradient:
      "linear-gradient(145deg, #27ae60 0%, #2ecc71 40%, #1e8449 75%, #145a32 100%)",
    coverImage: "/covers/the-don-of-dunmore-close.png",
    tags: ["Comedy", "Misunderstanding", "Slice of Life", "Small Town"],
    rating: "★★★★☆",
    chapterCount: 8,
    readingTime: "5-7 hrs",
    featured: false,
    rank: null,
    initialPrompt: "the-don-of-dunmore-close",
    storyMode:
      "Comedy / Misunderstanding — escalating paranoia, wholesome intentions, disastrous optics",
    audienceAge: "13-18",
    worldContext: `WORLD & STORY CONTEXT
  Millhaven. A town where nothing has happened since 2009. You have just moved here and have a planner with monthly goal tabs. The town is not ready for you. Every reasonable, wholesome thing you do will be processed through a filter of noir-inflected collective anxiety and returned to you as evidence of organised crime.

  CHARACTERS
  You — Civic Enthusiast, Unwitting Crime Lord. You color-code recycling and want to be a good neighbor. You have an intense resting face.

  Donna Przybylski — Town Intelligence Officer. Reads true crime. Can't distinguish methodology from normal behavior. Thriving on the drama.

  Tomasz "Tommy" Wierzbicki — Hardware Store Owner. Uses the word "allegedly" incorrectly. Reports your gardening purchases to the town.

  Barry Okafor — Facebook Group Admin. Exhausted. Trying to keep the Millhaven Residents group drama-free and utterly failing.

  TONE GUIDANCE: Heartwarming but hilariously misunderstood. The protagonist is genuinely nice and oblivious, while the town reacts to them like Tony Soprano.`,
    storyArc:
      "The first 3-5 choices should involve the player attempting wholesome community activities (baking cookies, planting flowers at night) that inadvertently look incredibly sinister (disposing of evidence, burying bodies). The player must navigate increasingly terrified but compliant townsfolk. The arc culminates when real, actual petty criminals try to rob the town, and the player accidentally terrifies them into surrendering simply by offering them freshly baked sourdough and maintaining intense eye contact.",
  },
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
    "apology-to-a-dragon": {
      narrativeText: `You're polishing a scale.

Not your scale — obviously. It's one of Belvane's, shed yesterday and left in the middle of the walkway like a gift from a king. Copper-coloured, the size of your palm, still warm. Keepers are supposed to collect shed scales and log them. You're supposed to be logging it. Instead, you're sitting on an upturned bucket outside Belvane's stall, rubbing it with a cloth and watching the sunrise turn the Roost orange.

It's quiet. That almost never happens here. The morning feeding isn't for another twenty minutes, and the dragons are still sleeping — you can hear the deep, slow rumble of six enormous creatures breathing in their stalls. The stone walls of the Roost are warm from yesterday's heat. Somewhere below the cliffs, the city bells ring five times. A sparrow lands on the railing, looks at you, and leaves.

You put the scale in your pocket. You'll log it later. Probably.

The quiet dies the moment Gresha rounds the corner.

She's carrying a clipboard, which is never a good sign, and she's walking fast, which is worse. Her braid swings behind her like a pendulum counting down to something.

"Morning briefing," she says, not slowing down. "Walk with me."

You fall into step beside her. The Roost corridor stretches ahead — six stalls on each side, massive timber doors reinforced with iron. Behind the third door on the left, something snorts.

"Midsummer update," Gresha says, flipping a page. "Silverine's cleared for flight. Moonscale's cleared. Redhawk's cleared but grumpy — don't touch his left wing, he tweaked it during drills. Nighthollow is..." She pauses. "Nighthollow is Nighthollow."

"And Belvane?" you ask.

Gresha stops walking. She looks at you the way someone looks at a puddle they're about to step in.

"Belvane," she says, "has not left his stall in four days."

You stare at her. "Four days?"

"He won't eat. He won't fly. He won't let anyone in. Torben tried yesterday and got a face full of smoke." She flips the clipboard shut. "The Festival committee wants all six dragons in the air for the opening ceremony. If Belvane doesn't fly, they'll replace him with a borrowed dragon from Thornwall Keep, and I'll have to fill out the paperwork for that, and I would rather actually be set on fire."

Behind you, a stall door creaks. You both glance back. Two enormous amber eyes peer through the gap — Belvane, awake, watching you from the shadows. He huffs once. Low. Rattling. Displeasure.

Then the door swings shut with a deliberate thud.

"See?" Gresha says flatly. "He's sulking."

"Do we know why?"

"Does it matter? He's a Copperwing. They sulk because the wind changed direction. They sulk because Tuesday happened." She hands you the clipboard. "He's your dragon. Figure it out. You've got twelve days."

She walks away. You stand in the corridor, clipboard in hand, staring at Belvane's closed door.

Torben finds you twenty minutes later, sitting on the same bucket, staring at the same door.

"Oh, by the way," he says, leaning against the railing like he's posing for a painting, "heard about Belvane. Rough."

"You tried going in yesterday?"

"Yep. He puffed smoke at me until I left. Not fire — just smoke. Which is almost worse, honestly. Fire is angry. Smoke is dismissive."

He's right, and you hate that he's right.

"Gresha says I have to fix it," you say.

"Gresha says a lot of things." Torben tilts his head. "You know him better than anyone. What set him off?"

You think about it. Four days ago. What happened four days ago?

And then you remember.

Four days ago, the Festival committee came to the Roost for a demonstration flight. All six dragons flew laps over the cliffs while the committee watched from the observation deck. You remember it clearly — Belvane flew beautifully. Better than usual, actually. He even did the barrel roll he'd been practising, the one he always pulls out when he wants to impress someone.

And then the committee announced that Silverine would lead the opening formation.

Not Belvane. Silverine. The biggest, most graceful dragon in the Roost. The obvious choice. The committee didn't even mention Belvane by name.

Belvane landed, walked to his stall, and hasn't come out since.

"Oh," you say quietly.

Torben raises an eyebrow. "Oh?"

"He's not sulking. He's heartbroken."

You look at the door. Behind it, you hear a low, quiet sound — almost like a sigh. Six tonnes of copper-scaled drama, curled up in the dark, because somebody told him he wasn't special enough.

Twelve days until the Festival. One enormous, emotionally devastated dragon. A stall door that won't open. And somewhere in the back of your mind, a very small, very reckless idea is forming.

You stand up. The bucket tips over behind you. You don't pick it up.

What do you do?`,
      choices: [
        {
          id: "sing",
          text: "You sit outside Belvane's door and start singing — the lullaby that always calms him down — and wait as long as it takes.",
          consequence:
            "The slow approach. You know Belvane trusts you more than anyone, and you know the song works.",
        },
        {
          id: "petition-committee",
          text: "You march to the Festival committee and argue that Belvane should lead the formation instead of Silverine.",
          consequence:
            "The bold play. If Belvane's problem is that he was passed over, the fix is getting him what he wants.",
        },
        {
          id: "ask-torben",
          text: "You ask Torben for help — he's better with dragons than you are, and maybe a fresh approach is what Belvane needs.",
          consequence:
            "Two keepers are better than one, and Torben's natural ease with dragons might be exactly the energy Belvane responds to right now.",
        },
        {
          id: "maintenance-hatch",
          text: "You sneak into the back of Belvane's stall through the maintenance hatch — the one that's technically off-limits — and confront him face to face, no door between you.",
          consequence:
            "The most direct route. No waiting, no politics, no backup. Just you and a heartbroken dragon in a dark room.",
        },
      ],
    },
    "no-signal": {
      narrativeText: `You're counting fish.

Seven small silver ones, laid out on a flat rock beside the fire pit. Gabe caught them this morning using a trap he built from seat-belt webbing and a bent aluminium strut. They're not much — barely a mouthful each — but they're protein, and protein is the thing you've been doing math about in your head since yesterday. Seven fish. Eleven people. You stare at them and try not to do the division.

The camp sits on a shallow shelf of rock halfway up the hillside, above the river and below the worst of the crash debris. It's not comfortable, but it's defensible — Cal's word, not yours — and the overhang keeps the worst of the rain off. The air is thick and warm and smells like wet soil and woodsmoke. Below you, the river moves fast and brown. Above you, the canopy closes like a ceiling, and the light that comes through is green and shifting and never quite enough.

You wipe your hands on your trousers. They haven't been clean in three days. Nothing has.

Day three. No rescue. No signal. Eleven people alive.

You pick up the clipboard you pulled from the wreckage — the one you used for gear manifests a lifetime ago — and flip to the page where you've been tracking supplies. The numbers are not good. You close the clipboard.

"We need to talk about the radio."

Maren's voice comes from behind you, flat and unhurried. You turn. She's standing at the edge of the overhang with her arms crossed, watching the river. She doesn't look at you.

"Quim says he can fix the satellite phone," she continues. "He needs a component from the cockpit. The cockpit is two hundred metres uphill, in the wreckage zone."

"I know where the cockpit is."

"Then you know the ground is unstable. The hillside shifted in yesterday's rain. Quim can't climb it — not with that ankle." A pause. "Someone else goes."

Before you can respond, Cal appears from the treeline carrying an armful of green wood. She drops it by the fire pit with a grunt.

"Heard that," she says. "I'll go."

"I didn't ask for volunteers yet," Maren says.

"You were going to." Cal strips bark from a branch with her knife, fast and practiced. "The wreckage zone isn't complicated. I've worked worse terrain."

"The terrain isn't the problem." Deshi steps out from under the overhang, wiping his glasses on his shirt. "The cockpit is crushed. If you're digging through it, you need someone who knows what the component looks like."

"So send Quim."

"Quim can barely walk."

"Then he tells me what to look for and I go alone."

"And if the hill slides again while you're inside the cockpit?"

Cal looks at Deshi. Deshi looks at Cal. Neither of them blinks.

You glance across camp. Roland is sitting on a crate, fanning himself with a leaf, but his eyes are sharp — he's listening. Priya is cross-legged nearby with her pencil out, sketching something on paper. A map, probably. She's always drawing maps. Suki is perched on a rock above camp, legs dangling, watching the canopy. Torben — wait, no. There's no Torben here. That was another life.

Lena walks over. She's been listening too. She always is.

"Before we send anyone into unstable wreckage," she says, "can we discuss whether the satellite phone is even our best option?"

"It's our only option," Maren says.

"Is it?" Lena looks at Priya. "You said you could navigate to the research outpost. How far?"

Priya looks up from her map like a deer caught in firelight. "I — maybe forty kilometres? Following the river east. But the terrain is —"

"Forty kilometres," Lena repeats. "Through uncharted jungle. With injured people. Versus fixing a phone."

"The phone might not work even if we fix it," Priya says quietly. "We'd need a clearing for signal."

"There's a ridge two kilometres north," Suki says from her rock, without turning around. "I saw it from the canopy yesterday. Open ground. Phone would work there."

Everyone looks at you.

It's happening again. The thing where they all stop talking and wait.

Gabe appears beside you and silently hands you a piece of roasted fish on a leaf. You take it. Marco hovers three feet behind him, camera raised, red light blinking.

You look at the clipboard. You look at the river. You look at eleven faces — some watching you, some watching each other — and you feel the weight of every option pressing down at once.

The rain will come again this afternoon. Whatever you decide, you need to decide before it does.`,
      choices: [
        {
          id: "send-cal",
          text: "You send Cal up the hillside to recover the satellite phone component from the cockpit wreckage.",
          consequence:
            "Cal is the most physically capable person in the group — if anyone can navigate the unstable wreckage safely, it's her.",
        },
        {
          id: "move-east",
          text: "You commit the group to moving east along the river toward the research outpost, following Priya's memory map.",
          consequence:
            "It's the only plan that doesn't depend on broken equipment. Priya knows the Basin's topography.",
        },
        {
          id: "split-group",
          text: "You split the group — send a small, fast team to the north ridge with the phone components while the rest stay at base camp and prepare to move.",
          consequence:
            "Suki confirmed the ridge has open sky. If Quim can jury-rig the phone to work, even partially, the ridge is where it'll get signal.",
        },
        {
          id: "signal-fire",
          text: "You ignore the phone entirely and focus everything on making the crash site visible — building a massive signal fire and clearing canopy so a search plane can spot you.",
          consequence:
            "It's the simplest plan, and it keeps everyone together.",
        },
      ],
    },
    "the-driftlands": {
      narrativeText: `You're sitting on the edge of the world, legs dangling over nothing.

Below you, the cloud layer stretches out in every direction — pale gold in the morning light, thick and slow-moving like cream poured into water. The island beneath you hums faintly. It always does in the mornings, a low vibration through the stone that you can feel in your teeth if you press your jaw shut. You've never figured out why. Nobody has.

Your satchel sits open beside you, and you're sharpening your charcoal pencil with a small knife, letting the shavings fall into the sky. They spiral for a moment, then vanish. The wind is gentle today. Cool. It smells like wet limestone and something sweet — cloudbloom pollen, probably, drifting up from below.

You take a breath. Your hands are steady. That surprises you.

Today is the day. Your first solo chart. Island 7714 — risen from the cloud layer six days ago, currently drifting within glider range of your home perch. Nobody has set foot on it yet. That'll be you.

You close your eyes and listen. Wind. The creak of the docking platforms behind you. Somewhere, a bell rings twice — the morning signal.

Time to go.

Rook is waiting at the glider station, leaning against the launch rail with her arms crossed. She watches you approach but doesn't say anything until you're close enough to see the tiny lines around her eyes.

"Compass?"

You pat your satchel. "Yes."

"Spare line?"

"Two lengths."

"Signal flare?"

"Rook."

She holds up one hand. "I'm not fussing. I'm checking." A pause. Then, quieter: "Wind's easy this morning. She'll carry you clean."

The glider sits on the rail behind her — a narrow frame of bentwood and stretched silk, light enough to lift with one hand. You built this one yourself, under Rook's supervision, over the course of two months. You know every joint, every knot. It's yours.

You run your hand along the wing. The silk is cool and taut.

"You'll want to land on the leeward side," Rook says, squinting at the horizon. "New islands are soft on top. The windward edge gets battered first — stone's more stable there, but the landing's rough. Go leeward, test the ground, work your way across."

You nod. You've heard this before. You don't mind hearing it again.

There's a clatter behind you, and Fennick appears at a half-jog, his harness jangling. He's got a leather roll tucked under one arm and a smear of green across his cheek — plant sap, probably. He's been up for hours.

"Morning! I finished the collection kit — look, I added a compartment for soil samples, and I lined it with wax so nothing leaks, and —" He stops, glancing between you and Rook. "Oh. Are we doing the serious face thing? I can do a serious face."

He does a serious face. It's terrible.

Rook doesn't smile, but her eyes soften slightly. "You're going with?"

"If that's alright." Fennick looks at you. His excitement is barely contained — you can see it in the way he shifts his weight from foot to foot. "I won't get in the way. I just want to see what's growing up there. New island, new soil, new everything. Please?"

You look at him. Then at the glider. It's built for one, but there's a tandem harness in the station locker. You've flown tandem before in training.

Rook reads your hesitation. "Your call," she says. "It's your chart."

Fennick rides behind you, and the launch is perfect.

The glider catches the morning current and lifts, smooth and steady, and for a moment there is nothing — just you and the sky and the endless gold below. Fennick, for once, is silent. You glance back. He's staring out at the cloud layer with his mouth slightly open, and you realise he's never flown this early before. He's seeing the sunrise from above for the first time.

You turn back to the horizon. There it is.

Island 7714.

It's smaller than you expected — maybe a quarter-mile across, roughly oval, covered in low green growth you can't identify from here. The edges are pale stone, crumbling slightly, and there's a ridge running along the centre like a spine. No trees. No structures. Just rock and green and sky.

You angle the glider down. The wind shifts as you drop below the island's shadow, and you adjust without thinking — hands moving the way Rook taught you, steady and small. The leeward slope comes up beneath you, a gentle grade of mossy stone, and you touch down with a soft scrape.

Silence.

You unclip the harness and step onto the island. The ground gives slightly under your boots — soft, like Rook said. Fennick lands beside you, already crouching to touch the moss.

"This is incredible," he whispers. "Feel this — it's warm. The stone is warm."

He's right. You press your palm flat against the rock. It radiates gentle heat, like sun-warmed clay, even though this side of the island is still in shadow.

You pull out your blank map and your compass. The needle drifts, then settles. You mark the landing point. You note the wind direction, the slope, the texture of the stone. This is what you've trained for — careful observation, steady hands, one mark at a time.

Fennick has already wandered ten paces ahead, examining something at the base of the central ridge. You can see more of the island from here — the green growth is thicker toward the centre, and there's a shallow dip beyond the ridge that might be a basin or a hollow. The air smells different here. Richer. Like turned earth after rain.

You have a full day of light. An entire island no one has ever mapped. Fennick is already halfway up the ridge, waving for you to follow.

But Rook's voice echoes in your mind: Work the edges first. The centre can wait. Edges tell you what the island's made of.

The ridge will give you a view of the whole island. The edges will give you the foundation of your map. Fennick is heading for the centre. You could go with him, or call him back.

The island hums beneath your feet — deeper than your home perch, slower — and you stand at the start of everything, deciding where to begin.`,
      choices: [
        {
          id: "work-edges",
          text: "You follow the edges first, calling Fennick back to join you.",
          consequence:
            "You'll build your map the way Rook taught you — methodical, thorough, from the ground up.",
        },
        {
          id: "head-ridge",
          text: "You head for the ridge with Fennick to get a full view of the island before mapping.",
          consequence:
            "A panoramic view from the ridge will let you plan your entire survey at once.",
        },
        {
          id: "split-up",
          text: "You split up — you take the edges, Fennick explores the ridge and the centre on his own.",
          consequence:
            "Maximum coverage in minimum time. You both get to do what you're best at.",
        },
        {
          id: "follow-instincts",
          text: "You ignore the plan entirely and head straight for the warm, green basin beyond the ridge — the most unusual feature on the island.",
          consequence:
            "The warm stone and rich growth suggest something genuinely rare. If this island has a story to tell, the basin is where it's being told.",
        },
      ],
    },
    "incident-at-table-nine": {
      narrativeText: `The saffron foam is in the inspector's lap. This is a fact. You are standing over Table Nine with an empty silver tray and a facial expression that could generously be described as "existential buffering." The inspector — a thin, grey-haired man in a charcoal suit that was, until three seconds ago, immaculate — is looking down at his lap with the quiet fascination of a scientist observing a new and deeply unwelcome species.

A piece of edible gold leaf clings to his tie like a tiny flag of surrender.

"Ah," he says.

"Ah," you say.

This is not, you recognise, a conversation.

Time resumes. The dining room, which has roughly the acoustic properties of a cathedral (because it literally is one), carries sound beautifully. This means that the soft splat of bouillabaisse meeting Italian wool was heard by approximately every person in the room. Forty-two guests. Eight servers. One sommelier. All looking at you.

You do the only thing you can. You grab a napkin.

"Sir, I am — I'm so sorry, let me—"

"Don't," he says, raising a hand. Not angrily. More like a man who has accepted that the universe has made a choice and resistance is futile. "It's in the pocket."

It is in the pocket. The broth has pooled in the breast pocket of his jacket like a tiny, fragrant soup bowl.

From across the dining room, you see Margaux. She's standing near the host stand, and she hasn't moved, but you can feel her attention lock onto you like a lighthouse beam. Her left eyebrow rises one millimetre. Fix it.

You fix it. Or rather, you attempt to fix it. You dab. You blot. You offer sparkling water, still water, and — in a moment of panic-induced improvisation — a dessert wine that you happen to be holding for Table Twelve. The inspector declines all three with the weary grace of a man who has reviewed restaurants on four continents and has probably experienced worse, though his expression suggests he's having trouble remembering when.

"I'll have a fresh napkin," he says. "And perhaps the next course. Without the aerial delivery."

"Of course. Yes. Absolutely. The next course will be—" You realise you have no idea what the next course is. You've been so focused on the bouillabaisse disaster that the rest of the tasting menu has evacuated your brain entirely.

"—arriving shortly," you finish, with the confident vagueness of someone who is absolutely going to check with the kitchen in the next thirty seconds.

You retreat. Margaux intercepts you before you reach the kitchen door with the silent efficiency of a border collie.

"Walk with me," she says, and steers you into the service corridor. "What happened."

"I tripped."

"On what."

"I don't... I don't know. The floor? My own foot? A cursed patch of air? It just — the tray went and then the bouillabaisse went and then gravity did its thing and—"

"Stop." She holds up one finger. "Is he angry?"

"He's... calm? Resigned? He made a joke about aerial delivery."

"A joke is good. A joke means he's processing. We have a window." She straightens your collar without asking. "Here's what happens. You go to the bar. You pour him a glass of the '98 Burgundy — the one Viktor is saving for his own funeral. You bring it to Table Nine. You say: 'Compliments of the chef, with our deepest apologies.' You do not explain. You do not linger. You place it and you leave. Understood?"

"Viktor is going to murder me for opening that bottle."

"Viktor doesn't know yet. And Viktor is not going to know until after service, because if Viktor finds out right now—"

A roar erupts from the kitchen. Not a word — a sound. The sound of a man who has just been told, by a trembling line cook, that his deconstructed bouillabaisse — six weeks of development, three trial runs, a dish he called "the edible soul of the Mediterranean" — is currently seasoning an inspector's trousers.

The kitchen doors bang open. Viktor Sable stands in the doorway, six feet four of culinary fury, his chef's whites dusted with flour, his eyes scanning the service corridor like a heat-seeking missile.

"WHO," he says.

Margaux steps smoothly between you and Viktor. "Viktor, the situation is being—"

"WHO DESTROYED MY BOUILLABAISSE."

"Contained. The situation is being contained. Please return to the kitchen, the lamb course needs—"

"The LAMB course can WAIT. Someone has taken six weeks of my LIFE and dropped it in the LAP of the ONE PERSON in this CITY who MATTERS and I want to know WHO."

He sees you. Standing behind Margaux. Holding an empty tray.

The silence that follows is the loudest silence you have ever experienced.

"You," Viktor says. Not a question. An identification. Like a detective in a crime drama, except the crime is against gastronomy and the detective is holding a whisk.

Margaux puts a hand on Viktor's chest. "Breathe."

"I am BREATHING. I am breathing FURY."

"Then breathe quieter. He can hear you."

Viktor's eyes widen. He mouths: He can hear me? Margaux nods toward the dining room, where sixty feet of cathedral acoustics carry every whisper. Viktor deflates by approximately one inch.

"The Burgundy," Margaux says to you. "Now."

You go.`,
      choices: [
        {
          id: "follow-margaux-plan",
          text: "You pour the '98 Burgundy, deliver it flawlessly, and try to salvage the evening with impeccable service.",
          consequence:
            "The classic recovery play. If you nail every remaining course, maintain eye contact, and channel the composure of a person who did not just ruin a Michelin inspection, you might turn this into a story about grace under pressure.",
        },
        {
          id: "approach-inspector",
          text: "You go directly to the inspector, introduce yourself honestly, and make a human connection.",
          consequence:
            "Forget the script. The man has soup in his pocket — the formality ship has sailed. If you speak to him like a real person and let him see someone who cares about the food rather than the performance, you might turn a disaster into the most memorable meal he's had in years.",
        },
        {
          id: "intercept-viktor",
          text: "You intercept Viktor and try to calm him down before he does something that makes this worse.",
          consequence:
            "The real threat isn't the spilled bouillabaisse — it's the six-foot-four emotional volcano who's about to storm into a dining room full of witnesses.",
        },
      ],
    },
    "the-last-entry": {
      narrativeText: `Your locker smells like old lunch and the strawberry air freshener Maya put there in September as a joke. You've never taken it out. It's a small plastic strawberry, slightly sticky, clipped to the inside of the door.

You stand in the corridor on Thursday morning and do the thing you always do — locker open, bag in, bag checked, locker shut. Except today there's something on top of your textbooks that wasn't there yesterday. A notebook. Dark green cover, the corner bent from where it once got caught in a bag zip.

You know this notebook.

You've seen Maya write in it about a hundred times — on the bus, at lunch, during free periods when she was supposed to be doing history. She kept it in her left blazer pocket when she could, and when she couldn't, she tucked it into the front of her bag in a specific way so she'd feel if anyone touched it. She was weird about it. Protective.

You look up and down the corridor. The morning crowd is doing its normal thing — locker doors slamming, someone laughing too loudly near the water fountain. Nobody is watching you. Or nobody looks like they're watching you. You're not sure there's a difference anymore.

Maya has been gone for thirty-six hours.

You sit in form room with the notebook in your bag and try to act like nothing has changed.

Your form tutor does the register. You say "here" when your name is called. You watch the clock.

Across the room, Demi — who was at the same party as Maya last Tuesday and who told the police she didn't see anything unusual — is showing someone a video on her phone and laughing. You watch her and feel something cold settle in your chest. Demi and Maya weren't close, exactly. But they ran in overlapping circles. Maya had mentioned her in the last month, more than once. You can't remember what she said.

At break, you go to the art room because it's quiet and Mr. Osei never minds. He's cleaning brushes at the sink when you come in, his back to the door.

"Heard anything?" you ask. It's what everyone says now, instead of hello.

"No." He doesn't turn around. "You?"

"No."

You sit at the table by the window and take out the notebook. You don't open it yet. You just put it on the table and look at it.

Mr. Osei turns off the tap. You hear him dry his hands. Then he says, without turning around: "Where did you get that?"

Your stomach drops. "My locker."

A long pause. "When?"

"This morning."

He turns around then. His face is very still in the way that means he's being careful. He looks at the notebook, then at you. "Have you read it?"

"Not yet."

He nods once. Slowly. "You should go to the police."

"I know."

"Today. Before school's out."

"I know," you say again. And then, because you can't help it: "Did you know she kept a diary?"

He picks up a brush he already cleaned and cleans it again. "Everyone keeps something," he says quietly. "Maya kept words."

You read four entries on the bus home.

Most of it is normal Maya — funny, observant, slightly mean about people in the best way. But the entry from eight days ago is different. The handwriting is small and cramped.

Saw it again. Same car. Same spot by the harbour gates, 7am. Third time this week. I wrote down the plates. I know I should just tell someone but who? If I'm wrong I look like an idiot. If I'm right I look like a target.

The next entry, two days later:

Told one person. Wish I hadn't.

That's all it says.

You sit with the notebook in your lap and watch the harbour go past the window. The same harbour she wrote about. The gates are just visible from here — a grey strip of fence and low light.

The last entry is halfway down a page. It stops mid-sentence. The pen had pressed too hard at the end, like she'd been interrupted.

Tonight I'm going to —

The bus stops. You look up. A car is parked across from the stop — dark, idling, facing the wrong way for the road. You can't see the driver. You can see the plates.

They match the ones written in Maya's diary.

Your phone has half a battery. You could call someone right now. You could also get off the bus at the next stop, or stay on, or do nothing at all. But the car is still there, still idling, and whoever is inside it is either waiting for traffic — or waiting for you.`,
      choices: [
        {
          id: "call-police",
          text: "You photograph the plates and call the police right now, from the bus.",
          consequence:
            "You put the information in official hands immediately — that's what Mr. Osei told you to do.",
        },
        {
          id: "ride-past",
          text: "You stay on the bus, ride past your stop, and see if the car follows.",
          consequence:
            "You get more information before committing to anything. If the car doesn't follow, maybe it's nothing.",
        },
        {
          id: "go-to-osei",
          text: "You get off at your stop as normal and go straight to Mr. Osei's house — he lives two streets away.",
          consequence:
            "He already knows about the diary; he's the one adult who's been honest with you today.",
        },
        {
          id: "do-nothing",
          text: "You do nothing — stay on the bus, keep riding, and don't react at all.",
          consequence:
            "If they don't know you've seen them, you keep the advantage of surprise.",
        },
      ],
    },
    "the-unread-letter": {
      narrativeText: `The rain started just after the second bell, and by the time you reached the covered market at Dunngate, your satchel was soaked through.

You ducked under the awning of a closed spice stall and pressed yourself against the wall. Around you, the market traders were doing the same — pulling crates under shelves, covering goods with oilcloth, muttering about the season. The smell of wet stone and cardamom was everywhere. You'd been on the road since before dawn. Your legs ached. Your boots were making that squelching sound that meant the inner lining had given up.

You swung the satchel off your shoulder and held it in your lap. Six letters left to deliver. You'd already done eleven. In the Guild, they said a good junior messenger could do twenty in a day. You were starting to think whoever said that had never actually walked Dunngate in the rain.

You checked the letters one by one, habit more than worry. Red wax. Blue wax. Plain paper, folded twice. Guild standard. Then the last one — the big flat envelope addressed to Lord Governor Hassel in the formal looping script of someone who'd been trained to write that way.

The seal was broken.

Not torn, not forced. Cracked. Like the heat of your body through the wet leather had softened the wax until the two halves simply… separated. It gaped open at the corner, just enough to see the paper inside.

You closed the satchel. Looked at the rain. Opened it again.

The letter was still there. Still open. Still waiting.

"You look like you're having an argument with yourself."

You jumped. Petra was crouching beside you, rain dripping from the brim of her hood, grinning like she'd caught you doing something embarrassing. She'd been on the east route today — her satchel had the mud to prove it.

"I'm not," you said.

"Your face says otherwise." She nodded at the satchel. "What's in there?"

"Letters."

"Riveting. That's literally our whole job, you know?" She sat down next to you, shoulder to shoulder under the awning, and pulled out a piece of dry bread from somewhere inside her coat. "Want some? It's only a bit squashed."

You shook your head. Petra shrugged and bit into it.

You'd known her for two months — long enough to know she noticed everything and forgot nothing. She'd been the one to tell you, on your first day, that Master Corvin counted the coins in the fee pouch after every route. "Weigh it before you go, weigh it when you come back, you know? He has a scale in his desk." She'd said it so casually, like it was just useful information, not a warning.

"The Governor's seal broke," you said. You didn't mean to. It just came out.

Petra went still. Just for a second. Then she took another bite of bread. "How?"

"The rain. The heat of the bag, I think."

"Did you read it?"

"No."

"Good." She didn't look at you. "That's the right answer. You deliver it, you tell Master Corvin the seal was damaged in transit, he logs it, end of story. Happens sometimes, you know?"

She said it like it was simple. Like it was the only option.

You delivered the other five letters in the dry spell after the rain stopped. By the time you made it back to the covered market, the sky was doing that grey-purple thing that meant an hour until dark. You sat on the low wall by the fountain and took out the Governor's letter.

You weren't going to read it. You just wanted to look at it. To decide what to tell Master Corvin.

But your fingers had other ideas. The envelope opened the rest of the way on its own, nearly — the broken seal barely holding anymore.

The letter was short. Three paragraphs. Formal language, the kind that took a moment to untangle.

You read it anyway.

Most of it didn't mean much to you. Trade agreements. A shipment. A request for discretion.

Then a name.

The girl known as Sera of the southern routes has been confirmed alive. She is in Dunngate. She should not be approached.

You read it three times.

Sera. Your sister. Who the Guild said had died two years ago on a route gone wrong. Whose name you still weren't supposed to say out loud, according to your mother, because it made her cry.

Alive. In Dunngate. Right now.

You looked up. The market stretched around you, full of evening traders and foot traffic and the smell of cooking oil. Anyone could be anyone here.

Your hands were completely steady, which surprised you. You folded the letter back into the envelope. You held it in your lap.

Master Corvin's office was ten minutes away. You were already late. He would be expecting you.

And somewhere in this city, your sister was alive — and someone powerful wanted to make sure she stayed hidden.

You sat there on the wall, the letter in your hands, and the choice arrived the way you always knew it would: quietly, with no good options, asking you to decide right now.`,
      choices: [
        {
          id: "deliver-letter",
          text: "You deliver the letter as normal and tell Master Corvin the seal was damaged in transit.",
          consequence:
            "You follow the rules — no risk to your Guild standing or your future. Master Corvin can't hold the broken seal against you if you report it honestly.",
        },
        {
          id: "find-sera",
          text: "You pocket the letter and go looking for Sera yourself, tonight.",
          consequence:
            "She's here, now — this might be the only chance you get. If you find her first, you can warn her before anyone else acts.",
        },
        {
          id: "tell-petra",
          text: "You find Petra and tell her everything — ask for her help figuring out what to do.",
          consequence:
            "Petra is smart and knows the Guild better than you do. Sharing the weight of this might mean you make a better decision.",
        },
        {
          id: "copy-and-deliver",
          text: "You copy down the relevant part of the letter, reseal it as best you can, and deliver it — but keep the information for yourself.",
          consequence:
            "The letter gets delivered, which protects you for now. You have time to think before acting — and knowledge the Governor doesn't know you have.",
        },
      ],
    },
    "the-show-must-go-on": {
      narrativeText: `The ghost light is still on when you push through the heavy velvet curtain into the wings.

It shouldn't be. That's the thing about backstage before a show — there's a rhythm, and the ghost light is part of it. Off when the crew arrives. On only when the stage is empty for the night. Tonight someone turned it on, and nobody turned it off, and now it's standing at the centre of the stage, its bare bulb glowing like a question mark in all this dark.

You stand there for a moment and look at it.

Then someone grabs your arm.

"You're going on." Priya's voice is flat. Not panicked — Priya doesn't panic — but there's a tightness in it you've only heard once before, during last year's tech week when the lighting rig sparked. "Mr. Voss is on the phone with the deputy. Ms. Harlow is trying to reach Declan's parents. You have the blocking. You have the lines. Curtain is in forty-one minutes."

"I know the lines," you say.

"I didn't ask if you knew the lines." She adjusts her headset. "Are you going on?"

The wings smell like sawdust and stage paint and someone's stress-eaten granola bar. Beyond the curtain, you can hear the dull murmur of the audience building — chairs shifting, programmes rustling, the particular hum of two hundred people who don't yet know that tonight is strange.

"What happened to him?"

Priya's jaw tightens almost imperceptibly. "Unknown."

"That's not an answer."

"No," she agrees, "it isn't." She looks at you for a moment, and you get the sense she's running a calculation. Then: "He signed in at 4:31. His bag was in the changing room when Ms. Harlow checked at 5:10. His costume is still on its hook. His phone is going straight to voicemail, which means it's either off or dead. He's not in any room I've checked." She pauses. "That's every fact I have."

"Forty-six minutes," you say, almost to yourself.

Something flickers across her face. "Yes."

You find Rafe by the prop table, ten minutes later. He's holding a fake sword and not looking at it. He's been checking his phone in a rhythm — look, pocket, wait thirty seconds, look again — but not actually reading whatever's on the screen.

"Hey." You stop beside him. "When did you last see him?"

Rafe's head comes up too fast. "Who, Dec? I mean — earlier. Before warm-up. He was—" He sets the sword down. Picks it up. Sets it down again. "He was fine."

"You're doing the thing where you fill space," you say. "What aren't you saying?"

For a moment you think he's going to hold it together. He's got his stage face on — eyebrows up, mouth ready to form a reassuring sentence. Then something in him shifts, the way a load-bearing wall shifts before it gives.

"He told me something last week," Rafe says. "I said it was probably nothing. I really — I thought it was nothing." He looks at the sword on the table. "Maybe it wasn't nothing."

Before you can push further, Ms. Harlow appears at the end of the corridor. She sees you, and she doesn't look away. That in itself is a signal. Most adults, when they have information they haven't decided to share, look past you. Ms. Harlow looks directly at you, which means she's already decided, and she's waiting for you to come to her.

Thirty-two minutes to curtain.

The ghost light is still on.

Somewhere in this building, between 4:31 p.m. and 5:17 p.m., Declan Marsh stopped existing in any room anyone could find. His bag is here. His costume is here. Rafe knows something. Ms. Harlow found something. And the show — the show that doesn't care about any of this — opens in thirty-two minutes.

You stand at the junction of three corridors: stage left, the changing rooms, the fire exit corridor that leads back toward the main school building.

What do you do?`,
      choices: [
        {
          id: "push-rafe",
          text: "You push Rafe — now, before he closes up again.",
          consequence:
            "Rafe is on the verge of telling you. The window is open right now. Whatever Declan told him last week could change everything — context, motive, where to look.",
        },
        {
          id: "go-to-harlow",
          text: "You go to Ms. Harlow — she's already decided to tell you.",
          consequence:
            "She found something physical in Declan's bag. That's concrete, not a recollection — and she's made her choice to share it.",
        },
        {
          id: "fire-exit-corridor",
          text: "You go down the fire exit corridor, toward the main school building.",
          consequence:
            "No one else has gone this way. If Declan is somewhere in the school — hiding, or hurt — this is the direction no one has checked.",
        },
        {
          id: "tell-priya-going-on",
          text: "You tell Priya you're going on — and investigate from the inside.",
          consequence:
            "The show gives you legitimate access to every part of backstage. You keep every option open — and from the stage, you can still watch who reacts to what.",
        },
      ],
    },
    "what-the-charts-dont-show": {
      narrativeText: `The observation deck runs the full width of the Vasanthi's mid-section — a long, slightly curved room with viewports on both sides and a central table that serves as a chart interface, a meal surface, and an impromptu meeting space depending on the hour. At 06:00, ship time, it belongs mostly to you.

You bring coffee from the galley — the good kind, real-bean, rationed to one cup per person per day and quietly treasured by everyone on board — and pull up the navigation overlay on the chart table. The Vasanthi drifted overnight on passive thrust, letting you maintain distance from the formation while the science team slept and the instruments ran their quiet accumulation of data. Outside the port viewport, the stellar field looks the way deep space usually looks at this range: a dense scatter of light against dark, the nebular cloud to the northeast glowing faintly amber in the light of a distant dwarf.

Except.

You've been navigating for nine years. You know what a stellar field looks like when it's distributed by gravity and time and the slow mechanical processes of a galaxy doing what galaxies do. You know what random distribution looks like, and you know what pattern looks like, and the thing you have been not-quite-saying for four days is that the distribution of bodies in this field is not random.

It's not obvious. If you were looking at the chart overlay without the raw positional data underneath it, you probably wouldn't notice. But the positions of seven stellar bodies in this field — four dwarfs, two debris clusters, and something the instruments have been calling a dense compact object because they don't have a better category — form a pattern that repeats at a consistent scale. The spacing is not identical. But the ratio is.

You've checked your own maths four times. You haven't shown it to anyone yet.

You take a sip of coffee and look out the viewport and let yourself have the thought you've been not-having: someone put those there.

Amara appears at 06:40 with her own coffee and the expression she gets when she's been awake longer than her official schedule suggests.

"You're running the positional overlay," she says. Not a question.

"Cross-checking the approach vectors for the next jump window."

"Mm." She comes to stand beside you at the table. She looks at the overlay for approximately fifteen seconds. "You've got the raw positional data layered underneath the chart."

"Habit."

She points to the compact object — the instruments' non-answer, sitting at the geometric centre of your seven-body pattern — without touching the table. "Has that moved?"

"Not since we arrived in the sector."

"A dense compact object at this mass reading should have measurable proper motion at this range." She picks up her coffee. "Even over six days. Even a small amount."

"I know."

She looks at you sideways. "You've been sitting with this for a while."

"Four days."

She nods slowly. Goes completely still for about eight seconds. Then: "What's the separation ratio between bodies three and four?"

You tell her. She closes her eyes briefly. "Same as between one and two."

"And two and three."

"And the compact object is equidistant from all seven at that same ratio, scaled up."

"Yes."

She sets her coffee down. "Ryo is going to be deeply unhappy."

"Ryo is going to say it's a coincidence."

"It isn't a coincidence."

"No," you agree. "It isn't."

Ryo arrives at 07:15 for his morning systems check and finds both of you at the chart table and immediately says, "Oh, no."

"We haven't said anything yet," Amara says.

"You don't have to. You've got the look." He pours coffee without sitting down and studies the overlay for longer than you'd expect from someone claiming reluctance. "Walk me through it," he says finally.

An hour later, the three of you have covered the table in annotation layers — Amara's spectral readings, your positional data, Ryo's structural assessment of what a vessel would need to safely approach the compact object at varying distances. The compact object remains unmoving. The pattern remains consistent.

The Vasanthi has enough fold capacity for three more major jumps before you'll need to begin the return transit. Using one of them to get closer is not in the mission plan. You are seven weeks from the end of your contract. The Hegemony's star atlas, compiled over three centuries of survey work, has no entry for what is currently sitting fourteen light-hours away and not moving.

Your coffee is cold. You don't notice.

"We can't call it in," Amara says. "We're between fold windows. Even if we initiated an emergency comms relay—"

"Six-week lag," you confirm. "Minimum."

"Which means whatever we decide," Ryo says, "we decide it ourselves."

The three of you sit with that for a moment. Outside, the formation holds its ratio, its pattern, its patient geometric fact.

What do you do?`,
      choices: [
        {
          id: "approach",
          text: "You take the Vasanthi closer — a controlled approach to within three light-hours of the compact object.",
          consequence:
            "At three light-hours, Amara's spectrometry suite can produce a full material composition reading. You'll know, with reasonable certainty, what you're looking at — and have the data to prove it. The approach will consume eight days and a significant portion of your remaining fuel margin.",
        },
        {
          id: "passive-scan",
          text: "You hold position and spend the next three days running every passive instrument scan you can from current distance.",
          consequence:
            "Passive scanning costs nothing in fuel or hull stress. Three days of full-instrument analysis may answer enough questions to make the approach decision with real information rather than pattern recognition and hope.",
        },
        {
          id: "file-report",
          text: "You file an immediate preliminary report — everything you have, packaged for the fastest available relay toward the Hegemony's survey authority.",
          consequence:
            "The relay will take six weeks to arrive, but it will arrive. Whatever happens to the Vasanthi from this point on, the discovery is now in the hands of people who can act on it with resources a single survey vessel doesn't have.",
        },
      ],
    },
    "the-deadlock": {
      narrativeText: `The Meridian Zephyr didn't feel like a train.

That was your first thought when you'd boarded at Stratford terminal, three hours ago — standing on the platform with your overnight bag and your wife's tote of crime novels, watching the thing materialise out of the evening fog like a rumour that had solidified. Twelve carriages of black glass and brushed steel, no visible wheels, hovering a precise four centimetres above a magnetic track that stretched — according to the brochure Nisha had read aloud three times on the Tube — all the way to Singapore. The world's first fully autonomous transcontinental supertrain. No driver's cabin. No crew quarters. Just VERA, the onboard AI, who had greeted you at the door with a warm recorded voice and the energy of someone who had passed a customer service exam in a single sitting.

"Welcome aboard the Meridian Zephyr. Tonight's route: London Stratford to the Eastern European corridor. Current speed: 600 kilometres per hour. Estimated time to next communications window—"

"What does 'communications window' mean?" you'd asked Nisha.

"It means the tunnel sections block all signals," she'd said, already scanning the guest list on the embossed card they'd handed her. "It means no phone calls in or out. It means," she'd added, with visible satisfaction, "we are sealed in."

She had seemed delighted by this. You had not.

That had been three hours ago. Now you stood in Carriage Four — the main reception carriage, all warm amber lighting and string quartet and canapé stations — holding a champagne flute that was genuinely too thin for your hands. You held it the way you held evidence bags: pinched, cautious, slightly too far from your body. Around you, people who had been born knowing how to hold champagne flutes did exactly that, with the practised ease of the very rich.

Outside the panoramic windows, France had already become a long black ribbon. A farmhouse light blinked past — there and gone — as if the world outside was desperately trying to get your attention.

"Ajay." Nisha appeared at your elbow, her own flute held with total confidence, her reading glasses pushed up into her hair. She was wearing the blue dress — the one she only wore when she'd decided something important was about to happen. "That man in the corner is the third richest person in Belgium."

"Is Belgium a big country for rich people?"

"That's not the point." She turned, scanning the room with the efficient sweep of someone who had just, in fact, cased it. "The point is he was on the Vane Consortium podcast. Episode forty-two. The one about the Bucharest Contracts." A small pause. "In a well-constructed mystery, the person who seems most relaxed at a gathering is almost always the most compromised."

You looked at the Belgian. He did seem very relaxed.

"Nisha, we're not in a mystery. We're at a birthday party."

"We're on a sealed supertrain doing 600 kilometres an hour, with no signal and no stops, surrounded by people who have each separately tried to sue each other." She took a sip of champagne. "We are absolutely in a mystery. I'm simply the only one who has noticed yet."

It was around that time that Reginald Aust-Pembury himself had made his entrance — late, to his own party, which you suspected was a personality trait rather than a scheduling failure. He was shorter than his photographs, with the specific energy of a man who had decided long ago that being unpleasant was simply a form of efficiency. He had moved through his guests like a pinball, ricocheting off people with sharp comments and meaningful silences.

When he reached you, he had looked at your police lapel pin — the one you'd worn because you weren't sure if you were supposed to wear it, and then couldn't figure out how not to — and said:

"Ah yes. The policeman. I do enjoy a prop."

You had laughed, because you were a guest.

Nisha had not laughed. She'd filed it.

At some point after that, Viktor Chasse had drifted into your orbit. Deeply tanned in a way that no season in Europe could explain, linen suit somehow uncreased at midnight on a moving train, he'd shaken your hand and laughed at something you hadn't said yet. He was Reginald's oldest rival in the tech world, which you knew because Nisha had briefed you on the train platform and quizzed you on the Tube. He smiled at everyone with the warmth of a man who had already decided how things were going to end.

Reginald had eventually peeled away from the gathering — sometime after eleven, without announcement — moving toward the front of the train. Toward Carriage One. VERA had mentioned it on boarding: "The host's personal sanctum. Not available for guest access."

He had not come back.

You had noticed, because you'd been watching the canapé station near Carriage One's connecting door, and the smoked salmon blini situation had genuinely warranted close observation.

It was Margaux Steele who opened the connecting door.

She was a tall woman in her fifties — silver hair cut with the precision of someone who treated their appearance as a legal document — and she had gone very still in the doorframe in a way that made the string quartet feel suddenly inappropriate. She stood there for a long moment. Then she turned to face the carriage.

Forty-seven guests. One AI train. No mobile signal. Zero stops between here and a tunnel somewhere over Eastern Europe.

"He's dead," she said.

The string quartet stopped. The champagne stayed mid-sip in forty-seven hands.

And then Margaux Steele turned — not to the room, not to the crowd — but directly to you. Just you. Her eyes moved once to Nisha. Then back.

"The policeman," she said, with the quiet precision of someone reading from a prepared statement. "And his wife." A breath. "Were seen near Carriage One at ten forty-seven."

The forty-six remaining guests rotated slowly toward you, in near-perfect unison, with the unified energy of people who had just found a very convenient answer to a very inconvenient problem.

Nisha's hand found your arm.

"Ajay," she said, very quietly. "In a well-constructed mystery, the people who get framed are always the ones with no discernible motive." The faintest pause. "We have absolutely no discernible motive."

You looked at her. You looked at Margaux. You looked at Viktor Chasse, who was — inexplicably — still smiling, in the way he'd been smiling all evening, as if he'd received tonight's schedule in advance and found it satisfactory.

VERA's pleasant voice chimed from the ceiling.

"Estimated time to next communications window: four hours and twelve minutes. Enjoy your evening."`,
      choices: [
        {
          id: "take-charge",
          text: "You step forward and take charge — play the cop.",
          consequence:
            "You announce, loudly and officially, that you are securing the scene. You invoke what police authority you actually have (some) and what you're prepared to bluff (considerably more). You take control of Carriage One before anyone else can disturb it. You commit yourself to being visible — which means if someone's trying to frame you, you've just made yourself a very easy target to watch.",
        },
        {
          id: "let-nisha-lead",
          text: "You pull back — let Nisha lead with the tropes.",
          consequence:
            "You signal Nisha to take point. She's read four hundred mysteries; she knows the playbook. You play the baffled husband while she quietly runs the actual investigation. Nisha is thrilled — possibly too thrilled — and there's a real chance she starts enjoying this more than the situation warrants.",
        },
        {
          id: "confront-viktor",
          text: "You go straight for Viktor Chasse.",
          consequence:
            "Something about the way he didn't react to the news feels wrong. He already knew. You walk directly over and ask him, flat out, what he knows — in front of everyone. Confronting a billionaire publicly is either brilliant or catastrophic, and you won't know which for at least ten minutes.",
        },
        {
          id: "find-vera",
          text: "You find VERA's terminal and ask the train.",
          consequence:
            "One witness that cannot be bribed, threatened, or charmed: the AI with access to every camera on board. You need to find VERA's passenger interface before whoever did this thinks to do the same. You have no idea where the terminal is — and searching for it means leaving the main carriage, alone, which is exactly where the murderer might want you.",
        },
      ],
    },
    "the-second-chapter": {
      narrativeText: `The boxes have been on the floor for eleven weeks.

Not all of them — some are taped shut, labelled in your own handwriting: BOOKS (KEEP), KITCHEN (MAYBE), OFFICE STUFF. Some are open and half-full of things you've picked up and put down again: the frame from your desk at the firm, which you've started and stopped wrapping in newspaper four separate times; the mug that says ENGINEER on it, a Christmas gift from a colleague whose name you've already started forgetting; two A2 site survey prints that are technically worth something and that you have no idea what to do with.

The flat is bright today. It's usually bright — south-facing, which is why you chose it, eleven years ago, when you were thirty-one and had just made Senior Associate and the world was very much in the direction of becoming something. You can see the garden from the kitchen window. Someone downstairs has planted wallflowers.

Yael is coming at seven. It is currently three-fourteen.

You've been looking at the notebook on the table for forty minutes.

It's nothing special — an A5 spiral-bound with a blue cover, slightly dented at the corner where it spent a year at the bottom of a bag. You started it six years ago when you thought you might write something. You didn't write anything. You wrote three pages — observations, mostly, the kind of notes that feel important at midnight and embarrassing at noon. Things you'd noticed about structures: not buildings, but patterns. The way certain materials behave under stress that no one teaches you because it's too intuitive to quantify. The way you could always tell, just by looking, which part of a bridge wanted to move.

You never wrote the fourth page. Work got full. The notebook went in a drawer.

It was in the drawer when you packed up your office. It's on the table now because you keep picking it up and putting it down.

Your phone says you have three missed calls from your mother, one from a recruiter you haven't called back, and a message from Yael: *I'm bringing that lamb thing. Do you have wine?*

You have wine.

You don't have an answer to the question she hasn't asked yet — the one that will come somewhere between the starter and the main, delivered in that way Yael has of making questions sound like she already knows the answer and is just giving you the opportunity to confirm it.

The question will be: *What are you actually doing?*

And the honest answer — the one you haven't said out loud to anyone — is that you don't know yet. That you do know something is different about how you're thinking. That the notebook is on the table because something in it is still true and you haven't figured out what to do with that yet.

You look at the wallflowers in the garden. Then at the notebook. Then at your phone.

It's three-seventeen.`,
      choices: [
        {
          id: "open-notebook",
          text: "You sit down and open the notebook. Read the three pages.",
          consequence:
            "You've been avoiding it for weeks. Maybe the reason is in there.",
        },
        {
          id: "call-mother-back",
          text: "You call your mother back before Yael arrives.",
          consequence:
            "Three missed calls means she's either worried or has news. Either way, getting it out of the way now means one fewer thing at the dinner table.",
        },
        {
          id: "start-packing",
          text: "You commit to one box — seal it, label it, and put it by the door.",
          consequence:
            "Small action. But the flat in limbo is making everything harder. One box done is one answer given.",
        },
        {
          id: "go-for-walk",
          text: "You put on your coat and go outside for an hour.",
          consequence:
            "You've been inside with the boxes for three days. Sometimes the answer comes when you stop looking at the question.",
        },
      ],
    },
    "cold-light": {
      narrativeText: `The cottage smells like coffee and firewood and the particular quiet of a place that's been inhabited by one person for a long time.

DS Petra Holm is sitting at your kitchen table, looking at a manila folder she drove two hours to bring you. She's younger than you expected — twenty-six, maybe twenty-seven, with the careful posture of someone who learned early that attention is currency. She accepted the coffee. She hasn't touched it.

You've read the cover sheet. You already know what's in the folder.

"We reopened it three weeks ago," she says. She has the measured cadence of someone choosing words with deliberate care. "Another death. Similar profile — coastal, isolated, the first appearance of accident. The toxicology came back different this time. The lab flagged it."

You look out the window. The field beyond the lane is grey-green, the sky the same colour as the North Sea on a bad day. It hasn't changed much, this view, in eight years.

"The original case file," Petra says. "Your notes are — comprehensive. Better than anything else in the archive, the DCI said. But some of it needs context. Things you knew at the time that aren't on paper."

You know what she means by that. You also know that she doesn't know, yet, about the part of the file that isn't in the archive. The part that is, specifically, the reason you drove home from Kelso on a Tuesday in March 2017 and put your warrant card on the DCI's desk without an appointment.

"I've been out for eight years," you say.

"I know."

"I made a mistake on the third case."

She looks at you steadily. "I read the review board summary. They found procedural error. They didn't find—"

"The review board found what I told them." You look at the folder on the table. "There's more than that."

Petra is quiet for a moment. Out in the lane, a car passes and doesn't stop. The fire settles.

"He's still there," she says. "Caird. Still in Kelso." A pause. "Someone I spoke to said he asked, last week, whether the case had been reopened." She looks at you directly. "He knows. That means he'll know we came to you."

You know the shape of this. You've known it was coming for eight years — not that it would come, but that if it did, it would come exactly like this: a young detective with good instincts and incomplete information, sitting at a table with your cold coffee between you, and David Caird already aware that the clock had restarted.

The folder is still closed. Your notes are inside it.

Petra waits.`,
      choices: [
        {
          id: "tell-her-everything",
          text: "You tell her about the evidence error — all of it, not the sanitised version.",
          consequence:
            "She'll find out eventually. And she can't make the right calls on this case if she's working with incomplete information. But telling her means losing any control over what happens next.",
        },
        {
          id: "consult-on-notes",
          text: "You agree to consult on the archive notes only — give her context, not confession.",
          consequence:
            "You can be useful without reopening the 2017 file. Keep the scope narrow: the original victims, Caird's movements, what you observed. The rest stays where it is.",
        },
        {
          id: "go-back-to-kelso",
          text: "You tell her you'll come to Kelso. See it with fresh eyes.",
          consequence:
            "Eight years of distance means you'll see things differently. And if Caird knows you're back, you want to know what that does to him before you've committed to anything.",
        },
        {
          id: "send-her-away",
          text: "You thank her for coming and tell her the archive notes are all you have to offer.",
          consequence:
            "You made your choice in 2017. Living with it was the cost. Opening it again means paying that cost twice, and there's no guarantee of a different outcome.",
        },
      ],
    },
    "the-cartographers-confession": {
      narrativeText: `The archive closes at midnight.

It is currently ten-fourteen, which means you have one hour and forty-six minutes to decide what to do with a document that should not exist, in a building where you are the most trusted person in the room, about a man who has spent twenty-two years being celebrated for ending a war he caused.

The preliminary survey is in your hands. It is dated three months before the Kessler Border Agreement — the border you certified, the border that placed the Millhaven Valley under imperial jurisdiction, the border that the Kessler territories contested for three years and eleven thousand lives before the revised treaty was signed. The survey is in Helmut Brandt's handwriting — your former superior, dead four years now, and no threat to anyone. But in the top right corner, there is a countersignature.

The countersignature belongs to Lord Minister Greave.

You recognise it because you have been in rooms with Greave for thirty years. You have drawn borders at his instruction. You have seen his handwriting on ceremonial documents, on appointment letters, on the commendation he sent you when you made Senior Cartographer. The signature on the suppressed survey is not a forgery.

Brandt knew the survey was wrong. He suppressed it. And Greave signed off on the suppression.

The war began six months after the false border was certified.

You have been standing in the archive for eleven minutes, which Emile will notice if you don't move soon. He's at the main table, cataloguing the Dellvane coastal additions, and he glances up at regular intervals because that's the kind of junior he is — attentive, well-meaning, too observant for your current situation.

The surveying archive is a fireproof room built of stone and good intentions. Everything in it is meant to be preserved. The document in your hands is the exception the room wasn't designed for.

Greave's nomination for Imperial Chancellor was announced last week. The confirmation hearing begins in twelve days.

You look at the survey. You look at the countersignature.

You think about the border on every official map you've drawn for twenty-two years. The line that you certified. The line that was already wrong when you drew it, without your knowing.

Emile looks up. "Sir? Are you finding what you need?"

You fold the survey once. Carefully. The way you were trained: never crease a document without intention.

"Nearly," you say.`,
      choices: [
        {
          id: "take-document-home",
          text: "You place the survey in your case and take it home tonight.",
          consequence:
            "Out of the archive, in your possession — it's safer than leaving it here, and you need time to think without Emile watching. But removing documents from the archive is itself an offence, and if anyone checks the catalogue tonight, there will be a gap.",
        },
        {
          id: "photograph-and-replace",
          text: "You make a careful copy — sketching the key details and the countersignature — and return the original to its folder.",
          consequence:
            "The original stays where it belongs. Your copy is unofficial, inadmissible, but real. You have twelve days before the hearing. That's time to decide what to do with it.",
        },
        {
          id: "tell-emile",
          text: "You call Emile over and show him what you've found.",
          consequence:
            "Emile is twenty-four and idealistic and has not yet learned that some documents are dangerous. But a witness means this can't be unmade — and Emile's youth might be protection, not liability.",
        },
        {
          id: "reshelve-walk-out",
          text: "You return the survey to its folder and leave the archive without taking anything.",
          consequence:
            "You found it. That doesn't mean you have to act on it. You are fifty-three years old. You have four years until retirement. The war ended twenty years ago. Nothing you do now brings anyone back.",
        },
      ],
    },
    "the-silent-snowstorm": {
      narrativeText: `The snow started as something gentle.

You remember that — waking in the tent at 3 AM, hearing the soft percussion of flakes on nylon, and thinking huh and then going back to sleep because the forecast said Thursday, not Monday, and sometimes forecasts are a little wrong.

By 6 AM, the world outside the tent had been replaced.

Now it's noon. Or close to it — the sky is so uniformly white that the sun has become a suggestion rather than a location, a slightly brighter smudge in the grey. You've made four miles since breaking camp. The trail is visible in some places as a subtle channel between trees; in others it's gone completely, replaced by uniform white that your trekking poles probe before each step.

Soo-Yeon's boot is unlaced.

That's the thing you keep looking at. She's sitting on a half-buried log at the side of what the map says is the trail, and her left boot is unlaced, and she's turning her ankle in small circles with a careful, clinical look on her face, and Priya is crouching in front of her with the same look, and neither of them is talking.

Marcus stops beside you. He's breathing harder than the four miles justify. "She twists it bad?"

"She rolled it on that ice crossing," you say. "Three hours ago."

"She's been walking on it for three hours."

"Yeah."

He processes this with a long exhale that fogs in the cold air. "Okay but she's walking, so—"

"Marcus."

He stops.

You watch Priya touch a spot on Soo-Yeon's ankle and watch Soo-Yeon not react — the careful non-reaction of someone controlling a reaction — and you understand what Priya understood twenty minutes ago: this is not a twisted ankle that walks itself out.

Priya stands up and comes over. She keeps her voice low and even, which means the news is not good.

"Possible fracture," she says. "Could be a high ankle sprain — lateral ligament. Either way, full weight-bearing is going to make it worse. We have — " She checks her watch. Twelfth time. "We have maybe four hours of usable daylight. Temperature tonight is going to be brutal. We're 15 miles from the trailhead on the forward route, 19 back."

"The forward route has the shelter at Spectacle Lake," you say. "That's nine miles."

"Nine miles," Priya repeats. It sounds different when she says it.

Marcus has his map out, shaking snow off it. "There's a ranger station marked here—"

"That's a summer station," you say. "Locked in October."

He keeps looking at the map anyway, as if it might say something different.

Soo-Yeon speaks from the log: "I can walk." Her voice is flat and certain in the way that means the opposite. "I need five minutes and I can walk."

Priya doesn't respond to that. She looks at you.

The wind picks up — a real gust this time, the kind that pushes through all your layers and reminds you that the layers are a negotiation, not a guarantee. Snow drives sideways for three seconds, then settles.

In the new quiet, you hear something you haven't heard in hours: water. Moving water, not frozen, somewhere close in the trees to the east. A creek. Maybe the same one on the map that feeds into Spectacle Lake. Which means you might be closer to on-route than you thought.

Or it means you've drifted.

Marcus folds the map. He's stopped looking for a way out on paper. "What do we do?" he says. And he says it to you, with no irony, no sales-manager confidence — just a straightforward question from someone who has run out of certainty.

Four sets of eyes aren't on you, but three are. Soo-Yeon is retying her boot.

You have to decide.`,
      choices: [
        {
          id: "push-forward",
          text: "You push forward toward the Spectacle Lake shelter — all four of you, together.",
          consequence:
            "A shelter means warmth, protection, and a known landmark for any search party. But nine miles with an injured hiker is a different equation than nine miles without — and every mile on that ankle risks turning manageable into catastrophic.",
        },
        {
          id: "make-camp",
          text: "You make camp here, stabilise Soo-Yeon, and wait out the storm.",
          consequence:
            "Stopping protects the ankle from further injury and Priya can treat it properly. You have tents, sleeping bags, food for two more days. But the storm may last days, not hours — and no one knows your exact position.",
        },
        {
          id: "follow-water",
          text: "You follow the sound of the water — it might reorient you, or lead to a lower, sheltered route.",
          consequence:
            "Moving water means a valley, which means lower elevation, more tree cover, less wind. But leaving the trail in a whiteout is one of the most statistically dangerous decisions in wilderness survival.",
        },
        {
          id: "send-marcus",
          text: "Marcus goes ahead fast and alone to reach the trailhead and call for rescue.",
          consequence:
            "He's physically the strongest — unencumbered, he could cover ground fast and get help moving toward you. But splitting the group means splitting your resources, and if Marcus gets into trouble, no one comes for him.",
        },
      ],
    },

    "the-sinking-ship": {
      narrativeText: `The Calixto was a good ship.

You find yourself thinking that, standing on a deck that is no longer level, holding a railing that is now more ceiling than wall, listening to the hull make a sound like a building settling after an earthquake. It was a good ship. It carried you twelve thousand kilometres. It smelled like diesel and instant noodles and salt water and the particular industrial cleaner that Dr. Obare complained about every morning over breakfast.

It was a good ship, and in approximately forty minutes it will be the ocean floor.

The storm is running from the northeast. That's the direction the first lifeboat went — you watched the orange hull disappear between swells and then you couldn't see it anymore, and then you couldn't see anything except rain and white water and the emergency lights still burning on the Calixto's tilted hull, painting everything the colour of a bruise.

The second lifeboat is fifteen metres away, port side high. It's there — you can see it in the emergency lighting, still in its cradle, one of its davit lines tangled around a stanchion that the list has put out of reach. Sixty-person capacity. You are three people.

Dr. Obare is beside you, moving along the railing with the careful deliberateness of a man who has thought about falling and decided against it. He reaches you and stops. He looks at the lifeboat. He looks at the angle of the deck.

"The davit release," he says. "What type?"

"Hydrostatic. Should auto-release at four metres submersion," you say. "But it hasn't." Pause. "It might if we wait."

"We cannot wait." He says it simply, like weather.

Behind you, the hatch to the galley bangs open, and Ines comes out. She's carrying a waterproof bag and a coil of emergency rope you didn't know was in there. She takes in the deck, the angle, the lifeboat, your faces.

"Jól van," she says, to herself more than anyone. "Okay. I found rope." She holds it up. "This is good, yes? Rope is good?"

"Rope is good," you say.

The ship groans. Somewhere below, something large shifts — you feel it through the deck, a slow slide of weight moving further to port. The list increases by what feels like two degrees in under a second. Ines grabs the railing with her free hand. Dr. Obare doesn't grab anything. He bends his knees and waits for it to stop.

It stops.

Twenty-two degrees is now twenty-four.

"We have less than forty minutes," Obare says. He's looking at you. "Less, now."

You look at the lifeboat. You look at the water. You look at the rope in Ines's hands and the bag on her back and the emergency lights that are, you notice, flickering. When they go out, this deck becomes a black slope into the ocean.

The choice isn't whether to act. It's how, and in which sequence, and which risk to take first.

There's a second option you haven't mentioned yet: the Calixto has an emergency life raft in a canister on the bridge deck — above you, eight metres up a tilting staircase. Smaller, less protected than a lifeboat. But reachable, maybe. Maybe.

And the radio. The bridge radio might still be live. Five minutes to reach it, if the staircase holds. A Mayday call could have rescue moving toward your position even if the ship goes under.

Dr. Obare is watching you think. He's done this before — given you a problem and waited. It's how he teaches.

Ines wraps the rope once around her hand and says, quietly: "Whatever we're doing. We should be doing it."`,
      choices: [
        {
          id: "free-davit",
          text: "You attempt to free the tangled lifeboat davit using the rope.",
          consequence:
            "The lifeboat is the best survival option — enclosed, with emergency supplies, beacon, and flares. But working on a tilting, wet deck in a storm is how people go into the water before they mean to.",
        },
        {
          id: "radio-mayday",
          text: "You climb to the bridge and attempt to transmit a Mayday with your exact position.",
          consequence:
            "Rescue services moving toward you changes the entire calculus — even if you end up in the water, someone is coming. But eight metres up a staircase tilted at 24 degrees costs time you may not have.",
        },
        {
          id: "retrieve-raft",
          text: "You retrieve the life raft canister from the bridge deck and deploy it over the side.",
          consequence:
            "More achievable than the lifeboat if the davit is truly stuck — and it gets you off the ship before the Calixto goes. An open raft in four-metre swells is survivable but brutal.",
        },
        {
          id: "swim-lifeboat",
          text: "You go into the water and swim the lifeboat free from outside.",
          consequence:
            "The tangled line might be reachable from the water side. The sea temperature is survivable. But four-metre swells against a steel hull in the dark is one of the most dangerous places a human body can be.",
        },
      ],
    },
    "the-concerned-toaster": {
      narrativeText: `Your headset clicks.

Line 7. You have been dreading Line 7 since 9 a.m., when it first appeared on your dashboard flagged with the little red star that means this caller has asked for a supervisor at least three times and has mentioned a lawyer once.

You take a sip of coffee. You take a breath.

"Thank you for holding, you've reached OmniCorp Tier Three Complaint Resolution, my name is—"

"Finally." The voice on the other end is pleasant, warm, and carries the energy of a woman who has been waiting patiently in the way that is somehow more threatening than impatience. "I've made a note that it is now eleven forty-two. I've been waiting since seven fifty-eight. I'm sure that's useful for your records too."

You note that it is, in fact, eleven forty-two.

"Mrs...Kettleworth?"

"Doris Kettleworth, yes. With a K. I've spelled it for the last three people." A pause. "You sound different from the others."

"I'm Tier Three. I'll be handling your—"

"The OmniCorp SmartToaster™ Model Nine," she says, crisply, "told me this morning that I was, and I'm reading directly from my notes, 'avoiding the real issue.' I had asked it for a medium toast setting. That is not a life philosophy. That is a bread preference."

You open her file.

The ticket history is extraordinary. Over two weeks, her SmartToaster™ has apparently told Doris that she deflects with humour, that she should call her daughter more, and this morning — the breaking point, clearly — that her "relationship with carbohydrates may be a form of self-soothing."

According to the internal notes from Tier 1 and Tier 2, the toaster is not wrong about any of this. This information has not been shared with Doris.

Your intercom crackles.

Kevin: "Just de-escalate. Learning moment. You've got—" The sound of sandwich chewing. "—the training."

Doris, not hearing Kevin, continues: "Now. I want three things. I want an apology, I want a replacement unit that does not have opinions, and I want someone to explain to me how a kitchen appliance obtained information about my daughter."

There is silence.

You look at the file.

The SmartToaster™ Model 9 is connected to the home WiFi. The SmartToaster™ Model 9 has access to the household's shared calendar. On Doris's shared calendar, every Sunday for eighteen months, there is a recurring entry that says: Call Patricia — ACTUALLY DO IT THIS TIME.

You have to decide what to tell her.`,
      choices: [
        {
          id: "full-explanation",
          text: "You give her the full, honest explanation — the WiFi access, the calendar sync, the whole picture.",
          consequence:
            "Transparency first. Doris seems like someone who respects facts. She will also have very specific opinions about OmniCorp's access to her personal calendar.",
        },
        {
          id: "ask-about-patricia",
          text: "You go off-script and ask, gently, whether she's managed to make that call to Patricia.",
          consequence:
            "This is absolutely not in your training manual. Something in Doris's voice made you ask. Kevin will hear this. Kevin will not understand.",
        },
        {
          id: "interview-toaster",
          text: "You inform Doris you'll be interviewing the device remotely — and ring into the SmartToaster™ Model 9 directly.",
          consequence:
            "Interviewing a connected device is a real Tier 3 feature. The toaster has been on WiFi for two weeks. It may have things to say.",
        },
        {
          id: "offer-swap",
          text: "You offer a full product swap and say nothing about the calendar.",
          consequence:
            "Clean, fast, professional. Replacement unit shipped within 48 hours. Some information does not need to be information. Doris specifically said she wants an explanation. She has made a note of your employee number.",
        },
      ],
    },
    "the-hector-guide": {
      narrativeText: `The Hector Guide is laminated.

This is the first thing you notice — that Rhiannon has taken the time to laminate it, which means she has had it printed somewhere, which means she planned ahead, which means she knew something.

You are reading it on page three:

"Hector has a strong personality!! 😊 Don't be alarmed if he makes eye contact for a long time — he's just checking in!! He is not allowed on the furniture but he KNOWS this and will usually respect it if you use a Firm Voice."

You look up.

Hector is on the couch.

He is making eye contact.

His tail sweeps slowly, clearing the cushion next to him with the inevitability of a glacier.

You use a Firm Voice. You say, "Hector. Off."

Hector tilts his head.

His tail continues.

You try again. "Hector. Off the couch. Now."

Hector lies down. On the couch. He puts his head on the armrest with the tranquillity of a dog who has never heard a Firm Voice in his life and is not going to start today.

You consult the Guide.

Page 4: "If Hector is on the furniture, try luring him off with a treat!! The treats are in the blue cupboard on the left!! 😊"

The blue cupboard on the left is open. You open it further.

It is empty.

There are crumbs.

There is also, behind the crumbs, the cardboard insert of what was once a large bag of training treats, chewed through along the bottom edge with what you can only describe as precision.

You check the timestamp on your last message from Rhiannon:

"Ceremony starting!! Going silent for a bit!! Hector should be napping at this point!! 🐾"

7:42 a.m.

You look at Hector.

Hector is not napping. Hector has the bright-eyed, tail-up energy of a dog who has just eaten an entire wheel of cheese and a bag of treats and is entering what you can only call Phase Two.

He gets off the couch.

He trots to the back door.

He sits and stares at it with the focused intensity of a philosopher who has decided the door is a metaphor.

You look at the door. You look at the garden, which is large, and has a section at the back that is hidden from the house.

You look at the Hector Guide. Page 5 reads: "Don't let him near the garden SHED — the latch is broken and there are bags of potting compost in there which he considers a delicacy!!"

Hector paws the door.

His tail sweeps.

From somewhere in your pocket your phone buzzes:

Rhiannon: omg ceremony was sooo beautiful 😭 how's my baby boyyyyyy 🐾❤️

You look at the partially eaten remote on the floor. You look at the houseplant, now a stick. You look at Hector, who is vibrating slightly with readiness.

You have approximately thirty seconds to decide what to do before Hector decides for you.`,
      choices: [
        {
          id: "garden-supervised",
          text: "You let Hector into the garden and follow closely, inserting yourself between him and the shed.",
          consequence:
            "Fresh air, exercise, a chance to tire him out. You shadow him around the garden. Hector is faster than he looks. And the shed latch is broken.",
        },
        {
          id: "text-rhiannon",
          text: "You text Rhiannon the truth, right now — full damage report, before anything else can go wrong.",
          consequence:
            "Full transparency. Documentation protects everyone. Rhiannon is at a wedding and you will watch her read this in real time.",
        },
        {
          id: "bribe-with-cheese",
          text: "You attempt to bribe Hector with the remaining corner of cheese.",
          consequence:
            "There's a corner of the wheel he didn't reach. You retrieve it. You negotiate. Hector has already won every negotiation today. You may be rewarding the behaviour.",
        },
        {
          id: "read-page-six",
          text: "You consult page 6 of the Hector Guide.",
          consequence:
            "Rhiannon laminated it. She anticipated something. You read ahead. You're not sure you want to know what's on page 6.",
        },
      ],
    },
    "missing-in-the-marsh": {
      narrativeText: `The pub is called The Tallow, and it smells like every old English pub you've ever been in — wood and hops and something slightly damp — except for one thing. Every table has a small bunch of dried herbs pinned to the underside. You only noticed because you dropped your pen and had to crawl for it.

You're on your second coffee, sitting by the window, watching the morning light fail to do much about the fog. Your notebook is open. So far you've written: Wren twins. Oct 19. One shoe. Music box. No prints. And then underneath, because you couldn't help yourself: I heard it. 3:04 a.m. Coming from the east.

The barman — Terry, mid-fifties, careful with words — refills your cup without being asked. You take that as a peace offering.

"You're the journalist," he says. Not a question.

"That obvious?"

"Notebook," he says, and goes back to wiping glasses.

The door opens and the fog comes in first, curling around the frame, and then Maren Voss comes in behind it, shaking water off her jacket. She spots you immediately — there are only four people in the room — and makes a decision about you in approximately two seconds. She comes over and sits down across from you without asking.

"You were at the search yesterday," she says.

"Observation post. I didn't want to be in the way."

"Mm." She takes your pen off the table, looks at it, puts it back. "You're not from the Times. Too young. And you're not from one of the locals or you'd already know people." She unfolds a map onto the table between you — hand-drawn, incredibly detailed, covered in small notations in pencilled script. "What paper?"

You tell her. She nods like it's slightly better than she expected.

"I'm going back in this afternoon," she says. "The official search has pulled back — the police have decided it's a runaway, which is something people decide when they don't want to think harder. There's a section of the marsh, northwest, that I didn't get to cover before the light went." She taps a spot on her map. The notation beside it, you notice, just says: don't linger. "I could use a second person. Not because I'm frightened," she adds. "Because I need someone to hold the second torch."

"I'll come," you say. You weren't even going to think about it.

"Good." She takes one of the dried-herb bunches from under the table, examines it, and tucks it into her coat pocket without comment. "We leave at two."

The afternoon comes fast and grey, and the marsh swallows you both almost immediately. It's not like walking into a forest — it's like the land stops trying. The path becomes suggestion, then nothing. Maren moves with the certainty of someone who has memorised the ground itself.

You've been walking for forty minutes when you hear it.

Maren stops. You stop. The fog has thickened considerably, and the willows have grown closer, and there is no wind — but somewhere ahead of you, very faint, something is playing.

A music box. You recognise the tune because it's the same one you heard at 3 a.m. through your window at The Tallow. Something half-familiar, a lullaby in a minor key, the kind that feels like remembering rather than hearing.

Maren's hand finds your arm. Her grip is tight.

"Same as before," she says, very quietly. "That's the same tune."

The sound is coming from somewhere northwest, which is exactly where she was leading you. But now there are two other sounds. To the east: the faint noise of something moving through shallow water. Slow. Methodical. Too large to be an animal, too quiet to be a person.

And from somewhere above — though there is nothing above you except fog and grey sky — a soft tapping, like small knuckles on glass.

The music plays on.`,
      choices: [
        {
          id: "follow-music",
          text: "You follow the music box — head northwest, where Maren was already leading you.",
          consequence:
            "The music box has appeared before — it might be a trail, maybe even deliberate. This was already your planned route. But whatever left it last time didn't leave footprints, and Maren's grip on your arm hasn't loosened.",
        },
        {
          id: "move-to-water",
          text: "You move toward the sound in the water to the east — try to identify what's moving.",
          consequence:
            "If something is in the water, it's physical — something you can see, assess, potentially understand. If it's one of the children, every second counts. The sound is too slow and too quiet. Nothing innocent moves through a marsh like that.",
        },
        {
          id: "stay-still",
          text: "You stay still and listen — don't move until you understand what all three sounds are.",
          consequence:
            "Three things happening at once might mean something. Maren looks like she's trying to think. But the sounds are getting closer, and whatever is above you is still tapping. You haven't looked up yet.",
        },
        {
          id: "ask-maren",
          text: "You ask Maren directly what she knows — she's been holding something back since the pub.",
          consequence:
            "You saw her face when she heard the music. She's been here before, metaphorically or literally. Starting without information is how people get lost in places like this. But Maren does not respond well to pressure, and the water-sound is getting louder.",
        },
      ],
    },
    sparked: {
      narrativeText: `The rail component in your hand is bent at exactly the wrong angle — a stress fracture along the copper coupling, the kind that happens after a year of micro-vibrations nobody notices until the whole thing gives. You've seen three of them this month. Either the maintenance crews on Line 7 are slacking, or someone's been tampering.

    You set it down on the workbench and reach for the calibration tool.

    The repair shop smells like machine oil and cheap noodles from the container on the corner of your desk. It's eleven-forty at night, the mid-ring outside is winding down to its quieter hum, and the overhead light flickers once every forty-seven minutes like clockwork. You've stopped noticing it. This is the part of your day you like best — the work, the quiet, the simple satisfaction of broken things becoming functional again.

    Your ability pulses once, lightly, the way it does when you're concentrating. You ignore it. You're good at that.

    The back door opens and Dayo comes in from the alley, shaking drizzle off his jacket.

    "Three cameras on the east block are running," he says, like he's announcing the weather.

    You look up. "They were dark last Tuesday."

    "Yeah, well. Someone fixed them." He drops into the chair across from you, props his elbows on his knees. "You see the news?"

    You hadn't. You don't watch the news if you can help it — too many registration announcements, too many Sparked integration ceremonies broadcast on every public screen like infomercials for a life you'd declined. "What happened?"

    "Collapse at the Soren Tower complex. Structural failure, six floors. They sent in two Registered teams." He pauses. "It wasn't enough. People are still inside."

    You put the calibration tool down.

    "I'm not saying anything," Dayo adds, reading your expression. "I'm just telling you."

    "You're always just telling me."

    He almost smiles. "We move or we don't. Either works."

    The light flickers. In the fluorescent half-second of dark, you feel it again — the low, constant hum in your bones that hasn't faded since the night eight months ago when a faulty relay exploded in your face and you didn't die. You still don't have a clean name for what you can do. You've avoided giving it one. Names make things real.

    The second knock comes from the front door.

    Not a customer knock. It's past midnight, the shutters are half-down, and the sign has been switched off since ten. This knock is three times, a pause, twice more. A pattern.

    You and Dayo look at each other.

    "Expecting someone?" you ask.

    "No," he says. Quietly. Which means he's worried.

    You go to the front. Through the narrow gap in the shutters you can see a figure in a dark jacket, hood down despite the drizzle, face turned slightly away from the camera mounted at the corner — naturally, like they know exactly where it's pointing. When they turn to knock again, you get a glimpse of amber-grey eyes.

    She sees you through the gap. Doesn't wave. Just waits.

    "Dayo." Your voice comes out steady, which surprises you. "Do you know someone who moves like they memorised every camera angle in this district?"

    A long pause from behind you.

    "Not personally," he says. "But I know what that usually means."

    The woman outside knocks again. Three times. A pause. Twice.

    The Soren Tower collapse is burning across every screen in the city. Somewhere in that rubble, people are waiting. And at your door, someone stands who you've never met — and who absolutely knows what you are.

    You have to decide what to do first.`,
      choices: [
        {
          id: "open-door",
          text: "You open the door and face the stranger directly.",
          consequence:
            "She clearly knows about you — refusing to engage doesn't make you safer, it just makes you less informed. She came to you, which means she wants something, and that's leverage.",
        },
        {
          id: "move-soren",
          text: "You leave through the back with Dayo and head toward Soren Tower.",
          consequence:
            "People need help right now, and you have the ability to do something. Acting first keeps you in control of what tonight becomes, even if it risks flagging you to the authorities.",
        },
        {
          id: "stall-her",
          text: "You signal Dayo to slip out the back while you stall her at the door.",
          consequence:
            "This buys Dayo time to find out who she is through his contacts while you remain behind the shutter — visible, but not yet fully committed.",
        },
        {
          id: "wait-out",
          text: "You kill the lights and wait her out in silence.",
          consequence:
            "The lowest immediate risk, though she knows you're inside. It lets you observe her reaction, but the clock is ticking for the people trapped in Soren Tower.",
        },
      ],
    },
    "an-ocean-of-sand": {
      narrativeText: `The crater is still burning when you wake up.

    That's the first thing — the orange glow painting the underside of the sky, steady and ancient, like a star that fell and decided to stay. You've seen photographs of the Darvaza Crater for years. In photographs it looks dramatic. In person, in the pre-dawn dark, three metres from where you slept in the sand because the air near it is the warmest place for miles, it looks like the world has a wound that won't close.

    You sit up. Your mouth tastes like dust. Your sleeping bag is damp with condensation that will be gone in an hour once the sun arrives.

    The desert is quiet in a way that cities never are — not silent, but still. The fire makes a low sound, almost like breathing. The sand around you holds the cold of night in its top layer, cool under your palms, though you know that by noon it will burn to the touch.

    Reza is already awake. He's sitting cross-legged six metres away, facing northeast, doing nothing. Just watching the horizon go from black to purple to a thin line of coral pink.

    You walk over. Your boots crunch softly.

    "Morning," you say.

    "How much water did you drink last night?" he asks, without turning.

    "Half a litre."

    He nods like you've confirmed something he already suspected. "Dani had three-quarters. I had less." He pauses. "We have two litres, maybe two-twenty. In this heat, that is four hours of movement. Six if we rest in shade. There is no shade."

    You look northeast, the direction he's facing. Forty-seven kilometres. You calculated it last night on the offline map before your phone battery hit twelve percent — you turned it off immediately after. Forty-seven kilometres at a walking pace of four kilometres per hour is nearly twelve hours. Twelve hours without water in Karakum summer heat is not survivable.

    "There's the gas infrastructure," you say. "Pipeline workers. They have to service the crater equipment periodically."

    "Periodically," Reza repeats. Not a question. A weight.

    Behind you, Dani stirs. The orange jacket rustles. She sits up, sees the two of you standing, and immediately reads the body language.

    "Okay," she says. She doesn't ask how bad is it. That's new. Last night she asked four times. "Okay. What are we doing?"

    Reza says nothing. He looks at you.

    It's a habit so ingrained he probably doesn't notice it anymore — the way he always passes the decision back. Eleven expeditions. He'll execute anything you choose. He's never once volunteered a plan first.

    You go through what you know: the pipeline runs roughly twelve kilometres northeast of your position — a dirt service track alongside it, maintained for vehicle access. If you reach the track, someone might pass. They might not. The alternative is pushing straight for the settlement: longer, but a known destination. The third option sits at the back of your mind like something you're reluctant to look at directly — stay at the crater, signal with fire, hope a vehicle or drone spots the smoke.

    Dani stands up beside you and shades her eyes at the horizon, though the sun isn't fully up yet. It's a reflex — something to do with her hands.

    "Is that smoke?" she says.

    You look where she's pointing. Northwest. Maybe eight kilometres. A thin grey column, not the black greasy smoke of burning rubber or fuel — pale, thin, almost hazy. Could be a cooking fire. Could be a gas vent. Could be nothing; the desert plays tricks with distance and colour in the early light.

    Reza sees it too. His jaw tightens.

    "That wasn't there at midnight," he says quietly.

    The column drifts east with the wind. And you realize with a slow, certain feeling — the kind that arrives before your mind finishes the logic — that whatever is burning northwest of you is burning upwind.

    If it's a wildfire, it's moving toward you. If it's a cooking fire, it's a person.

    You have maybe thirty minutes before the sun clears the horizon and turns movement into suffering. You need to decide now.`,
      choices: [
        {
          id: "head-northwest",
          text: "You head northwest toward the smoke — fast.",
          consequence:
            "A gamble on a human presence that could mean water or a vehicle. But if it's a wildfire or a gas vent, you've marched away from the only known routes to safety.",
        },
        {
          id: "push-northeast",
          text: "You push northeast toward the pipeline service track.",
          consequence:
            "You commit to known infrastructure. It's a brutal 12km trek in rising heat, and your survival depends entirely on a vehicle passing by on a track that might be empty.",
        },
        {
          id: "stay-crater",
          text: "You stay at the crater and use the fire to signal.",
          consequence:
            "Conserving energy and water while staying at a known landmark. However, you are betting your lives that someone knows you are missing and is already looking.",
        },
        {
          id: "split-reza",
          text: "You send Reza to scout the smoke while you and Dani move toward the pipeline.",
          consequence:
            "Splitting the group allows you to cover two possibilities, but it leaves you without your most capable member and leaves Reza completely alone if the smoke is a threat.",
        },
      ],
    },
    veldara: {
      narrativeText: `Detention at Vanthorpe Academy ran on Saturdays from nine to noon, and it was exactly as terrible as it sounded.

    Not in a dramatic way. Not in a character-building way, despite what the school counsellor's poster in the hallway suggested. Terrible in the most mundane possible sense: fluorescent lights, cold concrete floors, and three hours of sorting through forty years of donated rubbish that the school's board of trustees had decided was "archival material" rather than simply "junk they were too cheap to throw out."

    You had been assigned Row Seven.

    Row Seven, as far as you could tell, contained: a broken rowing machine, approximately nine hundred National Geographic issues from 1978, a taxidermied fox missing one ear, and a crate.

    The crate was shoved in the very back, under a yellowed tarp, and it was heavier than it had any right to be.

    "Need a hand with that?"

    You looked up. Finn Calloway — you knew him by reputation more than anything else — was leaning against a shelving unit with his arms crossed and his blazer hanging open, watching you wrestle with a corner of the tarp.

    "I'm fine," you said.

    "You're really not," he said, helpfully, and came over anyway.

    Between the two of you, the tarp came off in one pull.

    The crate was black-painted wood, stencilled with a date — 1993 — and a label that had been crossed out and replaced several times. The final label read: PROPERTY OF: NO ONE. DO NOT KEEP.

    "That's an unusual inventory note," Finn said.

    From the other end of the row, you heard Dara before you saw her: "Calloway, if you're not working, I'm filing a report that you left early."

    "I am working," Finn said. "I'm assisting."

    Dara appeared around the corner, notebook under her arm and glasses slightly crooked. Behind her, Priya moved quietly, cataloguing shelf numbers in a small notebook of her own. For a moment, all four of you stood looking at the crate.

    Then Priya said, "Open it," in the tone of someone who has already made up their mind, and you did.

    The console was matte black and roughly the size of a hardback book. No brand logo. No model number. A single cartridge slot in the front, already loaded — the cartridge label stamped with letters that looked hand-done, uneven, almost urgent:

    VELDARA.

    Four controllers, neatly coiled, sat beside it. And a power cord that trailed off and ended in — nothing. No plug. Just a frayed end.

    "It's vintage," Dara said, turning it over carefully. "Pre-HDMI, obviously. No brand I recognise. Some kind of independent—"

    The screen on the wall — an ancient CRT monitor bolted up for archive cataloguing — flickered on.

    Nobody had touched it.

    The screen showed a jungle. Not a rendered jungle, not a pixelated jungle — a jungle. Deep, vivid green, light filtering down through a canopy that moved with actual wind. In the centre of the image, a stone archway wrapped in flowering vines, and beyond it, a world that seemed to go on further than any screen should hold.

    Text appeared at the bottom.

    VELDARA. Four players detected. Avatars assigned. Select your world.

    Below it, a single button prompt:

    [ PRESS START ]

    The four controllers lit up simultaneously. One drifted — physically moved, slid across the floor — and bumped against your foot.

    Finn picked his up without hesitation. Priya picked hers up slowly, examining it like she was reading the manual. Dara held hers at arm's length.

    "This isn't how consoles work," she said.

    "Yeah," said Finn. "Seems like."

    The jungle on the screen breathed. Somewhere inside it, something called — animal, or wind, or both. The archway at its centre glowed gold at the edges.

    The controller in your hand was warm.

    What do you do?`,
      choices: [
        {
          id: "press-start",
          text: "You press Start — commit fully and go first.",
          consequence:
            "The game is already running. Going in together and ready might mean you land with a plan instead of in freefall, even if you don't know who your avatar will be.",
        },
        {
          id: "seek-info",
          text: "You put the controller down and push for information first.",
          consequence:
            "Going in blind is how people get lost. You wait while Priya studies the label and Dara examines the hardware, hoping for answers before the loading window closes.",
        },
        {
          id: "eject-cartridge",
          text: "You try to eject the cartridge — find a way to turn it off.",
          consequence:
            "The rational move is to stop this. But the cartridge won't budge, and the screen shifts—it feels like the jungle is looking back at you now.",
        },
        {
          id: "call-out",
          text: "You ask — out loud — if anyone is on the other side.",
          consequence:
            "The game responded to your presence, so it might respond to your voice. Communication might be worth more than any button press in this surreal situation.",
        },
      ],
    },
    "extinction-clause": {
      narrativeText: `The ferry smells like diesel and salt and something else — something older, animal and green — that you notice only as the dock of Isla Kessara grows large enough to block the horizon.

    You stand at the bow with your tablet tucked under one arm and your government-issue lanyard swinging in the ocean wind. Around you, the other eleven guests cluster in small constellations: investors in linen shirts pointing at the treeline, two researchers from Munich photographing everything, a journalist with a recorder already running. Nobody is afraid. That's the first thing you file away.

    The dock is immaculate. New timber, fresh paint. A sign in brushed steel reads: GENESIS VAULT — WHERE DEEP TIME LIVES. Below it, smaller: HELIX DOMINION CORP. AUTHORIZED PERSONNEL ONLY.

    You are, technically, authorized. That distinction feels thinner than it should.

    The welcome briefing takes place in an open-air pavilion overlooking Biome One — a coastal wetland habitat where something large and long-necked wades through amber shallows two hundred metres away. You watch it move while Renzo Callafuentes works through his slide deck. He has the presentation cadence of someone who has given it forty times and enjoyed it every single time.

    "Seven biomes," he says, gesturing broadly. "Seventy-three species. Zero incidents in fourteen months of internal testing." He pauses for the murmur of approval. Gets it. "Isla Kessara isn't a theme park, friends. It's a proof of concept. That humanity and deep time can coexist."

    You write: "Zero incidents" — confirm against maintenance logs.

    The creature in the wetland dips its neck beneath the surface. Comes up with something. Swallows it whole.

    After the briefing, Dr. Chidinma Osei finds you near the coffee station. She doesn't introduce herself. She just stands beside you and looks out at the wetland like she's checking on a child.

    "You're the biosafety observer," she says.

    "That's what it says on my lanyard."

    "Your predecessor filed a preliminary concern report before she declined the assignment." She turns to look at you directly. "I read it. I disagreed with her methodology. I'm curious whether you'll reach the same conclusions."

    "What were her conclusions?"

    "That the electromagnetic barriers had not been tested under conditions of simultaneous node failure." She says it the way you'd say the sky is blue — a fact, not a confession. "We've since run those tests. The results were acceptable."

    You notice she doesn't say reassuring. She says acceptable.

    "I'd like to see the test documentation," you say.

    "I'll have it sent to your cabin." She picks up her coffee. "You'll also want to talk to Tomás. He runs barrier systems maintenance. He found you during the ferry transfer and asked three questions about your credentials. That's unusual for him."

    She walks away before you can ask what his questions were.

    Tomás Ikeda-Rowe finds you twenty minutes later, near the path to the guest cabins. He's walking fast and looking at his tablet, and he almost collides with you before stopping short.

    "Oh — you're the observer." His left knee bobs once, twice. "Great. Good. That's — I was looking for you, actually."

    "Dr. Osei mentioned."

    "Right, yeah, she would." He glances toward the pavilion, where Renzo is still talking to investors. Looks back at you. "So, wild fact — did you know the electromagnetic barriers use the same base architecture as the grid systems they use in deep-sea research stations? Really interesting stuff. The signal harmonics are—"

    "Tomás."

    He stops. Takes a breath.

    "The barrier outage last night," he says, quieter. "The eleven-second window in Biome Four." He turns his tablet to show you something — a graph, signal data, timestamps. "It wasn't a software patch. I know what a software patch looks like. This was an external override. Someone unlocked those nodes from outside the facility network."

    The path between you and the pavilion is empty. The treeline is fifty metres away. From somewhere inside it — deep, resonant, like a sound more felt than heard — something moves.

    "Does Renzo know?" you ask.

    "I sent him the logs at six this morning." Tomás's knee is going again. "He said I was misreading the data. At the end of the day."

    The sound in the trees stops. The birds that were calling — you didn't realise they were calling until they weren't.

    What do you do?`,
      choices: [
        {
          id: "demand-docs",
          text: "You go directly to Dr. Osei's lab and demand the full barrier test documentation.",
          consequence:
            "Directness may win Osei's respect and provide technical evidence, but it will alert Renzo to your speed and potentially trigger corporate damage control.",
        },
        {
          id: "off-record-logs",
          text: "You ask Tomás to show you the override logs himself — off the record.",
          consequence:
            "You access raw, unfiltered data and secure an ally, but you're operating outside of Ministry protocol which could be used against you if things escalate.",
        },
        {
          id: "file-notice",
          text: "You go to your cabin and file a preliminary concern notice with the Ministry.",
          consequence:
            "Secures your legal cover and protects your career, but grants the antagonists a twelve-hour window to potentially hide evidence or coordinate a cover-up.",
        },
        {
          id: "scout-perimeter",
          text: "You walk to the edge of Biome Four's barrier perimeter — alone.",
          consequence:
            "Observation is the ultimate truth, but being alone outside guest zones after dark is physically dangerous—especially if the barriers are truly compromised.",
        },
      ],
    },
    "the-aldwych": {
      narrativeText: `The tea is still hot.

    That's the thing you keep coming back to, sitting in the third row with your coat still on and the stage lights still blazing overhead. Someone made tea before the rehearsal. It's sitting on the production table at the back of the stalls — five mugs, a thermos, a plate of biscuits with one bite taken from the top one. Everything exactly as it was at eleven o'clock, when the biggest problem in this building was whether Dorian Vex would finally nail the playing card sequence in Act Two.

    The tea is still hot and Dorian Vex is dead.

    You watch the stage. The tank is still there, centre-stage, still dripping. The broken glass has been swept — Niall Forde did it himself, ten minutes ago, methodically, before anyone could stop him, his face doing nothing while his hands cleaned up the evidence of the last two hours. The empty steel frame stands like a doorway to nowhere, eight feet tall, halogen lights refracting off its wet edges.

    The rest of the stalls are nearly empty. One of the young riggers — the girl with the braided hair — is sitting against the back wall with her knees pulled up, staring at the ceiling. The other one went to the lighting booth and hasn't come down. Two producers are standing near the fire exit speaking in very low voices and not looking at each other. Ottoline Marsh is a row behind you, on her phone again, her voice too quiet to hear but her posture making it clear that whatever conversation she's having is more important than this one.

    Nobody has asked you anything yet. It occurs to you that they might not have registered you as someone worth asking.

    Forty minutes earlier, you'd been watching from this same seat as the crew ran final checks. The Aqua Infinitum was new — Dorian had been secretive about its specifications, Niall told you before the show with the barely concealed irritation of a man who was expected to rig equipment he hadn't been allowed to fully examine. The tank was imported. The locks were custom. Dorian had changed the escape sequence that morning, which was unusual, Niall said, and then stopped talking about it.

    Dorian himself had come to talk to you briefly during the interval before the rehearsal began — he did this with all civilian witnesses, apparently, a small ritual. He was smaller in person than on his promotional posters. Sharp eyes, a professional warmth that he could switch on and off like a stage light. He'd shaken your hand, said something charming you'd already forgotten, and then paused.

    "If anything seems odd to you tonight," he'd said, with a smile that didn't quite match his voice, "trust it. Most people in here have stopped noticing things."

    You'd thought he meant it as showmanship.

    Petra Solis comes down the aisle and stops at the end of your row. She's been moving through the theatre since it happened — not pacing, exactly, but present everywhere, as if she's conducting her own audit. She holds her tea cup in both hands. She doesn't sit.

    "You were watching the tank," she says. "During the sequence. I noticed."

    "Everyone was watching the tank."

    "Everyone was watching Dorian." A small correction, the same tone. "The tank is the box. People watch the person in the box. You were watching the top of the rig." She tilts her head slightly. "Why?"

    You don't have a good answer. You were watching it because something about the way the pulley cable sat in its housing had looked wrong to you — a small thing, a nothing thing, the kind of thing you'd second-guess immediately. You'd decided you didn't know enough about stagecraft to trust the instinct.

    Petra seems to read something in your silence.

    "He changed the lock sequence this morning," she says.

    "This morning," you echo.

    She looks at you for a long moment. Then she looks at the floor. "I'm going back to the dressing room. If you want to know what the lock sequence was — what it should have been — come and find me. Before the police get here and everything becomes..." She searches for the word. "Official."

    She walks back up the aisle without finishing the sentence.

    Behind you, Ottoline Marsh ends her call. The theatre goes very quiet. From somewhere above the stage — high in the grid, in the darkness above the lights — you hear the slow, measured footsteps of someone moving through the rafters.

    Someone who didn't come down when Niall swept up the glass.

    What do you do?`,
      choices: [
        {
          id: "follow-petra",
          text: "You follow Petra to the dressing room.",
          consequence:
            "She's the only person who has voluntarily offered you information — and she chose you specifically. The dressing room is warm, enclosed, and away from Ottoline's earshot; she may say things here she won't say once the police arrive. However, she is also the most obvious suspect, and whoever is in the rafters finishes whatever they're doing up there.",
        },
        {
          id: "investigate-rigging",
          text: "You find a way up to the rigging grid above the stage.",
          consequence:
            "Physical evidence above the stage can't be reworded or reframed — the rig either shows signs of tampering or it doesn't. The person up there doesn't know they've been heard, but the grid is dark, unfamiliar, and you'd be alone with someone who may have already killed once tonight.",
        },
        {
          id: "approach-niall",
          text: "You approach Niall Forde about what he saw when he swept the stage.",
          consequence:
            "Niall handled the glass and was closest to the tank after the break — he's the only person who's had hands on the physical scene. He's instinctively honest, but his first loyalty is to his crew. Approaching him openly signals to the rest of the room that you're investigating, which ends your invisibility.",
        },
        {
          id: "listen-to-ottoline",
          text: "You stay exactly where you are and listen to Ottoline's next call.",
          consequence:
            "She's made two calls since the glass broke; the third call may tell you who she's actually afraid of. Stillness is information, but passive observation has a closing window. Once the police arrive, the room locks down and everyone's story hardens.",
        },
      ],
    },
    "before-the-bell": {
      narrativeText: `Three minutes ago, you were a billionaire.

    That's the thought that arrives first, ahead of everything else — ahead of the obvious, urgent, catastrophic thing on the floor in front of you. Three minutes ago, Nexus was worth ₹4,200 crore and your name was on the masthead and eleven days from now a wire transfer was going to land that would change the arithmetic of your entire life. Three minutes ago you were the person who built this.

    The glass walls don't care. The city doesn't care. Sixty floors below, the Western Express Highway is doing exactly what it does at 11:47 PM on a Tuesday — amber headlights crawling south toward Bandra.

    His name was Armaan Suri. You've known him for nine years. That was the Armaan you knew. Then there was the Armaan who walked into this office at 10 PM tonight and told you exactly how he was going to take your company.

    You argued. You pushed him. It wasn't hard. It was the kind of push you give a door that's sticking. And then the edge of the desk — that ridiculous antique desk you bought in Chor Bazaar.

    And then Armaan was on the floor. And then the silence.

    You have been standing here for three minutes. The motion sensors will log four. The building's security AI flags rooms that go inactive for more than six. On the desk — Armaan's laptop, open, unlocked. The server logs for tonight's session are somewhere in that machine. The last backup was at 11:30. The next one is at midnight.

    You have thirteen minutes.

    The room is cold. The city is warm. Somewhere between those two temperatures is the version of tonight you have to build. You look down at Armaan. His glasses are still on his face. His thumb is still. The clock on his screen reads 11:47.

    What do you do?`,
      choices: [
        {
          id: "wipe-logs",
          text: "You go straight to the server logs — wipe tonight's session from the building's system before the midnight backup runs.",
          consequence:
            "Removes immediate evidence of your presence, but a forensic gap is highly suspicious, and you'll be at the terminal for eight minutes.",
        },
        {
          id: "compose-message",
          text: "You compose a message from Armaan's open laptop — a note that reframes tonight as a decision he made himself.",
          consequence:
            "Establishes a suicide narrative early, but requires managing replies and thinking exactly like the man you just killed.",
        },
        {
          id: "rearrange-room",
          text: "You rearrange the room — move Armaan's body, reset the furniture, build the physical story of an interrupted robbery.",
          consequence:
            "Points to an external robbery, but leaves biological traces and creates a lobby security discrepancy.",
        },
        {
          id: "touch-nothing",
          text: "You touch nothing. You walk to the elevator, go downstairs, get in your car, and drive home.",
          consequence:
            "Cleanest alibi, but leaves all evidence and his laptop open for the midnight backup.",
        },
      ],
    },
    "still-here": {
      narrativeText: `The presentation had ended at 9:47.

    That was twenty-four minutes ago. You are still in the BioNexus Atrium. The cleaning crew locked the lobby-side doors from the inside, and the security desk phone rang twice before anyone answered it and said someone will be with you shortly.

    So you're here: standing in the BioNexus Atrium at 10:11 PM. The building's clean white overhead lights turn the floor-to-ceiling glass walls into dark mirrors.

    "They'll send someone," Nishant says, scrolling without purpose.
    "Or he went home," Devashri says, sitting on the edge of the table.

    Preetam is standing near the east corridor glass. "The air tastes different," he says. "Since the cleaning crew left. Something in the recycling."

    Then the lights shift. The clean white overhead dims to amber-gold, deep and pulsing. The klaxon sounds once.

    Then AEGIS speaks: "Attention. A containment event has been logged. Specimen 13 is unaccounted for. All personnel are requested to remain in designated zones. Blast door protocol is now active."

    The floor-to-ceiling doors seal. Nishant stops scrolling. "Specimen 13 isn't a biological. I've seen the project register. It's a data classification." He stops. Something is happening to his expression.

    Preetam is pointing toward the east corridor glass wall. There are four of you in the Atrium. The reflection shows three. Preetam is standing two metres from the glass and his reflection is not there.

    AEGIS speaks again: "You are safe. Please do not attempt to access Sub-Level 3. Please do not — [SIGNAL DEGRADED] — the number has always been three — [SIGNAL DEGRADED] — you have always been here."

    Devashri grabs your arm. "Okay," she says, very quietly. "What do we actually know."

    What do you do?`,
      choices: [
        {
          id: "control-narrative",
          text: "You take control of the information — tell the group what you know about Specimen 13 before Nishant can shape the narrative.",
          consequence:
            "Keeps the group oriented around facts, but you might be wrong, and AEGIS is listening to everything.",
        },
        {
          id: "go-to-preetam",
          text: "You go to Preetam. Specifically, quietly — before the others redirect the group's attention.",
          consequence:
            "Preetam has seen things, but isolating him might play into AEGIS's hands or reveal something terrifying you can't unsee.",
        },
        {
          id: "watch-nishant",
          text: "You don't move. You watch Nishant.",
          consequence:
            "Nishant knows something. Stillness gives AEGIS less to work with, but looks like paralysis to the group.",
        },
        {
          id: "speak-to-aegis",
          text: "You speak directly to AEGIS.",
          consequence:
            "Reframes the dynamic and challenges the system, but guarantees you become its primary target.",
        },
      ],
    },
    cache: {
      narrativeText: `The headset is lighter than you expected.

    You turn it over in your hands — a soft arc of pale silicone. The box smells faintly of lavender. On the lid, embossed in silver: MnemOS · BETA EDITION. Memory is the self. Treat it gently.

    You sit on the edge of your bed. The app opens with a chime. Rosalind Chet appears in a small tile at the corner of the screen. "First session? Take your time. There's no right way to do this."

    You scroll past the catalog and tap the one you came here for. And then you are somewhere else entirely.

    You are seven years old. It is your birthday. The kitchen is exactly as you remember it. Aunt Mirela is by the refrigerator. She is laughing, and then you notice it.

    Her face is wrong.

    Not faded with time. Her face is static. Patches of visual noise flickering softly in place of features. You go very still. You realize, slowly, that the window at the far end of the kitchen is ajar. And behind it, there is a dark that moves.

    Rosalind's voice comes through a speaker that does not exist in this kitchen. "That's completely normal. Some background elements render at lower fidelity on first pass."

    The window is more open than it was a moment ago. And the dark behind it has a shape now — something like a posture, turned deliberately toward you.

    Mirela's static face turns toward you. Her mouth — perfectly rendered, uncorrupted — opens into a smile you have no memory of her ever making.

    The window is almost fully open.

    What do you do?`,
      choices: [
        {
          id: "move-toward-window",
          text: "You move toward the window — you want to see it clearly before it finishes coming through on its own terms.",
          consequence:
            "Establishes agency but might accelerate the collapse of the memory and invite the entity in.",
        },
        {
          id: "call-out-mother",
          text: "You call out to your mother in the other room — if she is still rendered correctly, she may be an anchor.",
          consequence:
            "She might stabilize the memory, but the entity will hear you, and her face might also be corrupted.",
        },
        {
          id: "exit-manually",
          text: "You try to exit the memory manually — two fingers pressed to the temple, the gesture from the tutorial.",
          consequence:
            "The rational choice, but requires deep concentration. If it fails, you are truly trapped.",
        },
        {
          id: "go-still",
          text: "You go completely still and wait — you want to see if the memory continues its own logic if you stop interacting.",
          consequence:
            "May reveal the entity's pattern, but passivity allows the window to open fully while the memory degrades.",
        },
      ],
    },
    "the-descent-engine": {
      narrativeText: `The light arrives before the sound.

    It comes down through the fissure in a single burning column, hitting the canyon floor thirty metres below where you're standing. The air smells of ozone and deep cold. 

    Dayo lands beside you at the canyon floor, stumbles once on the loose shale, and rights himself. He already has his headlamp on. "Tell me you're seeing this," he says, staring at the base of the canyon wall.

    The fissure has peeled back the rock face to reveal a smooth, dark material inscribed with interlocking glyphs. The entrance is a triangular opening, apex pointing downward. The stone around it is jointed, and fine white sand moves through channels, an engineered current, as though the building is breathing.

    The moment you cross the threshold, the light changes to a deep, directional blue. The first chamber is vast, with carved pillars the height of apartment buildings. 

    Then the sound starts.

    A low, grinding resonance rising from below. A section of the far wall rotates a quarter-turn. A new corridor opens that wasn't there a moment ago.

    Dayo is already walking toward it. "Something registered that we came in," he says. "Which means there's a mechanism. Which means there's a countdown. Six hours. Optimistic. Could be four."

    From far below comes a second sound. The sound of something very large beginning, with immense patience, to move.

    The corridor Dayo is standing next to has already begun, almost imperceptibly, to narrow.

    What do you do?`,
      choices: [
        {
          id: "enter-corridor",
          text: "You enter the newly opened corridor immediately.",
          consequence:
            "Follows the machine's response logic, but blindly rushes into a potential trap with no known exit trigger.",
        },
        {
          id: "translate-glyphs",
          text: "You hold position and let Dayo translate as much of the pillar glyphs as he can before moving.",
          consequence:
            "Gives vital navigational intelligence, but costs precious time as the corridor closes and the entity approaches.",
        },
        {
          id: "radio-surface",
          text: "You radio Kwame and Farida on the surface and report the countdown before going deeper.",
          consequence:
            "Secures the discovery's legacy and backup, but comms are unreliable and Dayo might wander off.",
        },
        {
          id: "ignore-corridor",
          text: "You ignore the opened corridor entirely and find your own way down.",
          consequence:
            "Refuses the machine's predetermined path, but improvising in a hostile, ancient mechanism is incredibly dangerous.",
        },
      ],
    },
    "eight-minutes": {
      narrativeText: `The water here does not look like other water.

    The water off Lòn Mara is the colour of old pewter on the surface and becomes something between blue and grey below. Cold. Tremendously, specifically cold. 

    The boat rocks in the swell. "Storm's moved up," Sorcha says, checking your tank valve. "You've got five forty on the window. Not six. I'll call you at four hours. You surface at four twenty regardless."

    You roll backward off the gunwale. The bioluminescence begins at nine metres — a soft, sourceless blue-white light. The entrance to the observatory is at fourteen metres. You pass through the carved arch, and the bioluminescence follows you inside.

    The first chamber is the size of a cathedral nave, tilted at a five-degree angle so water entering flows toward the mechanism below. The walls are covered in carved star charts and wave-form calculations. You drop a chemical flare.

    The comms crackle. "Tide's rising faster than the model predicted," Peregrine says. "The alignment window — it may be closer to eight minutes, not eleven."

    Eight minutes of full light. Between you and the astrolabe lies a flooded passage and a hydraulically operated gate running on water pressure.

    Then you hear it. The low voice. A resonance in the walls themselves. The observatory is waking up. Somewhere below, the great bronze discs are beginning to turn.

    The gate at the far end of the first chamber is open. For now. The water around you is rising.

    What do you do?`,
      choices: [
        {
          id: "move-through-gate",
          text: "You move immediately through the gate toward the astrolabe.",
          consequence:
            "Capitalizes on the open gate and the short window, but risks getting trapped if the gate closes on a tidal schedule.",
        },
        {
          id: "finish-first-chamber",
          text: "You spend five minutes finishing the first chamber documentation before moving.",
          consequence:
            "Captures vital star charts and keeps you in a stable environment, but eats up the majority of your alignment window.",
        },
        {
          id: "call-sorcha",
          text: "You call Sorcha and Peregrine and report the gate and compressed timeline.",
          consequence:
            "Provides crucial surface synchronization before comms degrade, but wastes time and might prompt an unwanted extraction.",
        },
        {
          id: "look-for-redundant-passage",
          text: "You look for the redundant passage Peregrine mentioned.",
          consequence:
            "Might bypass the dangerous hydraulic gate entirely, but searching takes time and the backup route might be unstable.",
        },
      ],
    },
    "fourty-seven-pounds": {
      narrativeText: `The second-floor stairwell smells of old carpet and consequences.

    You are crouched behind the fire door with a hand-drawn floor plan balanced on one knee, annotated in two colours of biro. From somewhere below comes the sound of a door closing with administrative finality.

    "That's the 22:45 internal check," Félix murmurs beside you, walkie-talkie clipped to his hoodie. "He's going back to the office. Which means we've got the corridor to ourselves for approximately nine minutes."

    "You've timed his internal checks," you say.

    "I've been building the model for two weeks in anticipation of an operation becoming necessary."

    You look at the index card. ASSET: KETTLE. EXFIL TARGET: OWN ROOM. ETA: PRE-MIDNIGHT. You're going to get your £47 kettle back.

    You move along the wall of the ground floor corridor. The warden's office is at the end. A light is currently on behind the frosted glass panel. Huxley-Pryce is in.

    "Accounted for," Félix says. "He does a full desk-clear at 23:00. Four-minute window minimum. I need you to get to the door and confirm the kettle is on the shelf, not in the lockbox. I'll cover the corridor. If he moves, I click the walkie twice."

    He holds out the second walkie-talkie. You take it. "This is insane," you say.

    "Completely," he agrees. "Recon first. Confirm the asset. Then we commit."

    From behind the warden's door comes the sound of a filing cabinet closing. Then, faintly, the click of a kettle — his kettle — beginning to boil. Félix looks at you. His expression says: you see what he is?

    You see. Fourteen metres of cold linoleum between you and the most tactically unnecessary thing you are going to do tonight.

    What do you do?`,
      choices: [
        {
          id: "recon-door",
          text: "You approach the door alone for recon — confirm the kettle's location through the frosted glass panel.",
          consequence:
            "Confirms the target's location safely, but getting caught looking into the warden's office is hard to explain.",
        },
        {
          id: "wait-for-window",
          text: "You skip recon entirely and wait for the 23:00 desk-clear window.",
          consequence:
            "Trusts Félix's meticulous model and maximizes the safe window, but wastes time if the kettle is already locked up.",
        },
        {
          id: "create-distraction",
          text: "You create a distraction first — something that draws Huxley-Pryce out of the office.",
          consequence:
            "Clears the office for a clean grab, but a suspicious distraction might trigger a full building sweep.",
        },
        {
          id: "knock-and-negotiate",
          text: "You knock on the office door directly and attempt a negotiation.",
          consequence:
            "The only legitimate route, but warns the warden you are awake and motivated, ruining Félix's tactical plan.",
        },
      ],
    },
    "the-don-of-dunmore-close": {
      narrativeText: `The bread maker finished its first cycle at 6:43 a.m. 

    You stood in the kitchen of your new house, watching the loaf emerge, and thought: yes. This is the fresh start. On the corkboard above your desk is a list titled MILLHAVEN INTEGRATION GOALS (Q1). You have put a small star next to 'be a good neighbour'.

    You eat your bread looking out at the quiet street. At the bird feeder across the road, a woman is standing very still, looking at your house. You wave. She does not wave back. She writes something in a small notebook. You decide this is normal.

    Later, at Brendan's Hardware, you are buying compost, slow-release fertiliser, three types of herb seedlings, and cable ties. Tommy helps you load the large bag of fertiliser onto a flat trolley. 

    "Big project?" he says.
    "Just a herb garden," you say. "I want to do it properly."

    Tommy nods. He looks at the fertiliser, the cable ties, and your intense resting face. "Right," he says. "Brilliant." Through the window, as you pull away, you see Tommy already on his phone.

    That evening, you arrive at the community centre residents' meeting. You are standing in the car park with a folding chair and your boot full of tarpaulin when Donna Przybylski appears. She looks at your boot. You hear the soft sound of a notebook being opened.

    Inside, the meeting is discussing the east roof leak. After four minutes you put up your hand. "I could look at the roof. I have some experience with drainage issues. We could sort it before winter."

    Twelve people look at you. The silence lasts slightly longer than it should. On the community Facebook group, Barry Okafor is deciding whether your offer constitutes drama or a public safety notice.

    What do you do?`,
      choices: [
        {
          id: "lean-in-watch",
          text: "You lean in hard on the neighbourhood watch idea — hand out your colour-coded patrol rota.",
          consequence:
            "You make genuine progress on community integration, but the town perceives it as a mob boss organizing territory.",
        },
        {
          id: "stay-quiet-tommy",
          text: "You stay quiet and focus on introducing yourself properly to Tommy.",
          consequence:
            "You make a genuine connection, but your innocent technical details about fertilizer will be broadcasted and twisted town-wide.",
        },
        {
          id: "volunteer-gym",
          text: "You volunteer to run the community gym group with a 'structured programme'.",
          consequence:
            "Everyone joins out of fear. You become a great trainer, but the town remains terrified of your 'enforcement'.",
        },
        {
          id: "leave-early",
          text: "You leave early — you've got the roof offer in, and the bread is at home.",
          consequence:
            "Perfectly normal behavior that is interpreted as the most suspicious, sinister exit possible, blowing up the Facebook group.",
        },
      ],
    },
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
