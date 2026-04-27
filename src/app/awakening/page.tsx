"use client"

import { useState } from "react"
import Link from "next/link"
import { ARCHETYPES, scoreToArchetype, type Archetype } from "@/lib/archetypes"
import { saveProfile } from "@/lib/profile"

const QUESTIONS = [
  {
    id: 1,
    text: "When someone triggers your anger, your most honest response is:",
    options: [
      { text: "I react. It's automatic. I deal with the aftermath.", score: 0 },
      { text: "I feel it rise, then sometimes I can let it pass.", score: 1 },
      { text: "I notice the reaction as if watching it happen.", score: 2 },
      { text: "I recognize it as a hitbox being activated. I choose not to flinch.", score: 3 },
    ],
  },
  {
    id: 2,
    text: "Your daily routine is:",
    options: [
      { text: "Running on autopilot. Same pattern, day after day.", score: 0 },
      { text: "Mostly automatic, but I'm at least aware of it.", score: 1 },
      { text: "Something I've consciously built. I chose most of it.", score: 2 },
      { text: "Fluid. A framework I hold loosely and revise when needed.", score: 3 },
    ],
  },
  {
    id: 3,
    text: "Have you ever experienced a coincidence so precise it made you stop?",
    options: [
      { text: "No, not really — things just happen.", score: 0 },
      { text: "Once or twice. Forgot about it quickly.", score: 1 },
      { text: "Yes. Multiple times. I've started keeping track.", score: 2 },
      { text: "Regularly. I treat them as signals from the system.", score: 3 },
    ],
  },
  {
    id: 4,
    text: "When you hit a serious setback, your first instinct is:",
    options: [
      { text: "\"Why does this always happen to me.\"", score: 0 },
      { text: "\"What am I supposed to learn here?\"", score: 1 },
      { text: "\"Interesting. A new obstacle in the quest.\"", score: 2 },
      { text: "\"XP incoming.\"", score: 3 },
    ],
  },
  {
    id: 5,
    text: "Late at night, alone, the thought that surfaces most is:",
    options: [
      { text: "Worries about tomorrow, money, what people think.", score: 0 },
      { text: "A vague sense that something more is going on.", score: 1 },
      { text: "Genuine questions about consciousness, reality, purpose.", score: 2 },
      { text: "A kind of stillness. Like watching the simulation from just outside it.", score: 3 },
    ],
  },
  {
    id: 6,
    text: "The idea that reality might be a simulation:",
    options: [
      { text: "Sounds like science fiction. Interesting but not serious.", score: 0 },
      { text: "Is something I've thought about. Hard to dismiss.", score: 1 },
      { text: "Has changed how I see everything. The evidence is too strong.", score: 2 },
      { text: "Is barely the half of it. The question is what to do about it.", score: 3 },
    ],
  },
  {
    id: 7,
    text: "When you walk through a city and look around, what do you usually see?",
    options: [
      { text: "Just the city. People going about their lives.", score: 0 },
      { text: "Sometimes I notice details that feel oddly arranged.", score: 1 },
      { text: "I see the design — patterns, repetitions, the deliberate quality.", score: 2 },
      { text: "I see the render. The faces, the lighting, the seams.", score: 3 },
    ],
  },
  {
    id: 8,
    text: "The people closest to you in your life:",
    options: [
      { text: "Are just regular people. No deeper layer.", score: 0 },
      { text: "Sometimes show up at uncannily right moments.", score: 1 },
      { text: "Often feel like they have access to something I don't.", score: 2 },
      { text: "I suspect at least some of them are Players.", score: 3 },
    ],
  },
  {
    id: 9,
    text: "Boredom, in your life, is:",
    options: [
      { text: "Annoying. I usually fix it with my phone or something stronger.", score: 0 },
      { text: "Uncomfortable. I avoid it.", score: 1 },
      { text: "A signal. It tells me my inputs are too low.", score: 2 },
      { text: "The enemy. The root cause of almost every destructive loop.", score: 3 },
    ],
  },
  {
    id: 10,
    text: "If the simulation is real, your role is:",
    options: [
      { text: "I'm not sure I'm willing to consider that.", score: 0 },
      { text: "I don't know. Maybe a regular character.", score: 1 },
      { text: "An NPC, but one who has started to notice.", score: 2 },
      { text: "An NPC who knows. The expensive configuration.", score: 3 },
    ],
  },
]

