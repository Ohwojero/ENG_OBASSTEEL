'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function EditTeamMember() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    role: '',
    bio: '',
    image_url: '',
  })

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/team/${params.id}`)
      const result = await response.json()
      if (response.ok) {
        setFormData({
          name: result.name || '',
          title: result.title || '',
          role: result.role || '',
          bio: result.bio || '',
          image_url: result.image_url || '',
        })
      }
      setLoading(false)
    })()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const response = await fetch(`/api/team/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        role: formData.role || null,
        bio: formData.bio || null,
        image_url: formData.image_url || null,
      }),
    })
    if (response.ok) router.push('/admin')
    setIsSubmitting(false)
  }

  if (loading) return <div className="min-h-screen bg-background p-8 text-foreground">Loading team member...</div>

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl p-8">
        <Link href="/admin" className="mb-6 inline-block text-accent hover:underline">Back</Link>
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h1 className="mb-6 text-3xl font-bold text-foreground">Edit Team Member</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Name" />
            <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Title" />
            <input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Role" />
            <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Bio" />
            <input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="w-full rounded-lg border border-border bg-card/50 px-4 py-2 text-foreground outline-none focus:border-accent" placeholder="Image URL" />
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
