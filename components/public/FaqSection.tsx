'use client'

import { useState } from 'react'
import { FaqItem } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (!faqs || faqs.length === 0) return null

  const sortedFaqs = [...faqs].sort((a, b) => a.displayOrder - b.displayOrder)

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="py-24 bg-[var(--color-gold-50)]/30 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-[var(--color-slate-900)] mb-4">Frequently Asked Questions</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Answers to your queries</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {sortedFaqs.map((faq, i) => {
            const faqId = faq._id || String(i)
            const isOpen = openId === faqId

            return (
              <motion.div
                key={faqId}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-[var(--color-gold-100)] overflow-hidden shadow-sm hover:shadow-card transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(faqId)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <h3 className="font-display text-lg md:text-xl text-[var(--color-slate-900)] pr-4">
                    {faq.question}
                  </h3>
                  <span className={`text-[var(--color-gold-600)] transition-transform duration-300 transform text-lg ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}>
                    ▼
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-[var(--color-gold-50)] text-sm font-body text-[var(--color-slate-850)] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
