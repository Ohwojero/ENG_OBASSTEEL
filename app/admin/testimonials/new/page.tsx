'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewTestimonial() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImageName, setSelectedImageName] = useState('')
  const [formData, setFormData] = useState({
    client_name: '',
    company: '',
    feedback: '',
    rating: 5,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData(e.currentTarget)
      submitData.set('client_name', formData.client_name)
      submitData.set('company', formData.company)
      submitData.set('feedback', formData.feedback)
      submitData.set('rating', String(formData.rating))

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: submitData,
      })

      if (!response.ok) throw new Error('Failed')
      router.push('/admin')
    } catch {
      alert('Error creating testimonial')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl p-8">
        <Link href="/admin" className="mb-6 inline-block text-accent hover:underline">
          Back
        </Link>

        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">New Testimonial</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Add client feedback and optionally upload a photo from a phone or computer.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="client_name"
              placeholder="Client Name"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
            />
            <textarea
              name="feedback"
              placeholder="Feedback"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
            />

            <div className="rounded-lg border border-dashed border-border bg-card/30 p-4">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Client Photo
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setSelectedImageName(e.target.files?.[0]?.name || '')}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:font-semibold file:text-accent-foreground hover:file:opacity-90"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {selectedImageName || 'No file selected. Phones and computers can pick an image here.'}
              </p>
            </div>

            <select
              name="rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
              className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
              <Link href="/admin" className="rounded-lg border border-border px-6 py-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
