'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto pl-0 pr-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 flex-1 items-center justify-start group md:flex-none">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="min-w-0 items-center justify-start gap-2 text-left sm:gap-3 flex"
              >
                <div className="ml-1 flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-white p-1.5 sm:h-14 sm:w-14 sm:p-1.5">
                  <img 
                    src="/favicon-logo.png" 
                    alt="OBASSTEEL" 
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center">
                  <div className="text-sm font-bold leading-none text-foreground sm:text-base">OBASSTEEL</div>
                  <div className="mt-1 text-[9px] leading-none text-muted-foreground sm:text-[10px]">PROJECT LIMITED</div>
                </div>
              </motion.div>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className="relative text-sm font-medium transition-colors"
                  whileHover={{ color: '#E6B10F' }}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/50"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex w-10 flex-shrink-0 justify-end md:hidden">
            <motion.button
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-card/70 text-foreground"
            >
              <span className="sr-only">Toggle menu</span>
              <div className="flex flex-col gap-2.5">
                <span className={`h-0.5 w-6 bg-foreground transition-transform ${isOpen ? 'translate-y-2.5 rotate-45' : ''}`}></span>
                <span className={`h-0.5 w-6 bg-foreground transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`h-0.5 w-6 bg-foreground transition-transform ${isOpen ? '-translate-y-2.5 -rotate-45' : ''}`}></span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background/98 backdrop-blur-md"
          >
            <div className="space-y-3 px-4 py-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <div className={`rounded-lg px-1 py-2 text-base font-medium ${isActive(item.href) ? 'text-accent' : 'text-foreground'}`}>
                    {item.label}
                  </div>
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-md font-semibold"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
