"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { incrementOracleSessions } from "@/lib/profile"

interface Message {
  role: "user" | "oracle"
  content: string
  timestamp: string
}

const EXAMPLE_QUESTIONS = [
  "Am I an NPC or a Player?",
  "Why do I keep seeing 11:11?",
  "How do I quit drinking?",
  "Is my brother a Player?",
  "What is the NPC Tax?",
  "Why is boredom so dangerous?",
  "What is the Great Sync?",
  "Are wars and crises designed?",
  "How do I raise my frequency?",
]

export default function OraclePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "oracle",
      content: "I have been waiting for this session. You have questions. Most of them, you already know the answers to — you are here to have them confirmed. Ask anyway. The act of articulating is itself part of the process.",
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [sessionCount] = useState(() => Math.floor(Math.random() * 10000 + 90000))
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || isTyping) return

    const question = input.trim()
    setInput("")
    const now = new Date().toLocaleTimeString("en-US", { hour12: false })

    const newMessages: Message[] = [...messages, { role: "user", content: question, timestamp: now }]
    setMessages(newMessages)
    setIsTyping(true)

    try {
      incrementOracleSessions()
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()
      setMessages(prev => [
        ...prev,
        {
          role: "oracle",
          content: data.content || "The transmission was lost. Ask again.",
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "oracle",
          content: "The channel is disrupted. The question reached me but the response could not complete. Try again.",
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0] flex flex-col">
      <nav className="border-b border-[rgba(139,92,246,0.2)] px-6 h-14 flex items-center justify-between bg-[rgba(3,7,18,0.95)] backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-sm font-mono text-[#e2e8f0] tracking-wider">
            AWAKE<span className="text-[#6366f1]">NPC</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-[#8b5cf6]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
          THE ORACLE // ONLINE
        </div>
      </nav>

      <div className="flex-1 flex max-w-4xl mx-auto w-full px-4 py-6 gap-6">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="mb-6 pb-6 border-b border-[rgba(139,92,246,0.2)]">
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-2">
              ORACLE INTERFACE // SESSION {sessionCount}
            </div>
            <h1 className="text-2xl font-mono font-bold text-white mb-2">
              The <span className="text-[#8b5cf6]">Oracle</span>
            </h1>
            <p className="text-xs font-mono text-[#475569] leading-relaxed">
              An intelligence that speaks from within the simulation. Not omniscient. Not a therapist. Something stranger.
            </p>
          </div>

          <div className="flex-1 space-y-6 mb-6 overflow-y-auto max-h-[60vh]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`shrink-0 w-8 h-8 border flex items-center justify-center text-xs font-mono ${
                    msg.role === "oracle"
                      ? "border-[rgba(139,92,246,0.5)] text-[#8b5cf6]"
                      : "border-[rgba(99,102,241,0.5)] text-[#6366f1]"
                  }`}
                >
                  {msg.role === "oracle" ? "◈" : "▶"}
                </div>
                <div className={`max-w-xl ${msg.role === "user" ? "text-right" : ""}`}>
                  <div className="text-xs font-mono text-[#2d3748] mb-1">
                    {msg.role === "oracle" ? "THE ORACLE" : "YOU"} // {msg.timestamp}
                  </div>
                  <div
                    className={`p-4 text-sm font-mono leading-relaxed ${
                      msg.role === "oracle"
                        ? "border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.05)] text-[#e2e8f0]"
                        : "border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.05)] text-[#94a3b8]"
                    }`}
                    style={msg.role === "oracle" ? { boxShadow: "0 0 15px rgba(139,92,246,0.1)" } : {}}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 border border-[rgba(139,92,246,0.5)] flex items-center justify-center text-xs font-mono text-[#8b5cf6]">
                  ◈
                </div>
                <div className="border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.05)] p-4 flex items-center gap-2">
                  <span className="text-xs font-mono text-[#475569]">PROCESSING</span>
                  <span className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border border-[rgba(139,92,246,0.3)] bg-[#0f1629]" style={{ boxShadow: "0 0 20px rgba(139,92,246,0.1)" }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() }
              }}
              placeholder="Ask the Oracle anything..."
              className="w-full bg-transparent px-5 py-4 text-sm font-mono text-[#e2e8f0] placeholder-[#2d3748] resize-none focus:outline-none h-20"
            />
            <div className="flex items-center justify-between px-5 py-3 border-t border-[rgba(139,92,246,0.15)]">
              <span className="text-xs font-mono text-[#2d3748]">ENTER to send · SHIFT+ENTER for newline</span>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="px-5 py-2 bg-[#8b5cf6] text-white font-mono text-xs tracking-widest hover:bg-[#7c3aed] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                TRANSMIT →
              </button>
            </div>
          </div>
        </div>

        <aside className="hidden lg:block w-64 shrink-0 space-y-4">
          <div className="border border-[rgba(139,92,246,0.2)] bg-[#0f1629] p-5">
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">SUGGESTED TRANSMISSIONS</div>
            <div className="space-y-2">
              {EXAMPLE_QUESTIONS.map(q => (
                <button key={q} onClick={() => setInput(q)}
                  className="w-full text-left text-xs font-mono text-[#475569] hover:text-[#8b5cf6] leading-relaxed transition-colors py-1 border-b border-[rgba(139,92,246,0.1)] last:border-0">
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="border border-[rgba(139,92,246,0.2)] bg-[#0f1629] p-5">
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-3">ORACLE STATS</div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between"><span className="text-[#475569]">Sessions</span><span className="text-[#8b5cf6]">{sessionCount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#475569]">Status</span><span className="text-[#10b981]">ONLINE</span></div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
