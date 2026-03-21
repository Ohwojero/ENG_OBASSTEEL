'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function NewProject() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [selectedImageName, setSelectedImageName] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    category: 'Flow Station',
    problem: '',
    solution: '',
    result: '',
    slug: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: value.toLowerCase().trim().replace(/\s+/g, '-') }),
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const submitData = new FormData(e.currentTarget)
      Object.entries(formData).forEach(([key, value]) => submitData.set(key, value))

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: submitData,
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to create project')
        return
      }

      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating project')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-8">
        <Link href="/admin" className="mb-6 inline-block text-accent hover:underline">
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card/50 p-8"
        >
          <h1 className="mb-6 text-3xl font-bold text-foreground">Create New Project</h1>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                >
                  <option>Flow Station</option>
                  <option>Pipeline</option>
                  <option>Maintenance</option>
                  <option>Construction</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                  placeholder="Project location"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Project Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setSelectedImageName(e.target.files?.[0]?.name || '')}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:font-semibold file:text-accent-foreground hover:file:opacity-90"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {selectedImageName || 'Choose an image from a phone or computer.'}
                </p>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                placeholder="Project description"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Problem</label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                  placeholder="What was the challenge?"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Solution</label>
                <textarea
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                  placeholder="How did you solve it?"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Result</label>
                <textarea
                  name="result"
                  value={formData.result}
                  onChange={handleChange}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                  placeholder="What was the outcome?"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">URL Slug (auto-generated)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
                placeholder="auto-generated-slug"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-accent px-6 py-3 font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
              <Link
                href="/admin"
                className="rounded-lg border border-border px-6 py-3 font-bold text-foreground transition-all hover:bg-border/20"
              >
                Cancel
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
