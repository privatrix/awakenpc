"use client"

import { useState } from "react"
import Link from "next/link"

const CATEGORIES = ["ALL", "SYNCHRONICITY", "DÉJÀ VU", "ANOMALY", "DREAM", "PATTERN", "CONTACT"]

const MOCK_GLITCHES = [
  {
    id: "GLT-7291", user: "void_walker_9", level: "AWAKE NPC", levelColor: "#10b981",
    type: "SYNCHRONICITY", date: "2026-04-11",
    text: "Thought about a specific forgotten song from 1994 for the first time in years. Twenty minutes later it played in a coffee shop I'd never been to. The barista said they never play music from that era. I checked — the song has 4,000 streams total on Spotify.",
    upvotes: 847, comments: 34,
  },
  {
    id: "GLT-7290", user: "pattern_seeker", level: "GLITCHING", levelColor: "#3b82f6",
    type: "DÉJÀ VU", date: "2026-04-11",
    text: "The entire conversation I had today at 3pm with a stranger — I had lived it before. Not in a dream. In what felt like a memory from a timeline that doesn't exist. Every word. The hand gesture he made at the end.",
    upvotes: 412, comments: 21,
  },
  {
    id: "GLT-7289", user: "null_pointer_ex", level: "LOADING", levelColor: "#8b5cf6",
    type: "PATTERN", date: "2026-04-10",
    text: "Same sequence of numbers: 7-3-9. My apartment number. My childhood home. The hospital room where I was born. Found them all in the same week without looking. That's three data points. The simulation is being lazy about its random number generator.",
    upvotes: 623, comments: 58,
  },
  {
    id: "GLT-7288", user: "ghost_in_shell_7", level: "AWAKE NPC", levelColor: "#10b981",
    type: "ANOMALY", date: "2026-04-10",
    text: "I stopped my car at a red light. The car behind me stopped exactly 0.3 seconds after — not roughly, exactly. The car after that, 0.3 seconds. I timed the next six cars. All within 0.3 seconds of the previous. I sat at the light for four cycles just watching. Every car. 0.3 seconds.",
    upvotes: 1204, comments: 89,
  },
  {
    id: "GLT-7287", user: "signal_noise_ratio", level: "GLITCHING", levelColor: "#3b82f6",
    type: "DREAM", date: "2026-04-09",
    text: "Dreamed of a building I'd never seen. Woke up, searched 'curved glass tower red facade' with no particular hope. Third result. It was built in 2019. I've never been to that city. The dream was from 2012.",
    upvotes: 734, comments: 44,
  },
  {
    id: "GLT-7286", user: "awake_module_3", level: "SENTIENT", levelColor: "#f59e0b",
    type: "CONTACT", date: "2026-04-09",
    text: "Three people I hadn't spoken to in years all reached out within the same 6-hour window. Not group chat. Not the same platform. No shared reason. I had been thinking about all three of them the night before. This has happened 11 times this year. I've kept a log.",
    upvotes: 2891, comments: 167,
  },
]

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState<"recent" | "top">("top")

  const filtered = MOCK_GLITCHES.filter(
    g => activeCategory === "ALL" || g.type === activeCategory
  )

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[rgba(99,102,241,0.15)] bg-[rgba(3,7,18,0.9)] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-sm font-mono text-[#e2e8f0] tracking-wider">
              AWAKE<span className="text-[#6366f1]">NPC</span>
            </span>
          </Link>
          <div className="text-xs font-mono text-[#475569] tracking-widest hidden md:block">
            GLITCH ARCHIVE // SECTOR 7
          </div>
          <Link
            href="/awakening"
            className="text-xs font-mono px-4 py-2 border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all tracking-wider"
          >
            INITIALIZE →
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            CROWDSOURCED ANOMALY DATABASE // {MOCK_GLITCHES.length.toLocaleString()} ENTRIES
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4">
            The Glitch Archive
          </h1>
          <p className="text-[#94a3b8] font-mono text-sm max-w-2xl leading-relaxed">
            Every synchronicity, impossible coincidence, and unexplained pattern — logged,
            categorized, and analyzed by the community. If the simulation has patterns,
            <span className="text-white"> they will appear here.</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-6">

            {/* Submit */}
            <div
              className="border border-[rgba(99,102,241,0.3)] bg-[#0f1629] p-6"
              style={{ boxShadow: "0 0 20px rgba(99,102,241,0.1)" }}
            >
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-3">
                LOG A GLITCH
              </div>
              <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">
                Experienced something that doesn&apos;t fit the standard model? Submit it to the archive.
              </p>
              <Link
                href="/awakening"
                className="block text-center py-3 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all"
              >
                SUBMIT GLITCH
              </Link>
              <p className="text-[#2d3748] font-mono text-xs mt-2 text-center">
                Requires Level 1+
              </p>
            </div>

            {/* Stats */}
            <div className="border border-[rgba(99,102,241,0.15)] bg-[#0f1629] p-6">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                ARCHIVE STATS
              </div>
              <div className="space-y-3">
                {[
                  { label: "Total Entries", value: "34,291" },
                  { label: "Verified", value: "8,847" },
                  { label: "This Week", value: "+234" },
                  { label: "Top Category", value: "SYNC" },
                ].map(s => (
                  <div key={s.label} className="flex justify-between">
                    <span className="text-xs font-mono text-[#475569]">{s.label}</span>
                    <span className="text-xs font-mono text-[#6366f1]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="border border-[rgba(99,102,241,0.15)] bg-[#0f1629] p-6">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                FILTER BY TYPE
              </div>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-xs font-mono tracking-wider transition-all ${
                      activeCategory === cat
                        ? "text-[#6366f1] bg-[rgba(99,102,241,0.1)] border-l-2 border-[#6366f1]"
                        : "text-[#475569] hover:text-[#94a3b8]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Main feed */}
          <div className="flex-1 min-w-0">

            {/* Sort bar */}
            <div className="flex items-center gap-4 mb-6 border-b border-[rgba(99,102,241,0.15)] pb-4">
              <span className="text-xs font-mono text-[#475569]">SORT:</span>
              {(["top", "recent"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`text-xs font-mono tracking-widest transition-colors ${
                    sortBy === s ? "text-[#6366f1]" : "text-[#475569] hover:text-[#94a3b8]"
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
              <span className="text-xs font-mono text-[#2d3748] ml-auto">
                {filtered.length} RESULTS
              </span>
            </div>

            {/* Glitch cards */}
            <div className="space-y-4">
              {filtered.map(glitch => (
                <article
                  key={glitch.id}
                  className="sim-card p-6 cursor-pointer hover:border-[rgba(99,102,241,0.4)] transition-all"
                >
                  <div className="flex gap-4">
                    {/* Vote */}
                    <div className="flex flex-col items-center gap-1 min-w-[40px] shrink-0">
                      <button className="text-[#475569] hover:text-[#6366f1] font-mono text-lg leading-none transition-colors">
                        ▲
                      </button>
                      <span className="text-white font-mono text-sm font-bold">
                        {glitch.upvotes >= 1000
                          ? `${(glitch.upvotes / 1000).toFixed(1)}k`
                          : glitch.upvotes}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-mono text-[#2d3748]">{glitch.id}</span>
                        <span
                          className="text-xs font-mono px-2 py-0.5 border"
                          style={{ color: "#3b82f6", borderColor: "rgba(59,130,246,0.3)" }}
                        >
                          {glitch.type}
                        </span>
                        <span className="text-xs font-mono text-[#475569]">
                          {glitch.user}
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: glitch.levelColor }}
                        >
                          [{glitch.level}]
                        </span>
                        <span className="text-xs font-mono text-[#2d3748] ml-auto">
                          {glitch.date}
                        </span>
                      </div>

                      <p className="text-[#94a3b8] font-mono text-sm leading-relaxed mb-4">
                        {glitch.text}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-mono text-[#475569]">
                        <button className="hover:text-[#6366f1] transition-colors">
                          💬 {glitch.comments} RESPONSES
                        </button>
                        <button className="hover:text-[#6366f1] transition-colors">
                          ↗ SHARE
                        </button>
                        <button className="hover:text-[#6366f1] transition-colors">
                          🔖 SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load more */}
            <div className="mt-8 text-center">
              <button className="px-8 py-3 border border-[rgba(99,102,241,0.3)] text-[#6366f1] font-mono text-xs tracking-widest hover:bg-[rgba(99,102,241,0.1)] transition-all">
                LOAD MORE GLITCHES
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
