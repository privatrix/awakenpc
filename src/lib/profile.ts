"use client"

import { ARCHETYPES, type Archetype } from "./archetypes"

const STORAGE_KEY = "awakenpc:profile:v1"

export interface LocalProfile {
  archetypeId: string
  level: number
  takenAt: string  // ISO date
  scores: number[]
  glitchesLogged: number
  oracleSessions: number
  papersRead: string[]  // slugs
}

const DEFAULT: LocalProfile = {
  archetypeId: "background-process",
  level: 0,
  takenAt: "",
  scores: [],
  glitchesLogged: 0,
  oracleSessions: 0,
  papersRead: [],
}

export function getProfile(): LocalProfile | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as LocalProfile
  } catch {
    return null
  }
}

export function saveProfile(profile: Partial<LocalProfile>): LocalProfile {
  const current = getProfile() ?? DEFAULT
  const merged: LocalProfile = { ...current, ...profile }
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  }
  return merged
}

export function clearProfile() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function getArchetypeFromProfile(profile: LocalProfile | null): Archetype {
  if (!profile) return ARCHETYPES[0]
  const found = ARCHETYPES.find(a => a.id === profile.archetypeId)
  return found ?? ARCHETYPES[0]
}

export function recordPaperRead(slug: string) {
  const profile = getProfile()
  if (!profile) return
  if (profile.papersRead.includes(slug)) return
  saveProfile({ papersRead: [...profile.papersRead, slug] })
}

export function incrementOracleSessions() {
  const profile = getProfile()
  if (!profile) return
  saveProfile({ oracleSessions: profile.oracleSessions + 1 })
}

export function incrementGlitches() {
  const profile = getProfile()
  if (!profile) return
  saveProfile({ glitchesLogged: profile.glitchesLogged + 1 })
}
