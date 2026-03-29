'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/types'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const fallbackSlides = [
    { id: 'img7', title: 'Field Operations', image: '/img7.jpeg' },
    { id: 'img8', title: 'Pipeline Systems', image: '/img8.jpeg' },
    { id: 'img9', title: 'Flow Station', image: '/img9.jpeg' },
    { id: 'img10', title: 'Maintenance', image: '/img10.jpeg' },
  ]

  const slides = projects.length
    ? projects.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.image_url || '/img7.jpeg',
      }))
    : fallbackSlides

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const id = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 3500)
    return () => window.clearInterval(id)
  }, [emblaApi])

  return (
    <section className="bg-background px-4 pt-20 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Project Highlights
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="h-10 w-10 rounded-full border border-border bg-background/80 transition-colors hover:bg-muted/40"
                aria-label="Previous slide"
              >
                &larr;
              </button>
              <button
                onClick={scrollNext}
                className="h-10 w-10 rounded-full border border-border bg-background/80 transition-colors hover:bg-muted/40"
                aria-label="Next slide"
              >
                &rarr;
              </button>
            </div>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-stretch gap-6">
              {slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="flex min-w-[300px] sm:min-w-[380px] lg:min-w-[460px]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="group relative flex min-h-[24rem] w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 text-left backdrop-blur-sm"
                  >
                    <div className="h-72 w-full overflow-hidden sm:h-80">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div className="min-h-[3.5rem] text-lg font-semibold text-foreground">
                        {slide.title}
                      </div>
                      <div className="mt-2 inline-flex items-center text-sm font-semibold text-accent">
                        View More &rarr;
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={slides[activeIndex].image}
              alt={slides[activeIndex].title}
              className="max-h-[85vh] w-full rounded-lg object-contain"
            />
            <button
              type="button"
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/60 text-xl leading-none text-white"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <button
              type="button"
              className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-black/60 text-2xl text-white"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === null ? null : (prev - 1 + slides.length) % slides.length
                )
              }
              aria-label="Previous"
            >
              &#8249;
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-black/60 text-2xl text-white"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === null ? null : (prev + 1) % slides.length
                )
              }
              aria-label="Next"
            >
              &#8250;
            </button>
            <div className="mt-3 text-center text-sm text-white/80">{slides[activeIndex].title}</div>
          </div>
        </div>
      )}
    </section>
  )
}
