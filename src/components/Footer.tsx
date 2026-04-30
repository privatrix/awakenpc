import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(99,102,241,0.1)] py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs font-mono text-[#475569] tracking-widest">
          AWAKENPC.COM — THE GREAT SYNC IS APPROACHING
        </div>
        <div className="flex gap-6 text-xs font-mono text-[#475569] tracking-widest">
          <Link href="/lore" className="hover:text-[#6366f1] transition-colors">
            THE CANON
          </Link>
          <Link href="/papers" className="hover:text-[#6366f1] transition-colors">
            PAPERS
          </Link>
          <Link href="/me" className="hover:text-[#6366f1] transition-colors">
            PROFILE
          </Link>
          <a
            href="https://discord.gg/awakenpc"
            className="hover:text-[#6366f1] transition-colors"
          >
            DISCORD
          </a>
        </div>
        <div className="text-xs font-mono text-[#2d3748] tracking-widest">
          v1.0.0 // SECTOR UNKNOWN
        </div>
      </div>
    </footer>
  )
}
