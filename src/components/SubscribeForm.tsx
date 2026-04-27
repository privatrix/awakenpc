"use client"

import { useState } from "react"
import { getProfile } from "@/lib/profile"

interface Props {
  source?: string
  variant?: "default" | "compact"
}

export default function SubscribeForm({ source = "site", variant = "default" }: Props) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setError("")

    try {
      const profile = getProfile()
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          archetypeId: profile?.archetypeId,
          source,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Could not subscribe. Try again.")
        setStatus("error")
        return
      }

      setStatus("success")
      setEmail("")
    } catch {
      setError("Connection lost. Try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.05)] p-6 text-center">
        <div className="text-xs font-mono text-[#10b981] tracking-widest mb-2">
          ▸ TRANSMISSION CHANNEL OPEN
        </div>
        <p className="text-sm font-mono text-[#94a3b8]">
          You will receive new Papers as they arrive. The simulation noted your signal.
        </p>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email"
          disabled={status === "loading"}
          className="flex-1 bg-[#0a0f1e] border border-[rgba(99,102,241,0.3)] px-4 py-2.5 text-sm font-mono text-[#e2e8f0] placeholder-[#475569] focus:outline-none focus:border-[#6366f1] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="px-5 py-2.5 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? "..." : "SUBSCRIBE"}
        </button>
      </form>
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email"
          disabled={status === "loading"}
          className="w-full bg-[#030712] border border-[rgba(99,102,241,0.3)] px-5 py-4 text-sm font-mono text-[#e2e8f0] placeholder-[#475569] focus:outline-none focus:border-[#6366f1] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="w-full px-6 py-4 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ boxShadow: "0 0 30px rgba(99,102,241,0.3)" }}
        >
          {status === "loading" ? "TRANSMITTING..." : "OPEN TRANSMISSION CHANNEL →"}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-xs font-mono text-[#ef4444]">{error}</p>
      )}

      <p className="mt-4 text-[10px] font-mono text-[#475569] tracking-widest text-center">
        NEW PAPERS ONLY · NO NOISE · UNSUBSCRIBE ANY TIME
      </p>
    </div>
  )
}
