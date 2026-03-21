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
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Projects fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
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
        const filePath = `projects/${crypto.randomUUID()}-${sanitizeFileName(image.name || 'project-image.jpg')}`
        const { error: uploadError } = await supabaseAdmin.storage
          .from(uploadBucket)
          .upload(filePath, image, {
            cacheControl: '3600',
            upsert: false,
            contentType: image.type || undefined,
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

        imageUrl = publicUrl
      }

      body = {
        title: String(formData.get('title') || '').trim(),
        location: String(formData.get('location') || '').trim(),
        description: String(formData.get('description') || '').trim(),
        image_url: imageUrl,
        category: String(formData.get('category') || '').trim(),
        problem: String(formData.get('problem') || '').trim() || null,
        solution: String(formData.get('solution') || '').trim() || null,
        result: String(formData.get('result') || '').trim() || null,
        slug: String(formData.get('slug') || '').trim(),
      }
    } else {
      body = await request.json()
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert(body)
      .select()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create project', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
