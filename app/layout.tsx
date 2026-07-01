import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Arjun & Priya — Wedding Celebration',
  description: 'Join us to celebrate the wedding of Arjun Kapoor and Priya Sharma on December 18, 2026.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--color-ivory)] text-[var(--color-slate-900)]">
        {children}
        <Toaster position="bottom-center" toastOptions={{
          style: {
            background: 'var(--color-slate-900)',
            color: 'var(--color-ivory)',
            border: '1px solid var(--color-gold-500)',
          },
        }} />
      </body>
    </html>
  )
}
