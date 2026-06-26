/**
 * Database seed script — run once to populate initial data
 * Usage: npx tsx scripts/seed.ts
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI!

// ── Import models inline ───────────────────────────────────
import {
  SiteSettings, CoupleProfile, StoryMilestone, WeddingEvent,
  Venue, FaqItem, Contact, TravelInfo, AdminUser,
} from '../lib/models'

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('🔗 Connected to MongoDB')

  // Clear existing data
  await Promise.all([
    SiteSettings.deleteMany({}),
    CoupleProfile.deleteMany({}),
    StoryMilestone.deleteMany({}),
    WeddingEvent.deleteMany({}),
    Venue.deleteMany({}),
    FaqItem.deleteMany({}),
    Contact.deleteMany({}),
    TravelInfo.deleteMany({}),
    AdminUser.deleteMany({}),
  ])
  console.log('🗑️  Cleared existing data')

  // ── Site Settings ──────────────────────────────────────
  await SiteSettings.create({
    brideName: 'Priya Sharma',
    groomName: 'Arjun Kapoor',
    weddingDate: '2026-12-18T10:00:00+05:30',
    tagline: 'दो दिल, एक जिंदगी',
    invitationMessage: 'Together with their families, we joyfully request the honour of your presence to celebrate the auspicious union of Arjun & Priya.',
    heroBgImageUrl: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=1920&q=80',
    musicEnabled: false,
    published: true,
    seoTitle: 'Arjun & Priya — Wedding Celebration 2026',
    seoDescription: 'Join us to celebrate the wedding of Arjun Kapoor and Priya Sharma on December 18, 2026 in New Delhi.',
  })

  // ── Couple Profiles ────────────────────────────────────
  await CoupleProfile.insertMany([
    {
      role: 'groom',
      fullName: 'Arjun Kapoor',
      nickname: 'Arjun',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
      bio: 'A passionate architect by profession and a dreamer by heart. Arjun finds beauty in design, music, and now — in Priya.',
      familyIntro: 'Son of Mr. Rajesh Kapoor and Mrs. Sunita Kapoor, from New Delhi.',
      parentsNames: 'Mr. Rajesh Kapoor & Mrs. Sunita Kapoor',
      siblings: 'Elder sister: Neha Kapoor',
      displayOrder: 0,
    },
    {
      role: 'bride',
      fullName: 'Priya Sharma',
      nickname: 'Priya',
      photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
      bio: 'A classical dancer, an artist, and the light of every room she enters. Priya discovered her forever home in Arjun\'s laughter.',
      familyIntro: 'Daughter of Mr. Vikram Sharma and Mrs. Kavita Sharma, from Jaipur.',
      parentsNames: 'Mr. Vikram Sharma & Mrs. Kavita Sharma',
      siblings: 'Younger brother: Rohan Sharma',
      displayOrder: 1,
    },
  ])

  // ── Story Milestones ───────────────────────────────────
  await StoryMilestone.insertMany([
    {
      title: 'The First Meeting',
      date: 'March 2022',
      description: 'A chance meeting at a mutual friend\'s birthday party in Delhi. Arjun spilled coffee on Priya\'s dress — she laughed instead of being upset. That laugh became his favourite sound.',
      icon: '☕',
      displayOrder: 0,
    },
    {
      title: 'The First Date',
      date: 'April 2022',
      description: 'He took her to Lodi Garden at sunset. They talked for four hours and forgot to eat. They both knew something special had begun.',
      icon: '🌅',
      displayOrder: 1,
    },
    {
      title: 'Meeting the Families',
      date: 'January 2023',
      description: 'Two families, one evening, and endless laughter. Their parents bonded over chai, old Bollywood songs, and their children\'s embarrassing childhood stories.',
      icon: '👨‍👩‍👧‍👦',
      displayOrder: 2,
    },
    {
      title: 'The Proposal',
      date: 'February 2024',
      description: 'Arjun designed a custom architectural model of "their" favourite coffee shop and hid the ring inside. Priya cried. He cried. The whole café clapped.',
      icon: '💍',
      displayOrder: 3,
    },
    {
      title: 'The Roka Ceremony',
      date: 'April 2024',
      description: 'Families formally blessed the union with prayers, sweets, and overflowing joy. The beginning of a beautiful journey together.',
      icon: '🪔',
      displayOrder: 4,
    },
    {
      title: 'Forever Begins',
      date: 'December 2026',
      description: 'And now, we invite you to witness the most beautiful chapter yet. Two souls, one promise, a lifetime of love.',
      icon: '💑',
      displayOrder: 5,
    },
  ])

  // ── Wedding Events ─────────────────────────────────────
  await WeddingEvent.insertMany([
    {
      title: 'Roka Ceremony',
      eventType: 'roka',
      eventDate: '2026-12-14',
      startTime: '11:00 AM',
      endTime: '2:00 PM',
      venue: 'Kapoor Residence',
      address: '42, Vasant Vihar, New Delhi — 110057',
      mapsLink: 'https://maps.google.com',
      dressCode: 'Traditional Indian — pastels preferred',
      note: 'A small, intimate family affair to formally bless the union.',
      icon: '🪔',
      displayOrder: 0,
    },
    {
      title: 'Haldi Ceremony',
      eventType: 'haldi',
      eventDate: '2026-12-16',
      startTime: '9:00 AM',
      endTime: '12:00 PM',
      venue: 'Sharma Residence',
      address: '8, Civil Lines, Jaipur — 302006',
      mapsLink: 'https://maps.google.com',
      dressCode: 'Yellow or White — don\'t wear anything precious!',
      note: 'Come ready to get messy! Haldi, music, and pure joy.',
      icon: '🌼',
      displayOrder: 1,
    },
    {
      title: 'Mehendi Night',
      eventType: 'mehendi',
      eventDate: '2026-12-16',
      startTime: '4:00 PM',
      endTime: '9:00 PM',
      venue: 'The Grand Courtyard, Jaipur',
      address: 'Hotel Jai Mahal Palace, Jacob Road, Jaipur',
      mapsLink: 'https://maps.google.com',
      dressCode: 'Bright florals, ethnic chic',
      note: 'Professional mehendi artists, folk music, and a delicious high tea.',
      icon: '🌿',
      displayOrder: 2,
    },
    {
      title: 'Sangeet Evening',
      eventType: 'sangeet',
      eventDate: '2026-12-17',
      startTime: '7:00 PM',
      endTime: '11:59 PM',
      venue: 'The Leela Palace, New Delhi',
      address: 'Leela Palace, Diplomatic Enclave, Chanakyapuri, New Delhi',
      mapsLink: 'https://maps.google.com',
      dressCode: 'Festive — lehengas, sherwanis, gowns all welcome',
      note: 'An evening of performances, dance, music, and celebration.',
      icon: '🎵',
      displayOrder: 3,
    },
    {
      title: 'The Wedding',
      eventType: 'wedding',
      eventDate: '2026-12-18',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      venue: 'The Leela Palace, New Delhi',
      address: 'Leela Palace, Diplomatic Enclave, Chanakyapuri, New Delhi',
      mapsLink: 'https://maps.google.com',
      dressCode: 'Formal Indian — sarees, lehengas, sherwanis',
      note: 'The sacred ceremony. Kindly be seated by 9:45 AM.',
      icon: '💍',
      displayOrder: 4,
    },
    {
      title: 'Grand Reception',
      eventType: 'reception',
      eventDate: '2026-12-18',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      venue: 'The Leela Palace Ballroom, New Delhi',
      address: 'Leela Palace, Diplomatic Enclave, Chanakyapuri, New Delhi',
      mapsLink: 'https://maps.google.com',
      dressCode: 'Black tie / Cocktail — semi-formal to formal',
      note: 'Dinner, dancing, and a night to remember.',
      icon: '🥂',
      displayOrder: 5,
    },
  ])

  // ── Venues ─────────────────────────────────────────────
  await Venue.insertMany([
    {
      name: 'The Leela Palace, New Delhi',
      description: 'An iconic palace hotel that evokes the grandeur of India\'s regal past. Our primary venue for the Sangeet, Wedding, and Reception.',
      address: 'Diplomatic Enclave, Chanakyapuri, New Delhi — 110023',
      mapsLink: 'https://maps.google.com/?q=The+Leela+Palace+New+Delhi',
      mapsEmbedUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      parkingNotes: 'Complimentary valet parking available for all guests.',
      accommodationNotes: 'Special room rates available for wedding guests. Quote "Kapoor-Sharma Wedding" when booking.',
      phone: '+91 11 3933 1234',
      isPrimary: true,
      displayOrder: 0,
    },
    {
      name: 'Jai Mahal Palace, Jaipur',
      description: 'A heritage palace hotel set amidst lush Mughal gardens — the perfect setting for the Mehendi ceremony.',
      address: 'Jacob Road, Civil Lines, Jaipur — 302006',
      mapsLink: 'https://maps.google.com/?q=Jai+Mahal+Palace+Jaipur',
      mapsEmbedUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1200&q=80',
      parkingNotes: 'Parking available on premises.',
      accommodationNotes: 'Heritage rooms available. Early booking recommended.',
      phone: '+91 141 222 3636',
      isPrimary: false,
      displayOrder: 1,
    },
  ])

  // ── FAQ Items ──────────────────────────────────────────
  await FaqItem.insertMany([
    { question: 'What is the dress code?', answer: 'Each event has its own dress code specified on the Events page. In general: traditional Indian for ceremonies, festive for Sangeet, and formal Indian for the wedding.', category: 'dress', displayOrder: 0 },
    { question: 'Are children welcome?', answer: 'Yes! Children are warmly welcome at all events. A dedicated kids\' area with activities will be set up at the Reception.', category: 'general', displayOrder: 1 },
    { question: 'Is accommodation provided?', answer: 'We\'ve arranged special room rates at The Leela Palace and nearby hotels. Details are in the Travel & Stay section.', category: 'accommodation', displayOrder: 2 },
    { question: 'What about gifts?', answer: 'Your presence is our greatest gift! However, if you wish to give, we have a gift registry at Tanishq and an envelope fund for our honeymoon.', category: 'gifts', displayOrder: 3 },
    { question: 'Will there be vegetarian food options?', answer: 'Absolutely! All events will have an extensive vegetarian spread. Please mention any dietary restrictions in your RSVP.', category: 'food', displayOrder: 4 },
    { question: 'Is photography allowed?', answer: 'Please feel free to capture memories! We do ask that during the wedding ceremony, you keep phones away for the first 30 minutes while our photographer captures the key moments.', category: 'general', displayOrder: 5 },
    { question: 'How do I get to the venues?', answer: 'Both venues are easily accessible by cab/auto. The Travel & Stay section has detailed directions, airport distances, and hotel recommendations.', category: 'transport', displayOrder: 6 },
    { question: 'Who do I contact if I have questions?', answer: 'Please reach out to our wedding coordinators listed in the Contact section. They\'re available 9 AM to 9 PM.', category: 'general', displayOrder: 7 },
  ])

  // ── Contacts ───────────────────────────────────────────
  await Contact.insertMany([
    { name: 'Neha Kapoor', role: 'Groom\'s Family (Sister)', phone: '+91 98765 43210', email: 'neha.kapoor@gmail.com', whatsapp: '+91 98765 43210', displayOrder: 0 },
    { name: 'Rohan Sharma', role: 'Bride\'s Family (Brother)', phone: '+91 87654 32109', email: 'rohan.sharma@gmail.com', whatsapp: '+91 87654 32109', displayOrder: 1 },
    { name: 'Priya Events', role: 'Wedding Planner', phone: '+91 99988 77766', email: 'events@priyaevents.com', whatsapp: '+91 99988 77766', displayOrder: 2 },
    { name: 'The Leela Concierge', role: 'Venue Helpdesk', phone: '+91 11 3933 1234', email: 'delhi@theleela.com', whatsapp: '', displayOrder: 3 },
  ])

  // ── Travel Info ────────────────────────────────────────
  await TravelInfo.insertMany([
    {
      type: 'airport',
      title: 'Indira Gandhi International Airport (DEL)',
      description: 'The primary airport serving New Delhi. Located ~12 km from The Leela Palace. Take a pre-paid taxi or Uber/Ola.',
      address: 'New Delhi — 110037',
      mapsLink: 'https://maps.google.com/?q=IGI+Airport+Delhi',
      displayOrder: 0,
    },
    {
      type: 'transport',
      title: 'Airport to Leela Palace',
      description: 'Pre-paid taxi: ₹350–500 | Uber/Ola: ₹300–450 | Metro: Take Airport Express to New Delhi Station, then cab. Travel time: 25–40 minutes.',
      displayOrder: 1,
    },
    {
      type: 'hotel',
      title: 'The Leela Palace (Primary)',
      description: '5-star palace hotel. Special rate: ₹12,000/night. Quote "Kapoor-Sharma Wedding" when booking.',
      address: 'Diplomatic Enclave, Chanakyapuri, New Delhi',
      phone: '+91 11 3933 1234',
      websiteUrl: 'https://www.theleela.com',
      mapsLink: 'https://maps.google.com/?q=The+Leela+Palace+New+Delhi',
      displayOrder: 2,
    },
    {
      type: 'hotel',
      title: 'The Taj Mahal Hotel',
      description: '5-star. 5 min from venue. Rate: ₹9,500/night. Elegant, heritage property.',
      address: '1, Man Singh Road, New Delhi',
      phone: '+91 11 2302 6162',
      websiteUrl: 'https://www.tajhotels.com',
      mapsLink: 'https://maps.google.com/?q=Taj+Mahal+Hotel+New+Delhi',
      displayOrder: 3,
    },
    {
      type: 'hotel',
      title: 'ITC Maurya',
      description: '5-star. 10 min from venue. Rate: ₹8,000/night. Excellent dining, spacious rooms.',
      address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi',
      phone: '+91 11 2611 2233',
      displayOrder: 4,
    },
  ])

  // ── Admin User ─────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@wedding.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Wedding2024'
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  await AdminUser.create({
    email: adminEmail,
    passwordHash,
    name: 'Wedding Admin',
  })

  console.log(`✅ Admin created: ${adminEmail} / ${adminPassword}`)
  console.log('🎉 Seed complete!')
  await mongoose.disconnect()
}

seed().catch(err => { console.error(err); process.exit(1) })
