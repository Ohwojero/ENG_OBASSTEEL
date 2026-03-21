'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project, Service, TeamMember, Testimonial } from '@/lib/types'

type AdminData = {
  projects: Project[]
  services: Service[]
  testimonials: Testimonial[]
  team: TeamMember[]
}

const initialData: AdminData = {
  projects: [],
  services: [],
  testimonials: [],
  team: [],
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState<AdminData>(initialData)
  const [loading, setLoading] = useState(true)

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🏭' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
    { id: 'team', label: 'Team Members', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      const [projects, services, testimonials, team] = await Promise.all([
        fetch('/api/projects').then((res) => res.json()),
        fetch('/api/services').then((res) => res.json()),
        fetch('/api/testimonials').then((res) => res.json()),
        fetch('/api/team').then((res) => res.json()),
      ])

      setData({
        projects: Array.isArray(projects) ? projects : [],
        services: Array.isArray(services) ? services : [],
        testimonials: Array.isArray(testimonials) ? testimonials : [],
        team: Array.isArray(team) ? team : [],
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData()
  }, [])

  const handleDelete = async (
    type: 'projects' | 'services' | 'testimonials' | 'team',
    id: string,
    label: string
  ) => {
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return

    const routeMap = {
      projects: `/api/projects/${id}`,
      services: `/api/services/${id}`,
      testimonials: `/api/testimonials/${id}`,
      team: `/api/team/${id}`,
    }

    const response = await fetch(routeMap[type], { method: 'DELETE' })
    const result = await response.json()

    if (!response.ok) {
      alert(result.error || 'Failed to delete item')
      return
    }

    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-64 border-r border-border bg-background p-6">
        <Link href="/">
          <div className="mb-8 flex cursor-pointer items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <span className="font-bold text-primary">O</span>
            </div>
            <div>
              <div className="font-bold text-foreground">OBASSTEEL</div>
              <div className="text-xs text-muted-foreground">ADMIN</div>
            </div>
          </div>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full rounded-lg px-4 py-3 text-left font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-muted/40'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/">
            <button className="w-full rounded-lg border border-border px-4 py-2 text-foreground transition-all hover:bg-muted/40">
              Back to Site
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'overview' && <OverviewTab data={data} loading={loading} />}
          {activeTab === 'projects' && (
            <ProjectsTab
              items={data.projects}
              loading={loading}
              onDelete={(id, label) => void handleDelete('projects', id, label)}
            />
          )}
          {activeTab === 'services' && (
            <ServicesTab
              items={data.services}
              loading={loading}
              onDelete={(id, label) => void handleDelete('services', id, label)}
            />
          )}
          {activeTab === 'testimonials' && (
            <TestimonialsTab
              items={data.testimonials}
              loading={loading}
              onDelete={(id, label) => void handleDelete('testimonials', id, label)}
            />
          )}
          {activeTab === 'team' && (
            <TeamTab
              items={data.team}
              loading={loading}
              onDelete={(id, label) => void handleDelete('team', id, label)}
            />
          )}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ data, loading }: { data: AdminData; loading: boolean }) {
  const stats = [
    { label: 'Total Projects', value: data.projects.length, icon: '🏭' },
    { label: 'Total Services', value: data.services.length, icon: '⚙️' },
    { label: 'Testimonials', value: data.testimonials.length, icon: '⭐' },
    { label: 'Team Members', value: data.team.length, icon: '👥' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <h1 className="mb-8 text-4xl font-bold text-foreground">Admin Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card/50 p-6">
            <div className="mb-2 text-3xl">{stat.icon}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
            <div className="mt-2 text-3xl font-bold text-accent">
              {loading ? '...' : stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/50 p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/projects/new" className="block rounded-lg px-4 py-2 transition-colors hover:bg-accent/10">
              Add New Project
            </Link>
            <Link href="/admin/services/new" className="block rounded-lg px-4 py-2 transition-colors hover:bg-accent/10">
              Add New Service
            </Link>
            <Link href="/admin/testimonials/new" className="block rounded-lg px-4 py-2 transition-colors hover:bg-accent/10">
              Add Testimonial
            </Link>
            <Link href="/admin/team/new" className="block rounded-lg px-4 py-2 transition-colors hover:bg-accent/10">
              Add Team Member
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/50 p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">Recent Snapshot</h2>
          <p className="text-sm text-muted-foreground">
            {loading
              ? 'Loading admin data...'
              : `${data.projects.length} projects, ${data.services.length} services, ${data.testimonials.length} testimonials, ${data.team.length} team members.`}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function EmptyState({ href, text, cta }: { href: string; text: string; cta: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-6">
      <p className="py-12 text-center text-muted-foreground">
        {text} <Link href={href} className="text-accent hover:underline">{cta}</Link>
      </p>
    </div>
  )
}

function ActionRow({
  editHref,
  onDelete,
}: {
  editHref: string
  onDelete: () => void
}) {
  return (
    <div className="flex gap-3">
      <Link href={editHref} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted/30">
        Edit
      </Link>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10"
      >
        Delete
      </button>
    </div>
  )
}

function ProjectsTab({
  items,
  loading,
  onDelete,
}: {
  items: Project[]
  loading: boolean
  onDelete: (id: string, label: string) => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Manage Projects</h1>
        <Link href="/admin/projects/new" className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50">
          + New Project
        </Link>
      </div>

      {loading ? (
        <EmptyState href="/admin/projects/new" text="Loading projects..." cta="" />
      ) : items.length === 0 ? (
        <EmptyState href="/admin/projects/new" text="No projects yet." cta="Create your first project." />
      ) : (
        <div className="space-y-4">
          {items.map((project) => (
            <div key={project.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card/50 p-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.location} • {project.category}</p>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{project.description}</p>
              </div>
              <ActionRow
                editHref={`/admin/projects/${project.id}`}
                onDelete={() => onDelete(project.id, project.title)}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function ServicesTab({
  items,
  loading,
  onDelete,
}: {
  items: Service[]
  loading: boolean
  onDelete: (id: string, label: string) => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Manage Services</h1>
        <Link href="/admin/services/new" className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50">
          + New Service
        </Link>
      </div>

      {loading ? (
        <EmptyState href="/admin/services/new" text="Loading services..." cta="" />
      ) : items.length === 0 ? (
        <EmptyState href="/admin/services/new" text="No services yet." cta="Create your first service." />
      ) : (
        <div className="space-y-4">
          {items.map((service) => (
            <div key={service.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card/50 p-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Order: {service.order}</p>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{service.description}</p>
              </div>
              <ActionRow
                editHref={`/admin/services/${service.id}`}
                onDelete={() => onDelete(service.id, service.title)}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function TestimonialsTab({
  items,
  loading,
  onDelete,
}: {
  items: Testimonial[]
  loading: boolean
  onDelete: (id: string, label: string) => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Manage Testimonials</h1>
        <Link href="/admin/testimonials/new" className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50">
          + New Testimonial
        </Link>
      </div>

      {loading ? (
        <EmptyState href="/admin/testimonials/new" text="Loading testimonials..." cta="" />
      ) : items.length === 0 ? (
        <EmptyState href="/admin/testimonials/new" text="No testimonials yet." cta="Add your first testimonial." />
      ) : (
        <div className="space-y-4">
          {items.map((testimonial) => (
            <div key={testimonial.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card/50 p-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">{testimonial.client_name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{testimonial.company || 'No company'} • {testimonial.rating} stars</p>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{testimonial.feedback}</p>
              </div>
              <ActionRow
                editHref={`/admin/testimonials/${testimonial.id}`}
                onDelete={() => onDelete(testimonial.id, testimonial.client_name)}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function TeamTab({
  items,
  loading,
  onDelete,
}: {
  items: TeamMember[]
  loading: boolean
  onDelete: (id: string, label: string) => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Manage Team</h1>
        <Link href="/admin/team/new" className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50">
          + New Member
        </Link>
      </div>

      {loading ? (
        <EmptyState href="/admin/team/new" text="Loading team members..." cta="" />
      ) : items.length === 0 ? (
        <EmptyState href="/admin/team/new" text="No team members yet." cta="Add your first team member." />
      ) : (
        <div className="space-y-4">
          {items.map((member) => (
            <div key={member.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card/50 p-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.title}{member.role ? ` • ${member.role}` : ''}</p>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{member.bio || 'No bio added.'}</p>
              </div>
              <ActionRow
                editHref={`/admin/team/${member.id}`}
                onDelete={() => onDelete(member.id, member.name)}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function SettingsTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <h1 className="mb-8 text-4xl font-bold text-foreground">Settings</h1>
      <Link href="/admin/settings" className="rounded-lg bg-accent px-6 py-2 font-bold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/50">
        Edit Company Settings
      </Link>
    </motion.div>
  )
}
