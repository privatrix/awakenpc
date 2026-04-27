import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const sort = searchParams.get("sort") || "top"
  const limit = Math.min(Number(searchParams.get("limit") ?? "30"), 100)

  try {
    const supabase = createAdminClient()
    let q = supabase.from("glitches").select("*")

    if (category && category !== "ALL") q = q.eq("category", category)

    if (sort === "top") {
      q = q.order("upvotes", { ascending: false })
    } else {
      q = q.order("created_at", { ascending: false })
    }

    q = q.limit(limit)

    const { data, error } = await q
    if (error) throw error

    // Normalize for the existing UI shape
    const glitches = (data ?? []).map(g => ({
      id: g.id,
      title: g.title,
      description: g.description,
      category: g.category,
      upvotes: g.upvotes,
      comments_count: g.comments_count,
      created_at: g.created_at,
      user_id: g.user_id,
      anon_handle: g.anon_handle,
      archetype_id: g.archetype_id,
      profiles: g.anon_handle
        ? { username: g.anon_handle, sentience_level: 0 }
        : null,
    }))

    return NextResponse.json({ glitches })
  } catch (e) {
    console.error("glitches GET", e)
    return NextResponse.json({ glitches: [], error: "fetch_failed" }, { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, category, anonHandle, archetypeId } = body

    if (!title || !description || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }
    if (typeof title !== "string" || title.length > 200) {
      return NextResponse.json({ error: "Invalid title" }, { status: 400 })
    }
    if (typeof description !== "string" || description.length > 4000) {
      return NextResponse.json({ error: "Invalid description" }, { status: 400 })
    }
    const allowed = ["SYNCHRONICITY", "DÉJÀ VU", "ANOMALY", "DREAM", "PATTERN", "CONTACT"]
    if (!allowed.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("glitches")
      .insert({
        title,
        description,
        category,
        anon_handle: anonHandle || `entity_${Math.random().toString(36).slice(2, 7)}`,
        archetype_id: archetypeId || null,
        upvotes: 1,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ glitch: data })
  } catch (e) {
    console.error("glitches POST", e)
    return NextResponse.json({ error: "submit_failed" }, { status: 500 })
  }
}
