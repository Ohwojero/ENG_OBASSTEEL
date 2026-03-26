'use client'

import { motion } from 'framer-motion'
import { Service } from '@/lib/types'

interface ServiceCardProps {
  service: Service
  index?: number
}

const fallbackImages = ['/img3.jpeg', '/img4.jpeg', '/img5.jpeg', '/img6.jpeg', '/img7.jpeg', '/img8.jpeg']

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const imageSrc = service.icon_url || fallbackImages[index % fallbackImages.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[30px] border border-border/75 bg-card/55 backdrop-blur-sm transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_28px_90px_-46px_rgba(0,0,0,0.65)]">
        <div className="relative h-64 overflow-hidden sm:h-72">
          <img
            src={imageSrc}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-7">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Service {`0${index + 1}`}
          </div>
          <h3 className="mt-3 text-2xl font-bold text-foreground">{service.title}</h3>
          <p className="mt-4 line-clamp-5 text-sm leading-8 text-muted-foreground">
            {service.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Industrial Service
            </div>
            <div className="text-sm font-semibold text-accent">
              Project-ready support
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
