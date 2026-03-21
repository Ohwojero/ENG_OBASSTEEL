import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('settings')
      .update(body)
      .eq('id', 1)
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
