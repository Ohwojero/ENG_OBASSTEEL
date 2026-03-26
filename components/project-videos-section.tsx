'use client'

import { motion } from 'framer-motion'

type ProjectVideo = {
  title: string
  src: string
}

interface ProjectVideosSectionProps {
  videos: ProjectVideo[]
}

export function ProjectVideosSection({ videos }: ProjectVideosSectionProps) {
  if (videos.length === 0) return null

  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Project <span className="text-accent">Videos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A quick look at field activity, site conditions, and delivery moments from selected projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {videos.map((video, idx) => (
            <motion.div
              key={video.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[28px] border border-border bg-card/50 p-4 backdrop-blur-sm"
            >
              <div className="overflow-hidden rounded-[22px] border border-border/70 bg-black">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-[4/5] w-full object-cover md:aspect-video"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-bold text-foreground">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
