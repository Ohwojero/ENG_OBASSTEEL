import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { ServicesSection } from '@/components/services-section'
import { ProjectsSection } from '@/components/projects-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { supabaseAdmin } from '@/lib/supabase-server'

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

export default async function Home() {
  const [services, projects, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
  ])

  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />

      <Footer />
    </main>
  )
}
