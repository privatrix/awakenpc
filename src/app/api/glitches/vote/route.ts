import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { glitch_id } = await req.json()

  // Check if already voted
  const { data: existing } = await supabase
    .from('glitch_votes')
    .select('id')
    .eq('glitch_id', glitch_id)
    .eq('user_id', user.id)
    .single()

  if (existing) {
    // Remove vote
    await supabase.from('glitch_votes').delete().eq('id', existing.id)
    await supabase.from('glitches').update({ upvotes: supabase.rpc('greatest', { a: 0 }) }).eq('id', glitch_id)
    // Simpler approach:
    await supabase.rpc('decrement_upvotes' as never, { glitch_id } as never)
    return NextResponse.json({ voted: false })
  } else {
    // Add vote
    await supabase.from('glitch_votes').insert({ glitch_id, user_id: user.id })
    await supabase.from('glitches').update({ upvotes: supabase.rpc('increment_upvotes' as never, { glitch_id } as never) as never }).eq('id', glitch_id)
    return NextResponse.json({ voted: true })
  }
}
