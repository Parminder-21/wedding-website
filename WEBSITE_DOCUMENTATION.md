# 🌸 Wedding Website Project Documentation

This document provides a comprehensive overview of the website's architecture, folder structure, page flows, API endpoints, and security implementations.

---

## 📂 Project Structure & Directories

The codebase is structured under Next.js standard conventions:

* **`/app`**: Contains all page routes, layouts, and API endpoints using the Next.js App Router.
  * **`layout.tsx`**: Root layout setting up fonts (Cormorant Garamond & Jost) and global toaster notifications.
  * **`page.tsx`**: Home landing page fetching settings, couple profiles, events, and milestones to render the public guest sections.
  * **`globals.css`**: Central stylesheet importing Tailwind CSS v4 and defining custom color variables (`--color-ivory`, `--color-gold-500`, `--color-maroon-500`) and keyframe animations.
  * **`/invite/[slug]`**: Dynamic personalized welcome path for specific guests.
  * **`/admin`**: Administration panel containing:
    * **`login`**: Credentials validation sign-in card.
    * **`(dashboard)`**: Secured route group isolating administrative layout from the login page, containing overview statistics, RSVP lists, custom invite creators, theme customizers, and CRUD forms.
  * **`/api`**: Backend endpoints handling operations for RSVPs, next-auth sessions, statistics, settings, and content management.
* **`/components`**: Reusable React components:
  * **`/public`**: Public landing page blocks (Hero, Navbar, Couple, Story, Events, Venue, RSVP, Gallery, Travel, FAQ, Contact, Footer).
  * **`/admin`**: Dashboard controls (e.g. SignOut Button).
* **`/lib`**: Core utilities:
  * **`mongodb.ts`**: Database connection cache guard preventing multiple Mongoose connection instances during hot reloads.
  * **`models.ts`**: Mongoose schemas and models defining constraints and default values for Settings, RSVPs, Milestones, Events, Venues, etc.
  * **`auth.ts`**: NextAuth v5 session config and credentials authorization provider.
* **`/scripts`**: Utility scripts (e.g. `seed.ts` to populate mock database records).
* **`/types`**: Reusable TypeScript interfaces mapping to MongoDB data models.

---

## 🏛️ Guest User Flow (Public Website)

1. **Main Landing Page (`/`)**:
   * **Hero**: Dynamic visual welcome with a tagline and floating rose petal animations.
   * **Couple**: High-quality photo cards showcasing Arjun & Priya with their bios, parent names, and family context.
   * **Story**: Scroll-animated timeline showing milestone dates, descriptions, and icon markers.
   * **Events**: Grid cards showing wedding rituals (Roka, Haldi, Sangeet, Wedding, Reception) with dates, times, dress codes, and click-to-map redirects.
   * **Venue**: Detailed address cards displaying primary locations alongside embedded Google maps and parking advices.
   * **RSVP Form**: Interactive form allowing guests to search their names, check attending events, select food preferences, specify guest count, and write custom messages. Successful submissions trigger a **confetti burst**.
   * **Gallery**: Category-filtered masonry grid featuring a clickable lightbox zoom popup.
   * **Travel**: Transit recommendations, stays, and guidelines.
   * **FAQ**: Collapsible accordion answering guest questions.
   * **Contact**: Family planner phone listings and click-to-WhatsApp links.

2. **Personalized Invite Path (`/invite/[slug]`)**:
   * Displays a customized greeting card welcoming the guest by their specific name.
   * Renders a personalized text message from the couple.
   * Pre-fills their name and checks the events they are invited to in the RSVP form, making registration quick and frictionless.

---

## 🔐 Admin Control Center & Features (`/admin`)

The Admin Panel provides complete control over the guest list, data, and website behavior:

* **Dashboard Metrics**: Real-time counters showing Total RSVPs, attending vs declining guest headcounts, and recent entries logs.
* **RSVP Manager**: Searchable and filterable data table showcasing guest responses, guest numbers, meal choices, and notes. Admins can delete spam entries or export the entire guest list to **JSON format** for printing or planners.
* **Invite Manager**: Form to add guest names, customize messages, specify which events they are allowed to attend, and generate unique invitation URLs. Includes a **one-click copy URL** helper.
* **Settings & Toggles**: Customizer tool to edit names, dates, backgrounds, and SEO tags. Includes toggles to show/hide specific landing page blocks (e.g. hide the RSVP form once the deadline passes).
* **Unified Content CRUD**: A clean page hosting tabs for all collections where admins can add, edit, or delete Story Milestones, Wedding Events, Venues, FAQs, Gallery items, Travel cards, and Contacts from modal forms.

---

## 🛡️ Security Implementations

* **Ignored Secrets**: Local configuration secrets (`.env.local`) are added to `.gitignore` to prevent database passwords, Cloudinary keys, or Auth secrets from leaking on GitHub.
* **Password Encryption**: Admin passwords are securely **hashed** using `bcryptjs` before insertion into the database, guaranteeing security.
* **Session Guards**: The admin panel utilizes server-side NextAuth session checks. Unauthorized requests to `/admin` are immediately redirected to `/admin/login`.
* **API Guards**: Dashboard, RSVP list, Settings, and Content CRUD endpoints (`/api/admin/...`) verify active NextAuth admin sessions on the server, responding with `401 Unauthorized` for anonymous requests.
* **DNS SRV Bypass**: Configured standard multi-node connection string to prevent connection failures arising from ISP-level SRV record DNS resolution blocks.
