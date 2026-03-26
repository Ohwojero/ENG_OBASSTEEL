import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { ServicesSection } from '@/components/services-section'
import { ProjectsSection } from '@/components/projects-section'
import { ProjectVideosSection } from '@/components/project-videos-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { supabaseAdmin } from '@/lib/supabase-server'
import fs from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-dynamic'

async function getServices() {
  try {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('order', { ascending: true })
      .limit(6)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

async function getProjects() {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

async function getTestimonials() {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return []
  }
}

async function getProjectVideos() {
  try {
    const videosDir = path.join(process.cwd(), 'public', 'videos')
    const files = await fs.readdir(videosDir)

    return files
      .filter((file) => file.toLowerCase().endsWith('.mp4'))
      .sort()
      .map((file, index) => ({
        title: `Project Video ${index + 1}`,
        src: `/videos/${encodeURIComponent(file)}`,
      }))
  } catch (error) {
    console.error('Failed to load project videos:', error)
    return []
  }
}

export default async function Home() {
  const [services, projects, videos, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getProjectVideos(),
    getTestimonials(),
  ])

  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      <ProjectVideosSection videos={videos} />
      <TestimonialsSection testimonials={testimonials} />

      <Footer />
    </main>
  )
}
