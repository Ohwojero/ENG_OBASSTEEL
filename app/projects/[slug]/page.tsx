import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { supabaseAdmin } from '@/lib/supabase-server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ParallaxHero } from '@/components/parallax-hero'

async function getProject(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) return null
    return data
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | OBASSTEEL PROJECT LIMITED`,
    description: project.description,
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="w-full">
      <Navigation />

      {/* Hero Section */}
      <ParallaxHero
        imageUrl={project.image_url || '/placeholder.jpg'}
        className="h-[24rem] pt-32 sm:h-[32rem] sm:pt-32 lg:h-[42rem] lg:pt-36"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end p-5 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-6xl">
            <div className="inline-block px-4 py-2 bg-accent/90 text-accent-foreground rounded-full text-sm font-bold mb-4">
              {project.category}
            </div>
            <h1 className="mb-4 max-w-4xl text-3xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">{project.title}</h1>
            <p className="text-xl text-gray-200">📍 {project.location}</p>
          </div>
        </div>
      </ParallaxHero>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Project Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem, Solution, Result */}
          {(project.problem || project.solution || project.result) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {project.problem && (
                <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-accent mb-3">🎯 Problem</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-accent mb-3">💡 Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                </div>
              )}
              {project.result && (
                <div className="p-6 rounded-xl border border-accent/30 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-accent mb-3">✨ Result</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.result}</p>
                </div>
              )}
            </div>
          )}

          {/* Details */}
          <div className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Project Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Category</div>
                <div className="font-bold text-foreground">{project.category}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div className="font-bold text-foreground">{project.location}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Completed</div>
                <div className="font-bold text-foreground">
                  {new Date(project.created_at).getFullYear()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="font-bold text-accent">✓ Completed</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Interested in Similar Projects?</h3>
            <Link href="/contact">
              <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-accent/50">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Related Projects</h2>
          <div className="text-center">
            <Link href="/projects">
              <button className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-bold transition-all hover:bg-accent/10">
                View All Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