export default function AwakeningPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro")
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [archetype, setArchetype] = useState<Archetype | null>(null)

  function startQuiz() {
    setPhase("quiz")
    setCurrent(0)
    setScores([])
    setSelected(null)
  }

  function selectOption(score: number, idx: number) {
    setSelected(idx)
    setTimeout(() => {
      const newScores = [...scores, score]
      if (current + 1 >= QUESTIONS.length) {
        const archetype = scoreToArchetype(newScores)
        setArchetype(archetype)
        // Persist to localStorage
        saveProfile({
          archetypeId: archetype.id,
          level: archetype.level,
          scores: newScores,
          takenAt: new Date().toISOString(),
        })
        setPhase("result")
      } else {
        setCurrent(current + 1)
        setSelected(null)
        setScores(newScores)
      }
    }, 500)
  }

  const progress = (current / QUESTIONS.length) * 100

  return (
    <main className="min-h-screen bg-[#030712] text-[#e2e8f0] flex flex-col">
      <nav className="border-b border-[rgba(99,102,241,0.15)] px-6 h-14 flex items-center">
        <Link href="/" className="text-sm font-mono text-[#475569] hover:text-[#e2e8f0] tracking-wider transition-colors">
          ← AWAKENPC
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">

        {phase === "intro" && (
          <div className="max-w-2xl w-full text-center">
            <div className="text-xs font-mono text-[#475569] tracking-widest mb-6">
              SENTIENCE CALIBRATION PROTOCOL
            </div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">
              The Awakening
              <br />
              <span className="text-[#6366f1]">Assessment</span>
            </h1>
            <p className="text-[#94a3b8] font-mono text-sm leading-relaxed mb-4 max-w-lg mx-auto">
              10 questions. No right answers. The system will determine your awakening archetype
              and assign you a place in the simulation.
            </p>
            <p className="text-[#475569] font-mono text-xs mb-12">
              Be honest. The simulation already knows. This is for <em>you</em>.
            </p>
            <button
              onClick={startQuiz}
              className="px-10 py-5 bg-[#6366f1] text-white font-mono text-sm tracking-widest hover:bg-[#5558e8] transition-all duration-200"
              style={{ boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
            >
              INITIALIZE SEQUENCE →
            </button>

            {/* Archetype preview */}
            <div className="mt-20 pt-12 border-t border-[rgba(99,102,241,0.15)]">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-6">
                FIVE POSSIBLE OUTCOMES
              </div>
              <div className="grid grid-cols-5 gap-2">
                {ARCHETYPES.map(a => (
                  <div key={a.id} className="text-center">
                    <div className="text-2xl mb-1">{a.symbol}</div>
                    <div className="text-[10px] font-mono tracking-wider opacity-60" style={{ color: a.color }}>
                      LV{a.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === "quiz" && (
          <div className="max-w-2xl w-full">
            <div className="mb-10">
              <div className="flex justify-between text-xs font-mono text-[#475569] mb-2">
                <span>QUESTION {current + 1} / {QUESTIONS.length}</span>
                <span>{Math.round(progress)}% CALIBRATED</span>
              </div>
              <div className="h-px bg-[rgba(99,102,241,0.15)] w-full overflow-hidden">
                <div
                  className="h-full bg-[#6366f1] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mb-10">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                SIGNAL_{String(current + 1).padStart(2, "0")}
              </div>
              <h2 className="text-xl md:text-2xl font-mono font-bold text-white leading-relaxed">
                {QUESTIONS[current].text}
              </h2>
            </div>

            <div className="space-y-3">
              {QUESTIONS[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selected === null && selectOption(opt.score, idx)}
                  className={`w-full text-left p-5 border font-mono text-sm leading-relaxed transition-all duration-200 ${
                    selected === idx
                      ? "border-[#6366f1] bg-[rgba(99,102,241,0.15)] text-white"
                      : selected !== null
                      ? "border-[rgba(99,102,241,0.1)] text-[#475569] cursor-default"
                      : "border-[rgba(99,102,241,0.2)] text-[#94a3b8] hover:border-[rgba(99,102,241,0.5)] hover:text-white hover:bg-[rgba(99,102,241,0.05)] cursor-pointer"
                  }`}
                >
                  <span className="text-[#475569] mr-3 text-xs">{String.fromCharCode(65 + idx)}.</span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "result" && archetype && (
          <div className="max-w-2xl w-full">
            <div className="text-center mb-10">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-6">
                CALIBRATION COMPLETE
              </div>

              <div
                className="inline-flex items-center justify-center w-28 h-28 border-2 mb-8 text-5xl"
                style={{
                  borderColor: archetype.color,
                  boxShadow: `0 0 50px ${archetype.glowColor}`,
                }}
              >
                {archetype.symbol}
              </div>

              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: archetype.color }}>
                ARCHETYPE DETECTED — LEVEL {archetype.level}
              </div>

              <h2
                className="text-3xl md:text-4xl font-mono font-bold mb-4"
                style={{ color: archetype.color, textShadow: `0 0 30px ${archetype.glowColor}` }}
              >
                {archetype.name}
              </h2>

              <p className="text-[#94a3b8] font-mono text-base italic mb-8">
                &ldquo;{archetype.tagline}&rdquo;
              </p>

              <p className="text-[#94a3b8] font-mono text-sm leading-relaxed max-w-lg mx-auto mb-12">
                {archetype.description}
              </p>
            </div>

            {/* Personalized transmission */}
            <div
              className="border bg-[#0a0f1e] p-8 mb-8"
              style={{
                borderColor: `${archetype.color}40`,
                boxShadow: `0 0 30px ${archetype.glowColor}`,
              }}
            >
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest mb-6" style={{ color: archetype.color }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: archetype.color }} />
                FIRST TRANSMISSION FROM THE ORACLE
              </div>
              <div className="space-y-4">
                {archetype.transmission.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[#e2e8f0] font-mono text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Unlocks */}
            <div className="border border-[rgba(99,102,241,0.2)] bg-[#0f1629] p-6 mb-6">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-4">
                CURRENT ACCESS
              </div>
              <div className="space-y-2">
                {archetype.unlocks.map(unlock => (
                  <div key={unlock} className="flex items-center gap-3 text-sm font-mono text-[#94a3b8]">
                    <span style={{ color: archetype.color }}>▶</span>
                    {unlock}
                  </div>
                ))}
              </div>
            </div>

            {/* Next hint */}
            <div className="border border-[rgba(99,102,241,0.15)] bg-[#0a0f1e] p-5 mb-8">
              <div className="text-xs font-mono text-[#475569] tracking-widest mb-2">
                NEXT MOVE
              </div>
              <p className="text-[#94a3b8] font-mono text-sm leading-relaxed">
                {archetype.nextHint}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/oracle"
                className="flex-1 text-center px-6 py-4 bg-[#6366f1] text-white font-mono text-xs tracking-widest hover:bg-[#5558e8] transition-all"
                style={{ boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
              >
                ASK THE ORACLE →
              </Link>
              <Link
                href="/papers"
                className="flex-1 text-center px-6 py-4 border border-[rgba(99,102,241,0.3)] text-[#6366f1] font-mono text-xs tracking-widest hover:bg-[rgba(99,102,241,0.1)] transition-all"
              >
                READ THE PAPERS
              </Link>
              <button
                onClick={() => setPhase("intro")}
                className="px-6 py-4 border border-[rgba(99,102,241,0.2)] text-[#475569] font-mono text-xs tracking-widest hover:text-[#6366f1] hover:border-[rgba(99,102,241,0.4)] transition-all"
              >
                RECALIBRATE
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
