import Link from "next/link"
import { notFound } from "next/navigation"
import { POSTS, getPost } from "../posts"
import PaperReadTracker from "./PaperReadTracker"
import SubscribeForm from "@/components/SubscribeForm"

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Awake NPC`,
    description: post.excerpt,
  }
}

function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line === "---") {
      elements.push(
        <hr key={i} className="border-none border-t border-[rgba(99,102,241,0.2)] my-10" />
      )
      i++
      continue
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      const text = line.slice(2, -2)
      elements.push(
        <h3 key={i} className="text-lg font-mono font-bold text-white mt-10 mb-4 tracking-wide">
          {text}
        </h3>
      )
      i++
      continue
    }

    if (line === "") {
      i++
      continue
    }

    elements.push(
      <p key={i} className="text-[#94a3b8] font-mono text-base leading-relaxed mb-6">
        {line}
      </p>
    )
    i++
  }

  return elements
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0]">
      <PaperReadTracker slug={post.slug} />
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[rgba(99,102,241,0.15)] bg-[rgba(3,7,18,0.9)] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-sm font-mono text-[#e2e8f0] tracking-wider">
              AWAKE<span className="text-[#6366f1]">NPC</span>
            </span>
          </Link>
          <Link href="/papers" className="text-xs font-mono text-[#475569] hover:text-[#6366f1] transition-colors tracking-widest">
            ← PAPERS
          </Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 pt-28 pb-24">
        {/* Meta */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-mono text-[#475569] border border-[rgba(99,102,241,0.2)] px-2 py-0.5 tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-mono font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-[#6366f1] font-mono text-base mb-8 opacity-80">
            {post.subtitle}
          </p>

          <div className="flex items-center gap-6 text-xs font-mono text-[#2d3748] pb-8 border-b border-[rgba(99,102,241,0.15)]">
            <span>{post.date}</span>
            <span>{post.readTime} read</span>
            <span className="text-[#10b981]">AWAKENPC.COM</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose-none">
          {renderContent(post.content)}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[rgba(99,102,241,0.15)]">
          <div
            className="border border-[rgba(99,102,241,0.3)] bg-[#0f1629] p-8 mb-10"
            style={{ boxShadow: "0 0 30px rgba(99,102,241,0.05)" }}
          >
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-3 text-center">
              IF THIS LANDED
            </div>
            <h3 className="text-xl font-mono font-bold text-white mb-3 text-center">
              Receive new Papers as they arrive.
            </h3>
            <p className="text-[#94a3b8] font-mono text-sm leading-relaxed mb-6 text-center">
              Slow-cadence transmissions. No marketing noise. Just the next essay when it is ready.
            </p>
            <SubscribeForm source={`paper:${post.slug}`} />
            <div className="mt-8 pt-6 border-t border-[rgba(99,102,241,0.15)] text-center">
              <Link
                href="/awakening"
                className="text-xs font-mono text-[#6366f1] tracking-widest hover:text-white transition-colors"
              >
                OR — TAKE THE AWAKENING ASSESSMENT →
              </Link>
            </div>
          </div>

          <Link
            href="/papers"
            className="text-xs font-mono text-[#475569] hover:text-[#6366f1] transition-colors tracking-widest"
          >
            ← ALL PAPERS
          </Link>
        </div>
      </article>
    </main>
  )
}
