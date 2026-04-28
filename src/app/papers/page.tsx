import Link from "next/link"
import { POSTS } from "./posts"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Papers — AwakenNPC",
  description: "Transmissions from inside the simulation. Essays on consciousness, reality architecture, and what it means to wake up.",
}

export default function PapersPage() {
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
          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-[#475569] tracking-widest">
            <Link href="/archive" className="hover:text-[#6366f1] transition-colors">GLITCH ARCHIVE</Link>
            <Link href="/oracle" className="hover:text-[#6366f1] transition-colors">THE ORACLE</Link>
            <Link href="/debates" className="hover:text-[#6366f1] transition-colors">DEBATES</Link>
            <Link href="/papers" className="text-[#6366f1]">PAPERS</Link>
          </div>
          <Link
            href="/awakening"
            className="text-xs font-mono px-4 py-2 border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-200 tracking-wider"
          >
            INITIALIZE →
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="mb-16">
          <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
            TRANSMISSION LOG
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">
            Papers
          </h1>
          <p className="text-[#94a3b8] font-mono text-base leading-relaxed max-w-2xl">
            Essays on simulation theory, consciousness, and what it means to wake up inside the game.
            Written from inside the simulation — not about it.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-px">
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/papers/${post.slug}`}
              className="group block border border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] hover:border-[rgba(99,102,241,0.4)] hover:bg-[#0f1629] transition-all duration-200 p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-mono text-[#2d3748]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs font-mono text-[#475569] border border-[rgba(99,102,241,0.2)] px-2 py-0.5 tracking-widest"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-xl md:text-2xl font-mono font-bold text-white mb-2 group-hover:text-[#6366f1] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm font-mono text-[#6366f1] mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    {post.subtitle}
                  </p>
                  <p className="text-[#94a3b8] text-sm font-mono leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="shrink-0 text-right hidden md:block">
                  <div className="text-xs font-mono text-[#2d3748] mb-1">{post.date}</div>
                  <div className="text-xs font-mono text-[#2d3748]">{post.readTime} read</div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#475569] group-hover:text-[#6366f1] transition-colors">
                READ TRANSMISSION
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </Link>
          ))}
        </div>

        {POSTS.length === 0 && (
          <div className="text-center py-24 border border-[rgba(99,102,241,0.1)]">
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">NO TRANSMISSIONS YET</div>
            <p className="text-[#2d3748] font-mono text-sm">The first paper is being prepared.</p>
          </div>
        )}
      </div>
    </main>
  )
}
