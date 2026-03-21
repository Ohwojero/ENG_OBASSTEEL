'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewTeamMember() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    role: '',
    bio: '',
    image_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed')
      router.push('/admin')
    } catch (err) {
      alert('Error creating team member')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-8">
        <Link href="/admin" className="text-accent hover:underline mb-6 inline-block">← Back</Link>

        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">New Team Member</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <input
              type="text"
              placeholder="Title/Position"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <input
              type="text"
              placeholder="Role (optional)"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none resize-none"
            ></textarea>
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <div className="flex gap-4">
              <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-bold hover:shadow-lg transition-all">
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
              <Link href="/admin"><button type="button" className="px-6 py-2 border border-border rounded-lg">Cancel</button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
