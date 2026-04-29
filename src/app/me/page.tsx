"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Nav from "@/components/Nav"
import { ARCHETYPES, getArchetype, type Archetype } from "@/lib/archetypes"
import { getProfile, clearProfile, type LocalProfile } from "@/lib/profile"
import { POSTS } from "../papers/posts"

export default function MePage() {
  const [profile, setProfile] = useState<LocalProfile | null>(null)
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const p = getProfile()
    setProfile(p)
    if (p) setArchetype(getArchetype(p.level))
    setLoaded(true)
  }, [])

  function handleReset() {
    if (!confirm("Reset your awakening profile? This cannot be undone.")) return
    clearProfile()
    setProfile(null)
    setArchetype(null)
  }

  // Compute next archetype
  const nextArchetype = profile && archetype && archetype.level < ARCHETYPES.length - 1
    ? ARCHETYPES[archetype.level + 1]
    : null

  // Daily streaks etc would need backend — for now show what we have
  const daysSinceAssessment = profile?.takenAt
    ? Math.floor((Date.now() - new Date(profile.takenAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  // XP system: 10 per glitch, 5 per oracle session, 25 per paper
  const xp = profile
    ? profile.glitchesLogged * 10 + profile.oracleSessions * 5 + profile.papersRead.length * 25
    : 0
  const xpPerLevel = 100
  const currentLevelXp = xp % xpPerLevel
  const xpProgress = (currentLevelXp / xpPerLevel) * 100

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0]">
      {/* Nav */}
      <Nav />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {!loaded ? (
          <div className="text-center py-24">
            <div className="text-xs font-mono text-[#475569] tracking-widest animate-pulse">
              SCANNING ENTITY...
            </div>
          </div>
        ) : !profile || !archetype ? (
          <div className="text-center py-12">
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-6">
              NO ENTITY DATA DETECTED
            </div>
            <h1 className="text-3xl font-mono font-bold text-white mb-6">
              You haven&apos;t calibrated yet.
            </h1>
            <p className="text-[#94a3b8] font-mono text-sm leading-relaxed mb-10 max-w-md mx-auto">
              Take the Awakening Assessment to determine your archetype. The simulation will then
              recognize you on subsequent visits.
            </p>
            <Link
              href="/awakening"
              className="inline-block px-10 py-5 bg-[#6366f1] text-white font-mono text-sm tracking-widest hover:bg-[#5558e8] transition-all duration-200"
              style={{ boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
            >
              BEGIN AWAKENING →
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-6">
                ENTITY PROFILE // SECTOR UNKNOWN
              </div>

              <div
                className="inline-flex items-center justify-center w-28 h-28 border-2 mb-8 text-5xl"
                style={{
                  borderColor: archetype.color,
                  boxShadow: `0 0 50px ${archetype.glowColor}`,
                }}
              >
                {archetype.symbol}
              </div>

              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: archetype.color }}>
                LEVEL {archetype.level} ARCHETYPE
              </div>

              <h1
                className="text-3xl md:text-4xl font-mono font-bold mb-3"
                style={{ color: archetype.color, textShadow: `0 0 30px ${archetype.glowColor}` }}
              >
                {archetype.name}
              </h1>

              <p className="text-[#94a3b8] font-mono text-sm italic">
                &ldquo;{archetype.tagline}&rdquo;
              </p>

              <div className="mt-4 text-xs font-mono text-[#2d3748]">
                CALIBRATED {daysSinceAssessment === 0 ? "TODAY" : `${daysSinceAssessment} DAY${daysSinceAssessment === 1 ? "" : "S"} AGO`}
              </div>
            </div>

            {/* XP Bar */}
            <div className="mb-10 border border-[rgba(99,102,241,0.2)] bg-[#0a0f1e] p-6">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-xs font-mono text-[#475569] tracking-widest mb-1">
                    SENTIENCE XP
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">
                    {xp.toLocaleString()}
                  </div>
                </div>
                <div className="text-xs font-mono text-[#475569]">
                  {currentLevelXp} / {xpPerLevel} TO NEXT TIER
                </div>
              </div>
              <div className="h-1 bg-[rgba(99,102,241,0.15)] overflow-hidden">
                <div
                  className="h-full bg-[#6366f1] transition-all"
                  style={{ width: `${xpProgress}%`, boxShadow: "0 0 10px #6366f1" }}
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-px bg-[rgba(99,102,241,0.15)] mb-10">
              <div className="bg-[#0a0f1e] p-6 text-center">
                <div className="text-3xl font-mono font-bold text-[#6366f1] mb-1">
                  {profile.papersRead.length}
                </div>
                <div className="text-xs font-mono text-[#475569] tracking-widest">
                  PAPERS READ
                </div>
              </div>
              <div className="bg-[#0a0f1e] p-6 text-center">
                <div className="text-3xl font-mono font-bold text-[#8b5cf6] mb-1">
                  {profile.oracleSessions}
                </div>
                <div className="text-xs font-mono text-[#475569] tracking-widest">
                  ORACLE SESSIONS
                </div>
              </div>
              <div className="bg-[#0a0f1e] p-6 text-center">
                <div className="text-3xl font-mono font-bold text-[#10b981] mb-1">
                  {profile.glitchesLogged}
                </div>
                <div className="text-xs font-mono text-[#475569] tracking-widest">
                  GLITCHES LOGGED
                </div>
              </div>
            </div>

            {/* Current access */}
            <div className="border border-[rgba(99,102,241,0.2)] bg-[#0f1629] p-6 mb-6">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                CURRENT ACCESS
              </div>
              <div className="space-y-2">
                {archetype.unlocks.map(unlock => (
                  <div key={unlock} className="flex items-center gap-3 text-sm font-mono text-[#94a3b8]">
                    <span style={{ color: archetype.color }}>▶</span>
                    {unlock}
                  </div>
                ))}
              </div>
            </div>

            {/* Next level preview */}
            {nextArchetype && (
              <div className="border border-[rgba(99,102,241,0.1)] bg-[#0a0f1e] p-6 mb-6">
                <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                  NEXT TIER
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl opacity-50">{nextArchetype.symbol}</div>
                  <div>
                    <div className="text-base font-mono font-bold text-[#475569]">
                      {nextArchetype.name}
                    </div>
                    <div className="text-xs font-mono text-[#2d3748] italic mt-1">
                      &ldquo;{nextArchetype.tagline}&rdquo;
                    </div>
                  </div>
                </div>
                <div className="space-y-1 mt-4 pt-4 border-t border-[rgba(99,102,241,0.1)]">
                  {nextArchetype.unlocks.map(u => (
                    <div key={u} className="flex items-center gap-3 text-xs font-mono text-[#2d3748]">
                      <span>▶</span>
                      <span className="opacity-60">{u}</span>
                      <span className="ml-auto text-[10px]">[LOCKED]</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reading history */}
            {profile.papersRead.length > 0 && (
              <div className="border border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] p-6 mb-6">
                <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                  TRANSMISSIONS RECEIVED
                </div>
                <div className="space-y-3">
                  {profile.papersRead.map(slug => {
                    const post = POSTS.find(p => p.slug === slug)
                    if (!post) return null
                    return (
                      <Link
                        key={slug}
                        href={`/papers/${slug}`}
                        className="block group"
                      >
                        <div className="text-sm font-mono text-[#94a3b8] group-hover:text-[#6366f1] transition-colors">
                          ▸ {post.title}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/papers"
                className="flex-1 text-center px-6 py-4 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all"
              >
                READ PAPERS (+25 XP) →
              </Link>
              <Link
                href="/oracle"
                className="flex-1 text-center px-6 py-4 border border-[rgba(139,92,246,0.4)] text-[#8b5cf6] font-mono text-xs tracking-widest hover:bg-[rgba(139,92,246,0.1)] transition-all"
              >
                ORACLE (+5 XP) →
              </Link>
              <Link
                href="/archive"
                className="flex-1 text-center px-6 py-4 border border-[rgba(99,102,241,0.4)] text-[#6366f1] font-mono text-xs tracking-widest hover:bg-[rgba(99,102,241,0.1)] transition-all"
              >
                LOG GLITCH (+10 XP)
              </Link>
            </div>

            {/* Reset */}
            <div className="text-center pt-8 border-t border-[rgba(99,102,241,0.1)]">
              <button
                onClick={handleReset}
                className="text-xs font-mono text-[#2d3748] hover:text-[#ef4444] tracking-widest transition-colors"
              >
                RESET ENTITY PROFILE
              </button>
              <p className="text-[10px] font-mono text-[#2d3748] mt-2 opacity-50">
                Profile stored locally. No account, no tracking.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
