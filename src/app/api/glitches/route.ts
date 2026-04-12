import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const sort = searchParams.get('sort') || 'top'

  let query = supabase
    .from('glitches')
    .select(`
      *,
      profiles(username, sentience_level)
    `)

  if (category && category !== 'ALL') {
    query = query.eq('category', category)
  }

  if (sort === 'top') {
    query = query.order('upvotes', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  query = query.limit(20)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ glitches: data })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await req.json()
  const { title, description, category } = body

  if (!title || !description || !category) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('glitches')
    .insert({
      user_id: user.id,
      title,
      description,
      category,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Award XP
  await supabase.rpc('award_xp', {
    p_user_id: user.id,
    p_amount: 10,
    p_reason: 'Submitted a glitch report',
  })

  return NextResponse.json({ glitch: data })
}
