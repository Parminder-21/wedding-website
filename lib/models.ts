import mongoose, { Schema } from 'mongoose'

// ── Site Settings ──────────────────────────────────────────
const SiteSettingsSchema = new Schema({
  brideName:          { type: String, default: 'Priya Sharma' },
  groomName:          { type: String, default: 'Arjun Kapoor' },
  weddingDate:        { type: String, default: '2026-12-18T10:00:00+05:30' },
  tagline:            { type: String, default: 'Two souls, one forever' },
  invitationMessage:  { type: String, default: 'Together with their families, we joyfully invite you to celebrate the union of Arjun & Priya.' },
  heroBgImageUrl:     { type: String, default: '' },
  musicUrl:           { type: String, default: '' },
  musicEnabled:       { type: Boolean, default: false },
  themePrimaryColor:  { type: String, default: '#C9A84C' },
  themeSecondaryColor:{ type: String, default: '#8B1A1A' },
  themeAccentColor:   { type: String, default: '#FAF7F2' },
  googleFontHeading:  { type: String, default: 'Cormorant Garamond' },
  googleFontBody:     { type: String, default: 'Jost' },
  seoTitle:           { type: String, default: 'Arjun & Priya — Wedding 2026' },
  seoDescription:     { type: String, default: 'Join us to celebrate the wedding of Arjun Kapoor and Priya Sharma on December 18, 2026.' },
  seoOgImageUrl:      { type: String, default: '' },
  published:          { type: Boolean, default: true },
  sections: {
    hero:    { type: Boolean, default: true },
    story:   { type: Boolean, default: true },
    events:  { type: Boolean, default: true },
    couple:  { type: Boolean, default: true },
    venue:   { type: Boolean, default: true },
    rsvp:    { type: Boolean, default: true },
    gallery: { type: Boolean, default: true },
    travel:  { type: Boolean, default: true },
    faq:     { type: Boolean, default: true },
    contact: { type: Boolean, default: true },
  },
}, { timestamps: true })

// ── Couple Profiles ────────────────────────────────────────
const CoupleProfileSchema = new Schema({
  role:           { type: String, enum: ['bride', 'groom'], required: true },
  fullName:       { type: String, required: true },
  nickname:       { type: String, default: '' },
  photoUrl:       { type: String, default: '' },
  bio:            { type: String, default: '' },
  familyIntro:    { type: String, default: '' },
  parentsNames:   { type: String, default: '' },
  siblings:       { type: String, default: '' },
  displayOrder:   { type: Number, default: 0 },
}, { timestamps: true })

