import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const uploadBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'uploads'

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin.from('services').select('*').eq('id', id).single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Service fetch error:', error)
    return NextResponse.json({ error: 'Service not found' }, { status: 404 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const contentType = request.headers.get('content-type') || ''
    let body: Record<string, unknown>

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const icon = formData.get('icon')
      let iconUrl = String(formData.get('current_icon_url') || '').trim() || null

      if (icon instanceof File && icon.size > 0) {
        const filePath = `services/${crypto.randomUUID()}-${sanitizeFileName(icon.name || 'service-icon.jpg')}`
        const { error: uploadError } = await supabaseAdmin.storage
          .from(uploadBucket)
          .upload(filePath, icon, {
            cacheControl: '3600',
            upsert: false,
            contentType: icon.type || undefined,
          })

        if (uploadError) {
          return NextResponse.json({ error: uploadError.message }, { status: 500 })
        }

        const { data: { publicUrl } } = supabaseAdmin.storage.from(uploadBucket).getPublicUrl(filePath)
        iconUrl = publicUrl
      }

      body = {
        title: String(formData.get('title') || '').trim(),
        description: String(formData.get('description') || '').trim(),
        icon_url: iconUrl,
        order: Number(formData.get('order') || 0),
      }
    } else {
      body = await request.json()
    }

    const { data, error } = await supabaseAdmin.from('services').update(body).eq('id', id).select()
    if (error) throw error
    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Service update error:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabaseAdmin.from('services').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Service deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
