"use client"

const KEY = "awakenpc:fp:v1"

export function getFingerprint(): string {
  if (typeof window === "undefined") return ""
  let fp = localStorage.getItem(KEY)
  if (!fp) {
    fp = crypto.randomUUID()
    localStorage.setItem(KEY, fp)
  }
  return fp
}

const VOTES_KEY = "awakenpc:votes:v1"

interface VoteCache {
  glitches: number[]
  debates: Record<number, "FOR" | "AGAINST">
}

function readVotes(): VoteCache {
  if (typeof window === "undefined") return { glitches: [], debates: {} }
  try {
    const raw = localStorage.getItem(VOTES_KEY)
    if (!raw) return { glitches: [], debates: {} }
    return JSON.parse(raw)
  } catch {
    return { glitches: [], debates: {} }
  }
}

function writeVotes(v: VoteCache) {
  if (typeof window === "undefined") return
  localStorage.setItem(VOTES_KEY, JSON.stringify(v))
}

export function hasVotedGlitch(id: number): boolean {
  return readVotes().glitches.includes(id)
}
export function toggleGlitchVote(id: number, voted: boolean) {
  const v = readVotes()
  if (voted) {
    if (!v.glitches.includes(id)) v.glitches.push(id)
  } else {
    v.glitches = v.glitches.filter(x => x !== id)
  }
  writeVotes(v)
}

export function getDebateVote(id: number): "FOR" | "AGAINST" | null {
  return readVotes().debates[id] ?? null
}
export function setDebateVote(id: number, side: "FOR" | "AGAINST") {
  const v = readVotes()
  v.debates[id] = side
  writeVotes(v)
}
