import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ParallaxHero } from '@/components/parallax-hero'
import { ProjectCard } from '@/components/project-card'
import { AboutReveal } from '@/components/about-reveal'
import { supabaseAdmin } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

async function getProjects() {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export const metadata = {
  title: 'Projects | OBASSTEEL PROJECT LIMITED',
  description: 'Explore our completed projects and case studies.',
}

export default async function Projects() {
  const projects = await getProjects()

  return (
    <main className="w-full overflow-x-hidden bg-background">
      <Navigation />

      <ParallaxHero
        className="min-h-[80vh] px-4 pt-36 pb-24 sm:px-6 lg:px-8"
        imageUrl="/img9.jpeg"
        position="top"
        overlay="heavy"
      >
        <div className="mx-auto flex min-h-[62vh] max-w-6xl items-end">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-accent/40 bg-background/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
              Projects
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Project delivery shaped by field realities, technical discipline, and operational accountability.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80 md:text-xl">
              Explore selected work delivered across industrial environments, with execution focused on safety, continuity, and measurable site value.
            </p>
          </div>
        </div>
      </ParallaxHero>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <AboutReveal from="left">
            <div className="rounded-[32px] border border-border/80 bg-card/55 p-8 backdrop-blur-sm md:p-10">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Project Portfolio
              </div>
              <h2 className="max-w-2xl text-3xl font-bold text-foreground md:text-4xl">
                Work selected to reflect execution quality, not just activity volume.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                <p>
                  Our project portfolio brings together assignments delivered in live operational environments where planning discipline, field coordination, and technical follow-through all matter.
                </p>
                <p>
                  Each entry represents a practical response to industrial demands, with attention given to schedule control, safety expectations, and the realities of site execution.
                </p>
              </div>
            </div>
          </AboutReveal>

          <AboutReveal from="right" delay={0.08}>
            <div className="grid gap-5">
              {[
                {
                  title: 'Execution-Led Delivery',
                  text: 'Projects are approached through site realities, supervision discipline, and responsive coordination.',
                },
                {
                  title: 'Operational Reliability',
                  text: 'The goal is not just completion, but work that supports continuity and long-term operating confidence.',
                },
                {
                  title: 'Industrial Focus',
                  text: 'Assignments reflect the demands of plants, field operations, maintenance programs, and energy infrastructure.',
                },
              ].map((item, idx) => (
                <AboutReveal key={item.title} from={idx % 2 === 0 ? 'right' : 'left'} delay={idx * 0.06}>
                  <div className="rounded-[28px] border border-border/75 bg-card/45 p-6 backdrop-blur-xl">
                    <div
                      className={`rounded-[24px] p-6 backdrop-blur-xl ${
                        idx === 0 || idx === 2
                          ? 'border border-accent/45 bg-[linear-gradient(160deg,rgba(249,202,36,0.12),rgba(17,24,41,0.76))] shadow-[0_28px_90px_-38px_rgba(249,202,36,0.45)]'
                          : 'border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(17,24,41,0.76))] shadow-[0_28px_90px_-44px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                        {`0${idx + 1}`}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </AboutReveal>
              ))}
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Featured Work
            </div>
            <h2 className="mt-3 text-4xl font-bold text-foreground">
              Selected projects across industrial and energy operations
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
              A closer look at delivered work, presented as practical case examples from our operating environment.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, idx) => (
                <AboutReveal
                  key={project.id}
                  from={idx % 2 === 0 ? 'left' : 'right'}
                  delay={idx * 0.06}
                >
                  <ProjectCard project={project} index={idx} />
                </AboutReveal>
              ))}
            </div>
          ) : (
            <AboutReveal from="up">
              <div className="rounded-[32px] border border-border/75 bg-card/45 p-12 text-center backdrop-blur-sm">
                <div className="mb-4 text-5xl">🏗️</div>
                <p className="text-lg text-muted-foreground">Projects will be displayed here</p>
                <p className="mt-3 text-sm text-muted-foreground">Admin: Go to `/admin` to add projects</p>
              </div>
            </AboutReveal>
          )}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-accent/20 bg-[linear-gradient(160deg,rgba(39,60,117,0.58),rgba(17,24,41,0.95))] p-8 text-center backdrop-blur-sm md:p-12">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
            Next Step
          </div>
          <h2 className="mt-4 text-4xl font-bold text-foreground">
            Ready for your next project?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground/78">
            Let&apos;s discuss how we can support your operations with structured delivery and dependable field execution.
          </p>
          <a href="/contact">
            <button className="mt-8 rounded-lg bg-accent px-8 py-4 text-lg font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50">
              Start Now
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
