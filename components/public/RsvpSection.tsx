'use client'

import { useState } from 'react'
import { WeddingEvent } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

export default function RsvpSection({ 
  events, 
  prefilledName = '', 
  prefilledEvents = [] 
}: { 
  events: WeddingEvent[]
  prefilledName?: string
  prefilledEvents?: string[]
}) {
  const [formData, setFormData] = useState({
    guestName: prefilledName,
    email: '',
    phone: '',
    attendanceStatus: 'attending', // attending, not_attending, maybe
    guestCount: 1,
    mealPreference: 'vegetarian', // vegetarian, non_vegetarian, vegan, jain, none
    customNote: '',
  })

  // Selected events array
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    prefilledEvents.length > 0 ? prefilledEvents : events.map(e => e.title)
  )
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleEvent = (eventTitle: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventTitle) 
        ? prev.filter(t => t !== eventTitle) 
        : [...prev, eventTitle]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.guestName.trim()) {
      toast.error('Please enter your name.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventsAttending: selectedEvents,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        toast.success('Thank you! Your RSVP has been saved.')
        
        // Trigger confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        })
      } else {
        toast.error(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to submit RSVP. Please check your network connection.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="py-24 bg-[var(--color-maroon-50)] overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-gold-200)]/10 via-transparent to-transparent pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-maroon-300)]/10 via-transparent to-transparent pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-[var(--color-maroon-600)] mb-4">RSVP</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
            <span className="font-body tracking-[0.2em] uppercase text-sm text-[var(--color-gold-600)]">Will You Join Us?</span>
            <div className="h-[1px] w-12 bg-[var(--color-gold-500)]"></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-[var(--color-gold-100)]"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="rsvp-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Guest Name */}
                <div>
                  <label htmlFor="guestName" className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-2 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    required
                    value={formData.guestName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] bg-[var(--color-gold-50)]/30 text-sm"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-2 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] bg-[var(--color-gold-50)]/30 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-2 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Contact number (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] bg-[var(--color-gold-50)]/30 text-sm"
                    />
                  </div>
                </div>

                {/* Attendance Status */}
                <div>
                  <label className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-3 font-semibold">
                    Attendance
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'attending', label: 'Joyfully Attend', emoji: '🎉' },
                      { value: 'not_attending', label: 'Regretfully Decline', emoji: '✉️' },
                      { value: 'maybe', label: 'Maybe / Unsure', emoji: '🤔' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, attendanceStatus: option.value }))}
                        className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border text-center transition-all ${
                          formData.attendanceStatus === option.value
                            ? 'bg-[var(--color-gold-500)] border-[var(--color-gold-600)] text-white shadow-md'
                            : 'bg-white border-[var(--color-gold-100)] text-[var(--color-slate-850)] hover:bg-[var(--color-gold-50)]/30'
                        }`}
                      >
                        <span className="text-xl mb-1">{option.emoji}</span>
                        <span className="font-body text-xs font-medium tracking-wide">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Fields if Attending */}
                {formData.attendanceStatus === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-6 pt-4 border-t border-[var(--color-gold-100)] overflow-hidden"
                  >
                    {/* Events list checkboxes */}
                    {events.length > 0 && (
                      <div>
                        <label className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-3 font-semibold">
                          Select Events You are Attending
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {events.map((event) => (
                            <button
                              key={event._id || event.title}
                              type="button"
                              onClick={() => toggleEvent(event.title)}
                              className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-colors ${
                                selectedEvents.includes(event.title)
                                  ? 'bg-[var(--color-maroon-500)] text-white border-[var(--color-maroon-600)] shadow-sm'
                                  : 'bg-white border-[var(--color-gold-100)] text-[var(--color-slate-850)] hover:bg-[var(--color-gold-50)]/30'
                              }`}
                            >
                              <span className="text-lg">{event.icon || '🌸'}</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-body text-xs font-semibold truncate">{event.title}</p>
                                <p className={`text-[10px] truncate ${selectedEvents.includes(event.title) ? 'text-white/80' : 'text-slate-500'}`}>
                                  {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                                </p>
                              </div>
                              <span className="text-sm">
                                {selectedEvents.includes(event.title) ? '✓' : '+'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Guest Count and Meal preference */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="guestCount" className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-2 font-semibold">
                          Total Guests (Including You)
                        </label>
                        <select
                          id="guestCount"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] bg-[var(--color-gold-50)]/30 text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="mealPreference" className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-2 font-semibold">
                          Meal Preference
                        </label>
                        <select
                          id="mealPreference"
                          name="mealPreference"
                          value={formData.mealPreference}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] bg-[var(--color-gold-50)]/30 text-sm"
                        >
                          <option value="vegetarian">Vegetarian 🥦</option>
                          <option value="non_vegetarian">Non-Vegetarian 🍗</option>
                          <option value="vegan">Vegan 🌱</option>
                          <option value="jain">Jain Meals 🧅🚫</option>
                          <option value="none">No Preference</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Custom Warm Note */}
                <div>
                  <label htmlFor="customNote" className="block text-sm font-body uppercase tracking-wider text-[var(--color-slate-900)] mb-2 font-semibold">
                    Message for the Couple
                  </label>
                  <textarea
                    id="customNote"
                    name="customNote"
                    rows={4}
                    value={formData.customNote}
                    onChange={handleInputChange}
                    placeholder="Write a message or wish for Arjun & Priya..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] bg-[var(--color-gold-50)]/30 text-sm resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[var(--color-maroon-500)] hover:bg-[var(--color-maroon-600)] disabled:bg-slate-400 text-white py-3.5 rounded-full font-body uppercase tracking-widest text-sm transition-colors shadow-lg text-center"
                  >
                    {submitting ? 'Submitting...' : 'Submit RSVP'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="text-6xl">🎉</div>
                <h3 className="font-display text-3xl text-[var(--color-maroon-600)]">RSVP Received!</h3>
                <p className="font-body text-[var(--color-slate-850)] text-sm max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{formData.guestName}</span>. Your response has been registered. 
                  {formData.attendanceStatus === 'attending' 
                    ? ' We are absolutely thrilled to celebrate with you!' 
                    : ' We will miss you, but thank you for letting us know.'
                  }
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase font-body tracking-wider text-[var(--color-gold-700)] hover:underline"
                  >
                    Submit another response / Edit
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
