'use client'

import { Contact } from '@/types'
import { motion } from 'framer-motion'

export default function ContactSection({ contacts }: { contacts: Contact[] }) {
  if (!contacts || contacts.length === 0) return null

  const sortedContacts = [...contacts].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">Registry &amp; Contact</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Who to call for help</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        {/* Gift Registry Note (Premium design touch) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--color-ivory)] border border-[var(--color-gold-100)] rounded-3xl p-8 text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-4xl mb-4 block">🎁</span>
          <h3 className="font-display text-2xl text-[var(--color-slate-900)] mb-3">Gift Registry &amp; Blessings</h3>
          <p className="font-body text-[var(--color-slate-850)] text-sm leading-relaxed max-w-lg mx-auto">
            Your presence at our wedding is the greatest gift we could ask for. However, if you wish to honor us with a gift, 
            we would appreciate your blessings or contributions towards our new home. A blessings box will also be available at the venues.
          </p>
        </motion.div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedContacts.map((contact, i) => (
            <motion.div
              key={contact._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="bg-[var(--color-gold-50)]/30 border border-[var(--color-gold-100)]/80 rounded-2xl p-6 hover:shadow-card transition-shadow"
            >
              <h3 className="font-display text-2xl text-[var(--color-slate-900)]">{contact.name}</h3>
              {contact.role && (
                <p className="font-body text-xs font-semibold text-[var(--color-gold-700)] uppercase tracking-wider mt-1 mb-4">
                  {contact.role}
                </p>
              )}

              <div className="space-y-3 font-body text-xs text-[var(--color-slate-850)]">
                {contact.phone && (
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">📞</span>
                    <a href={`tel:${contact.phone}`} className="hover:text-[var(--color-gold-600)] transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">✉️</span>
                    <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-gold-600)] transition-colors">
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[var(--color-gold-100)]/40">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex-1 text-center py-2 bg-white hover:bg-[var(--color-gold-50)] text-[var(--color-gold-700)] border border-[var(--color-gold-300)] rounded-xl font-body text-xs uppercase tracking-wider transition-colors"
                  >
                    Call Now
                  </a>
                )}
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-body text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
