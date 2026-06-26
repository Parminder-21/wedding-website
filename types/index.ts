// ============================================================
// TypeScript Types — Wedding Website
// ============================================================

export interface SiteSettings {
  _id?: string
  brideName: string
  groomName: string
  weddingDate: string
  tagline: string
  invitationMessage: string
  heroBgImageUrl: string
  musicUrl: string
  musicEnabled: boolean
  themePrimaryColor: string
  themeSecondaryColor: string
  themeAccentColor: string
  googleFontHeading: string
  googleFontBody: string
  seoTitle: string
  seoDescription: string
  seoOgImageUrl: string
  published: boolean
  sections: SectionVisibility
  updatedAt?: string
}

export interface SectionVisibility {
  hero: boolean
  story: boolean
  events: boolean
  couple: boolean
  venue: boolean
  rsvp: boolean
  gallery: boolean
  travel: boolean
  faq: boolean
  contact: boolean
}

export interface CoupleProfile {
  _id?: string
  role: 'bride' | 'groom'
  fullName: string
  nickname: string
  photoUrl: string
  bio: string
  familyIntro: string
  parentsNames: string
  siblings: string
  displayOrder: number
}

export interface StoryMilestone {
  _id?: string
  title: string
  date: string
  description: string
  imageUrl: string
  icon: string
  displayOrder: number
}

export interface WeddingEvent {
  _id?: string
  title: string
  eventType: 'roka' | 'haldi' | 'mehendi' | 'sangeet' | 'wedding' | 'reception' | 'other'
  eventDate: string
  startTime: string
  endTime: string
  venue: string
  address: string
  mapsLink: string
  dressCode: string
  note: string
  imageUrl: string
  icon: string
  isVisible: boolean
  displayOrder: number
}

export interface Venue {
  _id?: string
  name: string
  description: string
  address: string
  mapsLink: string
  mapsEmbedUrl: string
  imageUrl: string
  parkingNotes: string
  accommodationNotes: string
  phone: string
  isPrimary: boolean
  displayOrder: number
}

export interface GalleryItem {
  _id?: string
  imageUrl: string
  caption: string
  category: string
  isVisible: boolean
  displayOrder: number
  uploadedAt?: string
}

export interface RsvpEntry {
  _id?: string
  guestName: string
  phone: string
  email: string
  attendanceStatus: 'attending' | 'not_attending' | 'maybe'
  guestCount: number
  mealPreference: string
  customNote: string
  eventsAttending: string[]
  createdAt?: string
}

export interface FaqItem {
  _id?: string
  question: string
  answer: string
  category: string
  displayOrder: number
}

export interface Contact {
  _id?: string
  name: string
  role: string
  phone: string
  email: string
  whatsapp: string
  displayOrder: number
}

export interface TravelInfo {
  _id?: string
  type: 'hotel' | 'transport' | 'airport' | 'note'
  title: string
  description: string
  address: string
  phone: string
  websiteUrl: string
  mapsLink: string
  imageUrl: string
  displayOrder: number
}

export interface GuestInvite {
  _id?: string
  slug: string
  guestName: string
  guestEmail: string
  customMessage: string
  eventsInvited: string[]
  isActive: boolean
  createdAt?: string
}

export interface AdminUser {
  _id?: string
  email: string
  name: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Dashboard analytics
export interface DashboardStats {
  totalRsvp: number
  attending: number
  notAttending: number
  maybe: number
  totalGuests: number
}
