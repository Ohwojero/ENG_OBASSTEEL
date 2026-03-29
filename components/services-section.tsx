'use client'

import { motion } from 'framer-motion'
import { Service } from '@/lib/types'
import Link from 'next/link'

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for your oil and gas operations
          </p>
        </motion.div>

        {/* Services Grid (3 featured cards) */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {services.slice(0, 3).map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm min-h-[460px]"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={service.icon_url || (idx === 0 ? '/img3.jpeg' : idx === 1 ? '/img4.jpeg' : '/img5.jpeg')}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent"></div>
                </div>
                <div className="relative z-10 flex min-h-[200px] flex-col p-6 pb-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link href="/services">
                      <button className="w-full rounded-lg border border-accent bg-transparent px-4 py-2 text-sm font-semibold text-accent opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        View Service
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="pointer-events-none absolute -left-12 bottom-20 h-28 w-28 rounded-full bg-primary/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-60"></div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 rounded-2xl border border-border bg-card/50 p-10 text-center backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-foreground">No services available yet</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              When services are added from the admin dashboard, they will appear here automatically.
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-bold transition-all hover:bg-accent/10"
            >
              View All Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
