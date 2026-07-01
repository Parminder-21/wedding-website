import connectDB from '@/lib/mongodb'
import { GuestInvite, SiteSettings, WeddingEvent } from '@/lib/models'
import RsvpSection from '@/components/public/RsvpSection'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function InvitePage({ params }: PageProps) {
  const { slug } = await params

  await connectDB()

  const invite = await GuestInvite.findOne({ slug, isActive: true }).lean() as any
  if (!invite) {
    notFound()
  }

  const [settings, events] = await Promise.all([
    SiteSettings.findOne({}).lean() as any,
    WeddingEvent.find({ isVisible: true }).sort({ displayOrder: 1, eventDate: 1 }).lean() as any,
  ])

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-slate-900)] text-white">
        <p>Site settings are not seeded yet.</p>
      </div>
    )
  }

  // Parse for JSON passing
  const serializedSettings = JSON.parse(JSON.stringify(settings))
  const serializedEvents = JSON.parse(JSON.stringify(events))
  const inviteName = invite.guestName as string
  const customMessage = invite.customMessage as string
  const invitedEvents = invite.eventsInvited as string[]

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Navbar />

      {/* Hero Welcome Message */}
      <section className="relative pt-32 pb-20 px-4 text-center bg-gradient-to-b from-[var(--color-maroon-50)] to-[#FAF7F2] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold-200)/10_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="text-5xl block">✉️</span>
          <p className="font-body uppercase tracking-[0.2em] text-xs text-[var(--color-gold-700)] font-semibold">
            Personal Invitation
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-slate-900)]">
            Namaste, {inviteName}
          </h1>
          <div className="h-[1px] w-24 bg-[var(--color-gold-500)] mx-auto my-6" />
          <p className="font-display italic text-lg text-[var(--color-maroon-600)] max-w-lg mx-auto leading-relaxed">
            &ldquo;{customMessage || settings.invitationMessage}&rdquo;
          </p>
          <p className="font-body text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            We would be honored to have you celebrate our union. Please RSVP below indicating which events you will attend.
          </p>
        </div>
      </section>

      {/* RSVP Section Prefilled */}
      <RsvpSection 
        events={serializedEvents} 
        prefilledName={inviteName} 
        prefilledEvents={invitedEvents}
      />

      <Footer settings={serializedSettings} />
    </div>
  )
}