// ── Story Milestones ───────────────────────────────────────
const StoryMilestoneSchema = new Schema({
  title:        { type: String, required: true },
  date:         { type: String, default: '' },
  description:  { type: String, default: '' },
  imageUrl:     { type: String, default: '' },
  icon:         { type: String, default: 'heart' },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

// ── Wedding Events ─────────────────────────────────────────
const WeddingEventSchema = new Schema({
  title:        { type: String, required: true },
  eventType:    { type: String, enum: ['roka','haldi','mehendi','sangeet','wedding','reception','other'], default: 'other' },
  eventDate:    { type: String, default: '' },
  startTime:    { type: String, default: '' },
  endTime:      { type: String, default: '' },
  venue:        { type: String, default: '' },
  address:      { type: String, default: '' },
  mapsLink:     { type: String, default: '' },
  dressCode:    { type: String, default: '' },
  note:         { type: String, default: '' },
  imageUrl:     { type: String, default: '' },
  icon:         { type: String, default: '🌸' },
  isVisible:    { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

// ── Venues ─────────────────────────────────────────────────
const VenueSchema = new Schema({
  name:               { type: String, required: true },
  description:        { type: String, default: '' },
  address:            { type: String, default: '' },
  mapsLink:           { type: String, default: '' },
  mapsEmbedUrl:       { type: String, default: '' },
  imageUrl:           { type: String, default: '' },
  parkingNotes:       { type: String, default: '' },
  accommodationNotes: { type: String, default: '' },
  phone:              { type: String, default: '' },
  isPrimary:          { type: Boolean, default: false },
  displayOrder:       { type: Number, default: 0 },
}, { timestamps: true })

// ── Gallery Items ──────────────────────────────────────────
const GalleryItemSchema = new Schema({
  imageUrl:     { type: String, required: true },
  caption:      { type: String, default: '' },
  category:     { type: String, default: 'general' },
  isVisible:    { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

// ── RSVP Entries ───────────────────────────────────────────
const RsvpEntrySchema = new Schema({
  guestName:        { type: String, required: true },
  phone:            { type: String, default: '' },
  email:            { type: String, default: '' },
  attendanceStatus: { type: String, enum: ['attending','not_attending','maybe'], required: true },
  guestCount:       { type: Number, default: 1 },
  mealPreference:   { type: String, default: '' },
  customNote:       { type: String, default: '' },
  eventsAttending:  [{ type: String }],
}, { timestamps: true })

// ── FAQ Items ──────────────────────────────────────────────
const FaqItemSchema = new Schema({
  question:     { type: String, required: true },
  answer:       { type: String, required: true },
  category:     { type: String, default: 'general' },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

// ── Contacts ───────────────────────────────────────────────
const ContactSchema = new Schema({
  name:         { type: String, required: true },
  role:         { type: String, default: '' },
  phone:        { type: String, default: '' },
  email:        { type: String, default: '' },
  whatsapp:     { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

// ── Travel Info ────────────────────────────────────────────
const TravelInfoSchema = new Schema({
  type:         { type: String, enum: ['hotel','transport','airport','note'], default: 'hotel' },
  title:        { type: String, required: true },
  description:  { type: String, default: '' },
  address:      { type: String, default: '' },
  phone:        { type: String, default: '' },
  websiteUrl:   { type: String, default: '' },
  mapsLink:     { type: String, default: '' },
  imageUrl:     { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

// ── Guest Invites ──────────────────────────────────────────
const GuestInviteSchema = new Schema({
  slug:          { type: String, required: true, unique: true },
  guestName:     { type: String, required: true },
  guestEmail:    { type: String, default: '' },
  customMessage: { type: String, default: '' },
  eventsInvited: [{ type: String }],
  isActive:      { type: Boolean, default: true },
}, { timestamps: true })

// ── Admin Users ────────────────────────────────────────────
const AdminUserSchema = new Schema({
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name:         { type: String, default: 'Admin' },
}, { timestamps: true })

// Export models (with cache guard for Next.js hot reload)
export const SiteSettings    = mongoose.models.SiteSettings    || mongoose.model('SiteSettings',    SiteSettingsSchema)
export const CoupleProfile   = mongoose.models.CoupleProfile   || mongoose.model('CoupleProfile',   CoupleProfileSchema)
export const StoryMilestone  = mongoose.models.StoryMilestone  || mongoose.model('StoryMilestone',  StoryMilestoneSchema)
export const WeddingEvent    = mongoose.models.WeddingEvent    || mongoose.model('WeddingEvent',    WeddingEventSchema)
export const Venue           = mongoose.models.Venue           || mongoose.model('Venue',           VenueSchema)
export const GalleryItem     = mongoose.models.GalleryItem     || mongoose.model('GalleryItem',     GalleryItemSchema)
export const RsvpEntry       = mongoose.models.RsvpEntry       || mongoose.model('RsvpEntry',       RsvpEntrySchema)
export const FaqItem         = mongoose.models.FaqItem         || mongoose.model('FaqItem',         FaqItemSchema)
export const Contact         = mongoose.models.Contact         || mongoose.model('Contact',         ContactSchema)
export const TravelInfo      = mongoose.models.TravelInfo      || mongoose.model('TravelInfo',      TravelInfoSchema)
export const GuestInvite     = mongoose.models.GuestInvite     || mongoose.model('GuestInvite',     GuestInviteSchema)
export const AdminUser       = mongoose.models.AdminUser       || mongoose.model('AdminUser',       AdminUserSchema)
