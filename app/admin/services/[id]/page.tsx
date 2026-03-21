'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function EditService() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedIconName, setSelectedIconName] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0,
    current_icon_url: '',
  })

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/services/${params.id}`)
      const result = await response.json()
      if (response.ok) {
        setFormData({
          title: result.title || '',
          description: result.description || '',
          order: result.order || 0,
          current_icon_url: result.icon_url || '',
        })
      }
      setLoading(false)
    })()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const submitData = new FormData(e.currentTarget)
    submitData.set('title', formData.title)
    submitData.set('description', formData.description)
    submitData.set('order', String(formData.order))
    submitData.set('current_icon_url', formData.current_icon_url)
    const response = await fetch(`/api/services/${params.id}`, { method: 'PUT', body: submitData })
    if (response.ok) router.push('/admin')
    setIsSubmitting(false)
  }

  if (loading) return <div className="min-h-screen bg-background p-8 text-foreground">Loading service...</div>

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl p-8">
        <Link href="/admin" className="mb-6 inline-block text-accent hover:underline">Back</Link>
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h1 className="mb-6 text-3xl font-bold text-foreground">Edit Service</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Title" />
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={4} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Description" />
            <div>
              <input type="hidden" name="current_icon_url" value={formData.current_icon_url} />
              <input type="file" name="icon" accept="image/*" onChange={(e) => setSelectedIconName(e.target.files?.[0]?.name || '')} className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:font-semibold file:text-accent-foreground" />
              <p className="mt-2 text-xs text-muted-foreground">{selectedIconName || formData.current_icon_url || 'Keep current icon or choose a new one.'}</p>
            </div>
            <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Order" />
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
