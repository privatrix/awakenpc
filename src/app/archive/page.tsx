"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Nav from "@/components/Nav"
import { getFingerprint, hasVotedGlitch, toggleGlitchVote } from "@/lib/fingerprint"
import { getProfile, incrementGlitches } from "@/lib/profile"

const CATEGORIES = ["ALL", "SYNCHRONICITY", "DÉJÀ VU", "ANOMALY", "DREAM", "PATTERN", "CONTACT"]

const CATEGORY_COLORS: Record<string, string> = {
  SYNCHRONICITY: "#6366f1",
  "DÉJÀ VU": "#8b5cf6",
  ANOMALY: "#ef4444",
  DREAM: "#3b82f6",
  PATTERN: "#10b981",
  CONTACT: "#f59e0b",
}

interface Glitch {
  id: number
  title: string
  description: string
  category: string
  upvotes: number
  comments_count: number
  created_at: string
  anon_handle: string | null
  archetype_id: string | null
}

export default function ArchivePage() {
  const [glitches, setGlitches] = useState<Glitch[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState<"recent" | "top">("top")
  const [showSubmit, setShowSubmit] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "SYNCHRONICITY",
  })
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set())

  const fetchGlitches = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ sort: sortBy })
    if (activeCategory !== "ALL") params.set("category", activeCategory)
    const res = await fetch(`/api/glitches?${params}`)
    const data = await res.json()
    setGlitches(data.glitches || [])
    setLoading(false)
  }, [sortBy, activeCategory])

  useEffect(() => {
    fetchGlitches()
  }, [fetchGlitches])

  // Hydrate vote state from localStorage
  useEffect(() => {
    if (glitches.length === 0) return
    const set = new Set<number>()
    for (const g of glitches) if (hasVotedGlitch(g.id)) set.add(g.id)
    setVotedIds(set)
  }, [glitches])

  async function vote(glitchId: number) {
    const fp = getFingerprint()
    const wasVoted = votedIds.has(glitchId)

    // Optimistic update
    setVotedIds(prev => {
      const next = new Set(prev)
      if (wasVoted) next.delete(glitchId)
      else next.add(glitchId)
      return next
    })
    setGlitches(prev =>
      prev.map(g =>
        g.id === glitchId
          ? { ...g, upvotes: g.upvotes + (wasVoted ? -1 : 1) }
          : g
      )
    )

    const res = await fetch("/api/glitches/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ glitch_id: glitchId, fingerprint: fp }),
    })
    const data = await res.json()
    toggleGlitchVote(glitchId, data.voted === true)
  }

  async function submitGlitch() {
    if (!form.title.trim() || !form.description.trim()) {
      setSubmitError("Title and description required")
      return
    }
    setSubmitting(true)
    setSubmitError("")

    const profile = getProfile()
    const handle = profile?.archetypeId
      ? `${profile.archetypeId.replace(/-/g, "_")}_${profile.scores.reduce((a, b) => a + b, 0)}`
      : `entity_${Math.random().toString(36).slice(2, 7)}`

    try {
      const res = await fetch("/api/glitches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          anonHandle: handle,
          archetypeId: profile?.archetypeId,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || "Submission failed")
        setSubmitting(false)
        return
      }
      incrementGlitches()
      setForm({ title: "", description: "", category: "SYNCHRONICITY" })
      setShowSubmit(false)
      setSubmitting(false)
      fetchGlitches()
    } catch {
      setSubmitError("Connection lost. Try again.")
      setSubmitting(false)
    }
  }

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0]">
      {/* Nav */}
      <Nav />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            COLLECTIVE OBSERVATION ARCHIVE
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4">
            The Glitch Archive
          </h1>
          <p className="text-[#94a3b8] font-mono text-base leading-relaxed max-w-2xl">
            Anomalies logged by NPCs across the simulation. Synchronicities, déjà vu, impossible
            coincidences. The pattern emerges from the collected data, not any single entry.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-3 py-1.5 border tracking-widest transition-all ${
                activeCategory === cat
                  ? "border-[#6366f1] text-[#6366f1] bg-[rgba(99,102,241,0.1)]"
                  : "border-[rgba(99,102,241,0.15)] text-[#475569] hover:text-[#94a3b8] hover:border-[rgba(99,102,241,0.3)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(99,102,241,0.1)]">
          <div className="flex gap-1 text-xs font-mono">
            <button
              onClick={() => setSortBy("top")}
              className={`px-3 py-1.5 tracking-widest ${
                sortBy === "top" ? "text-[#6366f1]" : "text-[#475569] hover:text-[#94a3b8]"
              }`}
            >
              TOP
            </button>
            <button
              onClick={() => setSortBy("recent")}
              className={`px-3 py-1.5 tracking-widest ${
                sortBy === "recent" ? "text-[#6366f1]" : "text-[#475569] hover:text-[#94a3b8]"
              }`}
            >
              RECENT
            </button>
          </div>
          <div className="text-xs font-mono text-[#475569]">
            {glitches.length} ENTRIES
          </div>
        </div>

        {/* Glitch list */}
        {loading ? (
          <div className="text-center py-24 text-xs font-mono text-[#475569] tracking-widest animate-pulse">
            SCANNING ARCHIVE...
          </div>
        ) : glitches.length === 0 ? (
          <div className="text-center py-24 text-xs font-mono text-[#475569]">
            No glitches in this category yet. Be the first to log one.
          </div>
        ) : (
          <div className="space-y-px">
            {glitches.map(g => {
              const color = CATEGORY_COLORS[g.category] ?? "#6366f1"
              const voted = votedIds.has(g.id)
              return (
                <article
                  key={g.id}
                  className="border border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] p-6 flex gap-4"
                >
                  {/* Vote */}
                  <div className="shrink-0 flex flex-col items-center w-12">
                    <button
                      onClick={() => vote(g.id)}
                      className={`w-10 h-10 border flex items-center justify-center text-lg transition-all ${
                        voted
                          ? "border-[#6366f1] bg-[rgba(99,102,241,0.15)] text-[#6366f1]"
                          : "border-[rgba(99,102,241,0.2)] text-[#475569] hover:border-[#6366f1] hover:text-[#6366f1]"
                      }`}
                      aria-label="Upvote"
                    >
                      ▲
                    </button>
                    <div className="text-sm font-mono font-bold text-white mt-1">
                      {g.upvotes}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 border tracking-widest"
                        style={{ color, borderColor: `${color}40` }}
                      >
                        {g.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#475569]">
                        {g.anon_handle && (
                          <>by <span className="text-[#94a3b8]">{g.anon_handle}</span> · </>
                        )}
                        {timeAgo(g.created_at)}
                      </span>
                    </div>
                    <h3 className="text-base font-mono font-bold text-white mb-2 leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-sm font-mono text-[#94a3b8] leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {/* Submit modal */}
      {showSubmit && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(3,7,18,0.95)] backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowSubmit(false)}
        >
          <div
            className="bg-[#0a0f1e] border border-[rgba(99,102,241,0.3)] max-w-2xl w-full p-8"
            onClick={e => e.stopPropagation()}
            style={{ boxShadow: "0 0 50px rgba(99,102,241,0.2)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-mono text-[#475569] tracking-widest mb-1">
                  NEW SUBMISSION
                </div>
                <h2 className="text-xl font-mono font-bold text-white">Log a Glitch</h2>
              </div>
              <button
                onClick={() => setShowSubmit(false)}
                className="text-2xl text-[#475569] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#475569] tracking-widest mb-2">
                  CATEGORY
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.filter(c => c !== "ALL").map(cat => (
                    <button
                      key={cat}
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`text-xs font-mono px-2.5 py-1 border tracking-widest transition-all ${
                        form.category === cat
                          ? "border-[#6366f1] text-[#6366f1] bg-[rgba(99,102,241,0.1)]"
                          : "border-[rgba(99,102,241,0.2)] text-[#475569] hover:text-[#94a3b8]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#475569] tracking-widest mb-2">
                  TITLE (1 sentence)
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  maxLength={200}
                  placeholder="The clock skipped a minute"
                  className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-4 py-3 text-sm font-mono text-[#e2e8f0] placeholder-[#475569] focus:outline-none focus:border-[#6366f1]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#475569] tracking-widest mb-2">
                  DESCRIPTION
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  maxLength={4000}
                  rows={6}
                  placeholder="What happened. Be specific. The pattern emerges from precise data."
                  className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-4 py-3 text-sm font-mono text-[#e2e8f0] placeholder-[#475569] focus:outline-none focus:border-[#6366f1] resize-none"
                />
                <div className="text-[10px] font-mono text-[#475569] mt-1 text-right">
                  {form.description.length} / 4000
                </div>
              </div>

              {submitError && (
                <div className="text-xs font-mono text-[#ef4444]">{submitError}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={submitGlitch}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all disabled:opacity-50"
                  style={{ boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
                >
                  {submitting ? "TRANSMITTING..." : "LOG GLITCH (+10 XP) →"}
                </button>
                <button
                  onClick={() => setShowSubmit(false)}
                  className="px-6 py-3 border border-[rgba(99,102,241,0.2)] text-[#475569] font-mono text-xs tracking-widest hover:text-[#94a3b8]"
                >
                  CANCEL
                </button>
              </div>

              <p className="text-[10px] font-mono text-[#475569] tracking-widest text-center pt-2">
                NO ACCOUNT REQUIRED · SUBMITTED ANONYMOUSLY · YOUR ARCHETYPE IS RECORDED
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
