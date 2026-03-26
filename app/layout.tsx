import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'OBASSTEEL PROJECT LIMITED | Oil & Gas Engineering',
  description: 'Leading oil & gas engineering company specializing in flow station operations, pipeline management, and industrial projects in Delta State, Nigeria.',
  keywords: 'oil and gas, engineering, flow station, pipeline, Nigeria, Delta State',
  authors: [{ name: 'OBASSTEEL PROJECT LIMITED' }],
 openGraph: {
    title: 'OBASSTEEL PROJECT LIMITED',
    description: 'Oil & Gas Engineering Excellence',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/favicon-logo.png',
        type: 'image/png',
      },
    ],
    shortcut: [
      {
        url: '/favicon-logo.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicon-logo.png',
        type: 'image/png',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#273c75',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
