'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type AboutRevealProps = {
  children: ReactNode
  from?: 'left' | 'right' | 'up'
  delay?: number
  className?: string
}

const initialMap = {
  left: { opacity: 0, x: -56 },
  right: { opacity: 0, x: 56 },
  up: { opacity: 0, y: 36 },
}

export function AboutReveal({
  children,
  from = 'up',
  delay = 0,
  className = '',
}: AboutRevealProps) {
  return (
    <motion.div
      initial={initialMap[from]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
