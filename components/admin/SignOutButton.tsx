'use client'

import { signOut } from 'next-auth/react'

export default function AdminSignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full text-center py-2.5 text-xs font-body uppercase bg-[var(--color-maroon-500)]/20 hover:bg-[var(--color-maroon-500)] hover:text-white text-[var(--color-maroon-300)] rounded-xl transition-all font-semibold"
    >
      Sign Out
    </button>
  )
}
