'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Flow Station Operations', href: '/services' },
        { label: 'Pipeline Management', href: '/services' },
        { label: 'Safety & Compliance', href: '/services' },
        { label: 'Process Engineering', href: '/services' },
      ]
    }
  ]

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="mb-4">
              <div className="flex items-center justify-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-accent/50 bg-white p-1">
                  <img 
                    src="/favicon-logo.png" 
                    alt="OBASSTEEL" 
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-bold leading-none">OBASSTEEL</span>
                  <span className="mt-1 text-sm leading-none text-primary-foreground/80">PROJECT LIMITED</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Leading oil & gas engineering solutions in Nigeria
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-primary-foreground/80">📍 Delta State, Nigeria</p>
              <p className="text-primary-foreground/80">📧 obassteelenergy@gmail.com</p>
              <p className="text-primary-foreground/80">📞 08076066860</p>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <motion.span
                        className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h4 className="font-bold mb-4 text-lg">Get in Touch</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Ready to start your next project? Contact us today.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-all"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-start justify-between gap-4 text-left text-sm text-primary-foreground/70 md:flex-row md:items-center">
          <p>&copy; {currentYear} OBASSTEEL PROJECT LIMITED. All rights reserved.</p>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-6">
            <Link href="/" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
