import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | OBASSTEEL',
  description: 'Admin panel for managing content',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
