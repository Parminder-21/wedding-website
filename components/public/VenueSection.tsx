'use client'

import { Venue } from '@/types'
import { motion } from 'framer-motion'

export default function VenueSection({ venues }: { venues: Venue[] }) {
  if (!venues || venues.length === 0) return null

  const sortedVenues = [...venues].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section id="venue" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">The Venues</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Where Events Happen</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        <div className="space-y-16">
          {sortedVenues.map((venue, i) => (
            <motion.div
              key={venue._id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row gap-8 items-stretch ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Info Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 bg-[var(--color-ivory)] rounded-3xl border border-[var(--color-gold-100)]">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">📍</span>
                    <h3 className="font-display text-3xl text-[var(--color-slate-900)]">{venue.name}</h3>
                  </div>
                  {venue.isPrimary && (
                    <span className="inline-block px-3 py-1 bg-[var(--color-maroon-100)] text-[var(--color-maroon-500)] rounded-full font-body text-xs font-semibold uppercase tracking-wider mb-6">
                      Primary Venue
                    </span>
                  )}
                  <p className="font-body text-[var(--color-slate-850)] text-sm leading-relaxed mb-6">
                    {venue.description}
                  </p>
                  
                  <div className="space-y-4 font-body text-sm text-[var(--color-slate-900)]/80">
                    <div className="flex items-start space-x-3">
                      <span className="text-[var(--color-gold-600)] font-semibold">Address:</span>
                      <span>{venue.address}</span>
                    </div>
                    {venue.phone && (
                      <div className="flex items-start space-x-3">
                        <span className="text-[var(--color-gold-600)] font-semibold">Contact:</span>
                        <span>{venue.phone}</span>
                      </div>
                    )}
                    {venue.parkingNotes && (
                      <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-[var(--color-gold-50)]">
                        <span className="text-lg">🚗</span>
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--color-gold-700)] mb-1">Parking &amp; Directions</h4>
                          <p className="text-xs text-[var(--color-slate-850)]/90">{venue.parkingNotes}</p>
                        </div>
                      </div>
                    )}
                    {venue.accommodationNotes && (
                      <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-[var(--color-gold-50)]">
                        <span className="text-lg">🏨</span>
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--color-gold-700)] mb-1">Accommodation Notes</h4>
                          <p className="text-xs text-[var(--color-slate-850)]/90">{venue.accommodationNotes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-gold-100)]">
                  {venue.mapsLink && (
                    <a
                      href={venue.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] text-white px-6 py-2.5 rounded-full font-body uppercase tracking-wider text-xs transition-colors shadow-sm"
                    >
                      Open in Google Maps
                    </a>
                  )}
                </div>
              </div>

              {/* Map/Image Side */}
              <div className="w-full lg:w-1/2 min-h-[350px] bg-[var(--color-gold-100)] rounded-3xl overflow-hidden border border-[var(--color-gold-100)] relative">
                {venue.mapsEmbedUrl ? (
                  <iframe
                    src={venue.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '350px' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Google Map showing ${venue.name}`}
                  />
                ) : venue.imageUrl ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${venue.imageUrl})` }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-display text-[var(--color-gold-700)]">
                    Map Not Available
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
