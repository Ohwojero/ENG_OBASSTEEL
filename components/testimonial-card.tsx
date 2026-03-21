'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Testimonial } from '@/lib/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative w-[320px] flex-shrink-0 sm:w-[360px]"
    >
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-accent/15 via-transparent to-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full overflow-hidden rounded-[28px] border border-border/70 bg-card/75 p-6 backdrop-blur-md transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_38%)] opacity-80" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <div className="relative z-10">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex gap-1 text-accent">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-base leading-none">&#9733;</span>
              ))}
            </div>
            {testimonial.company && (
              <span className="rounded-full border border-border/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {testimonial.company}
              </span>
            )}
          </div>

          <p className="mb-8 text-base leading-7 text-foreground/85">
            &ldquo;{testimonial.feedback}&rdquo;
          </p>

          <div className="flex items-center gap-4 border-t border-border/70 pt-4">
            {testimonial.image_url ? (
              <Image
                src={testimonial.image_url}
                alt={testimonial.client_name}
                width={52}
                height={52}
                className="h-[52px] w-[52px] rounded-full object-cover ring-1 ring-border"
              />
            ) : (
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-sm font-bold text-primary-foreground shadow-lg shadow-accent/20">
                {testimonial.client_name[0]}
              </div>
            )}
            <div>
              <h4 className="text-sm font-bold tracking-[0.02em] text-foreground">{testimonial.client_name}</h4>
              <p className="text-xs text-muted-foreground">Verified industrial client</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
