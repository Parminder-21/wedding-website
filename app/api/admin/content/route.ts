import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import { 
  WeddingEvent, StoryMilestone, Venue, 
  GalleryItem, FaqItem, TravelInfo, Contact, CoupleProfile 
} from '@/lib/models'

// Map content type query params to Mongoose models
function getModel(type: string) {
  switch (type) {
    case 'event': return WeddingEvent
    case 'milestone': return StoryMilestone
    case 'venue': return Venue
    case 'gallery': return GalleryItem
    case 'faq': return FaqItem
    case 'travel': return TravelInfo
    case 'contact': return Contact
    case 'couple': return CoupleProfile
    default: return null
  }
}

export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json({ success: false, error: 'Type query parameter is required' }, { status: 400 })
    }

    const Model = getModel(type)
    if (!Model) {
      return NextResponse.json({ success: false, error: 'Invalid content type' }, { status: 400 })
    }

    await connectDB()
    const items = await Model.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean()

    return NextResponse.json({ success: true, items })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    const body = await request.json()

    if (!type) {
      return NextResponse.json({ success: false, error: 'Type query parameter is required' }, { status: 400 })
    }

    const Model = getModel(type)
    if (!Model) {
      return NextResponse.json({ success: false, error: 'Invalid content type' }, { status: 400 })
    }

    await connectDB()
    const item = await Model.create(body)

    return NextResponse.json({ success: true, item })
  } catch (err: any) {
    console.error(`Failed to create content type ${type}:`, err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    const body = await request.json()
    const { _id, ...updateData } = body

    if (!type || !_id) {
      return NextResponse.json({ success: false, error: 'Type and _id are required' }, { status: 400 })
    }

    const Model = getModel(type)
    if (!Model) {
      return NextResponse.json({ success: false, error: 'Invalid content type' }, { status: 400 })
    }

    await connectDB()
    const item = await Model.findByIdAndUpdate(_id, updateData, { new: true })

    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, item })
  } catch (err: any) {
    console.error(`Failed to update content type ${type}:`, err)
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
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (!type || !id) {
      return NextResponse.json({ success: false, error: 'Type and id are required' }, { status: 400 })
    }

    const Model = getModel(type)
    if (!Model) {
      return NextResponse.json({ success: false, error: 'Invalid content type' }, { status: 400 })
    }

    await connectDB()
    const item = await Model.findByIdAndDelete(id)

    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Item deleted successfully' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
