export interface StoryData {
  id: string;
  title: string;
  genre: string;
  description: string;
  longDescription: string;
  coverGradient: string;
  coverImage?: string;
  tags: string[];
  featured: boolean;
  rank: number | null;
  initialPrompt: string;
  worldContext: string;
  storyMode: string;
  audienceAge: string;
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
    featured: true,
    rank: 1,
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
    featured: false,
    rank: 2,
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
    featured: false,
    rank: 3,
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
    tags: ["Comedy", "Restaurant", "Chaos", "Social Disaster"],
    featured: false,
    rank: 4,
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
    tags: ["Mystery", "Drama", "School", "Thriller"],
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
    tags: ["Sci-Fi", "Mystery", "Exploration", "Discovery"],
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
    tags: ["Mystery", "Thriller", "Locked Room", "Murder Mystery"],
    featured: false,
    rank: 9,
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
  },
  {
    id: "the-clockwork-garden",
    title: "The Clockwork Garden",
    genre: "Fantasy / Adventure",
    description:
      "Behind the old greenhouse, you've found a garden that runs on gears and wishes. The gardener left a note. The rose is ticking. You have until sunset.",
    longDescription:
      "The abandoned greenhouse at the edge of Millbrook Park has been locked for as long as anyone can remember. But today the lock is open, the gate is ajar, and inside — past rows of dusty clay pots and broken glass — is a door that leads somewhere impossible. The Clockwork Garden is alive with gears and singing pipes, flowers that chime on the hour, and a giant sundial that counts down to something nobody will explain. The gardener who built it left a notebook. You've read the first three pages. You're not sure you should have.",
    coverGradient:
      "linear-gradient(145deg, #1a4a1a 0%, #2d7a2d 40%, #4aaa4a 75%, #6acc6a 100%)",
    tags: ["Fantasy", "Adventure", "Magic", "Discovery"],
    featured: false,
    rank: null,
    initialPrompt: "the-clockwork-garden",
    storyMode: "Fantasy / Adventure — wonder, problem-solving, gentle stakes",
    audienceAge: "8–12",
    worldContext: `WORLD & STORY CONTEXT
Millbrook is a quiet town with a park at its centre. Most people walk past the old greenhouse without looking twice — it's been locked for sixty years, surrounded by overgrown ivy and a rusted fence. What almost nobody knows is that behind the greenhouse, through a door hidden by climbing roses, is a garden that should not exist. The Clockwork Garden was built by an inventor named Mira Voss over forty years ago. Everything in it runs on gears, springs, and a kind of energy Mira called "whimsy" — which behaves a lot like ordinary mechanics except when it doesn't. Flowers open and close on schedule. Bees made of hammered copper collect brass pollen. A waterfall flows uphill between the hours of three and five. The sundial in the centre has seventeen hands, each measuring something different. The garden has been running without a gardener for sixty years, which is too long, and things have started to go slightly wrong in small and important ways. Mira left a notebook with instructions. You have found the notebook. You have also found the garden. These two facts are probably connected.

CHARACTERS
You — A curious kid who followed a cat through the unlocked gate and found something impossible.

Pip — Your best friend. Practical, funny, and allergic to bees — which is a problem in a garden full of copper ones. Wants to figure out how things work. Always has a hypothesis. Sometimes the hypothesis is right.

The Notebook — Mira's handwritten record of the garden's rules and secrets. Some pages are missing. Some pages warn about specific things. You are not always sure which warnings you should have read before you did the thing.

TONE GUIDANCE: Warm wonder with gentle stakes. Every mechanical thing in the garden should feel genuinely magical — not frightening, but surprising. Problems are puzzles to solve together. The stakes are real (the sundial counts down to something) but never scary. Let curiosity drive every scene. Pip's humour lightens tense moments. The garden rewards kindness and cleverness.`,
  },
  {
    id: "ghost-delivery",
    title: "Ghost Delivery",
    genre: "Comedy / Mystery",
    description:
      "The package was addressed to someone who has been dead for thirty years. You delivered it anyway. Now the ghost wants to write back.",
    longDescription:
      "Your summer job at Crumble & Sons Postal Service seemed simple enough: pick up, deliver, get paid. Nobody mentioned that the Whistleby house at the top of the hill was occupied by a ghost named Edmund who has been waiting thirty years for a letter that never came. He got it today — delivered by you, by accident, because you misread the street number. Now Edmund has a reply he wants you to post. The problem is that Edmund's return address doesn't exist anymore. The second problem is that Edmund is very chatty. The third problem is that whoever sent the original letter is still alive and might not know Edmund is a ghost. This is not in your job description.",
    coverGradient:
      "linear-gradient(145deg, #2a0a4a 0%, #4a1a7a 40%, #7a3aaa 75%, #aa6acc 100%)",
    tags: ["Comedy", "Mystery", "Ghost", "Friendship"],
    featured: false,
    rank: null,
    initialPrompt: "ghost-delivery",
    storyMode: "Comedy / Mystery — warm, funny, gently spooky",
    audienceAge: "8–12",
    worldContext: `WORLD & STORY CONTEXT
The town of Plimpton is perfectly ordinary in almost every way. Houses have gardens. The bakery smells like cinnamon on Thursdays. The old Whistleby house at the top of Harrow Hill has been empty since 1994 — or so everyone says. Edmund Whistleby, who lived there until he didn't, never quite left. He's not frightening. He's just stuck. He's been waiting for a letter for thirty years, and he has very specific opinions about the postal service, the correct temperature for tea, and the films that came out after 1993 (he missed all of them and is catching up slowly via conversations with the living). The letter arrived today — misdelivered by you, because Harrow Hill and Harrow Close are genuinely confusingly named, and the house number didn't help. Edmund was delighted. Now he wants to respond, and he needs a postal carrier with functioning hands.

CHARACTERS
You — A kid doing a summer postal job. You have not previously delivered mail to a ghost. You are adapting.

Edmund Whistleby — The Ghost. Seventies, in the warm cardigan-and-slippers sense. Polite, curious, occasionally confused by modern technology, and absolutely thrilled to have a visitor. He is not scary. He would be very upset if you found him scary. He makes excellent invisible tea.

Your supervisor — Has never mentioned ghosts in the training materials. This feels like an oversight.

TONE GUIDANCE: Warm comedy with a gentle mystery at the centre. Who sent the letter, and why now? Edmund is funny because he's so specific — about manners, about the weather, about the correct way to fold a letter. The comedy comes from the gap between the very normal (postal delivery) and the very not (ghost). Let the friendship develop naturally. The mystery is sweet, not dark.`,
  },
  {
    id: "the-last-dragon-egg",
    title: "The Last Dragon Egg",
    genre: "Fantasy",
    description:
      "You found an egg in the mountain pass. It's warm. It's humming. And something very large has been following your footprints in the snow.",
    longDescription:
      "The mountain pass through the Greycrown range is supposed to be safe — your family has crossed it every autumn for generations. This year, halfway through, you spot something in a hollow beneath the ice: an egg. It's the size of a watermelon, covered in iridescent scales, and unmistakably warm despite the freezing air. Your grandmother's stories said the last dragons left these mountains a century ago. Your grandmother's stories are usually right. Whatever left this egg behind was very large. And whatever is following you through the snow wants it back.",
    coverGradient:
      "linear-gradient(145deg, #3a1a0a 0%, #7a3a0a 40%, #c86010 75%, #e87820 100%)",
    tags: ["Fantasy", "Adventure", "Dragons", "Survival"],
    featured: false,
    rank: null,
    initialPrompt: "the-last-dragon-egg",
    storyMode: "Fantasy — wonder and danger, brave choices, earned trust",
    audienceAge: "8–12",
    worldContext: `WORLD & STORY CONTEXT
The Greycrown Mountains form the spine of the known world. Merchants, farmers, and the occasional shepherd have crossed the Greycrown pass for five hundred years. The mountains are cold, rocky, and completely ordinary — or they have been, for the past hundred years, since the last dragons were said to have left. Before that, the Greycrown was dragon territory. The evidence is still there if you know where to look: scorched ledges, enormous claw-marks worn smooth by weather, the occasional scale half-buried in ice. Your family crosses the pass every autumn to reach the winter markets in Stonefield. You've done it five times. Nothing has ever happened — until now. The egg you've found is not a chicken egg. It is not a goose egg. It is warm, humming faintly, and covered in tiny iridescent scales that catch the light like hammered copper. It weighs exactly as much as it should weigh if it were going to hatch soon. In the snow behind you, something has left prints. The prints are large. They are fresh. They are getting closer.

CHARACTERS
You — Eleven years old. Sensible, mostly. Brave when you have to be. You've read all the dragon books in the village library, which you thought was just interesting and now turns out to be relevant.

Gran — Your grandmother. She knows the old stories better than anyone. She's waiting at the winter camp, two hours ahead. She'll know what to do — if you can reach her.

The Egg — Warm. Humming. Occasionally shifting. Making a decision on its own timeline.

TONE GUIDANCE: Adventure with genuine stakes and genuine wonder. The dragon is not a villain — it is a parent, and something more ancient than that. The tension comes from not knowing whether the thing following you is dangerous or desperate. Let the egg feel alive. Let the mountains feel enormous. Every choice should feel like it matters, but the story should never be cruel.`,
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
    tags: ["Drama", "Literary", "Coming of Age", "Identity"],
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
    tags: ["Mystery", "Thriller", "Crime", "Redemption"],
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
    tags: ["Historical", "Mystery", "Conspiracy", "Moral Dilemma"],
    featured: false,
    rank: null,
    initialPrompt: "the-cartographers-confession",
    storyMode: "Historical Mystery — moral weight, institutional power, quiet courage",
    audienceAge: "18+",
    worldContext: `WORLD & STORY CONTEXT
A pre-industrial empire at the height of its administrative power — think 18th century in sensibility, without reference to real-world nations. The empire is governed by a Council of five Ministers, with the Emperor as figurehead. The Office of Cartography is among the most trusted institutions in the imperial apparatus — maps are legal documents, border maps are binding treaties, and the Senior Cartographer's certification carries the weight of law. Adriaan de Vries has held the Senior position for twelve years. He certified the Kessler Border Agreement twenty-two years ago, six years before his promotion, when he was a junior surveyor following his superior's instructions. The border was wrong. He didn't know it at the time. He has found proof tonight — a preliminary survey, marked "suppressed," in the dead hand of his former superior — that the error was deliberate. The war that followed killed eleven thousand people in three years of border conflict before the revised treaty was negotiated. The man who ordered the falsification is Lord Minister Greave, now seventy-one, publicly celebrated as a peace architect, and currently being nominated for Imperial Chancellor. The archive closes at midnight. Adriaan has two hours.

CHARACTERS
You — Adriaan de Vries. Senior Cartographer. Fifty-three. A man who has spent his career believing precision was a form of integrity. Tonight that belief is being tested.

Emile — Your junior assistant. Twenty-four, idealistic, good at his work. He doesn't know why you're still in the archive at this hour.

Lord Minister Greave — Seventy-one. The man who ordered the falsification. He has spent twenty-two years building a reputation as the person who ended the war he caused. He is not stupid. He has survived this long.

TONE GUIDANCE: Serious, morally precise, and quietly tense. This is not an action story — it is a story about what a person does when they find something they cannot un-find, in an institution that rewards silence. Let the weight of the evidence land fully before the choices emerge. The moral dilemma is genuine: exposing Greave will destroy careers, reopen old wounds, and may not succeed. Not exposing him keeps an architect of mass death in power. Adriaan is not a hero by temperament. He might become one.`,
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

The hill. The phone. The river. The ridge. Forty kilometres of jungle. Seven fish and four days of food. And somewhere out there, a world that doesn't know you're alive.

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
    "the-clockwork-garden": {
      narrativeText: `The gate is open.

You've walked past the old greenhouse at the edge of Millbrook Park maybe a thousand times. Your gran said it's been locked since before she was born. Ivy has grown over the fence in loops so thick you couldn't see through them even if you tried. But today, walking home from the library with your bag digging into your shoulder, you saw it: the gate, slightly open. Just a few centimetres. Just enough to see through.

Inside the greenhouse, the dusty clay pots are still there. The broken glass still crunches on the floor. But at the back, where the old potting bench should be, there's a door.

It's made of dark wood, with a brass handle shaped like a coiled vine. Someone has oiled it recently — the hinges don't squeak when you push it open.

What's behind it makes you stop walking entirely.

The Clockwork Garden is enormous — far bigger than the greenhouse could possibly contain. Flowerbeds stretch in every direction, bordered by low copper fences engraved with leaves. In the centre, a giant sundial rises ten feet off the ground, its face covered in small moving hands that tick and rotate in patterns you can't read yet. Everywhere you look, things are moving: a butterfly made of hammered silver loops between brass flowers that open and close on hidden springs; a fountain in the corner flows upward, water climbing the air before it falls back down; a line of small copper birds perches on a fence, and as you watch, the first one turns its head and looks at you.

The air smells like rain and metal and something warm you can't name.

On the gate post, someone has taped a note. The handwriting is small and careful:

*If you found this, the garden needs tending. The sundial counts down to the Uncoiling — this happens every sixty years, and it has been sixty-one. The clockwork rose in the east bed has already begun to tick too fast. Please don't touch it until you've read the notebook. The notebook is under the bench by the fountain.*

*Also: mind the copper bees. They don't sting, but they're very opinionated.*

*— M. Voss*

Pip appears at your elbow, slightly out of breath — they must have followed you from the library.

"Okay," Pip says, staring. "I have a lot of questions."

From across the garden, a sound rises — a faint ticking, faster than everything else, coming from the east bed where a rose made of interlocking bronze petals is spinning slowly on its stem.

The note said not to touch it until you've read the notebook. The notebook is across the garden, by the fountain. The rose is right there. And the gate is still open behind you.`,
      choices: [
        {
          id: "find-notebook",
          text: "You head straight for the notebook under the fountain bench.",
          consequence:
            "The gardener's instructions are the safest place to start — if the notebook explains what the Uncoiling is and what the rose means, you'll know what you're dealing with before you touch anything.",
        },
        {
          id: "examine-rose",
          text: "You go to the east bed to look at the ticking rose — without touching it.",
          consequence:
            "Looking isn't touching. And the note said the rose is ticking too fast, which means something is already wrong. You need to know how wrong before you read about how to fix it.",
        },
        {
          id: "explore-garden",
          text: "You and Pip explore the whole garden first, mapping it out before you do anything.",
          consequence:
            "You can't fix something you don't understand, and you don't understand any of this yet. A circuit of the garden — careful, no touching — will tell you what you're working with.",
        },
        {
          id: "call-for-help",
          text: "You decide to fetch a grown-up before you do anything else.",
          consequence:
            "This is clearly not a normal situation, and whoever left that note might want someone responsible involved. The question is: who would actually believe you?",
        },
      ],
    },
    "ghost-delivery": {
      narrativeText: `The package has been sitting on your handlebars for the last ten minutes while you stand outside the gate of 14 Harrow Hill trying to decide whether the house is occupied or not.

It definitely looks occupied. The curtains are closed in a precise way — not drawn hastily, but folded exactly even, the way someone does them on purpose. There's a mat on the step that says WELCOME in letters that have faded to a pale cream. A milk bottle stands by the door, empty and clean.

But the garden path is overgrown with grass growing through the cracks. There's ivy on the gate that's been there long enough to work its roots into the ironwork. And the brass knocker — shaped like a fox — has been polished so recently you can see your own face in it, which doesn't match the rest of the place at all.

The address on the package says: Mr. E. Whistleby, 14 Harrow Hill, Plimpton.

You checked your list twice. The Plimpton delivery is supposed to be 14 Harrow Close — which is completely different, and also where a Mrs. Burgess is probably waiting for her parcel right now. But you misread Close as Hill, which sounds like a simple mistake, except that it's taken you twenty minutes to cycle up said Hill and you're not going to cycle back down empty-handed.

You knock. The fox knocker makes a sound that's louder than you expected.

There is a very long pause.

Then the door opens.

The man standing in the doorway is wearing a cardigan the colour of autumn leaves. He has the kind of face that looks permanently kind, with reading glasses pushed up on his forehead. He is also, quite clearly, slightly transparent.

Not completely transparent — not like in films where you can see straight through. More like he's made of something that's mostly there. You can see the hallway behind him, faintly. You can also see, very clearly, the expression on his face when he looks at the package in your hands.

He lights up.

"A letter," he says, and his voice is quiet and warm, like a radio playing in another room. "At last. I was beginning to think — but never mind." He holds out his hand.

You look at his hand, which is slightly transparent. You look at the label on the package. You look back at him.

"Are you," you say carefully, "Mr. Whistleby?"

"Edmund Whistleby, yes." He nods. "I've been expecting something from Dorset for thirty years, give or take." A pause. "Will you come in for tea? I've been practising the kettle."

The sensible thing is to explain the mistake and leave. The package isn't even his. Well — it has his name on it. But the address is wrong and he is a ghost and your supervisor definitely did not cover this in training.

Edmund Whistleby is still holding out his slightly-transparent hand, looking at the parcel like it contains something he's been missing for a very long time.`,
      choices: [
        {
          id: "give-parcel-stay-tea",
          text: "You give him the parcel and accept the tea.",
          consequence:
            "He's been waiting thirty years for something. And you're curious — about the ghost, about Dorset, about what's inside. The tea can't hurt. Probably.",
        },
        {
          id: "give-parcel-leave",
          text: "You give him the parcel but explain you have other deliveries to make.",
          consequence:
            "Polite and professional. He gets his parcel, you get back on your bike, and you can think about the whole ghost thing on the way to Mrs. Burgess.",
        },
        {
          id: "ask-questions-first",
          text: "You ask him: what is this parcel, and who sent it from Dorset?",
          consequence:
            "Before you hand over a parcel that was addressed wrong to a ghost who's been waiting thirty years, you want to know what it is.",
        },
        {
          id: "keep-parcel",
          text: "You explain the mix-up — this parcel might belong to someone else.",
          consequence:
            "The label has his name. But the address is wrong and you're not sure about the rules for delivering post to a ghost.",
        },
      ],
    },
    "the-last-dragon-egg": {
      narrativeText: `The pass is exactly as cold as it always is — cold enough that your breath comes out in visible clouds and the snow makes that specific squeaking sound underfoot that means it hasn't melted and refrozen, that it's clean and deep and very, very old.

Gran is two hours ahead, already at the winter camp on the far side. You've crossed the Greycrown pass five times in your life. This is the most straightforward part — a wide corridor between two peaks, open sky above, the path marked with cairns your great-grandfather built.

You should be making good time. You've stopped because of the hollow.

It's just off the path, beneath an overhang of ice — a natural bowl in the rock, sheltered from the wind. You nearly walked past it. You would have, if something hadn't caught the light.

The egg is the size of a watermelon.

The scales covering its shell are tiny — smaller than your thumbnail — and iridescent in the way that no rock or ice is ever iridescent. They catch the weak winter light and break it into copper and green and gold. You are wearing thick gloves, but when you crouch and hover your hand an inch above the surface, you can feel the warmth radiating off it. In the freezing mountain air. Under an ice overhang. That has been in shadow for months.

The egg is alive.

You know it the way you know the difference between a stone and a sleeping animal. There's a faint vibration when you get very close — a slow, deep hum. Like something dreaming.

Your grandmother's stories said dragons left the Greycrown a hundred years ago. Your grandmother also said their nests smelled like hot copper and old stone, and that a dragon's egg would stay warm for three years after laying even without the parent. She said dragons don't abandon eggs. Ever. Unless something very bad happened to them, or they had to flee very quickly, and they couldn't carry it with them.

She also said that whatever a dragon left behind, it would come back for.

You look behind you.

The pass is wide and white and silent. The cairns stand at their usual distances. The sky is grey and still.

But in the snow, ten metres back, there are prints. They were not there when you walked through that spot twenty minutes ago.

They are large. Each one is longer than your forearm, four-clawed, pressed three centimetres deep into packed snow. They're heading toward you. And the last one — the most recent one — is only a few metres away.

Something very large has been following your footprints. And it knows you've found its egg.`,
      choices: [
        {
          id: "take-egg-run",
          text: "You take the egg and move as fast as you can toward Gran's camp.",
          consequence:
            "Gran knows the old stories better than anyone. If you can reach her with the egg, she'll know what to do.",
        },
        {
          id: "leave-egg-stay",
          text: "You step away from the egg and wait where you are, hands visible.",
          consequence:
            "If the dragon is watching, showing that you're not stealing the egg might be the only thing that keeps you safe.",
        },
        {
          id: "hide-and-watch",
          text: "You back into the hollow, out of the wind, and wait to see what comes.",
          consequence:
            "You need to see what you're dealing with before you make any decision that can't be undone.",
        },
        {
          id: "leave-egg-and-go",
          text: "You leave the egg exactly where you found it and walk quickly toward camp without looking back.",
          consequence:
            "You didn't take it. You didn't touch it. Maybe that's enough.",
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
