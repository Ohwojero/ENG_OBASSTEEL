import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin.from('team_members').select('*').eq('id', id).single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Team member fetch error:', error)
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data, error } = await supabaseAdmin.from('team_members').update(body).eq('id', id).select()
    if (error) throw error
    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Team member update error:', error)
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabaseAdmin.from('team_members').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Team member deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}
