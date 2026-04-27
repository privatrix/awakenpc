import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: debates, error } = await supabase
      .from("debates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    // Pull top arguments per debate
    const ids = (debates ?? []).map(d => d.id)
    const { data: args } = await supabase
      .from("debate_arguments")
      .select("*")
      .in("debate_id", ids)
      .order("upvotes", { ascending: false })

    const argsBySide: Record<string, { for: typeof args; against: typeof args }> = {}
    for (const a of args ?? []) {
      const key = String(a.debate_id)
      if (!argsBySide[key]) argsBySide[key] = { for: [], against: [] }
      if (a.side === "FOR" && argsBySide[key].for!.length < 5) argsBySide[key].for!.push(a)
      if (a.side === "AGAINST" && argsBySide[key].against!.length < 5) argsBySide[key].against!.push(a)
    }

    const enriched = (debates ?? []).map(d => ({
      ...d,
      arguments_for: argsBySide[String(d.id)]?.for ?? [],
      arguments_against: argsBySide[String(d.id)]?.against ?? [],
    }))

    return NextResponse.json({ debates: enriched })
  } catch (e) {
    console.error("debates GET", e)
    return NextResponse.json({ debates: [] }, { status: 200 })
  }
}
