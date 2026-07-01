'use client'

import { StoryMilestone } from '@/types'
import { motion } from 'framer-motion'

export default function StorySection({ milestones }: { milestones: StoryMilestone[] }) {
  if (!milestones || milestones.length === 0) return null

  return (
    <section id="story" className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">Our Story</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">How It Started</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-gold-400)] to-transparent md:-translate-x-1/2" />

          {milestones.map((milestone, i) => (
            <motion.div 
              key={milestone._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 md:mb-20 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Icon Marker */}
              <div className="absolute left-[20px] md:left-1/2 w-10 h-10 -ml-5 bg-white border-2 border-[var(--color-gold-500)] rounded-full flex items-center justify-center text-xl shadow-[0_0_10px_rgba(201,168,76,0.3)] z-10 md:-translate-x-1/2">
                {milestone.icon || '✨'}
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <div className="bg-[var(--color-ivory)] p-6 md:p-8 rounded-2xl shadow-card border border-[var(--color-gold-50)] hover:shadow-card-hover transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[var(--color-gold-100)] text-[var(--color-gold-700)] rounded-full font-body text-xs font-medium uppercase tracking-wider mb-4">
                    {milestone.date}
                  </span>
                  <h3 className="font-display text-2xl text-[var(--color-slate-900)] mb-3">{milestone.title}</h3>
                  <p className="font-body text-[var(--color-slate-850)] text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
