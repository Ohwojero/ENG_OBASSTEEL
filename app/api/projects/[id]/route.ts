import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const byId = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (byId.data) return NextResponse.json(byId.data)

    const bySlug = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('slug', id)
      .maybeSingle()

    if (bySlug.error || !bySlug.data) throw bySlug.error || new Error('Project not found')

    return NextResponse.json(bySlug.data)
  } catch (error) {
    console.error('Project fetch error:', error)
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
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
        const filePath = `projects/${crypto.randomUUID()}-${String(image.name || 'project-image.jpg').replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()}`
        const { error: uploadError } = await supabaseAdmin.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'uploads')
          .upload(filePath, image, {
            cacheControl: '3600',
            upsert: false,
            contentType: image.type || undefined,
          })

        if (uploadError) {
          return NextResponse.json({ error: uploadError.message }, { status: 500 })
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'uploads')
          .getPublicUrl(filePath)

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
      .update(body)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Project update error:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Project deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
