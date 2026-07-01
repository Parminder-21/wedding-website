import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminSignOutButton from '@/components/admin/SignOutButton'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'RSVP Responses', href: '/admin/rsvp', icon: '💌' },
    { name: 'Personalized Invites', href: '/admin/invites', icon: '🎫' },
    { name: 'Theme & Sections', href: '/admin/settings', icon: '⚙️' },
    { name: 'Manage Content', href: '/admin/content', icon: '📝' },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-slate-950)] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[var(--color-slate-900)] border-r border-[var(--color-gold-900)]/20 p-6 flex flex-col justify-between">
        <div>
          {/* Header/Brand */}
          <div className="mb-10 text-center md:text-left">
            <Link href="/" className="font-display text-2xl tracking-widest text-[var(--color-gold-300)]">
              A &amp; P ADMIN
            </Link>
            <p className="text-[10px] uppercase font-body tracking-wider text-slate-500 mt-1">
              Wedding Control Panel
            </p>
          </div>

          {/* Nav Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800/80 transition-colors font-body text-xs uppercase tracking-wider text-slate-300 hover:text-[var(--color-gold-300)]"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-800 mt-8 flex flex-col space-y-4">
          <div className="flex items-center space-x-3 px-2">
            <span className="text-xl">👤</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-slate-300">{session.user?.name || 'Admin'}</p>
              <p className="text-[10px] text-slate-500 truncate">{session.user?.email}</p>
            </div>
          </div>
          
          <Link
            href="/"
            className="text-center py-2 text-xs font-body uppercase border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
          >
            👁️ Visit Website
          </Link>

          <AdminSignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
