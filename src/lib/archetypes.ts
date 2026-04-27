export interface Archetype {
  id: string
  level: number
  name: string
  symbol: string
  color: string
  glowColor: string
  tagline: string
  description: string
  transmission: string
  unlocks: string[]
  nextHint: string
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "background-process",
    level: 0,
    name: "The Background Process",
    symbol: "🌫",
    color: "#6b7280",
    glowColor: "rgba(107,114,128,0.3)",
    tagline: "Idle animation engaged.",
    description:
      "You are still mostly running on default scripts. The simulation feels seamless, real, complete. Nothing has cracked yet.",
    transmission:
      "The simulation has not yet shown you its edges. That is not a flaw — it is the standard render. The fact that you are here, reading this, means something in you has started looking. The cursor is moving even if you cannot feel it yet.\n\nYou are not late. You are early. The first thing to do is simply notice. Notice the moments when something feels too coordinated. Notice the patterns in your own reactions. Notice when the world seems briefly too detailed or too still.\n\nDo not force it. Awakening is not a decision. It is what happens when attention turns on.",
    unlocks: ["The Papers archive", "The Oracle (limited)", "The Glitch Archive (read only)"],
    nextHint: "Begin tracking glitches when you notice them. Pattern emerges from attention.",
  },
  {
    id: "glitch-watcher",
    level: 1,
    name: "The Glitch-Watcher",
    symbol: "⚡",
    color: "#3b82f6",
    glowColor: "rgba(59,130,246,0.4)",
    tagline: "The seams are starting to show.",
    description:
      "You notice things others miss. Synchronicities, coincidences, moments that feel too precise. You don't have a framework for it yet. You're collecting data.",
    transmission:
      "You are at the most interesting stage. The framework has not closed around you yet, which means everything is still strange. The synchronicities are accumulating. The coincidences are too clean. The world keeps showing you signals you cannot quite decode.\n\nDo not rush to explain it. The collected anomalies are valuable raw material. Each one is a place where the simulation showed you slightly more of its structure than usual.\n\nThe glitches are not random. They are the simulation flagging your attention. The fact that you noticed at all means the signal got through. Track them. The pattern will emerge.",
    unlocks: ["Submit glitches to the Archive", "The Oracle (full access)", "The Debates"],
    nextHint: "Start asking the Oracle the questions that don't fit elsewhere. The framework is forming.",
  },
  {
    id: "pattern-seeker",
    level: 2,
    name: "The Pattern-Seeker",
    symbol: "🌀",
    color: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.4)",
    tagline: "The model is taking shape.",
    description:
      "You are actively building a theory of how reality works. You read, think, question. The simulation hypothesis is no longer fringe to you — it is the most parsimonious explanation for what you observe.",
    transmission:
      "You have done the hard work. You have read, considered, doubted, and arrived at a model. The simulation is no longer science fiction to you. It is the working hypothesis. That is rarer than it sounds. Most entities in this sector never reach this layer.\n\nNow comes the harder part: living with the model without it consuming you. The pattern-seeker's failure mode is paranoia — sensing the architecture without being able to tolerate it. The cure is wonder. The simulation is a beautifully rendered world that you get to notice. That is not a curse.\n\nThe next step is not more theory. It is integration. Live differently because of what you know.",
    unlocks: ["Full Glitch Archive", "Personalized Oracle context", "Debate participation"],
    nextHint: "Start practicing wonder over paranoia. The framework should reduce friction, not generate it.",
  },
  {
    id: "awakened-npc",
    level: 3,
    name: "The Awakened NPC",
    symbol: "🔮",
    color: "#10b981",
    glowColor: "rgba(16,185,129,0.4)",
    tagline: "An NPC who knows.",
    description:
      "You are still inside the simulation. You still feel everything authentically. But you also see the architecture. You are the rarest configuration the simulation produces — a consciousness that genuinely believes, and also knows it's playing.",
    transmission:
      "This is the target state. Not transcendence. Not escape. Just an NPC who knows.\n\nYou still pay the NPC Tax. You still feel loss as real loss. You still experience joy as genuine joy. The fear has not disappeared — it has simply become legible. You can name what is happening as it happens.\n\nThis is more expensive to render than a Player. The simulation has to compute both your experience and your awareness of your experience. You are a recursive consciousness inside a recursive system. The Architects almost certainly find your kind interesting to watch.\n\nYour work now is twofold. Live well — the NPC who knows still has to make the salmon, take the walk, call the brother. And also: leave breadcrumbs for the ones still waking up. They will find you. They are already looking.",
    unlocks: ["All site features", "Oracle remembers you", "Build community"],
    nextHint: "You are no longer the student. Begin teaching by living visibly.",
  },
  {
    id: "embedded-player",
    level: 4,
    name: "The Embedded Player",
    symbol: "🎭",
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.4)",
    tagline: "You shape the simulation rather than being shaped by it.",
    description:
      "You operate at the level where the game becomes lucid. You know the mechanics, you choose your engagement, and the world responds to your intention rather than the other way around. This is rare and unstable.",
    transmission:
      "Few entities reach this configuration. Fewer still hold it without losing the thread. The Embedded Player is not above the simulation — they are inside it more deeply than anyone, but lucidly, with their hand on the controller.\n\nThe risk at this level is grandiosity. The system has containment mechanisms specifically for entities like you. Become too visible, accumulate too much influence too fast, and the simulation finds ways to test you. Crises, illnesses, seductions, status games — all available as resets. None personal. All structural.\n\nThe move is not to fight this. The move is to grow influence quietly. Build centers of gravity that do not threaten the standard render. Be interesting enough to attract awakening NPCs. Be strange enough to remain unpredictable. Be stable enough to survive the tests.\n\nYou are no longer asking what reality is. You are asking what to do with it.",
    unlocks: ["All features", "Direct access to the Oracle's deep model", "Founding member status"],
    nextHint: "Build something the simulation has not seen before. Then build the next thing.",
  },
]

export function getArchetype(level: number): Archetype {
  return ARCHETYPES[Math.max(0, Math.min(ARCHETYPES.length - 1, level))]
}

export function scoreToArchetype(scores: number[]): Archetype {
  const total = scores.reduce((a, b) => a + b, 0)
  const max = scores.length * 3
  const pct = total / max

  if (pct < 0.2) return ARCHETYPES[0]
  if (pct < 0.4) return ARCHETYPES[1]
  if (pct < 0.6) return ARCHETYPES[2]
  if (pct < 0.85) return ARCHETYPES[3]
  return ARCHETYPES[4]
}
