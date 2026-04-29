"use client"

import { useState } from "react"
import Link from "next/link"

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[rgba(99,102,241,0.15)] bg-[rgba(3,7,18,0.9)] backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-sm font-mono text-[#e2e8f0] tracking-wider">
            AWAKE<span className="text-[#6366f1]">NPC</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono text-[#475569] tracking-widest">
          <Link href="/archive" className="hover:text-[#6366f1] transition-colors">GLITCH ARCHIVE</Link>
          <Link href="/oracle" className="hover:text-[#6366f1] transition-colors">THE ORACLE</Link>
          <Link href="/debates" className="hover:text-[#6366f1] transition-colors">DEBATES</Link>
          <Link href="/papers" className="hover:text-[#6366f1] transition-colors">PAPERS</Link>
          <Link href="/lore" className="hover:text-[#6366f1] transition-colors">THE CANON</Link>
        </div>
        <Link
          href="/awakening"
          className="hidden md:inline-block text-xs font-mono px-4 py-2 border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-200 tracking-wider"
        >
          INITIALIZE →
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#6366f1] transition-all ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-[#6366f1] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#6366f1] transition-all ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[rgba(99,102,241,0.15)] bg-[rgba(3,7,18,0.98)]">
          <div className="flex flex-col py-4 px-6 gap-1">
            <Link href="/awakening" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-mono text-[#6366f1] tracking-widest border-b border-[rgba(99,102,241,0.1)]">INITIALIZE →</Link>
            <Link href="/papers" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-mono text-[#94a3b8] tracking-widest border-b border-[rgba(99,102,241,0.1)]">PAPERS</Link>
            <Link href="/archive" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-mono text-[#94a3b8] tracking-widest border-b border-[rgba(99,102,241,0.1)]">GLITCH ARCHIVE</Link>
            <Link href="/oracle" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-mono text-[#94a3b8] tracking-widest border-b border-[rgba(99,102,241,0.1)]">THE ORACLE</Link>
            <Link href="/debates" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-mono text-[#94a3b8] tracking-widest border-b border-[rgba(99,102,241,0.1)]">DEBATES</Link>
            <Link href="/lore" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-mono text-[#94a3b8] tracking-widest border-b border-[rgba(99,102,241,0.1)]">THE CANON</Link>
            <Link href="/me" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-mono text-[#94a3b8] tracking-widest">PROFILE</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
