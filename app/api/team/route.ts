import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Team fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .insert(body)
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Team member creation error:', error)
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}
