'use client'

import { WeddingEvent } from '@/types'
import { motion } from 'framer-motion'

export default function EventsSection({ events }: { events: WeddingEvent[] }) {
  if (!events || events.length === 0) return null

  return (
    <section id="events" className="py-24 bg-[var(--color-ivory)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">Wedding Events</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Celebrate With Us</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-[var(--color-gold-100)] group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-gold-300)] to-[var(--color-gold-600)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="text-4xl mb-4">{event.icon || '🌸'}</div>
              <h3 className="font-display text-2xl text-[var(--color-slate-900)] mb-2">{event.title}</h3>
              
              <div className="space-y-3 mb-6 font-body text-[var(--color-slate-850)] text-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-[var(--color-gold-600)]">📅</span>
                  <span>
                    {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }) : 'TBA'}
                    <br/>{event.startTime} - {event.endTime}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[var(--color-gold-600)]">📍</span>
                  <span>{event.venue}</span>
                </div>
                {event.dressCode && (
                  <div className="flex items-start space-x-3">
                    <span className="text-[var(--color-gold-600)]">👗</span>
                    <span>Dress Code: {event.dressCode}</span>
                  </div>
                )}
              </div>

              {event.note && (
                <p className="font-body text-xs italic text-[var(--color-slate-900)]/70 mb-6 pb-6 border-b border-[var(--color-gold-100)]">
                  {event.note}
                </p>
              )}

              {event.mapsLink && (
                <a 
                  href={event.mapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center py-2 text-sm font-body uppercase tracking-wider text-[var(--color-gold-700)] hover:text-white border border-[var(--color-gold-500)] hover:bg-[var(--color-gold-500)] transition-colors rounded-full"
                >
                  View Map
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
