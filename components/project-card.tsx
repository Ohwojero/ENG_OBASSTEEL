'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-64 rounded-xl overflow-hidden border border-border bg-card group-hover:border-accent/50 transition-all duration-300 cursor-pointer">
          {/* Image */}
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
          <div className="w-full h-full bg-background/60 flex items-center justify-center">
              <span className="text-4xl">🏭</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-200 mb-3">{project.location}</p>
            <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="mt-4 inline-flex items-center gap-2 text-accent font-medium text-sm"
            >
              View Details → 
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-accent/90 text-accent-foreground rounded-full text-xs font-bold">
            {project.category}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
