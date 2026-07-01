'use client'

import { useState } from 'react'
import { GalleryItem } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

export default function GallerySection({ gallery }: { gallery: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxCaption, setLightboxCaption] = useState<string>('')

  if (!gallery || gallery.length === 0) return null

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(gallery.map(item => item.category || 'general')))]

  // Filter items
  const filteredGallery = activeCategory === 'all'
    ? gallery
    : gallery.filter(item => (item.category || 'general') === activeCategory)

  // Sort by display order
  const sortedGallery = [...filteredGallery].sort((a, b) => a.displayOrder - b.displayOrder)

  const openLightbox = (url: string, caption: string) => {
    setLightboxImage(url)
    setLightboxCaption(caption)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxCaption('')
  }

  return (
    <section id="gallery" className="py-24 bg-[var(--color-gold-50)]/50 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">Gallery</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Our Captured Moments</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        {/* Category Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-1.5 rounded-full font-body text-xs uppercase tracking-wider transition-colors ${
                  activeCategory === category
                    ? 'bg-[var(--color-gold-600)] text-white'
                    : 'bg-white hover:bg-[var(--color-gold-50)] text-[var(--color-slate-850)] border border-[var(--color-gold-100)]'
                }`}
              >
                {category === 'all' ? 'All Photos' : category}
              </button>
            ))}
          </div>
        )}

        {/* Photo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {sortedGallery.map((item, i) => (
              <motion.div
                layout
                key={item._id || i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(item.imageUrl, item.caption || '')}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group border border-[var(--color-gold-100)]/40 bg-white"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" />
                {item.caption && (
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-body text-xs font-medium truncate">{item.caption}</p>
                    {item.category && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[var(--color-gold-500)] text-[10px] uppercase tracking-wider rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-[var(--color-gold-300)] text-3xl font-light focus:outline-none"
            >
              ✕
            </button>
            
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt={lightboxCaption || 'Wedding Gallery'}
                className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl"
              />
            </motion.div>

            {lightboxCaption && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-4 text-center max-w-xl"
              >
                <p className="text-white font-body text-sm">{lightboxCaption}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
