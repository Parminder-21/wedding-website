import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import { GuestInvite } from '@/lib/models'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const invites = await GuestInvite.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, invites })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { guestName, guestEmail, customMessage, eventsInvited } = body

    if (!guestName) {
      return NextResponse.json({ success: false, error: 'Guest name is required' }, { status: 400 })
    }

    await connectDB()

    // Generate unique slug from guest name
    let baseSlug = guestName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    if (!baseSlug) baseSlug = 'guest'

    let slug = baseSlug
    let counter = 1
    let slugExists = await GuestInvite.findOne({ slug })

    while (slugExists) {
      slug = `${baseSlug}-${counter}`
      counter++
      slugExists = await GuestInvite.findOne({ slug })
    }

    const newInvite = await GuestInvite.create({
      slug,
      guestName,
      guestEmail: guestEmail || '',
      customMessage: customMessage || '',
      eventsInvited: eventsInvited || [],
      isActive: true,
    })

    return NextResponse.json({ success: true, invite: newInvite })
  } catch (err: any) {
    console.error('Failed to create invite:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Invite ID is required' }, { status: 400 })
    }

    await connectDB()
    await GuestInvite.findByIdAndDelete(id)

    return NextResponse.json({ success: true, message: 'Invite deleted successfully' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
