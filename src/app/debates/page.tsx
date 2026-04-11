"use client"

import { useState } from "react"
import Link from "next/link"

const DEBATES = [
  {
    id: 1,
    proposition: "Free will is impossible inside a deterministic simulation.",
    votes: { for: 1847, against: 2341 },
    arguments: 89,
    topFor: "If every state follows from a prior state by fixed rules, then every choice was already encoded in the initial conditions. The experience of choosing is a process running inside the simulation — the output of a function, not genuine agency.",
    topAgainst: "The simulation could be non-deterministic at the quantum level. More importantly: if your subjective experience of choosing feels real, and that experience itself is a physical process in the simulation, then will is real in the only sense that matters. The label 'determined' doesn't negate the experience.",
    changed: 34,
  },
  {
    id: 2,
    proposition: "Most people are genuinely conscious, not NPC-mode background processes.",
    votes: { for: 3102, against: 891 },
    arguments: 124,
    topFor: "The NPC framing is a useful metaphor for behavioral patterns, not a statement about consciousness. There is no evidence that any human lacks inner experience. The 'hollow people' observation says more about our limited ability to perceive others' interiority than about them.",
    topAgainst: "The distinction isn't about consciousness but about meta-awareness. Most people have experience but no framework for examining it. They react but don't observe the reaction. By that measure, 'NPC mode' is an accurate description of most human behavior most of the time — including ours.",
    changed: 67,
  },
  {
    id: 3,
    proposition: "The architects of the simulation are indifferent to what happens inside it.",
    votes: { for: 2219, against: 1654 },
    arguments: 56,
    topFor: "Any civilization advanced enough to run a simulation of this complexity is so far beyond us that our joys and sufferings are as meaningful to them as the pixel deaths in a game are to us. Scale implies indifference.",
    topAgainst: "They built something that produces consciousness. Either that was accidental — which seems implausible at this scale — or consciousness was the goal. If it was the goal, then what happens to consciousness inside the simulation is precisely what they care about.",
    changed: 28,
  },
]

