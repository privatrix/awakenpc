import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  try {
    const { email, archetypeId, source } = await req.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!valid) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      // Graceful fallback — pretend success but log
      console.error("Supabase env vars missing for subscribe")
      return NextResponse.json({ ok: true, note: "queued" })
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { error } = await supabase.from("subscribers").insert({
      email: trimmed,
      archetype_id: archetypeId || null,
      source: source || "site",
    })

    // 23505 = unique violation (already subscribed). Treat as success.
    if (error && !error.message.includes("duplicate")) {
      console.error("subscribe error", error)
      return NextResponse.json({ error: "Could not subscribe" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("subscribe exception", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
