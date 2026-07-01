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
    const rsvps = await RsvpEntry.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, rsvps })
  } catch (err: any) {
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
      return NextResponse.json({ success: false, error: 'RSVP ID is required' }, { status: 400 })
    }

    await connectDB()
    await RsvpEntry.findByIdAndDelete(id)

    return NextResponse.json({ success: true, message: 'RSVP entry deleted successfully' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
