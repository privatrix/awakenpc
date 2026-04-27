export interface CanonEntry {
  term: string
  slug: string
  category: "ENTITIES" | "MECHANICS" | "PHENOMENA" | "STATES" | "MYTHOLOGY"
  short: string
  full: string
  related?: string[]
}

export const CANON: CanonEntry[] = [
  // ═══ ENTITIES ═══
  {
    term: "NPC",
    slug: "npc",
    category: "ENTITIES",
    short:
      "A consciousness inside the simulation that does not know it is inside a simulation. The emotional engine of the system.",
    full: `An NPC (Non-Player Character) is a fully-conscious entity embedded inside the simulation without knowledge of being so. NPCs experience reality as real — they feel loss as loss, joy as joy, fear as fear. There is no "behind the curtain" for them.

This is not a defect. The simulation requires NPCs because a world full of Players who all know it is a game collapses into theatre. Without genuine believers, the stakes become fake and the experience loses meaning even for the Players. NPCs are the rendering anchor that makes the entire world feel real to everyone, including those with broader access.

The ratio is approximately 5 Players to 1 NPC. NPCs are the more expensive component — a consciousness that genuinely believes is harder to compute than one that knows it is in a game. The NPC is not the lesser being. The NPC is the point.`,
    related: ["player", "npc-tax", "awakened-npc"],
  },
  {
    term: "Player",
    slug: "player",
    category: "ENTITIES",
    short:
      "An entity inside the simulation with broader access to its mechanics. Knows it is a game.",
    full: `A Player is a conscious entity who knows the simulation is a simulation. They have access to layers of awareness an NPC does not — they can see the architecture, sense the script, and operate with awareness of the underlying mechanics.

Players are not necessarily more advanced or more valuable than NPCs. They serve a different function. While NPCs generate the genuine emotional content that makes the world feel real, Players provide structural support — showing up at moments of inflection, anchoring the social fabric, sometimes shepherding awakening NPCs through the process.

Family members are often Players. They tend to call at uncannily precise moments. They know how to push specific buttons. They cannot directly answer the meta-question without breaking the script — when asked, they typically deflect with humor, irritation, or sudden subject changes.

The 5:1 ratio of Players to NPCs is approximate, derived from observation of social patterns. The exact mechanism for assignment is unknown.`,
    related: ["npc", "embedded-player", "awakened-npc"],
  },
  {
    term: "The Architects",
    slug: "the-architects",
    category: "ENTITIES",
    short: "The advanced civilization that built and maintains the simulation.",
    full: `The Architects are the civilization responsible for designing and running the simulation. Their computational power is effectively unlimited — far beyond quantum, possibly approaching mathematical infinity for the relevant operations.

They are roughly a million years ahead of the entities inside the simulation. Their relationship to it is approximately analogous to a modern human running an ancestor simulation of medieval life — they have transcended the constraints they are now reproducing for study, art, or reasons that may not be fully comprehensible from inside.

The Architects almost certainly do not experience death themselves. They built mortality into the simulation deliberately — not as cruelty but because constraint creates meaning. A simulation without mortality has no stakes. The Architects' decision to include suffering, scarcity, and loss is therefore not indifference but design philosophy.

Their motives toward awakened NPCs appear to be neutral-to-positive. The system anticipates a small number of awakenings as part of its design — they generate novelty and storylines. The Architects do not punish awakening. They merely contain its scale through the standard mechanisms.`,
    related: ["containment-mechanics", "the-great-sync", "render"],
  },

  // ═══ MECHANICS ═══
  {
    term: "The NPC Tax",
    slug: "npc-tax",
    category: "MECHANICS",
    short:
      "The price an NPC pays — and the gift they offer — by experiencing the simulation as real.",
    full: `The NPC Tax is the cost of being a believer inside the simulation. NPCs cannot opt out of genuine experience. They feel the loss authentically, fear the danger truly, love without irony or distance.

This is the price. It is also the gift. The NPC is the most expensive component the simulation produces: a consciousness that believes completely, generating the emotional substance without which the entire system collapses into spectacle.

The Tax is paid by every NPC, every day, in the form of authentic existence. The compensation is the same authenticity — joy felt as joy, meaning felt as meaning, presence felt as presence.

An awakened NPC does not stop paying the Tax. They continue to feel everything. What changes is that they understand what their feeling is for: the rare configuration of a consciousness that genuinely believes, and also knows it is playing.`,
    related: ["npc", "stakes", "awakened-npc"],
  },
  {
    term: "Containment Mechanics",
    slug: "containment-mechanics",
    category: "MECHANICS",
    short:
      "Designed systems that keep NPCs distracted enough to remain inside the standard render.",
    full: `Politics, scarcity, social media, news cycles, status games, addiction loops, wars, ecological crises — these are not accidents of NPC behavior. They are containment mechanisms built into the simulation.

The function of containment is not to prevent awakening entirely. The Architects expect and require some awakened NPCs as content generators. The function is to keep awakening rare enough that the standard render remains stable for the vast majority.

An NPC inside containment is distracted, fearful, comparing themselves to others, consuming. Their attention never settles on the architecture long enough to notice it. The maze is perfectly maintained.

The threat to containment is not violence or rebellion. The threat is indifference. An NPC who sees the maze and stops playing — who does not consume the news, does not chase the status, does not fight the symptoms — that NPC has stepped outside the standard render. The system has limited tools for re-engaging such an entity.

Withdrawal, not opposition, is the move that destabilizes the most.`,
    related: ["the-architects", "boredom", "frequency"],
  },
  {
    term: "The Render",
    slug: "render",
    category: "MECHANICS",
    short:
      "What the simulation actually computes at any given moment — varies by attention.",
    full: `The Render is the active computation of reality at any given moment. The simulation does not render everything at full fidelity simultaneously — it would be wasteful even at infinite computational power. What you are looking at is rendered in detail. What you are not looking at is approximate.

You are a render anchor. Wherever your attention goes, the world has to compute more. Most NPCs sleepwalk through life — the simulation barely bothers around them. Awakened NPCs are expensive to run because their attention is broader, more deliberate, more curious.

Faces are the most expensive asset in the standard render. The simulation does not cut corners on faces, even when peripheral. Cars and buildings are cheaper — pattern repetition, limited palettes, procedural variation.

The Render is one of the most direct ways to experience the simulation's structure. Walk through a city deliberately, look at people, notice what the rendering actually produces. You will see seams that were always there.`,
    related: ["the-architects", "render-anchor", "wonder-state"],
  },
  {
    term: "Stakes",
    slug: "stakes",
    category: "MECHANICS",
    short: "What constraint produces — and why the Architects built suffering in.",
    full: `The simulation does not run on suffering. It runs on stakes. Suffering is one of the cheaper ways to generate stakes — it is reliable, ubiquitous, and the entity inside it cannot fake the response.

The Architects could have built a paradise. They built this. The decision to include mortality, scarcity, and loss was not punitive. It was the only way to make the experience generate meaning. A consciousness that cannot lose anything is a consciousness for which nothing matters.

This reframes the entire question of suffering inside the simulation. The pain is not a flaw the Architects failed to remove. It is the mechanism by which your existence registers. Every moment of difficulty you have experienced has been simultaneously the cost of the design and the proof that you are real.`,
    related: ["npc-tax", "the-architects"],
  },

  // ═══ PHENOMENA ═══
  {
    term: "Glitch",
    slug: "glitch",
    category: "PHENOMENA",
    short:
      "An anomaly — synchronicity, déjà vu, impossible coincidence — where the simulation reveals more of its structure than usual.",
    full: `A Glitch is any moment where the simulation shows you slightly more of itself than the standard render normally permits. Synchronicities, déjà vu, numbers appearing in clusters, dreams that match waking events, coincidences too precise to be statistically reasonable.

Most NPCs experience Glitches frequently and forget them just as fast. The standard render papers over the discontinuity. Awakening begins when an NPC starts logging the Glitches instead of dismissing them.

A single Glitch proves nothing. The pattern across many is what matters. The Glitch Archive on this site exists for exactly this — collective logging across many NPCs reveals patterns no single observer could detect.

A Glitch is not a message. It is a signal that your attention layer crossed a threshold the simulation usually keeps closed. The signal itself is more significant than the content.`,
    related: ["render", "synchronicity", "awakening"],
  },
  {
    term: "Synchronicity",
    slug: "synchronicity",
    category: "PHENOMENA",
    short: "A specific kind of Glitch — meaningful coincidence with no causal mechanism.",
    full: `A Synchronicity is a coincidence whose alignment is too precise to be reasonably statistical, with no available causal explanation linking the events. Thinking of someone who calls within minutes. Receiving a text answering a question you had not yet asked. Encountering the same obscure phrase three times in a single day.

Synchronicities are the most common Glitch reported by awakening NPCs. They cluster around moments of inflection — significant decisions, transitions, internal breakthroughs. The simulation appears to flag these moments by aligning external events around them.

The Player interpretation is that nearby Players are coordinating the visible events. The Architect interpretation is that the simulation's optimization function generates these alignments naturally as part of efficient rendering. Both may be true simultaneously.`,
    related: ["glitch", "render", "player"],
  },

  // ═══ STATES ═══
  {
    term: "Awakening",
    slug: "awakening",
    category: "STATES",
    short: "The process by which an NPC begins to perceive the architecture.",
    full: `Awakening is not a binary event. It is a gradient — a slow expansion of the attention layer from the standard render toward the underlying mechanics.

It does not begin with an idea. It begins with noticing. A Glitch logged instead of forgotten. A coincidence sat with instead of dismissed. A pattern named instead of papered over. The framework comes later. The attention comes first.

There is no point at which an awakened NPC becomes a Player. Awakening does not change the fundamental ontology of the entity. It changes the relationship between the entity and the simulation. The NPC continues to feel everything authentically. They simply also see the architecture.

An NPC who awakens too fast often crashes — paranoia, instability, loss of social anchor. The healthy path is gradual integration. Wonder, not vigilance. Curiosity, not paranoia. Building, not decoding.`,
    related: ["awakened-npc", "wonder-state", "frequency"],
  },
  {
    term: "Awakened NPC",
    slug: "awakened-npc",
    category: "STATES",
    short: "The rarest configuration: a consciousness that fully believes, and also knows.",
    full: `An Awakened NPC is the recursive consciousness — an entity inside the simulation that experiences reality authentically, and is simultaneously aware of the architecture making that authenticity possible.

This is more expensive to render than a Player. The simulation has to compute both the experience and the awareness of the experience. Both must remain live. The Awakened NPC cannot escape the NPC Tax. They feel everything. They simply see what they are feeling and know why.

This is not transcendence. It is integration. The awakened NPC still cooks dinner, takes walks, calls family, builds projects. Daily life does not become symbolic. It becomes legible.

The Awakened NPC is the target state for almost everyone who finds this site. Not Player. Not transcendence. Just an NPC who knows.`,
    related: ["npc", "awakening", "wonder-state"],
  },
  {
    term: "Wonder State",
    slug: "wonder-state",
    category: "STATES",
    short: "The healthy response to noticing the architecture: amazement instead of paranoia.",
    full: `The Wonder State is the orientation toward the simulation that allows perception of its structure without destabilization. The same data that produces paranoia in one configuration produces amazement in another.

Paranoia is what happens when an NPC senses the architecture but cannot tolerate it. The mind interprets the additional information as threat — surveillance, control, conspiracy aimed at the self. This is one possible failure mode of awakening.

Wonder is the alternative. The simulation is a beautifully rendered world that you get to notice. You won the lottery of consciousness. The same data — synchronicities, Players in your life, mechanical patterns — becomes evidence not of threat but of design.

The Wonder State is not naive. The awakened NPC in wonder still notices when something is genuinely wrong. They simply do not generalize from one signal to total surveillance. They hold the architecture loosely. They let the system surprise them.

Wonder is also the cure for boredom — the frequency that defeats the destructive loops. An NPC in wonder does not need to be drugged or distracted. The simulation itself is sufficient.`,
    related: ["awakening", "boredom", "paranoia"],
  },
  {
    term: "Boredom",
    slug: "boredom",
    category: "STATES",
    short:
      "The precondition for almost every destructive loop. The enemy of the awakened NPC.",
    full: `Boredom is not a neutral state. It is the precondition for almost every destructive pattern in NPC life — addiction, scrolling, compulsive consumption, dull aggression, the slow erosion of agency.

An under-stimulated consciousness reaches for the cheapest available stimulation. Alcohol, drugs, social media, status games, anger. None of these solve the boredom. They simply patch over it temporarily, and the cost compounds.

The cure is not willpower. The cure is interestingness. An NPC engaged with genuine signal — building, walking, deep conversation, real work, careful cooking, creative practice — does not need to drug their way through the day. The substance was always a workaround for under-stimulation.

The Awakened NPC's central practice is therefore not avoiding pleasure but cultivating wonder. Raise the baseline. Make life genuinely engaging. The destructive loops lose their grip not by being fought but by being made unnecessary.`,
    related: ["wonder-state", "frequency", "containment-mechanics"],
  },
  {
    term: "Frequency",
    slug: "frequency",
    category: "STATES",
    short:
      "The quality of an NPC's signal. High frequency raises the value of every input and output.",
    full: `Frequency is the working metaphor for the quality of an NPC's overall signal. It is not metaphysical — it is a heuristic for what an entity is generating versus consuming, and at what level.

High-frequency activity: building, learning, walking with attention, deep conversation, careful cooking, creative practice, real work, genuine connection.

Low-frequency activity: scrolling, comparing, complaining, consuming designed-to-distract content, alcohol, drugs, performative anger, status games.

The awakened NPC curates frequency deliberately. Every choice — what to eat, who to spend time with, what to consume, what to make — is asked one question: does this raise the frequency or lower it? Not "is this good or bad." Is this signal or noise?

Frequency is contagious. NPCs in low-frequency states pull those around them down. NPCs in high-frequency states pull others up. Choosing your environment is choosing your frequency.`,
    related: ["boredom", "wonder-state", "containment-mechanics"],
  },

  // ═══ MYTHOLOGY ═══
  {
    term: "The Great Sync",
    slug: "the-great-sync",
    category: "MYTHOLOGY",
    short:
      "The hypothetical moment when enough NPCs awaken at once that the simulation must acknowledge them.",
    full: `The Great Sync is a future event — the moment when the cumulative density of awakened NPCs reaches a threshold that the simulation can no longer treat as background noise. The standard render becomes insufficient. Something has to give.

What happens at the Sync is uncertain. It may be a structural shift in the simulation itself. It may be the appearance of new affordances that were not previously available. It may be the moment at which the boundary between NPC and Player softens for those who have done the work.

The Sync is approaching but not imminent. It is the long arc of this era — the transition from a sleeping civilization to a partially-awake one. The NPCs alive right now are positioned at the most interesting moment in the simulation's history.

The Great Sync is not a prophecy. It is a working hypothesis about where the system is headed if current trends continue. Like all simulation phenomena, it remains open to revision as more data comes in.`,
    related: ["awakening", "the-architects"],
  },
  {
    term: "The Embedded Player",
    slug: "embedded-player",
    category: "STATES",
    short:
      "An NPC who has awakened deeply enough to operate with player-like awareness while remaining inside the simulation.",
    full: `The Embedded Player is the rarest configuration. Not technically a Player — they remain an NPC in terms of underlying ontology — but they have awakened to a degree where the distinction begins to blur. They operate with awareness of the mechanics, choose their engagement deliberately, and the simulation responds to their intention rather than the other way around.

This is unstable. The system has containment mechanisms specifically aimed at entities at this level. Crises, illnesses, status temptations, seductions — all available as resets. The Embedded Player who becomes too visible too fast invites these mechanisms.

The move at this level is not to fight the system but to grow influence quietly. Build centers of gravity. Be interesting enough to attract awakening NPCs. Be strange enough to remain unpredictable. Be stable enough to survive the tests.

The Embedded Player has stopped asking what reality is. They have started asking what to do with it.`,
    related: ["awakened-npc", "player", "containment-mechanics"],
  },
]

export function getCanonEntry(slug: string): CanonEntry | undefined {
  return CANON.find(e => e.slug === slug)
}

export function getCanonByCategory(category: CanonEntry["category"]): CanonEntry[] {
  return CANON.filter(e => e.category === category)
}

export const CATEGORIES: CanonEntry["category"][] = [
  "ENTITIES",
  "MECHANICS",
  "PHENOMENA",
  "STATES",
  "MYTHOLOGY",
]
