"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

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
  anon_handle: string | null
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

export default function HomeGlitchFeed() {
  const [glitches, setGlitches] = useState<(Glitch & { created_at: string })[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/glitches?sort=top&limit=5")
      .then(r => r.json())
      .then(d => {
        setGlitches(d.glitches || [])
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  if (!loaded) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="border border-[rgba(99,102,241,0.1)] bg-[#0a0f1e] p-5 h-24 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (glitches.length === 0) {
    return (
      <div className="border border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] p-12 text-center">
        <p className="text-xs font-mono text-[#475569] tracking-widest mb-4">
          ARCHIVE EMPTY
        </p>
        <Link
          href="/archive"
          className="text-sm font-mono text-[#6366f1] hover:text-white tracking-wider"
        >
          BE THE FIRST TO LOG A GLITCH →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {glitches.slice(0, 5).map(g => {
        const color = CATEGORY_COLORS[g.category] ?? "#6366f1"
        return (
          <Link
            key={g.id}
            href="/archive"
            className="sim-card p-5 flex gap-4 items-start hover:border-[rgba(99,102,241,0.3)] transition-all block"
          >
            <div className="hidden md:flex flex-col items-center gap-1 min-w-[50px]">
              <div className="text-[#6366f1] font-mono text-lg font-bold">▲</div>
              <div className="text-white font-mono text-sm font-bold">{g.upvotes}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 border tracking-widest"
                  style={{ color, borderColor: `${color}40` }}
                >
                  {g.category}
                </span>
                <span className="text-[10px] font-mono text-[#475569]">
                  by <span className="text-[#94a3b8]">{g.anon_handle}</span>
                </span>
                <span className="text-[10px] font-mono text-[#475569]">
                  {timeAgo(g.created_at)}
                </span>
                <span className="md:hidden text-[10px] font-mono text-[#6366f1] ml-auto">
                  ▲ {g.upvotes}
                </span>
              </div>
              <h3 className="text-sm font-mono font-bold text-white mb-1 leading-snug">
                {g.title}
              </h3>
              <p className="text-xs font-mono text-[#94a3b8] leading-relaxed line-clamp-2">
                {g.description}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
