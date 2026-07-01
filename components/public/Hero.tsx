'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SiteSettings } from '@/types'

export default function Hero({ settings }: { settings: SiteSettings }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-screen bg-[var(--color-slate-900)]"></div>

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[var(--color-slate-900)]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${settings.heroBgImageUrl})` }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#FAF7F2]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-display italic text-[var(--color-gold-300)] text-xl md:text-2xl mb-4">
            {settings.tagline}
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-6 drop-shadow-lg tracking-tight">
            {settings.groomName} <span className="text-[var(--color-gold-500)]">&amp;</span> {settings.brideName}
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <p className="font-body text-white uppercase tracking-[0.2em] text-sm md:text-base">
              {new Date(settings.weddingDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
          
          <a href="#rsvp" className="inline-block bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] text-white px-8 py-3 rounded-full font-body uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
            RSVP Now
          </a>
        </motion.div>
      </div>

      {/* Floating Petals effect (CSS animation defined in globals) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute top-[-10%] w-3 h-3 bg-[var(--color-maroon-400)] rounded-[50%_0_50%_50%] opacity-0 animate-[petal-fall_8s_ease-in_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${7 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </section>
  )
}
