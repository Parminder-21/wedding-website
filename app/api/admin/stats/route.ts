import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import { RsvpEntry } from '@/lib/models'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    const rsvps = await RsvpEntry.find({}).lean()

    const stats = {
      totalRsvp: rsvps.length,
      attending: rsvps.filter((r: any) => r.attendanceStatus === 'attending').length,
      notAttending: rsvps.filter((r: any) => r.attendanceStatus === 'not_attending').length,
      maybe: rsvps.filter((r: any) => r.attendanceStatus === 'maybe').length,
      totalGuests: rsvps
        .filter((r: any) => r.attendanceStatus === 'attending')
        .reduce((sum: number, r: any) => sum + (Number(r.guestCount) || 1), 0),
    }

    return NextResponse.json({ success: true, stats })
  } catch (err: any) {
    console.error('Failed to fetch admin stats:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
