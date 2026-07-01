'use client'

import { SiteSettings } from '@/types'
import { motion } from 'framer-motion'

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-[var(--color-slate-900)] text-white py-16 border-t border-[var(--color-gold-900)]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[var(--color-gold-900)]/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl tracking-widest"
        >
          {settings.groomName[0]} <span className="text-[var(--color-gold-500)]">&amp;</span> {settings.brideName[0]}
        </motion.div>

        <p className="font-body text-white/60 text-xs uppercase tracking-[0.2em]">
          {settings.groomName} &amp; {settings.brideName} — Wedding 2026
        </p>

        <div className="h-[1px] w-24 bg-[var(--color-gold-900)] mx-auto" />

        <div className="pt-2">
          <a href="/admin" className="text-[10px] uppercase font-body tracking-wider text-[var(--color-gold-500)] hover:underline">
            Admin Access
          </a>
        </div>

        <p className="font-body text-[10px] text-white/40 tracking-wider">
          &copy; {new Date().getFullYear()} Arjun &amp; Priya. Made with love for their wedding celebration.
        </p>
      </div>
    </footer>
  )
}
