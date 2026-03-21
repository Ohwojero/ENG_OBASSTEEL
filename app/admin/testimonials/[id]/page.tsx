'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function EditTestimonial() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImageName, setSelectedImageName] = useState('')
  const [formData, setFormData] = useState({
    client_name: '',
    company: '',
    feedback: '',
    rating: 5,
    current_image_url: '',
  })

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/testimonials/${params.id}`)
      const result = await response.json()
      if (response.ok) {
        setFormData({
          client_name: result.client_name || '',
          company: result.company || '',
          feedback: result.feedback || '',
          rating: result.rating || 5,
          current_image_url: result.image_url || '',
        })
      }
      setLoading(false)
    })()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const submitData = new FormData(e.currentTarget)
    submitData.set('client_name', formData.client_name)
    submitData.set('company', formData.company)
    submitData.set('feedback', formData.feedback)
    submitData.set('rating', String(formData.rating))
    submitData.set('current_image_url', formData.current_image_url)
    const response = await fetch(`/api/testimonials/${params.id}`, { method: 'PUT', body: submitData })
    if (response.ok) router.push('/admin')
    setIsSubmitting(false)
  }

  if (loading) return <div className="min-h-screen bg-background p-8 text-foreground">Loading testimonial...</div>

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl p-8">
        <Link href="/admin" className="mb-6 inline-block text-accent hover:underline">Back</Link>
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h1 className="mb-6 text-3xl font-bold text-foreground">Edit Testimonial</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} required className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Client Name" />
            <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Company" />
            <textarea value={formData.feedback} onChange={(e) => setFormData({ ...formData, feedback: e.target.value })} required rows={4} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Feedback" />
            <div>
              <input type="hidden" name="current_image_url" value={formData.current_image_url} />
              <input type="file" name="image" accept="image/*" onChange={(e) => setSelectedImageName(e.target.files?.[0]?.name || '')} className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:font-semibold file:text-accent-foreground" />
              <p className="mt-2 text-xs text-muted-foreground">{selectedImageName || formData.current_image_url || 'Keep current image or choose a new one.'}</p>
            </div>
            <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent">
              <option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option><option value={2}>2 Stars</option><option value={1}>1 Star</option>
            </select>
            <div className="flex gap-4">
              <button type="submit" disabled={isSubmitting} className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
              <Link href="/admin" className="rounded-lg border border-border px-6 py-2">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
