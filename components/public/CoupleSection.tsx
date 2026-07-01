'use client'

import { CoupleProfile } from '@/types'
import { motion } from 'framer-motion'

export default function CoupleSection({ couple }: { couple: CoupleProfile[] }) {
  if (!couple || couple.length === 0) return null

  // Sort: groom first, then bride (or by displayOrder)
  const sortedCouple = [...couple].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section id="couple" className="py-24 bg-[var(--color-gold-50)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">The Happy Couple</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Meet Bride &amp; Groom</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {sortedCouple.map((person, i) => (
            <motion.div
              key={person._id || i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-[var(--color-gold-100)] flex flex-col h-full"
            >
              {/* Photo Area */}
              <div className="relative h-96 w-full overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${person.photoUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <span className="font-body text-xs uppercase tracking-widest text-[var(--color-gold-200)] font-semibold">
                    {person.role === 'bride' ? 'The Bride' : 'The Groom'}
                  </span>
                  <h3 className="font-display text-3xl mt-1">{person.fullName}</h3>
                </div>
              </div>

              {/* Bio Details */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <p className="font-display italic text-lg text-[var(--color-gold-600)] mb-4">
                    &ldquo;{person.nickname || person.fullName}&rdquo;
                  </p>
                  <p className="font-body text-[var(--color-slate-850)] text-sm leading-relaxed mb-6">
                    {person.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--color-gold-100)] space-y-3 font-body text-xs text-[var(--color-slate-900)]/80">
                  {person.parentsNames && (
                    <div className="flex justify-between">
                      <span className="font-medium text-[var(--color-gold-700)] uppercase tracking-wider">Parents</span>
                      <span className="text-right">{person.parentsNames}</span>
                    </div>
                  )}
                  {person.siblings && (
                    <div className="flex justify-between">
                      <span className="font-medium text-[var(--color-gold-700)] uppercase tracking-wider">Siblings</span>
                      <span className="text-right">{person.siblings}</span>
                    </div>
                  )}
                  {person.familyIntro && (
                    <div className="pt-2 italic text-center text-xs text-[var(--color-slate-850)]/70">
                      {person.familyIntro}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
