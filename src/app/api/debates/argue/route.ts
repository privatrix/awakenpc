import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const { debate_id, side, text, anonHandle, archetypeId } = await req.json()

    if (!debate_id || !side || !text) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 })
    }
    if (side !== "FOR" && side !== "AGAINST") {
      return NextResponse.json({ error: "Invalid side" }, { status: 400 })
    }
    if (typeof text !== "string" || text.length < 20 || text.length > 2000) {
      return NextResponse.json({ error: "Argument must be 20-2000 chars" }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("debate_arguments")
      .insert({
        debate_id,
        side,
        text,
        anon_handle: anonHandle || `entity_${Math.random().toString(36).slice(2, 7)}`,
        archetype_id: archetypeId || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ argument: data })
  } catch (e) {
    console.error("argue POST", e)
    return NextResponse.json({ error: "submit_failed" }, { status: 500 })
  }
}
