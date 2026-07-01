import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import { SiteSettings } from '@/lib/models'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const settings = await SiteSettings.findOne({}).lean()
    return NextResponse.json({ success: true, settings })
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
    await connectDB()

    // Find and update or create
    let settings = await SiteSettings.findOne({})
    if (!settings) {
      settings = new SiteSettings(body)
    } else {
      Object.assign(settings, body)
    }

    await settings.save()

    return NextResponse.json({ success: true, settings })
  } catch (err: any) {
    console.error('Failed to update settings:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