export default function DebatesPage() {
  const [activeDebate, setActiveDebate] = useState(DEBATES[0])
  const [userVote, setUserVote] = useState<Record<number, "for" | "against" | null>>({})
  const [mindChanged, setMindChanged] = useState<Record<number, boolean>>({})

  const totalVotes = activeDebate.votes.for + activeDebate.votes.against
  const forPct = Math.round((activeDebate.votes.for / totalVotes) * 100)
  const againstPct = 100 - forPct

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0]">
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[rgba(99,102,241,0.15)] bg-[rgba(3,7,18,0.9)] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-sm font-mono text-[#e2e8f0] tracking-wider">
              AWAKE<span className="text-[#6366f1]">NPC</span>
            </span>
          </Link>
          <div className="text-xs font-mono text-[#475569] tracking-widest hidden md:block">
            DEBATE ARENA // STRUCTURED COLLISION OF IDEAS
          </div>
          <Link href="/awakening" className="text-xs font-mono px-4 py-2 border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all tracking-wider">
            INITIALIZE →
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            STRUCTURED DEBATE // NOT A FORUM
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4">
            The Debate Arena
          </h1>
          <p className="text-[#94a3b8] font-mono text-sm max-w-2xl leading-relaxed">
            Oxford-style structured argument. The best case for each side rises to the top.
            One question matters: <span className="text-white">did reading this change your mind?</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Debate selector */}
          <aside className="lg:w-72 shrink-0">
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
              ACTIVE PROPOSITIONS
            </div>
            <div className="space-y-3">
              {DEBATES.map(d => (
                <button
                  key={d.id}
                  onClick={() => setActiveDebate(d)}
                  className={`w-full text-left p-4 border transition-all font-mono text-xs leading-relaxed ${
                    activeDebate.id === d.id
                      ? "border-[rgba(245,158,11,0.5)] bg-[rgba(245,158,11,0.05)] text-white"
                      : "border-[rgba(99,102,241,0.15)] bg-[#0f1629] text-[#94a3b8] hover:border-[rgba(99,102,241,0.3)]"
                  }`}
                >
                  <div className="text-[#475569] mb-2">PROPOSITION {d.id}</div>
                  &ldquo;{d.proposition}&rdquo;
                  <div className="mt-3 flex gap-3 text-[#475569]">
                    <span>⚡ {d.arguments} args</span>
                    <span>🔄 {d.changed} changed</span>
                  </div>
                </button>
              ))}
            </div>

            <button className="w-full mt-4 py-3 border border-dashed border-[rgba(99,102,241,0.2)] text-xs font-mono text-[#475569] hover:border-[#6366f1] hover:text-[#6366f1] transition-all tracking-widest">
              + PROPOSE DEBATE
            </button>
          </aside>

          {/* Active debate */}
          <div className="flex-1 min-w-0">

            {/* Proposition */}
            <div
              className="border border-[rgba(245,158,11,0.3)] bg-[#0f1629] p-8 mb-6"
              style={{ boxShadow: "0 0 30px rgba(245,158,11,0.05)" }}
            >
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                PROPOSITION {activeDebate.id}
              </div>
              <h2 className="text-xl md:text-2xl font-mono font-bold text-white leading-relaxed mb-8">
                &ldquo;{activeDebate.proposition}&rdquo;
              </h2>

              {/* Vote bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#10b981]">FOR — {forPct}%</span>
                  <span className="text-[#ef4444]">AGAINST — {againstPct}%</span>
                </div>
                <div className="h-2 bg-[rgba(239,68,68,0.3)] overflow-hidden">
                  <div
                    className="h-full bg-[#10b981] transition-all duration-500"
                    style={{ width: `${forPct}%` }}
                  />
                </div>
                <div className="text-xs font-mono text-[#475569] mt-2 text-center">
                  {totalVotes.toLocaleString()} votes cast
                </div>
              </div>

              {/* Vote buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setUserVote(v => ({ ...v, [activeDebate.id]: "for" }))}
                  className={`flex-1 py-3 font-mono text-xs tracking-widest border transition-all ${
                    userVote[activeDebate.id] === "for"
                      ? "bg-[#10b981] text-white border-[#10b981]"
                      : "border-[rgba(16,185,129,0.4)] text-[#10b981] hover:bg-[rgba(16,185,129,0.1)]"
                  }`}
                >
                  ▲ I AGREE
                </button>
                <button
                  onClick={() => setUserVote(v => ({ ...v, [activeDebate.id]: "against" }))}
                  className={`flex-1 py-3 font-mono text-xs tracking-widest border transition-all ${
                    userVote[activeDebate.id] === "against"
                      ? "bg-[#ef4444] text-white border-[#ef4444]"
                      : "border-[rgba(239,68,68,0.4)] text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)]"
                  }`}
                >
                  ▼ I DISAGREE
                </button>
              </div>
            </div>

            {/* Top arguments */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">

              {/* Best FOR */}
              <div className="border border-[rgba(16,185,129,0.25)] bg-[#0f1629] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-xs font-mono text-[#10b981] tracking-widest">TOP ARGUMENT FOR</span>
                </div>
                <p className="text-[#94a3b8] font-mono text-sm leading-relaxed">
                  {activeDebate.topFor}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs font-mono text-[#475569]">
                  <button className="hover:text-[#10b981] transition-colors">▲ STRENGTHEN</button>
                  <button className="hover:text-[#6366f1] transition-colors">COUNTER →</button>
                </div>
              </div>

              {/* Best AGAINST */}
              <div className="border border-[rgba(239,68,68,0.25)] bg-[#0f1629] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                  <span className="text-xs font-mono text-[#ef4444] tracking-widest">TOP ARGUMENT AGAINST</span>
                </div>
                <p className="text-[#94a3b8] font-mono text-sm leading-relaxed">
                  {activeDebate.topAgainst}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs font-mono text-[#475569]">
                  <button className="hover:text-[#ef4444] transition-colors">▲ STRENGTHEN</button>
                  <button className="hover:text-[#6366f1] transition-colors">COUNTER →</button>
                </div>
              </div>
            </div>

            {/* Mind changed? */}
            <div className="border border-[rgba(99,102,241,0.2)] bg-[#0f1629] p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm font-mono text-white mb-1">
                    Did reading this change your mind?
                  </div>
                  <div className="text-xs font-mono text-[#475569]">
                    {activeDebate.changed} people changed their vote after reading the arguments
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMindChanged(m => ({ ...m, [activeDebate.id]: true }))}
                    className={`px-5 py-2 font-mono text-xs tracking-widest border transition-all ${
                      mindChanged[activeDebate.id]
                        ? "bg-[#6366f1] text-white border-[#6366f1]"
                        : "border-[rgba(99,102,241,0.4)] text-[#6366f1] hover:bg-[rgba(99,102,241,0.1)]"
                    }`}
                  >
                    YES — I SHIFTED
                  </button>
                  <button className="px-5 py-2 font-mono text-xs tracking-widest border border-[rgba(99,102,241,0.2)] text-[#475569] hover:text-[#94a3b8] transition-all">
                    HOLDING POSITION
                  </button>
                </div>
              </div>
            </div>

            {/* Post argument */}
            <div className="mt-6 border border-dashed border-[rgba(99,102,241,0.2)] p-6 text-center">
              <p className="text-xs font-mono text-[#475569] mb-3">
                Have a stronger argument? Post it. If the community votes it to the top, it becomes the featured argument.
              </p>
              <button className="px-6 py-3 border border-[rgba(99,102,241,0.3)] text-[#6366f1] font-mono text-xs tracking-widest hover:bg-[rgba(99,102,241,0.1)] transition-all">
                POST AN ARGUMENT
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
