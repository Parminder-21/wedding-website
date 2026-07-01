'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid email or password.')
      } else {
        toast.success('Welcome back, Admin!')
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      console.error(err)
      toast.error('An error occurred during sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-slate-950)] text-white px-4 relative overflow-hidden">
      {/* Decorative blurry backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-maroon-500)]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-gold-500)]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[var(--color-slate-900)] border border-[var(--color-gold-900)]/30 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="font-display text-3xl text-[var(--color-gold-300)] tracking-wide">
            Admin Panel
          </h1>
          <p className="font-body text-xs text-slate-400 mt-1">
            Access credentials to manage Arjun &amp; Priya&apos;s wedding website
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-body uppercase tracking-wider text-slate-300 mb-2 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wedding.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-[var(--color-gold-500)] focus:outline-none text-sm text-white transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-body uppercase tracking-wider text-slate-300 mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-[var(--color-gold-500)] focus:outline-none text-sm text-white transition-colors"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] disabled:bg-slate-700 text-white font-body uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all duration-300 font-bold shadow-lg"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
