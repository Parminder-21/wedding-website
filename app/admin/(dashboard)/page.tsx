import connectDB from '@/lib/mongodb'
import { RsvpEntry, GuestInvite } from '@/lib/models'
import Link from 'next/link'

export const revalidate = 0 // Disable cache for admin pages

async function getStats() {
  await connectDB()

  const [rsvps, invites] = await Promise.all([
    RsvpEntry.find({}).sort({ createdAt: -1 }).lean(),
    GuestInvite.find({}).sort({ createdAt: -1 }).lean()
  ])

  const totalRsvp = rsvps.length
  const attending = rsvps.filter((r: any) => r.attendanceStatus === 'attending').length
  const notAttending = rsvps.filter((r: any) => r.attendanceStatus === 'not_attending').length
  const maybe = rsvps.filter((r: any) => r.attendanceStatus === 'maybe').length
  const totalGuests = rsvps
    .filter((r: any) => r.attendanceStatus === 'attending')
    .reduce((sum: number, r: any) => sum + (Number(r.guestCount) || 1), 0)

  return {
    stats: { totalRsvp, attending, notAttending, maybe, totalGuests },
    recentRsvps: JSON.parse(JSON.stringify(rsvps.slice(0, 5))),
    recentInvites: JSON.parse(JSON.stringify(invites.slice(0, 5)))
  }
}

export default async function AdminDashboard() {
  const { stats, recentRsvps, recentInvites } = await getStats()

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-4xl text-[var(--color-gold-300)]">Dashboard Overview</h1>
        <p className="font-body text-xs text-slate-400 mt-1">Real-time RSVP analytics and activity log</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total RSVPs Received', value: stats.totalRsvp, emoji: '💌', color: 'from-blue-600/20 to-blue-500/5' },
          { label: 'Total Guests Attending', value: stats.totalGuests, emoji: '👥', color: 'from-emerald-600/20 to-emerald-500/5' },
          { label: 'Joyfully Attending', value: stats.attending, emoji: '🎉', color: 'from-teal-600/20 to-teal-500/5' },
          { label: 'Regretfully Declined', value: stats.notAttending, emoji: '✉️', color: 'from-rose-600/20 to-rose-500/5' },
          { label: 'Undecided / Maybe', value: stats.maybe, emoji: '🤔', color: 'from-amber-600/20 to-amber-500/5' },
        ].map((card, i) => (
          <div 
            key={i} 
            className={`bg-gradient-to-br ${card.color} border border-slate-800 rounded-3xl p-6 flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-body text-slate-400 font-medium leading-tight">{card.label}</span>
              <span className="text-xl">{card.emoji}</span>
            </div>
            <div className="text-3xl font-display mt-4 font-bold text-white">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent RSVPs & Invites */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent RSVPs */}
        <div className="bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl text-[var(--color-gold-200)]">Recent RSVP Responses</h2>
            <Link href="/admin/rsvp" className="text-xs font-body text-[var(--color-gold-500)] hover:underline">
              View All →
            </Link>
          </div>

          {recentRsvps.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm font-body">
              No RSVP responses received yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentRsvps.map((rsvp: any) => (
                <div key={rsvp._id} className="flex justify-between items-center p-4 bg-slate-850 rounded-2xl border border-slate-800/40">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate text-white">{rsvp.guestName}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {rsvp.attendanceStatus === 'attending' 
                        ? `Attending (${rsvp.guestCount} guests)` 
                        : rsvp.attendanceStatus === 'not_attending'
                        ? 'Declined'
                        : 'Maybe'
                      }
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold font-body ${
                      rsvp.attendanceStatus === 'attending'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : rsvp.attendanceStatus === 'not_attending'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {rsvp.attendanceStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Invites */}
        <div className="bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl text-[var(--color-gold-200)]">Recent Custom Invites</h2>
            <Link href="/admin/invites" className="text-xs font-body text-[var(--color-gold-500)] hover:underline">
              View All →
            </Link>
          </div>

          {recentInvites.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm font-body">
              No custom invites created yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentInvites.map((invite: any) => (
                <div key={invite._id} className="flex justify-between items-center p-4 bg-slate-850 rounded-2xl border border-slate-800/40">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate text-white">{invite.guestName}</p>
                    <p className="text-xs text-slate-500 truncate">
                      Slug: <span className="font-mono text-[10px] text-slate-400">{invite.slug}</span>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full text-[10px] font-mono border border-slate-700">
                    {invite.eventsInvited?.length || 0} events
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
