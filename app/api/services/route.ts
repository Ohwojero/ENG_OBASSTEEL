import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const uploadBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'uploads'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Services fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
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
      const icon = formData.get('icon')
      let iconUrl: string | null = null

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
          return NextResponse.json(
            {
              error: `Image upload failed for bucket "${uploadBucket}". Check that the bucket exists and is public, and that the service role key is valid.`,
              details: uploadError.message,
            },
            { status: 500 }
          )
        }

        const {
          data: { publicUrl },
        } = supabaseAdmin.storage.from(uploadBucket).getPublicUrl(filePath)

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

    const { data, error } = await supabaseAdmin
      .from('services')
      .insert(body)
      .select()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create service', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Service creation error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
