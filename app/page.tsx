import connectDB from '@/lib/mongodb'
import { 
  SiteSettings, WeddingEvent, StoryMilestone, 
  CoupleProfile, Venue, GalleryItem, TravelInfo, 
  FaqItem, Contact 
} from '@/lib/models'
import Hero from '@/components/public/Hero'
import Navbar from '@/components/public/Navbar'
import EventsSection from '@/components/public/EventsSection'
import StorySection from '@/components/public/StorySection'
import CoupleSection from '@/components/public/CoupleSection'
import VenueSection from '@/components/public/VenueSection'
import RsvpSection from '@/components/public/RsvpSection'
import GallerySection from '@/components/public/GallerySection'
import TravelSection from '@/components/public/TravelSection'
import FaqSection from '@/components/public/FaqSection'
import ContactSection from '@/components/public/ContactSection'
import Footer from '@/components/public/Footer'

export const revalidate = 60 // ISR every 60 seconds

async function getData() {
  try {
    if (!process.env.MONGODB_URI) {
      return { error: 'MONGODB_URI is not set in .env.local' }
    }
    
    await connectDB()
    const [settings, events, milestones, couple, venues, gallery, travel, faqs, contacts] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      WeddingEvent.find({ isVisible: true }).sort({ displayOrder: 1, eventDate: 1 }).lean(),
      StoryMilestone.find({}).sort({ displayOrder: 1 }).lean(),
      CoupleProfile.find({}).sort({ displayOrder: 1 }).lean(),
      Venue.find({}).sort({ displayOrder: 1 }).lean(),
      GalleryItem.find({ isVisible: true }).sort({ displayOrder: 1 }).lean(),
      TravelInfo.find({}).sort({ displayOrder: 1 }).lean(),
      FaqItem.find({}).sort({ displayOrder: 1 }).lean(),
      Contact.find({}).sort({ displayOrder: 1 }).lean(),
    ])
    
    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      events: events ? JSON.parse(JSON.stringify(events)) : [],
      milestones: milestones ? JSON.parse(JSON.stringify(milestones)) : [],
      couple: couple ? JSON.parse(JSON.stringify(couple)) : [],
      venues: venues ? JSON.parse(JSON.stringify(venues)) : [],
      gallery: gallery ? JSON.parse(JSON.stringify(gallery)) : [],
      travel: travel ? JSON.parse(JSON.stringify(travel)) : [],
      faqs: faqs ? JSON.parse(JSON.stringify(faqs)) : [],
      contacts: contacts ? JSON.parse(JSON.stringify(contacts)) : [],
    }
  } catch (err: any) {
    console.error('Error fetching data:', err)
    return { error: err.message || 'Failed to connect to database' }
  }
}

export default async function Home() {
  const data = await getData()

  if (data.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-slate-900)] text-[var(--color-ivory)] p-8">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-display text-[var(--color-gold-500)] mb-4">Setup Required</h1>
          <p className="mb-4 text-red-400">{data.error}</p>
          <p className="mb-4">Please create a `.env.local` file based on `.env.local.example` and add your MONGODB_URI.</p>
          <p>Then run `npx tsx scripts/seed.ts` to populate the database.</p>
        </div>
      </div>
    )
  }

  const { settings, events, milestones, couple, venues, gallery, travel, faqs, contacts } = data

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-slate-900)] text-[var(--color-ivory)] p-8">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-display text-[var(--color-gold-500)] mb-4">Database Empty</h1>
          <p>Please run `npx tsx scripts/seed.ts` to populate the initial data.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--color-ivory)]">
      <Navbar />
      {settings.sections?.hero !== false && <Hero settings={settings} />}
      {settings.sections?.couple !== false && <CoupleSection couple={couple} />}
      {settings.sections?.story !== false && <StorySection milestones={milestones} />}
      {settings.sections?.events !== false && <EventsSection events={events} />}
      {settings.sections?.venue !== false && <VenueSection venues={venues} />}
      {settings.sections?.rsvp !== false && <RsvpSection events={events} />}
      {settings.sections?.gallery !== false && <GallerySection gallery={gallery} />}
      {settings.sections?.travel !== false && <TravelSection travel={travel} />}
      {settings.sections?.faq !== false && <FaqSection faqs={faqs} />}
      {settings.sections?.contact !== false && <ContactSection contacts={contacts} />}
      <Footer settings={settings} />
    </main>
  )
}
