"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Nav from "@/components/Nav"
import { getFingerprint, getDebateVote, setDebateVote } from "@/lib/fingerprint"
import { getProfile } from "@/lib/profile"

interface DebateArgument {
  id: number
  debate_id: number
  side: "FOR" | "AGAINST"
  text: string
  upvotes: number
  anon_handle: string | null
  archetype_id: string | null
  created_at: string
}

interface Debate {
  id: number
  proposition: string
  votes_for: number
  votes_against: number
  minds_changed: number
  created_at: string
  arguments_for: DebateArgument[]
  arguments_against: DebateArgument[]
}

export default function DebatesPage() {
  const [debates, setDebates] = useState<Debate[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [voteState, setVoteState] = useState<Record<number, "FOR" | "AGAINST" | null>>({})
  const [argueModal, setArgueModal] = useState<{ debate: Debate; side: "FOR" | "AGAINST" } | null>(null)
  const [argueText, setArgueText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [argueError, setArgueError] = useState("")

  const fetchDebates = useCallback(async () => {
    setLoading(true)
    const res = await fetch("/api/debates")
    const data = await res.json()
    setDebates(data.debates || [])
    if (data.debates?.[0]) setActiveId(data.debates[0].id)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchDebates()
  }, [fetchDebates])

  // Hydrate vote state from localStorage
  useEffect(() => {
    if (debates.length === 0) return
    const state: Record<number, "FOR" | "AGAINST" | null> = {}
    for (const d of debates) state[d.id] = getDebateVote(d.id)
    setVoteState(state)
  }, [debates])

  async function vote(debateId: number, side: "FOR" | "AGAINST") {
    const fp = getFingerprint()
    const previous = voteState[debateId]
    const mindChanged = previous && previous !== side

    // Optimistic
    setVoteState(prev => ({ ...prev, [debateId]: side }))
    setDebates(prev =>
      prev.map(d => {
        if (d.id !== debateId) return d
        let votesFor = d.votes_for
        let votesAgainst = d.votes_against
        let mindsChanged = d.minds_changed
        if (previous === "FOR") votesFor--
        if (previous === "AGAINST") votesAgainst--
        if (side === "FOR") votesFor++
        if (side === "AGAINST") votesAgainst++
        if (mindChanged) mindsChanged++
        return { ...d, votes_for: votesFor, votes_against: votesAgainst, minds_changed: mindsChanged }
      })
    )

    setDebateVote(debateId, side)

    await fetch("/api/debates/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        debate_id: debateId,
        side,
        fingerprint: fp,
        mind_changed: !!mindChanged,
      }),
    })
  }

  async function submitArgument() {
    if (!argueModal) return
    if (argueText.trim().length < 20) {
      setArgueError("Argument must be at least 20 characters.")
      return
    }
    setSubmitting(true)
    setArgueError("")

    const profile = getProfile()
    const handle = profile?.archetypeId
      ? `${profile.archetypeId.replace(/-/g, "_")}`
      : `entity_${Math.random().toString(36).slice(2, 7)}`

    try {
      const res = await fetch("/api/debates/argue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          debate_id: argueModal.debate.id,
          side: argueModal.side,
          text: argueText.trim(),
          anonHandle: handle,
          archetypeId: profile?.archetypeId,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setArgueError(data.error || "Submission failed")
        setSubmitting(false)
        return
      }
      setArgueText("")
      setArgueModal(null)
      setSubmitting(false)
      fetchDebates()
    } catch {
      setArgueError("Connection lost. Try again.")
      setSubmitting(false)
    }
  }

  const activeDebate = debates.find(d => d.id === activeId)

  function selectDebate(id: number) {
    setActiveId(id)
    // On mobile, scroll the active debate view into view
    setTimeout(() => {
      const el = document.getElementById("active-debate")
      if (el && window.innerWidth < 1024) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 50)
  }

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0]">
      {/* Nav */}
      <Nav />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            STRUCTURED COLLISION OF IDEAS
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4">
            The Debates
          </h1>
          <p className="text-[#94a3b8] font-mono text-base leading-relaxed max-w-2xl">
            Take a side. Read the strongest arguments. Change your mind if the evidence demands it.
            Your changed mind is the most valuable signal on this site.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-24 text-xs font-mono text-[#475569] tracking-widest animate-pulse">
            LOADING PROPOSITIONS...
          </div>
        ) : (
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar list */}
            <aside className="space-y-2 order-2 lg:order-1">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                {debates.length} PROPOSITIONS
              </div>
              {debates.map(d => {
                const total = d.votes_for + d.votes_against
                const forPct = total > 0 ? Math.round((d.votes_for / total) * 100) : 50
                return (
                  <button
                    key={d.id}
                    onClick={() => selectDebate(d.id)}
                    className={`w-full text-left p-4 border transition-all ${
                      activeId === d.id
                        ? "border-[#6366f1] bg-[rgba(99,102,241,0.05)]"
                        : "border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] hover:border-[rgba(99,102,241,0.3)]"
                    }`}
                  >
                    <p className="text-sm font-mono text-[#e2e8f0] leading-snug mb-2 line-clamp-3">
                      {d.proposition}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#475569]">
                      <span className="text-[#10b981]">{forPct}%</span>
                      <span>·</span>
                      <span>{total.toLocaleString()} votes</span>
                    </div>
                  </button>
                )
              })}
            </aside>

            {/* Active debate */}
            {activeDebate ? (
              <div id="active-debate" className="scroll-mt-20 order-1 lg:order-2">
                {/* Proposition */}
                <div className="mb-8 pb-8 border-b border-[rgba(99,102,241,0.15)]">
                  <div className="text-xs font-mono text-[#475569] tracking-widest mb-3">
                    PROPOSITION
                  </div>
                  <h2 className="text-2xl md:text-3xl font-mono font-bold text-white leading-snug">
                    {activeDebate.proposition}
                  </h2>
                </div>

                {/* Vote bar */}
                {(() => {
                  const total = activeDebate.votes_for + activeDebate.votes_against
                  const forPct = total > 0 ? (activeDebate.votes_for / total) * 100 : 50
                  const myVote = voteState[activeDebate.id]
                  return (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono">
                        <span className="text-[#10b981]">FOR · {Math.round(forPct)}%</span>
                        <span className="text-[#475569]">
                          {total.toLocaleString()} votes · {activeDebate.minds_changed} minds changed
                        </span>
                        <span className="text-[#ef4444]">{Math.round(100 - forPct)}% · AGAINST</span>
                      </div>
                      <div className="h-2 bg-[#0a0f1e] flex">
                        <div
                          className="bg-[#10b981] transition-all"
                          style={{ width: `${forPct}%` }}
                        />
                        <div
                          className="bg-[#ef4444] transition-all"
                          style={{ width: `${100 - forPct}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <button
                          onClick={() => vote(activeDebate.id, "FOR")}
                          className={`px-6 py-4 border font-mono text-xs tracking-widest transition-all ${
                            myVote === "FOR"
                              ? "border-[#10b981] bg-[rgba(16,185,129,0.15)] text-[#10b981]"
                              : "border-[rgba(16,185,129,0.3)] text-[#10b981] hover:bg-[rgba(16,185,129,0.05)]"
                          }`}
                        >
                          {myVote === "FOR" ? "✓ VOTED FOR" : "VOTE FOR"}
                        </button>
                        <button
                          onClick={() => vote(activeDebate.id, "AGAINST")}
                          className={`px-6 py-4 border font-mono text-xs tracking-widest transition-all ${
                            myVote === "AGAINST"
                              ? "border-[#ef4444] bg-[rgba(239,68,68,0.15)] text-[#ef4444]"
                              : "border-[rgba(239,68,68,0.3)] text-[#ef4444] hover:bg-[rgba(239,68,68,0.05)]"
                          }`}
                        >
                          {myVote === "AGAINST" ? "✓ VOTED AGAINST" : "VOTE AGAINST"}
                        </button>
                      </div>
                    </div>
                  )
                })()}

                {/* Arguments columns */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* FOR */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-mono text-[#10b981] tracking-widest">
                        ▸ TOP FOR
                      </div>
                      <button
                        onClick={() => setArgueModal({ debate: activeDebate, side: "FOR" })}
                        className="text-[10px] font-mono text-[#475569] hover:text-[#10b981] tracking-widest"
                      >
                        + ADD ARGUMENT
                      </button>
                    </div>
                    {activeDebate.arguments_for.length === 0 ? (
                      <div className="border border-[rgba(16,185,129,0.15)] bg-[#0a0f1e] p-6 text-center text-xs font-mono text-[#475569]">
                        No arguments yet. Be the first.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activeDebate.arguments_for.map(a => (
                          <article
                            key={a.id}
                            className="border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.03)] p-5"
                          >
                            <p className="text-sm font-mono text-[#e2e8f0] leading-relaxed mb-3">
                              {a.text}
                            </p>
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#475569] tracking-widest">
                              <span>
                                by <span className="text-[#94a3b8]">{a.anon_handle}</span>
                              </span>
                              <span className="text-[#10b981]">▲ {a.upvotes}</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* AGAINST */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-mono text-[#ef4444] tracking-widest">
                        ▸ TOP AGAINST
                      </div>
                      <button
                        onClick={() => setArgueModal({ debate: activeDebate, side: "AGAINST" })}
                        className="text-[10px] font-mono text-[#475569] hover:text-[#ef4444] tracking-widest"
                      >
                        + ADD ARGUMENT
                      </button>
                    </div>
                    {activeDebate.arguments_against.length === 0 ? (
                      <div className="border border-[rgba(239,68,68,0.15)] bg-[#0a0f1e] p-6 text-center text-xs font-mono text-[#475569]">
                        No arguments yet. Be the first.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activeDebate.arguments_against.map(a => (
                          <article
                            key={a.id}
                            className="border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.03)] p-5"
                          >
                            <p className="text-sm font-mono text-[#e2e8f0] leading-relaxed mb-3">
                              {a.text}
                            </p>
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#475569] tracking-widest">
                              <span>
                                by <span className="text-[#94a3b8]">{a.anon_handle}</span>
                              </span>
                              <span className="text-[#ef4444]">▲ {a.upvotes}</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Argue modal */}
      {argueModal && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(3,7,18,0.95)] backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setArgueModal(null)}
        >
          <div
            className="bg-[#0a0f1e] border max-w-2xl w-full p-8"
            onClick={e => e.stopPropagation()}
            style={{
              borderColor: argueModal.side === "FOR" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)",
              boxShadow: `0 0 50px ${argueModal.side === "FOR" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div
                  className="text-xs font-mono tracking-widest mb-1"
                  style={{ color: argueModal.side === "FOR" ? "#10b981" : "#ef4444" }}
                >
                  ARGUE {argueModal.side}
                </div>
                <h2 className="text-base font-mono font-bold text-white leading-snug">
                  {argueModal.debate.proposition}
                </h2>
              </div>
              <button
                onClick={() => setArgueModal(null)}
                className="text-2xl text-[#475569] hover:text-white"
              >
                ×
              </button>
            </div>

            <textarea
              value={argueText}
              onChange={e => setArgueText(e.target.value)}
              maxLength={2000}
              rows={8}
              placeholder="State your strongest case. Be precise. Avoid personal attacks. The argument either holds or it doesn't."
              className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-4 py-3 text-sm font-mono text-[#e2e8f0] placeholder-[#475569] focus:outline-none focus:border-[#6366f1] resize-none mb-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#475569] mb-4">
              <span>MIN 20 CHARS</span>
              <span>{argueText.length} / 2000</span>
            </div>

            {argueError && (
              <div className="text-xs font-mono text-[#ef4444] mb-4">{argueError}</div>
            )}

            <div className="flex gap-3">
              <button
                onClick={submitArgument}
                disabled={submitting}
                className="flex-1 px-6 py-3 text-white font-mono text-xs tracking-widest transition-all disabled:opacity-50"
                style={{
                  backgroundColor: argueModal.side === "FOR" ? "#10b981" : "#ef4444",
                  boxShadow: `0 0 20px ${argueModal.side === "FOR" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                }}
              >
                {submitting ? "TRANSMITTING..." : `SUBMIT ${argueModal.side} ARGUMENT →`}
              </button>
              <button
                onClick={() => setArgueModal(null)}
                className="px-6 py-3 border border-[rgba(99,102,241,0.2)] text-[#475569] font-mono text-xs tracking-widest hover:text-[#94a3b8]"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
