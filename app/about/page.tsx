import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ParallaxHero } from '@/components/parallax-hero'
import { AboutReveal } from '@/components/about-reveal'
import { supabaseAdmin } from '@/lib/supabase-server'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function getSettings() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return null
  }
}

async function getTeam() {
  try {
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch team:', error)
    return []
  }
}

export const metadata = {
  title: 'About Us | OBASSTEEL PROJECT LIMITED',
  description: 'Learn about OBASSTEEL PROJECT LIMITED, our mission, vision, and team of experts.',
}

export default async function About() {
  const settings = await getSettings()
  const team = await getTeam()

  const values = settings?.values?.length
    ? settings.values
    : ['Integrity', 'Operational Safety', 'Technical Discipline', 'Delivery Excellence']

  const highlights = [
    { label: 'Project Delivery', value: '50+', note: 'industrial and field assignments handled' },
    { label: 'Operational Experience', value: '10+', note: 'years across energy and infrastructure work' },
    { label: 'Execution Standard', value: '100%', note: 'safety-led planning and supervision mindset' },
    { label: 'Client Confidence', value: '24/7', note: 'responsive support for active operations' },
  ]

  return (
    <main className="w-full overflow-x-clip bg-background">
      <Navigation />

      <ParallaxHero
        className="min-h-[78vh] px-4 pt-36 pb-24 sm:px-6 lg:px-8"
        imageUrl="/img2.jpeg"
        position="top"
        overlay="heavy"
      >
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-end">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-accent/40 bg-background/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
              About OBASSTEEL
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Industrial execution shaped by field discipline, technical clarity, and long-term client trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80 md:text-xl">
              OBASSTEEL PROJECT LIMITED supports energy and industrial operations with practical engineering leadership, structured delivery, and a strong safety culture.
            </p>
          </div>
        </div>
      </ParallaxHero>

      <section className="overflow-x-clip px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <AboutReveal from="left">
            <div className="rounded-[32px] border border-border/80 bg-card/55 p-8 backdrop-blur-sm md:p-10">
              <div className="mb-6 text-sm font-semibold uppercase tracking-[0.26em] text-accent">
                Company Overview
              </div>
              <h2 className="max-w-2xl text-3xl font-bold text-foreground md:text-4xl">
                Built to handle serious operational work without noise or guesswork.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                <p>
                  OBASSTEEL PROJECT LIMITED is an industrial services company operating from Delta State, Nigeria, with a practical focus on field operations, engineering coordination, and disciplined execution.
                </p>
                <p>
                  The business has grown by staying useful to clients: understanding site realities, managing pressure without losing process control, and delivering work that aligns with safety, schedule, and operational continuity.
                </p>
                <p>
                  That approach continues to define the company today, whether the assignment involves plant support, maintenance coordination, fabrication-linked work, or broader industrial project delivery.
                </p>
              </div>
            </div>
          </AboutReveal>

          <AboutReveal from="right" delay={0.08}>
            <div className="overflow-hidden rounded-[32px] border border-border/80 bg-card/50">
              <div className="relative min-h-[340px] md:min-h-[420px]">
                <Image
                  src="/img2.jpeg"
                  alt="Eng OBASSTEEL"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent md:via-background/25" />
                <div className="relative z-10 px-4 pt-[220px] pb-4 sm:px-6 md:absolute md:inset-x-0 md:bottom-0 md:px-8 md:pt-0 md:pb-8">
                  <div className="w-full rounded-[24px] border border-accent/20 bg-background/82 p-5 backdrop-blur-md md:max-w-md md:rounded-[28px] md:p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                      Leadership
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-foreground md:text-2xl">
                      Eng OBASSTEEL
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      The company leadership reflects a field-first mindset: solve real operational problems, protect people on site, and deliver work that clients can rely on long after mobilization ends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="overflow-x-clip px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item: {label: string; value: string; note: string}, idx: number) => (
            <AboutReveal
              key={item.label}
              from={idx % 2 === 0 ? 'left' : 'right'}
              delay={idx * 0.06}
            >
              <div
                className={`rounded-[28px] p-6 backdrop-blur-sm ${
                  idx === 2
                    ? 'border border-accent/50 bg-[linear-gradient(160deg,rgba(249,202,36,0.12),rgba(17,24,41,0.68))] shadow-[0_24px_80px_-42px_rgba(249,202,36,0.55)]'
                    : 'border border-border/70 bg-card/45'
                }`}
              >
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-4 text-4xl font-bold text-accent">{item.value}</div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.note}</p>
              </div>
            </AboutReveal>
          ))}
        </div>
      </section>

      <section className="overflow-x-clip px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <AboutReveal from="left">
            <div className="rounded-[32px] border border-border/80 bg-card/55 p-8 backdrop-blur-sm md:p-10">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Mission
              </div>
              <h3 className="text-3xl font-bold text-foreground">Why the company exists</h3>
              <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                {settings?.mission ||
                  "To provide dependable industrial and energy-sector support through disciplined execution, practical engineering thinking, and a strong commitment to safe operations."}
              </p>
            </div>
          </AboutReveal>

          <AboutReveal from="right" delay={0.08}>
            <div className="rounded-[32px] border border-accent/25 bg-[linear-gradient(160deg,rgba(249,202,36,0.10),rgba(17,24,41,0.72))] p-8 backdrop-blur-sm md:p-10">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Vision
              </div>
              <h3 className="text-3xl font-bold text-foreground">What the company is building toward</h3>
              <p className="mt-5 text-base leading-8 text-foreground/78 md:text-lg">
                {settings?.vision ||
                  'To be recognized as a trusted industrial delivery partner known for technical discipline, field reliability, and measurable value across critical operations.'}
              </p>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="overflow-x-clip px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Core Values
            </div>
            <h2 className="mt-3 text-4xl font-bold text-foreground">
              Standards that shape how work gets done
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <AboutReveal from="left">
              <div className="rounded-[32px] border border-border/75 bg-[linear-gradient(160deg,rgba(39,60,117,0.28),rgba(17,24,41,0.92))] p-8 md:p-10">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                    Operating Principles
                  </div>
                  <h3 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                    Every assignment is approached with control, discipline, and clear accountability.
                  </h3>
                  <p className="mt-5 text-base leading-8 text-foreground/78 md:text-lg">
                    These values are not decorative statements. They shape planning, supervision, safety conduct, communication with clients, and the standard expected from every project team.
                  </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  'Structured operational coordination',
                  'Client-aligned project execution',
                  'Safety-governed decision making',
                  'Continuous performance improvement',
                ].map((item: string, idx: number) => (
                    <AboutReveal key={item} from={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.05}>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                          {`0${idx + 1}`}
                        </div>
                        <p className="mt-2 text-sm leading-7 text-foreground/80">{item}</p>
                      </div>
                    </AboutReveal>
                  ))}
                </div>
              </div>
            </AboutReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {values.map((value: string, idx: number) => (
              <AboutReveal key={value} from={idx % 2 === 0 ? 'right' : 'left'} delay={idx * 0.08}>
                <div
                  className={`group relative overflow-hidden rounded-[28px] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/35 ${
                    idx === 0 || idx === 2
                      ? 'border border-accent/45 bg-[linear-gradient(160deg,rgba(249,202,36,0.10),rgba(17,24,41,0.72))] shadow-[0_24px_80px_-42px_rgba(249,202,36,0.45)]'
                      : 'border border-border/70 bg-card/45'
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-70" />
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-lg font-bold text-accent">
                      {`0${idx + 1}`}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Core Standard
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{value}</h3>
                  <div className="mt-5 h-px w-full bg-border/70" />
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {idx === 0 && 'We communicate directly, honor commitments, and keep execution aligned with the work promised.'}
                    {idx === 1 && 'Safety is handled as an operating principle, not a compliance slogan.'}
                    {idx === 2 && 'We bring structured thinking to planning, supervision, and problem-solving in the field.'}
                    {idx === 3 && 'The goal is dependable outcomes, not presentation-heavy process without delivery.'}
                  </p>
                </div>
              </AboutReveal>
            ))}
            </div>
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="overflow-x-clip px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Team
              </div>
              <h2 className="mt-3 text-4xl font-bold text-foreground">
                People behind the delivery
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {team.map((member: any, idx: number) => (
                <AboutReveal
                  key={member.id}
                  from={idx % 2 === 0 ? 'left' : 'right'}
                  delay={idx * 0.06}
                >
                  <div
                    className="overflow-hidden rounded-[30px] border border-border/75 bg-card/50"
                  >
                    <div className="relative h-72 bg-background/60">
                      {member.image_url ? (
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[linear-gradient(160deg,rgba(39,60,117,0.9),rgba(17,24,41,0.92))] text-5xl font-bold text-accent">
                          {member.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                        {member.title}
                      </p>
                      {member.role && (
                        <p className="mt-3 text-sm text-foreground/80">{member.role}</p>
                      )}
                      {member.bio && (
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">{member.bio}</p>
                      )}
                    </div>
                  </div>
                </AboutReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
