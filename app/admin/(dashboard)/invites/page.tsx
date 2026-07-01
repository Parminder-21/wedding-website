'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { GuestInvite, WeddingEvent } from '@/types'

export default function AdminInvitesPage() {
  const [invites, setInvites] = useState<GuestInvite[]>([])
  const [events, setEvents] = useState<WeddingEvent[]>([])
  const [loading, setLoading] = useState(true)
  
  // Form State
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [invitedEvents, setInvitedEvents] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const fetchData = async () => {
    try {
      const [invitesRes, eventsRes] = await Promise.all([
        fetch('/api/admin/invites'),
        fetch('/api/admin/content?type=event')
      ])

      const invitesData = await invitesRes.json()
      const eventsData = await eventsRes.json()

      if (invitesData.success) setInvites(invitesData.invites)
      if (eventsData.success) {
        setEvents(eventsData.items)
        // By default check all events
        setInvitedEvents(eventsData.items.map((e: any) => e.title))
      }
    } catch (err) {
      console.error(err)
      toast.error('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleToggleEvent = (title: string) => {
    setInvitedEvents(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    )
  }

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim()) {
      toast.error('Guest name is required.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          guestEmail,
          customMessage,
          eventsInvited: invitedEvents,
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success('Invitation link generated!')
        setInvites(prev => [data.invite, ...prev])
        // Reset form
        setGuestName('')
        setGuestEmail('')
        setCustomMessage('')
        setInvitedEvents(events.map(e => e.title))
      } else {
        toast.error(data.error || 'Failed to generate invitation')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error generating invitation')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the invite link for "${name}"?`)) return

    try {
      const res = await fetch(`/api/admin/invites?id=${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Invitation link deleted')
        setInvites(prev => prev.filter(i => i._id !== id))
      } else {
        toast.error(data.error || 'Failed to delete invitation')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error deleting invitation')
    }
  }

  const getInviteUrl = (slug: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/invite/${slug}`
    }
    return `/invite/${slug}`
  }

  const handleCopyLink = (slug: string) => {
    const url = getInviteUrl(slug)
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard!')
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-4xl text-[var(--color-gold-300)]">Personalized Invites</h1>
        <p className="font-body text-xs text-slate-400 mt-1">Generate custom invitation links for specific guests with personalized messages and event filters</p>
      </div>

      {/* Main Grid: Form Left, List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Create Invite Form */}
        <div className="lg:col-span-1 bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl p-6 space-y-6">
          <h2 className="font-display text-xl text-[var(--color-gold-200)] pb-4 border-b border-slate-800">
            Generate New Link
          </h2>

          <form onSubmit={handleCreateInvite} className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Guest Name (or Group Name)
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g., Rahul & Priya Sharma"
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
                required
              />
            </div>

            {/* Guest Email */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Guest Email (Optional)
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="e.g., rahul@example.com"
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Personalized Message (Optional)
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g., We can't wait to celebrate our special day with you! Hope to see you in New Delhi."
                rows={3}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)] resize-none"
              />
            </div>

            {/* Select Events */}
            {events.length > 0 && (
              <div>
                <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                  Events Invited To
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto p-2 bg-slate-950/40 rounded-xl border border-slate-850">
                  {events.map((event) => (
                    <button
                      key={event._id}
                      type="button"
                      onClick={() => handleToggleEvent(event.title)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-[10px] transition-colors ${
                        invitedEvents.includes(event.title)
                          ? 'bg-[var(--color-maroon-500)]/20 border border-[var(--color-maroon-500)] text-white'
                          : 'bg-slate-900 border border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="truncate">{event.icon || '🌸'} {event.title}</span>
                      <span>{invitedEvents.includes(event.title) ? '✓' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] disabled:bg-slate-800 text-white font-body uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all font-semibold"
            >
              {submitting ? 'Generating...' : 'Generate Link'}
            </button>
          </form>
        </div>

        {/* Generated Invites Table */}
        <div className="lg:col-span-2 bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl p-6">
          <h2 className="font-display text-xl text-[var(--color-gold-200)] mb-6">
            Generated Invitation Links ({invites.length})
          </h2>

          {loading ? (
            <div className="text-center py-20 text-slate-500 font-body text-sm">
              Loading invitations...
            </div>
          ) : invites.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-body text-sm">
              No personalized invite links created yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[9px] uppercase tracking-wider font-body font-semibold text-slate-400">
                    <th className="pb-3 pr-4">Guest Name</th>
                    <th className="pb-3 pr-4">Personal Link</th>
                    <th className="pb-3 pr-4">Events</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 font-body text-[11px] text-slate-300">
                  {invites.map((invite) => (
                    <tr key={invite._id} className="hover:bg-slate-850/20 transition-colors">
                      {/* Name */}
                      <td className="py-3 pr-4 font-semibold text-white truncate max-w-[120px]" title={invite.guestName}>
                        {invite.guestName}
                      </td>

                      {/* URL Slug copy */}
                      <td className="py-3 pr-4 font-mono text-[10px]">
                        <button
                          onClick={() => handleCopyLink(invite.slug)}
                          className="text-[var(--color-gold-500)] hover:underline truncate max-w-[160px] block"
                          title="Click to copy full URL"
                        >
                          /{invite.slug} 📋
                        </button>
                      </td>

                      {/* Events list */}
                      <td className="py-3 pr-4 text-slate-400">
                        {invite.eventsInvited?.length || 0} events
                      </td>

                      {/* Actions */}
                      <td className="py-3 text-right space-x-3">
                        <button
                          onClick={() => handleCopyLink(invite.slug)}
                          className="text-emerald-400 hover:text-emerald-300 font-semibold"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => handleDelete(invite._id!, invite.guestName)}
                          className="text-rose-500 hover:text-rose-400 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
