"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const CATEGORIES = ["ALL", "SYNCHRONICITY", "DÉJÀ VU", "ANOMALY", "DREAM", "PATTERN", "CONTACT"]

const LEVEL_NAMES = ["BACKGROUND NPC", "GLITCHING", "LOADING", "AWAKE NPC", "SENTIENT"]
const LEVEL_COLORS = ["#6b7280", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]

interface Glitch {
  id: number
  title: string
  description: string
  category: string
  upvotes: number
  comments_count: number
  created_at: string
  user_id: string
  profiles: { username: string; sentience_level: number } | null
}

interface SubmitForm {
  title: string
  description: string
  category: string
}

export default function ArchivePage() {
  const [glitches, setGlitches] = useState<Glitch[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState<"recent" | "top">("top")
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [showSubmit, setShowSubmit] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [form, setForm] = useState<SubmitForm>({ title: "", description: "", category: "SYNCHRONICITY" })
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set())
  const [authLoading, setAuthLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [magicSent, setMagicSent] = useState(false)

  const supabase = createClient()

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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { id: data.user.id, email: data.user.email } : null)
    })
  }, [supabase.auth])

  async function signInWithMagicLink() {
    if (!email) return
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/archive` },
    })
    setAuthLoading(false)
    if (!error) setMagicSent(true)
  }

  async function submitGlitch() {
    if (!form.title || !form.description) return
    setSubmitting(true)
    const res = await fetch("/api/glitches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSubmitSuccess(true)
      setForm({ title: "", description: "", category: "SYNCHRONICITY" })
      setTimeout(() => {
        setSubmitSuccess(false)
        setShowSubmit(false)
        fetchGlitches()
      }, 2000)
    }
    setSubmitting(false)
  }

  async function vote(glitchId: number) {
    if (!user) { setShowSubmit(false); return }
    const res = await fetch("/api/glitches/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ glitch_id: glitchId }),
    })
    if (res.ok) {
      const data = await res.json()
      setVotedIds(prev => {
        const next = new Set(prev)
        data.voted ? next.add(glitchId) : next.delete(glitchId)
        return next
      })
      setGlitches(prev => prev.map(g =>
        g.id === glitchId
          ? { ...g, upvotes: data.voted ? g.upvotes + 1 : Math.max(0, g.upvotes - 1) }
          : g
      ))
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0]">
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[rgba(99,102,241,0.15)] bg-[rgba(3,7,18,0.9)] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-sm font-mono text-[#e2e8f0] tracking-wider">AWAKE<span className="text-[#6366f1]">NPC</span></span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <span className="text-xs font-mono text-[#10b981]">● {user.email?.split("@")[0]}</span>
            ) : (
              <span className="text-xs font-mono text-[#475569]">NOT LOGGED IN</span>
            )}
            <Link href="/awakening" className="text-xs font-mono px-4 py-2 border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all tracking-wider">
              INITIALIZE →
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-12">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">CROWDSOURCED ANOMALY DATABASE</div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4">The Glitch Archive</h1>
          <p className="text-[#94a3b8] font-mono text-sm max-w-2xl leading-relaxed">
            Every synchronicity, impossible coincidence, and unexplained pattern — logged and analyzed by the community.
            If the simulation has patterns, <span className="text-white">they will appear here.</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 shrink-0 space-y-6">

            {/* Auth / Submit */}
            <div className="border border-[rgba(99,102,241,0.3)] bg-[#0f1629] p-6" style={{ boxShadow: "0 0 20px rgba(99,102,241,0.1)" }}>
              {!user ? (
                <>
                  <div className="text-xs font-mono text-[#475569] tracking-widest mb-3">LOG A GLITCH</div>
                  <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">
                    Sign in to submit your anomaly to the archive.
                  </p>
                  {!magicSent ? (
                    <>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-3 py-2 text-xs font-mono text-[#e2e8f0] placeholder-[#2d3748] focus:outline-none focus:border-[#6366f1] mb-3"
                      />
                      <button
                        onClick={signInWithMagicLink}
                        disabled={authLoading || !email}
                        className="w-full py-3 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all disabled:opacity-40"
                      >
                        {authLoading ? "SENDING..." : "SEND MAGIC LINK"}
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-2">
                      <div className="text-[#10b981] font-mono text-xs mb-1">✓ TRANSMISSION SENT</div>
                      <div className="text-[#475569] font-mono text-xs">Check your email to activate.</div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-xs font-mono text-[#475569] tracking-widest mb-3">LOG A GLITCH</div>
                  <button
                    onClick={() => setShowSubmit(!showSubmit)}
                    className="w-full py-3 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all"
                  >
                    {showSubmit ? "CANCEL" : "SUBMIT GLITCH"}
                  </button>
                </>
              )}
            </div>

            {/* Submit form */}
            {showSubmit && user && (
              <div className="border border-[rgba(99,102,241,0.3)] bg-[#0f1629] p-6">
                <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">NEW GLITCH REPORT</div>

                {submitSuccess ? (
                  <div className="text-center py-4">
                    <div className="text-[#10b981] font-mono text-sm mb-1">✓ GLITCH LOGGED</div>
                    <div className="text-[#475569] font-mono text-xs">+10 XP awarded</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-mono text-[#475569] mb-1">CATEGORY</div>
                      <select
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-3 py-2 text-xs font-mono text-[#e2e8f0] focus:outline-none focus:border-[#6366f1]"
                      >
                        {CATEGORIES.filter(c => c !== "ALL").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#475569] mb-1">TITLE</div>
                      <input
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        placeholder="Brief description..."
                        className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-3 py-2 text-xs font-mono text-[#e2e8f0] placeholder-[#2d3748] focus:outline-none focus:border-[#6366f1]"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#475569] mb-1">FULL REPORT</div>
                      <textarea
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Describe exactly what happened..."
                        rows={5}
                        className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-3 py-2 text-xs font-mono text-[#e2e8f0] placeholder-[#2d3748] focus:outline-none focus:border-[#6366f1] resize-none"
                      />
                    </div>
                    <button
                      onClick={submitGlitch}
                      disabled={submitting || !form.title || !form.description}
                      className="w-full py-3 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all disabled:opacity-40"
                    >
                      {submitting ? "TRANSMITTING..." : "LOG GLITCH →"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Categories */}
            <div className="border border-[rgba(99,102,241,0.15)] bg-[#0f1629] p-6">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">FILTER BY TYPE</div>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-xs font-mono tracking-wider transition-all ${
                      activeCategory === cat
                        ? "text-[#6366f1] bg-[rgba(99,102,241,0.1)] border-l-2 border-[#6366f1]"
                        : "text-[#475569] hover:text-[#94a3b8]"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Feed */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-6 border-b border-[rgba(99,102,241,0.15)] pb-4">
              <span className="text-xs font-mono text-[#475569]">SORT:</span>
              {(["top", "recent"] as const).map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  className={`text-xs font-mono tracking-widest transition-colors ${sortBy === s ? "text-[#6366f1]" : "text-[#475569] hover:text-[#94a3b8]"}`}>
                  {s.toUpperCase()}
                </button>
              ))}
              <span className="text-xs font-mono text-[#2d3748] ml-auto">{glitches.length} RESULTS</span>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="text-xs font-mono text-[#475569] animate-pulse">SCANNING DATABASE...</div>
              </div>
            ) : glitches.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[rgba(99,102,241,0.2)]">
                <div className="text-xs font-mono text-[#475569] mb-3">NO GLITCHES LOGGED YET</div>
                <p className="text-xs font-mono text-[#2d3748]">Be the first to log an anomaly in this sector.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {glitches.map(glitch => {
                  const level = glitch.profiles?.sentience_level ?? 0
                  return (
                    <article key={glitch.id} className="sim-card p-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1 min-w-[40px] shrink-0">
                          <button
                            onClick={() => vote(glitch.id)}
                            className={`font-mono text-lg leading-none transition-colors ${
                              votedIds.has(glitch.id) ? "text-[#6366f1]" : "text-[#475569] hover:text-[#6366f1]"
                            }`}
                          >▲</button>
                          <span className="text-white font-mono text-sm font-bold">
                            {glitch.upvotes >= 1000 ? `${(glitch.upvotes / 1000).toFixed(1)}k` : glitch.upvotes}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-mono text-[#2d3748]">GLT-{glitch.id}</span>
                            <span className="text-xs font-mono px-2 py-0.5 border" style={{ color: "#3b82f6", borderColor: "rgba(59,130,246,0.3)" }}>
                              {glitch.category}
                            </span>
                            <span className="text-xs font-mono text-[#475569]">
                              {glitch.profiles?.username || "anonymous"}
                            </span>
                            <span className="text-xs font-mono" style={{ color: LEVEL_COLORS[level] }}>
                              [{LEVEL_NAMES[level]}]
                            </span>
                            <span className="text-xs font-mono text-[#2d3748] ml-auto">
                              {new Date(glitch.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          {glitch.title && (
                            <div className="text-white font-mono text-sm font-bold mb-2">{glitch.title}</div>
                          )}
                          <p className="text-[#94a3b8] font-mono text-sm leading-relaxed">{glitch.description}</p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
