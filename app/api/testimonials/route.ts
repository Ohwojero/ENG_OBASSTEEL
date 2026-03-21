import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const testimonialBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'uploads'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!serviceRoleKey || serviceRoleKey === 'your-service-role-key-here') {
      return NextResponse.json(
        { error: 'Supabase service role key is missing or still using the placeholder value in .env' },
        { status: 500 }
      )
    }

    const contentType = request.headers.get('content-type') || ''
    let body: Record<string, unknown>

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const image = formData.get('image')
      let imageUrl: string | null = null

      if (image instanceof File && image.size > 0) {
        const fileExt = image.name.includes('.') ? image.name.split('.').pop() : 'jpg'
        const filePath = `testimonials/${crypto.randomUUID()}-${sanitizeFileName(
          image.name || `image.${fileExt}`
        )}`

        const { error: uploadError } = await supabaseAdmin.storage
          .from(testimonialBucket)
          .upload(filePath, image, {
            cacheControl: '3600',
            upsert: false,
            contentType: image.type || undefined,
          })

        if (uploadError) {
          return NextResponse.json(
            {
              error: `Image upload failed for bucket "${testimonialBucket}". Check that the bucket exists and is public, and that the service role key is valid.`,
              details: uploadError.message,
            },
            { status: 500 }
          )
        }

        const {
          data: { publicUrl },
        } = supabaseAdmin.storage.from(testimonialBucket).getPublicUrl(filePath)

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

    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert(body)
      .select()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to insert testimonial row', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Testimonial creation error:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
