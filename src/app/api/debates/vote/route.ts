import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const { debate_id, side, fingerprint, mind_changed } = await req.json()

    if (!debate_id || !side || !fingerprint) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 })
    }
    if (side !== "FOR" && side !== "AGAINST") {
      return NextResponse.json({ error: "Invalid side" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Check existing vote on this debate (any side) by this fingerprint
    const { data: existing } = await supabase
      .from("anon_votes")
      .select("id, side")
      .eq("fingerprint", fingerprint)
      .eq("target_kind", "DEBATE_SIDE")
      .eq("target_id", debate_id)
      .maybeSingle()

    if (existing && existing.side === side) {
      // Already voted same side — no-op
      return NextResponse.json({ ok: true, action: "noop" })
    }

    if (existing && existing.side !== side) {
      // Switching sides: decrement old, increment new
      await supabase.from("anon_votes").delete().eq("id", existing.id)

      const { data: d } = await supabase
        .from("debates")
        .select("votes_for, votes_against, minds_changed")
        .eq("id", debate_id)
        .single()

      if (d) {
        const update: Record<string, number> = {}
        if (existing.side === "FOR") update.votes_for = Math.max(0, d.votes_for - 1)
        if (existing.side === "AGAINST") update.votes_against = Math.max(0, d.votes_against - 1)
        if (side === "FOR") update.votes_for = (update.votes_for ?? d.votes_for) + 1
        if (side === "AGAINST") update.votes_against = (update.votes_against ?? d.votes_against) + 1
        if (mind_changed) update.minds_changed = (d.minds_changed ?? 0) + 1
        await supabase.from("debates").update(update).eq("id", debate_id)
      }
    } else {
      // First vote on this debate
      const { data: d } = await supabase
        .from("debates")
        .select("votes_for, votes_against")
        .eq("id", debate_id)
        .single()

      if (d) {
        const update: Record<string, number> = {}
        if (side === "FOR") update.votes_for = (d.votes_for ?? 0) + 1
        if (side === "AGAINST") update.votes_against = (d.votes_against ?? 0) + 1
        await supabase.from("debates").update(update).eq("id", debate_id)
      }
    }

    await supabase.from("anon_votes").insert({
      fingerprint,
      target_kind: "DEBATE_SIDE",
      target_id: debate_id,
      side,
    })

    return NextResponse.json({ ok: true, action: existing ? "switched" : "voted" })
  } catch (e) {
    console.error("debate vote", e)
    return NextResponse.json({ error: "vote_failed" }, { status: 500 })
  }
}
