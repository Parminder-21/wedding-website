import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { RsvpEntry } from '@/lib/models'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      guestName, 
      phone, 
      email, 
      attendanceStatus, 
      guestCount, 
      mealPreference, 
      customNote, 
      eventsAttending 
    } = body

    if (!guestName || !attendanceStatus) {
      return NextResponse.json(
        { success: false, error: 'Name and Attendance Status are required fields.' },
        { status: 400 }
      )
    }

    await connectDB()

    // Create a new RSVP entry
    const newRsvp = await RsvpEntry.create({
      guestName: guestName.trim(),
      phone: phone || '',
      email: email || '',
      attendanceStatus,
      guestCount: attendanceStatus === 'attending' ? (Number(guestCount) || 1) : 0,
      mealPreference: mealPreference || '',
      customNote: customNote || '',
      eventsAttending: attendanceStatus === 'attending' ? (eventsAttending || []) : [],
    })

    return NextResponse.json({ success: true, data: newRsvp })
  } catch (err: any) {
    console.error('RSVP submission error:', err)
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to submit RSVP' },
      { status: 500 }
    )
  }
}
