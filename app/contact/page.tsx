'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ParallaxHero } from '@/components/parallax-hero'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

const contactCards = [
  {
    title: 'Office Address',
    body: ['33 Enerhen Road, Enerhen', 'Uvwie LGA, Delta State', 'Ughelli South LGA, Nigeria'],
    icon: MapPin,
  },
  {
    title: 'Call Direct',
    body: ['08076066860'],
    icon: Phone,
    href: 'tel:08076066860',
  },
  {
    title: 'Email Us',
    body: ['obassteelenergy@gmail.com', 'tobaroara@gmail.com'],
    icon: Mail,
  },
  {
    title: 'Business Hours',
    body: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: Closed'],
    icon: Clock3,
  },
]

const connectChannels = [
  {
    label: 'WhatsApp',
    subtext: 'Fast response for active project conversations',
    href: 'https://wa.me/2348076066860',
    icon: MessageCircle,
  },
  {
    label: 'Call',
    subtext: 'Direct line for immediate operational discussions',
    href: 'tel:08076066860',
    icon: Phone,
  },
  {
    label: 'Email',
    subtext: 'Best for scopes, documents, and formal inquiries',
    href: 'mailto:obassteelenergy@gmail.com',
    icon: Mail,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      if (!formspreeEndpoint) {
        throw new Error('Formspree endpoint is not configured.')
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `New contact form message from ${formData.name}`,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || result.error || 'Failed to send message.')
      }

      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="w-full bg-background">
      <Navigation />

      <ParallaxHero
        className="min-h-[78vh] px-4 pt-36 pb-24 sm:px-6 lg:px-8"
        imageUrl="/img11.jpeg"
        position="bottom"
        overlay="heavy"
      >
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-end">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-accent/40 bg-background/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
              Contact
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Let&apos;s discuss the project requirements, operating conditions, and delivery expectations that matter to your site.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80 md:text-xl">
              Reach out for industrial support, project coordination, maintenance discussions, or broader engineering-related inquiries.
            </p>
          </div>
        </div>
      </ParallaxHero>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                viewport={{ once: true }}
                className={`rounded-[28px] p-6 backdrop-blur-sm ${
                  card.title === 'Call Direct' || card.title === 'Email Us'
                    ? 'border border-accent/45 bg-[linear-gradient(160deg,rgba(249,202,36,0.12),rgba(17,24,41,0.72))] shadow-[0_24px_80px_-40px_rgba(249,202,36,0.42)]'
                    : 'border border-border/75 bg-card/50'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-foreground">{card.title}</h2>
                <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                  {card.body.map((line) => (
                    <div key={line}>
                      {card.href && card.body[0] === line ? (
                        <a href={card.href} className="text-accent hover:underline">
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-border/75 bg-card/50 p-8 backdrop-blur-sm md:p-10"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Connect
            </div>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              Fast contact options for ongoing project conversations
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
              Use the channel that fits the urgency of the conversation. WhatsApp is ideal for quick coordination, while email works better for documents, scopes, and formal project details.
            </p>

            <div className="mt-8 space-y-4">
              {connectChannels.map((channel, idx) => {
                const Icon = channel.icon
                return (
                  <motion.a
                    key={channel.label}
                    href={channel.href}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 rounded-[24px] border border-border/70 bg-background/35 p-5 transition-all hover:border-accent/35 hover:bg-background/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground">{channel.label}</div>
                      <div className="mt-1 text-sm leading-7 text-muted-foreground">{channel.subtext}</div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-accent/20 bg-[linear-gradient(160deg,rgba(39,60,117,0.58),rgba(17,24,41,0.95))] p-8 backdrop-blur-sm md:p-10"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Contact Form
            </div>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border/70 bg-background/35 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent"
                  placeholder="Your name"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-border/70 bg-background/35 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-bold text-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/70 bg-background/35 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-bold text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-border/70 bg-background/35 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent"
                  placeholder="Tell us about your project, scope, or inquiry"
                />
              </div>

              {submitSuccess && (
                <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  Message sent successfully.
                </div>
              )}

              {submitError && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
