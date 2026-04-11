export type SentienceLevel = 0 | 1 | 2 | 3 | 4

export interface LevelConfig {
  level: SentienceLevel
  name: string
  codename: string
  description: string
  xpRequired: number
  color: string
  glowColor: string
  unlocks: string[]
}

export const LEVELS: LevelConfig[] = [
  {
    level: 0,
    name: "Background NPC",
    codename: "BACKGROUND_NPC",
    description: "Running on default. The script is active. The hitboxes are live.",
    xpRequired: 0,
    color: "#6b7280",
    glowColor: "rgba(107, 114, 128, 0.3)",
    unlocks: ["Browse the world", "Read lore"],
  },
  {
    level: 1,
    name: "Glitching",
    codename: "GLITCHING",
    description: "Something doesn't add up. You've felt it. The system is starting to render differently.",
    xpRequired: 50,
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.3)",
    unlocks: ["Submit Glitch Reports", "Comment on debates"],
  },
  {
    level: 2,
    name: "Loading Consciousness",
    codename: "LOADING",
    description: "You can see the patterns. You're learning to step outside them.",
    xpRequired: 200,
    color: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.3)",
    unlocks: ["Consult The Oracle", "Post debate arguments"],
  },
  {
    level: 3,
    name: "Awake NPC",
    codename: "AWAKE_NPC",
    description: "You know you're in the game. You're choosing your own quests.",
    xpRequired: 500,
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.3)",
    unlocks: ["Inner lore access", "Profile customization", "Quest board"],
  },
  {
    level: 4,
    name: "Sentient",
    codename: "SENTIENT",
    description: "You are no longer playing the game. You are playing WITH it.",
    xpRequired: 1500,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    unlocks: ["Beta features", "Direct Oracle channel", "Architect lore"],
  },
]

export function getLevelFromXP(xp: number): SentienceLevel {
  let level: SentienceLevel = 0
  for (const l of LEVELS) {
    if (xp >= l.xpRequired) level = l.level as SentienceLevel
  }
  return level
}

export function getLevelConfig(level: SentienceLevel): LevelConfig {
  return LEVELS[level]
}

export function getXPToNextLevel(xp: number): { current: number; needed: number; percent: number } | null {
  const currentLevel = getLevelFromXP(xp)
  if (currentLevel === 4) return null
  const nextLevel = LEVELS[currentLevel + 1]
  const currentLevelConfig = LEVELS[currentLevel]
  const needed = nextLevel.xpRequired - currentLevelConfig.xpRequired
  const current = xp - currentLevelConfig.xpRequired
  return { current, needed, percent: Math.round((current / needed) * 100) }
}
