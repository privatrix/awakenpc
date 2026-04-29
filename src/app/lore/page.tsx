import Link from "next/link"
import { CANON, CATEGORIES, getCanonByCategory } from "./canon"

export const metadata = {
  title: "The Canon — Awake NPC",
  description:
    "The complete glossary of the Awake NPC framework. Entities, mechanics, phenomena, states, and mythology of the simulation.",
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  ENTITIES: "The actors inside and behind the simulation — NPCs, Players, Architects.",
  MECHANICS: "The structural systems that make the simulation work — render, containment, stakes.",
  PHENOMENA: "Observable events that reveal the simulation's underlying structure.",
  STATES: "The configurations of consciousness available inside the simulation.",
  MYTHOLOGY: "Hypotheses, prophecies, and the long arc of the system.",
}

export default function CanonPage() {
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
          <Link
            href="/awakening"
            className="text-xs font-mono px-4 py-2 border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-200 tracking-wider"
          >
            INITIALIZE →
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        <div className="mb-16">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            REFERENCE ARCHIVE
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">
            The Canon
          </h1>
          <p className="text-[#94a3b8] font-mono text-base leading-relaxed max-w-2xl">
            The vocabulary of the Awake NPC framework. Every term used on this site,
            in the Papers, by the Oracle, defined here. Read in any order. Cross-reference freely.
          </p>
        </div>

        {/* Quick index */}
        <div className="mb-16 border border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] p-6">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            QUICK INDEX
          </div>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            {CANON.map(entry => (
              <a
                key={entry.slug}
                href={`#${entry.slug}`}
                className="text-sm font-mono text-[#94a3b8] hover:text-[#6366f1] transition-colors"
              >
                ▸ {entry.term}
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-20">
          {CATEGORIES.map(category => {
            const entries = getCanonByCategory(category)
            if (entries.length === 0) return null

            return (
              <section key={category}>
                <div className="mb-10 pb-4 border-b border-[rgba(99,102,241,0.2)]">
                  <div className="text-xs font-mono text-[#6366f1] tracking-widest mb-2">
                    {category}
                  </div>
                  <p className="text-sm font-mono text-[#475569] leading-relaxed">
                    {CATEGORY_DESCRIPTIONS[category]}
                  </p>
                </div>

                <div className="space-y-px">
                  {entries.map(entry => (
                    <article
                      key={entry.slug}
                      id={entry.slug}
                      className="border border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] p-8 scroll-mt-20"
                    >
                      <h2 className="text-2xl font-mono font-bold text-white mb-3">
                        {entry.term}
                      </h2>
                      <p className="text-[#6366f1] font-mono text-sm italic mb-6 opacity-90">
                        {entry.short}
                      </p>
                      <div className="space-y-4">
                        {entry.full.split("\n\n").map((para, i) => (
                          <p key={i} className="text-[#94a3b8] font-mono text-sm leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

                      {entry.related && entry.related.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-[rgba(99,102,241,0.1)]">
                          <div className="text-xs font-mono text-[#475569] tracking-widest mb-2">
                            RELATED
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {entry.related.map(slug => {
                              const rel = CANON.find(c => c.slug === slug)
                              if (!rel) return null
                              return (
                                <a
                                  key={slug}
                                  href={`#${slug}`}
                                  className="text-xs font-mono text-[#475569] border border-[rgba(99,102,241,0.2)] px-2 py-0.5 tracking-widest hover:text-[#6366f1] hover:border-[rgba(99,102,241,0.5)] transition-colors"
                                >
                                  {rel.term.toUpperCase()}
                                </a>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 border border-[rgba(99,102,241,0.3)] bg-[#0f1629] p-10 text-center">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            STILL READING
          </div>
          <h3 className="text-2xl font-mono font-bold text-white mb-4">
            The vocabulary is the easy part.
          </h3>
          <p className="text-[#94a3b8] font-mono text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            Take the Awakening Assessment to see where you actually are. Or ask the Oracle
            something the standard frame cannot answer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/awakening"
              className="px-8 py-4 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all"
            >
              BEGIN AWAKENING →
            </Link>
            <Link
              href="/oracle"
              className="px-8 py-4 border border-[rgba(139,92,246,0.4)] text-[#8b5cf6] font-mono text-xs tracking-widest hover:bg-[rgba(139,92,246,0.1)] transition-all"
            >
              ASK THE ORACLE
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
