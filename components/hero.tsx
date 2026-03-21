'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { FloatingParticles } from './floating-particles'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let rafId = 0

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      target.x = Math.max(-0.5, Math.min(0.5, x))
      target.y = Math.max(-0.5, Math.min(0.5, y))
    }

    const handlePointerLeave = () => {
      target.x = 0
      target.y = 0
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return
      const touch = event.touches[0]
      const rect = hero.getBoundingClientRect()
      const x = (touch.clientX - rect.left) / rect.width - 0.5
      const y = (touch.clientY - rect.top) / rect.height - 0.5
      target.x = Math.max(-0.5, Math.min(0.5, x))
      target.y = Math.max(-0.5, Math.min(0.5, y))
    }

    const handleTouchEnd = () => {
      target.x = 0
      target.y = 0
    }

    const animate = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08

      layerRefs.current.forEach((layer) => {
        if (!layer) return
        const depth = Number(layer.dataset.depth || '1')
        const moveX = current.x * depth * 40
        const moveY = current.y * depth * 40
        const rotateX = current.y * depth * 6
        const rotateY = current.x * depth * 6
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
      })

      rafId = window.requestAnimationFrame(animate)
    }

    rafId = window.requestAnimationFrame(animate)
    hero.addEventListener('pointermove', handlePointerMove)
    hero.addEventListener('pointerleave', handlePointerLeave)
    hero.addEventListener('touchmove', handleTouchMove, { passive: true })
    hero.addEventListener('touchend', handleTouchEnd)

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', handlePointerLeave)
      hero.removeEventListener('touchmove', handleTouchMove)
      hero.removeEventListener('touchend', handleTouchEnd)
      window.cancelAnimationFrame(rafId)
    }
  }, [])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-cover bg-fixed parallax-fixed hero-bg"
      style={{ backgroundImage: "url('/img12.jpeg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/45 via-primary/25 to-background/55"></div>
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Parallax 3D Layers */}
      <div className="absolute inset-0 [perspective:1200px] pointer-events-none">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          <div
            ref={(el) => {
              layerRefs.current[0] = el
            }}
            data-depth="1.6"
            className="absolute -top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,195,18,0.28),rgba(39,60,117,0.12)_55%,transparent_70%)] blur-2xl"
          />
          <div
            ref={(el) => {
              layerRefs.current[1] = el
            }}
            data-depth="1.1"
            className="absolute top-16 right-[-6rem] h-[22rem] w-[22rem] rounded-full border border-accent/20 bg-[radial-gradient(circle_at_60%_40%,rgba(39,60,117,0.28),transparent_70%)] shadow-[0_0_50px_rgba(255,195,18,0.16)]"
          />
          <div
            ref={(el) => {
              layerRefs.current[2] = el
            }}
            data-depth="0.9"
            className="absolute bottom-[-6rem] left-[-4rem] h-[18rem] w-[28rem] rotate-6 rounded-[3rem] bg-[linear-gradient(120deg,rgba(39,60,117,0.45),rgba(255,195,18,0.12))] blur-[2px] shadow-[0_20px_80px_rgba(39,60,117,0.3)]"
          />
          <div
            ref={(el) => {
              layerRefs.current[3] = el
            }}
            data-depth="0.6"
            className="absolute bottom-10 right-20 h-40 w-40 rounded-full border border-accent/25 bg-[radial-gradient(circle,rgba(255,195,18,0.12),transparent_70%)]"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 text-balance"
          >
            <span className="text-accent drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]">
              Transform Your Energy
            </span>
            <br />
            <span className="text-foreground">Infrastructure</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg md:text-xl text-foreground/85 max-w-2xl mx-auto mb-6 sm:mb-8 text-balance"
          >
            Innovative flow station operations, pipeline management, and industrial solutions powering Nigeria&apos;s energy sector.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-accent drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] bg-black/25">
              <span className="h-2 w-2 rounded-full bg-accent"></span>
              Leading Oil & Gas Engineering Solutions
            </div>
          </motion.div>


          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-8 py-3 sm:py-4 bg-accent text-accent-foreground rounded-lg font-bold text-sm sm:text-lg transition-all hover:shadow-lg hover:shadow-accent/50"
              >
                View Projects
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-8 py-3 sm:py-4 border-2 border-accent text-accent rounded-lg font-bold text-sm sm:text-lg transition-all hover:bg-accent/10"
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '24/7', label: 'Support' },
              { number: 'Safe', label: 'Work Practices' },
              { number: 'Quality', label: 'Standards' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-3 sm:p-4"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 sm:mb-2 drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-foreground/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
