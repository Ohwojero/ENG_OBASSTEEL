'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase-client'
import { Testimonial } from '@/lib/types'
import { TestimonialCard } from './testimonial-card'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [clientTestimonials, setClientTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (testimonials.length === 0 && supabase) {
      setLoading(true)
      supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8)
        .then(({ data, error }) => {
          if (error) {
            console.error('Client testimonials fetch error:', error)
          } else {
            setClientTestimonials(data || [])
          }
          setLoading(false)
        })
    }
  }, [])

  const displayTestimonials = testimonials.length > 0 ? testimonials : clientTestimonials

  if (displayTestimonials.length === 0 && !loading) return null

  const marqueeTestimonials = [...displayTestimonials, ...displayTestimonials]
  const duration = Math.max(22, displayTestimonials.length * 5)

  return (
    <section className="overflow-hidden bg-background pt-4 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Client Testimonials
          </span>
          <h2 className="mt-5 mb-4 text-4xl font-bold text-foreground text-balance md:text-5xl">
            Proof From the Field, Not Empty Claims
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A continuous stream of client feedback from projects delivered across industrial and energy operations.
          </p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {loading 
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="flex h-64 w-80 shrink-0 animate-pulse rounded-2xl bg-muted/50" />
                ))
              : marqueeTestimonials.map((testimonial, idx) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${idx}`}
                    testimonial={testimonial}
                    index={idx}
                  />
                ))
            }
          </motion.div>
        </div>
      </div>
    </section>
  )
}
