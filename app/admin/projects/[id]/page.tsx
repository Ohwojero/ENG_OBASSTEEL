'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function EditProject() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImageName, setSelectedImageName] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    category: 'Flow Station',
    problem: '',
    solution: '',
    result: '',
    slug: '',
    current_image_url: '',
  })

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/projects/${params.id}`)
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'Failed to load project')
        setLoading(false)
        return
      }
      setFormData({
        title: result.title || '',
        location: result.location || '',
        description: result.description || '',
        category: result.category || 'Flow Station',
        problem: result.problem || '',
        solution: result.solution || '',
        result: result.result || '',
        slug: result.slug || '',
        current_image_url: result.image_url || '',
      })
      setLoading(false)
    })()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const submitData = new FormData(e.currentTarget)
    Object.entries(formData).forEach(([key, value]) => submitData.set(key, value))

    const response = await fetch(`/api/projects/${params.id}`, {
      method: 'PUT',
      body: submitData,
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error || 'Failed to update project')
      setIsSubmitting(false)
      return
    }

    router.push('/admin')
  }

  if (loading) return <div className="min-h-screen bg-background p-8 text-foreground">Loading project...</div>

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-8">
        <Link href="/admin" className="mb-6 inline-block text-accent hover:underline">Back to Dashboard</Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card/50 p-8">
          <h1 className="mb-6 text-3xl font-bold text-foreground">Edit Project</h1>
          {error && <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-red-400">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Title" />
              <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent">
                <option>Flow Station</option><option>Pipeline</option><option>Maintenance</option><option>Construction</option>
              </select>
              <input name="location" value={formData.location} onChange={handleChange} required className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Location" />
              <div>
                <input type="hidden" name="current_image_url" value={formData.current_image_url} />
                <input type="file" name="image" accept="image/*" onChange={(e) => setSelectedImageName(e.target.files?.[0]?.name || '')} className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:font-semibold file:text-accent-foreground" />
                <p className="mt-2 text-xs text-muted-foreground">{selectedImageName || formData.current_image_url || 'Keep current image or select a new one.'}</p>
              </div>
            </div>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Description" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <textarea name="problem" value={formData.problem} onChange={handleChange} rows={3} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Problem" />
              <textarea name="solution" value={formData.solution} onChange={handleChange} rows={3} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Solution" />
              <textarea name="result" value={formData.result} onChange={handleChange} rows={3} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Result" />
            </div>
            <input name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Slug" />
            <div className="flex gap-4">
              <button type="submit" disabled={isSubmitting} className="rounded-lg bg-accent px-6 py-3 font-bold text-accent-foreground">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
              <Link href="/admin" className="rounded-lg border border-border px-6 py-3 font-bold text-foreground">Cancel</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
