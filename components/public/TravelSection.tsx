'use client'

import { useState } from 'react'
import { TravelInfo } from '@/types'
import { motion } from 'framer-motion'

export default function TravelSection({ travel }: { travel: TravelInfo[] }) {
  const [activeTab, setActiveTab] = useState<'all' | 'hotel' | 'transport' | 'airport' | 'note'>('all')

  if (!travel || travel.length === 0) return null

  // Tabs list based on available types in the travel list
  const availableTypes = Array.from(new Set(travel.map(item => item.type)))
  const showTabs = availableTypes.length > 1

  const filteredTravel = activeTab === 'all'
    ? travel
    : travel.filter(item => item.type === activeTab)

  const sortedTravel = [...filteredTravel].sort((a, b) => a.displayOrder - b.displayOrder)

  const getEmoji = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨'
      case 'transport': return '🚕'
      case 'airport': return '✈️'
      default: return '📝'
    }
  }

  const getTabLabel = (type: string) => {
    switch (type) {
      case 'hotel': return 'Stays / Hotels'
      case 'transport': return 'Transport'
      case 'airport': return 'Airports & Stations'
      case 'note': return 'Important Notes'
      default: return type
    }
  }

  return (
    <section id="travel" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">Travel &amp; Stay</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Information For Guests</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        {/* Tabs navigation */}
        {showTabs && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full font-body text-xs uppercase tracking-wider transition-colors ${
                activeTab === 'all'
                  ? 'bg-[var(--color-gold-600)] text-white shadow-sm'
                  : 'bg-[var(--color-gold-50)]/50 hover:bg-[var(--color-gold-50)] text-[var(--color-slate-850)] border border-[var(--color-gold-100)]'
              }`}
            >
              Show All
            </button>
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type as any)}
                className={`px-5 py-2 rounded-full font-body text-xs uppercase tracking-wider transition-colors ${
                  activeTab === type
                    ? 'bg-[var(--color-gold-600)] text-white shadow-sm'
                    : 'bg-[var(--color-gold-50)]/50 hover:bg-[var(--color-gold-50)] text-[var(--color-slate-850)] border border-[var(--color-gold-100)]'
                }`}
              >
                {getEmoji(type)} {getTabLabel(type)}
              </button>
            ))}
          </div>
        )}

        {/* Travel Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTravel.map((item, i) => (
            <motion.div
              layout
              key={item._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-[var(--color-ivory)] border border-[var(--color-gold-100)] rounded-3xl p-6 flex flex-col justify-between hover:shadow-card transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl p-3 bg-white rounded-2xl shadow-sm border border-[var(--color-gold-100)]/45">
                    {getEmoji(item.type)}
                  </span>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 bg-white text-[var(--color-gold-700)] rounded-full border border-[var(--color-gold-100)]">
                    {item.type}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl text-[var(--color-slate-900)] mb-3">{item.title}</h3>
                
                <p className="font-body text-[var(--color-slate-850)] text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Optional metadata */}
                <div className="space-y-2 font-body text-xs text-[var(--color-slate-900)]/80 pb-4">
                  {item.address && (
                    <div className="flex items-start space-x-2">
                      <span className="text-slate-400">📍</span>
                      <span>{item.address}</span>
                    </div>
                  )}
                  {item.phone && (
                    <div className="flex items-start space-x-2">
                      <span className="text-slate-400">📞</span>
                      <span>{item.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              {(item.websiteUrl || item.mapsLink) && (
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-gold-100)]/60">
                  {item.websiteUrl && (
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 text-xs font-body uppercase tracking-wider text-white bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] rounded-xl transition-colors"
                    >
                      Visit Website
                    </a>
                  )}
                  {item.mapsLink && (
                    <a
                      href={item.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-center py-2 px-3 text-xs font-body uppercase tracking-wider rounded-xl transition-colors ${
                        item.websiteUrl
                          ? 'border border-[var(--color-gold-500)] text-[var(--color-gold-700)] hover:bg-[var(--color-gold-50)]'
                          : 'w-full text-white bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)]'
                      }`}
                    >
                      View Map
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
