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
    const { data, error } = await supabaseAdmin.from('testimonials').select('*').eq('id', id).single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Testimonial fetch error:', error)
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
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
      const image = formData.get('image')
      let imageUrl = String(formData.get('current_image_url') || '').trim() || null

      if (image instanceof File && image.size > 0) {
        const filePath = `testimonials/${crypto.randomUUID()}-${sanitizeFileName(image.name || 'testimonial.jpg')}`
        const { error: uploadError } = await supabaseAdmin.storage
          .from(uploadBucket)
          .upload(filePath, image, {
            cacheControl: '3600',
            upsert: false,
            contentType: image.type || undefined,
          })

        if (uploadError) {
          return NextResponse.json({ error: uploadError.message }, { status: 500 })
        }

        const { data: { publicUrl } } = supabaseAdmin.storage.from(uploadBucket).getPublicUrl(filePath)
        imageUrl = publicUrl
      }

      body = {
        client_name: String(formData.get('client_name') || '').trim(),
        company: String(formData.get('company') || '').trim() || null,
        feedback: String(formData.get('feedback') || '').trim(),
        image_url: imageUrl,
        rating: Number(formData.get('rating') || 5),
      }
    } else {
      body = await request.json()
    }

    const { data, error } = await supabaseAdmin.from('testimonials').update(body).eq('id', id).select()
    if (error) throw error
    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Testimonial update error:', error)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Testimonial deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
