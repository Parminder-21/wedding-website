'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { RsvpEntry } from '@/types'

export default function AdminRsvpPage() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchRsvps = async () => {
    try {
      const res = await fetch('/api/admin/rsvp')
      const data = await res.json()
      if (data.success) {
        setRsvps(data.rsvps)
      } else {
        toast.error(data.error || 'Failed to load RSVPs')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error fetching RSVPs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRsvps()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the RSVP response for "${name}"?`)) return

    try {
      const res = await fetch(`/api/admin/rsvp?id=${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        toast.success('RSVP entry deleted successfully')
        setRsvps(prev => prev.filter(r => r._id !== id))
      } else {
        toast.error(data.error || 'Failed to delete RSVP')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error deleting RSVP')
    }
  }

  // Filter and search logic
  const filteredRsvps = rsvps.filter((rsvp) => {
    const matchesSearch = rsvp.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.customNote.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || rsvp.attendanceStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--color-gold-300)]">RSVP Responses</h1>
          <p className="font-body text-xs text-slate-400 mt-1">Review list of guests, attendance replies, and notes</p>
        </div>
        
        {/* Export JSON option */}
        <button
          onClick={() => {
            const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(rsvps, null, 2)
            )}`
            const downloadAnchor = document.createElement('a')
            downloadAnchor.setAttribute('href', jsonString)
            downloadAnchor.setAttribute('download', `wedding_rsvps_${new Date().toISOString().slice(0, 10)}.json`)
            document.body.appendChild(downloadAnchor)
            downloadAnchor.click()
            downloadAnchor.remove()
          }}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs uppercase font-body tracking-wider transition-colors border border-slate-700"
        >
          ⬇️ Export RSVPs (JSON)
        </button>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col sm:flex-row gap-4 bg-[var(--color-slate-900)] border border-slate-800 p-5 rounded-2xl">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, contact or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-850 border border-slate-800 text-xs focus:border-[var(--color-gold-500)] focus:outline-none text-white"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-850 border border-slate-800 text-xs focus:border-[var(--color-gold-500)] focus:outline-none text-white"
          >
            <option value="all">All Responses</option>
            <option value="attending">Attending</option>
            <option value="not_attending">Declined</option>
            <option value="maybe">Maybe</option>
          </select>
        </div>
      </div>

      {/* RSVPs Table */}
      <div className="bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-body text-sm">
            Loading RSVP responses...
          </div>
        ) : filteredRsvps.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-body text-sm">
            No matching RSVP responses found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider font-body font-semibold text-slate-400 bg-slate-950/40">
                  <th className="px-6 py-4">Guest Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Count</th>
                  <th className="px-6 py-4">Meal Pref</th>
                  <th className="px-6 py-4">Events Attending</th>
                  <th className="px-6 py-4">Notes / Wishes</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-body text-xs text-slate-300">
                {filteredRsvps.map((rsvp) => (
                  <tr key={rsvp._id} className="hover:bg-slate-850/50 transition-colors">
                    {/* Guest Name */}
                    <td className="px-6 py-4 font-semibold text-white truncate max-w-[150px]">
                      {rsvp.guestName}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold ${
                        rsvp.attendanceStatus === 'attending'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : rsvp.attendanceStatus === 'not_attending'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {rsvp.attendanceStatus === 'attending' 
                          ? 'Attending' 
                          : rsvp.attendanceStatus === 'not_attending'
                          ? 'Declined'
                          : 'Maybe'
                        }
                      </span>
                    </td>

                    {/* Guest Count */}
                    <td className="px-6 py-4 text-center font-semibold text-white">
                      {rsvp.attendanceStatus === 'attending' ? rsvp.guestCount : '-'}
                    </td>

                    {/* Meal Pref */}
                    <td className="px-6 py-4 truncate uppercase max-w-[100px] text-slate-400 text-[10px]">
                      {rsvp.attendanceStatus === 'attending' ? (rsvp.mealPreference || 'none') : '-'}
                    </td>

                    {/* Events list */}
                    <td className="px-6 py-4 max-w-[180px]">
                      {rsvp.attendanceStatus === 'attending' ? (
                        <div className="flex flex-wrap gap-1">
                          {rsvp.eventsAttending && rsvp.eventsAttending.length > 0 ? (
                            rsvp.eventsAttending.map((ev, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-slate-800 text-[9px] rounded border border-slate-700 text-slate-300">
                                {ev}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-[10px]">None selected</span>
                          )}
                        </div>
                      ) : '-'}
                    </td>

                    {/* Notes */}
                    <td className="px-6 py-4 max-w-[200px] truncate italic text-slate-400" title={rsvp.customNote}>
                      {rsvp.customNote || '-'}
                    </td>

                    {/* Contact Details */}
                    <td className="px-6 py-4 space-y-0.5 max-w-[150px]">
                      {rsvp.phone && <p className="truncate">📞 {rsvp.phone}</p>}
                      {rsvp.email && <p className="truncate text-slate-500 text-[10px]">✉️ {rsvp.email}</p>}
                      {!rsvp.phone && !rsvp.email && <span className="text-slate-600">-</span>}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(rsvp._id!, rsvp.guestName)}
                        className="text-rose-500 hover:text-rose-400 text-xs font-semibold uppercase tracking-wider"
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
  )
}
