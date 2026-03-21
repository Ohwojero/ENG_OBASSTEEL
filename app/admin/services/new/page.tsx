'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewService() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedIconName, setSelectedIconName] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData(e.currentTarget)
      submitData.set('title', formData.title)
      submitData.set('description', formData.description)
      submitData.set('order', String(formData.order))

      const response = await fetch('/api/services', {
        method: 'POST',
        body: submitData,
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.error || 'Failed to create service')
        return
      }

      router.push('/admin')
    } catch {
      alert('Error creating service')
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
          <h1 className="mb-6 text-3xl font-bold text-foreground">New Service</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
            />
            <div className="rounded-lg border border-dashed border-border bg-card/30 p-4">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Service Icon or Image
              </label>
              <input
                type="file"
                name="icon"
                accept="image/*"
                onChange={(e) => setSelectedIconName(e.target.files?.[0]?.name || '')}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:font-semibold file:text-accent-foreground hover:file:opacity-90"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {selectedIconName || 'Choose an icon or image from a phone or computer.'}
              </p>
            </div>
            <input
              type="number"
              name="order"
              placeholder="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground transition-all hover:shadow-lg disabled:opacity-70"
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
