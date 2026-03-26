import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ParallaxHero } from '@/components/parallax-hero'
import { ServiceCard } from '@/components/service-card'
import { AboutReveal } from '@/components/about-reveal'
import { supabaseAdmin } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

async function getServices() {
  try {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

export const metadata = {
  title: 'Services | OBASSTEEL PROJECT LIMITED',
  description: 'Explore our comprehensive oil and gas engineering services.',
}

export default async function Services() {
  const services = await getServices()

  const defaultServices = [
    {
      title: 'Flow Station Operations & Maintenance',
      description: 'Complete operational support and maintenance for flow stations including equipment monitoring, troubleshooting, and optimization.',
    },
    {
      title: 'Process Engineering & Optimization',
      description: 'Advanced engineering solutions to improve efficiency, reduce downtime, and optimize your production processes.',
    },
    {
      title: 'Pipeline & Facility Management',
      description: 'Expert management of pipeline infrastructure and industrial facilities with focus on safety and compliance.',
    },
    {
      title: 'Separation Systems',
      description: 'Design and implementation of advanced separation systems for efficient oil, gas, and water separation.',
    },
    {
      title: 'Construction & Fabrication',
      description: 'Full-scale construction and fabrication services for industrial structures and equipment.',
    },
    {
      title: 'Safety & Compliance',
      description: 'Comprehensive safety programs and regulatory compliance solutions meeting international standards.',
    },
  ]

  const servicesData = services.length > 0 ? services : defaultServices.map((s, i) => ({
    id: String(i),
    title: s.title,
    description: s.description,
    icon_url: null,
    order: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))

  const servicePillars = [
    {
      title: 'Field Execution',
      text: 'Practical support for active operations where supervision, timing, and safety control matter every day.',
    },
    {
      title: 'Engineering Support',
      text: 'Structured technical input that improves reliability, planning quality, and operational continuity.',
    },
    {
      title: 'Industrial Delivery',
      text: 'Coordinated work across plant, pipeline, maintenance, and fabrication-linked activities.',
    },
  ]

  return (
    <main className="w-full overflow-x-clip bg-background">
      <Navigation />

      <ParallaxHero
        className="min-h-[80vh] px-4 pt-36 pb-24 sm:px-6 lg:px-8"
        imageUrl="/img13.jpeg"
        position="top"
        overlay="heavy"
      >
        <div className="mx-auto flex min-h-[62vh] max-w-6xl items-end">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-accent/40 bg-background/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
              Services
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Industrial services designed for active field realities, technical control, and reliable delivery.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80 md:text-xl">
              OBASSTEEL PROJECT LIMITED supports operations with engineering discipline, responsive execution, and service structures built around actual project demands.
            </p>
          </div>
        </div>
      </ParallaxHero>

      <section className="overflow-x-clip px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <AboutReveal from="left">
            <div className="rounded-[32px] border border-border/80 bg-card/55 p-8 backdrop-blur-sm md:p-10">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Service Structure
              </div>
              <h2 className="max-w-2xl text-3xl font-bold text-foreground md:text-4xl">
                Built around execution pressure, not brochure language.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                <p>
                  Our service model is shaped by what industrial and energy-sector clients actually need: dependable coordination, clear technical thinking, and teams that can work effectively in live operational environments.
                </p>
                <p>
                  Instead of offering disconnected capabilities, the business is structured to support the full chain of planning, field execution, supervision, maintenance response, and ongoing operational improvement.
                </p>
              </div>
            </div>
          </AboutReveal>

          <AboutReveal from="right" delay={0.08}>
            <div className="grid gap-5">
              {servicePillars.map((pillar, idx) => (
                <AboutReveal key={pillar.title} from={idx % 2 === 0 ? 'right' : 'left'} delay={idx * 0.06}>
                  <div className="rounded-[28px] border border-border/75 bg-card/45 p-6 backdrop-blur-xl">
                    <div
                      className={`rounded-[24px] p-6 backdrop-blur-xl ${
                        idx === 1
                          ? 'border border-accent/45 bg-[linear-gradient(160deg,rgba(249,202,36,0.16),rgba(17,24,41,0.76))] shadow-[0_28px_90px_-38px_rgba(249,202,36,0.52)]'
                          : 'border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(17,24,41,0.76))] shadow-[0_28px_90px_-44px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                        {`0${idx + 1}`}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold text-foreground">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{pillar.text}</p>
                    </div>
                  </div>
                </AboutReveal>
              ))}
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="overflow-x-clip px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Service Portfolio
            </div>
            <h2 className="mt-3 text-4xl font-bold text-foreground">
              Core capabilities delivered across industrial operations
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
              A structured view of the services we provide to support field execution, technical coordination, and operational continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {servicesData.map((service, idx) => (
              <AboutReveal
                key={service.id}
                from={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.06}
              >
                <ServiceCard service={service} index={idx} />
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-x-clip px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-accent/20 bg-[linear-gradient(160deg,rgba(39,60,117,0.58),rgba(17,24,41,0.95))] p-8 text-center backdrop-blur-sm md:p-12">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
            Next Step
          </div>
          <h2 className="mt-4 text-4xl font-bold text-foreground">
            Need a service structure built around your operation?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground/78">
            Contact our team to discuss scope, operating conditions, delivery expectations, and the level of support your project requires.
          </p>
          <a href="/contact">
            <button className="mt-8 rounded-lg bg-accent px-8 py-4 text-lg font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50">
              Get In Touch
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
