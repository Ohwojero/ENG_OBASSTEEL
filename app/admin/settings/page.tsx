'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Settings() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    company_name: '',
    address: '',
    email_1: '',
    email_2: '',
    phone: '',
    mission: '',
    vision: '',
    values: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setFormData({
          company_name: data.company_name,
          address: data.address,
          email_1: data.email_1,
          email_2: data.email_2,
          phone: data.phone,
          mission: data.mission || '',
          vision: data.vision || '',
          values: Array.isArray(data.values) ? data.values.join(', ') : '',
        })
      }
    } catch (err) {
      console.error('Error fetching settings', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          values: formData.values.split(',').map(v => v.trim()),
        })
      })

      if (!response.ok) throw new Error('Failed')
      alert('Settings updated!')
      router.push('/admin')
    } catch (err) {
      alert('Error updating settings')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-8">
        <Link href="/admin" className="text-accent hover:underline mb-6 inline-block">← Back</Link>

        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Company Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={(e) => setFormData({...formData, company_name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none resize-none"
            ></textarea>
            <input
              type="email"
              placeholder="Email 1"
              value={formData.email_1}
              onChange={(e) => setFormData({...formData, email_1: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <input
              type="email"
              placeholder="Email 2"
              value={formData.email_2}
              onChange={(e) => setFormData({...formData, email_2: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <textarea
              placeholder="Mission"
              value={formData.mission}
              onChange={(e) => setFormData({...formData, mission: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none resize-none"
            ></textarea>
            <textarea
              placeholder="Vision"
              value={formData.vision}
              onChange={(e) => setFormData({...formData, vision: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none resize-none"
            ></textarea>
            <input
              type="text"
              placeholder="Core Values (comma-separated)"
              value={formData.values}
              onChange={(e) => setFormData({...formData, values: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground focus:border-accent outline-none"
            />
            <div className="flex gap-4">
              <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-bold hover:shadow-lg transition-all">
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </button>
              <Link href="/admin"><button type="button" className="px-6 py-2 border border-border rounded-lg">Cancel</button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
