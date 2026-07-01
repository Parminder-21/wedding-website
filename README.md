# 🌸 Arjun & Priya's Wedding Celebration Website

Welcome to the digital home of Arjun Kapoor & Priya Sharma's wedding celebration. This is a premium, fully responsive, and animated Next.js web application built using Tailwind CSS v4, Framer Motion, and MongoDB. It includes a beautiful public guest interface, personalized invitation pages, and a secure administrative dashboard.

---

## ✨ Key Features

### 🏛️ Guest Invitation Interface
* **Personalized Invitations**: Dynamic paths (`/invite/[slug]`) welcoming guests by name with a customized card and pre-filled details.
* **Fluid Animations**: Subtle micro-animations, fade-ups, and a floating rose petal effect built with Framer Motion and custom CSS keyframes.
* **Interactive RSVP**: An elegant guest attendance form featuring diet selection, guest counts, and event toggles. Successful RSVPs trigger a **canvas-confetti** explosion!
* **Interactive Venue Guide**: Fully responsive layout showing event addresses, parking info, and built-in interactive Google Maps embeds.
* **Filterable Photo Gallery**: Responsive grid layout with quick filters for different wedding rituals and a lightbox zoom effect.
* **Travel & Stays**: Dedicated tabs outlining accommodation options, local transport hotlines, and travel tips for out-of-town guests.

### 🔐 Secure Admin Control Center (`/admin`)
* **Analytics Overview**: High-level dashboard showing total RSVPs, attending vs declining guest headcounts, and recent activity.
* **RSVP Manager**: Interactive data table displaying guest choices, meal preferences, and custom messages. Includes search, filter, and **JSON data export** functionalities.
* **Invites Generator**: Instantly generate custom guest paths (e.g. `/invite/rahul-and-family`) and map their invited events list.
* **Unified Content Editor**: Edit site details, couple bios, timeline milestones, FAQ accordions, and travel recommendations directly from a single UI.
* **Theme customizer**: Turn sections on/off instantly and customize site themes.

---

## 🛠️ Tech Stack
* **Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS v4
* **Animations**: Framer Motion
* **Database**: MongoDB (via Mongoose ODM)
* **Auth**: Auth.js (NextAuth v5)
* **Hosting**: Vercel

---

## 🚀 Getting Started

### 1. Pre-requisites
Make sure you have [Node.js](https://nodejs.org) installed on your system.

### 2. Environment Setup
Create a `.env.local` file in the root of the project and populate it with your database and authentication secrets:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

ADMIN_EMAIL=admin@wedding.com
ADMIN_PASSWORD=Admin@Wedding2024
```

### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Seed the Database
Run the seed script to wipe any stale entries and populate the initial settings, couple bios, events, and create the default admin account:
```bash
npx tsx scripts/seed.ts
```

### 5. Launch local server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the wedding website, or [http://localhost:3000/admin](http://localhost:3000/admin) to log in as administrator.

---

## ⚡ Deployment
This site is pre-configured for one-click deployment to Vercel:
1. Push your repository to GitHub.
2. Go to **Vercel** ➔ **Import Project** ➔ Select this repository.
3. Add the Environment Variables from your local `.env.local` file.
4. Click **Deploy**. Vercel will automatically build the site and launch your production domain.

---
*Made with 💖 for Arjun & Priya.*

