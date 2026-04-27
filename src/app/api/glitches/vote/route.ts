import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const { glitch_id, fingerprint } = await req.json()

    if (!glitch_id || !fingerprint) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Check existing vote
    const { data: existing } = await supabase
      .from("anon_votes")
      .select("id")
      .eq("fingerprint", fingerprint)
      .eq("target_kind", "GLITCH")
      .eq("target_id", glitch_id)
      .maybeSingle()

    if (existing) {
      // Toggle off — remove vote, decrement upvotes
      await supabase.from("anon_votes").delete().eq("id", existing.id)

      // Get current upvotes and decrement
      const { data: g } = await supabase
        .from("glitches")
        .select("upvotes")
        .eq("id", glitch_id)
        .single()

      if (g) {
        await supabase
          .from("glitches")
          .update({ upvotes: Math.max(0, (g.upvotes ?? 0) - 1) })
          .eq("id", glitch_id)
      }

      return NextResponse.json({ voted: false })
    }

    // Add vote
    await supabase.from("anon_votes").insert({
      fingerprint,
      target_kind: "GLITCH",
      target_id: glitch_id,
    })

    const { data: g } = await supabase
      .from("glitches")
      .select("upvotes")
      .eq("id", glitch_id)
      .single()

    if (g) {
      await supabase
        .from("glitches")
        .update({ upvotes: (g.upvotes ?? 0) + 1 })
        .eq("id", glitch_id)
    }

    return NextResponse.json({ voted: true })
  } catch (e) {
    console.error("glitch vote", e)
    return NextResponse.json({ error: "vote_failed" }, { status: 500 })
  }
}
