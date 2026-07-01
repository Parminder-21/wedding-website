'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { SiteSettings } from '@/types'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      if (data.success && data.settings) {
        setSettings(data.settings)
      } else {
        toast.error('Failed to load settings')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error fetching settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSectionToggle = (sectionName: string) => {
    setSettings(prev => {
      const currentSections = prev.sections || {
        hero: true, story: true, events: true, couple: true,
        venue: true, rsvp: true, gallery: true, travel: true, faq: true, contact: true
      }
      return {
        ...prev,
        sections: {
          ...currentSections,
          [sectionName]: !((currentSections as any)[sectionName])
        }
      }
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Settings updated successfully!')
        setSettings(data.settings)
      } else {
        toast.error(data.error || 'Failed to save settings')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error saving settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-slate-500 text-sm font-body">Loading configurations...</div>
  }

  const sections = settings.sections || {
    hero: true, story: true, events: true, couple: true,
    venue: true, rsvp: true, gallery: true, travel: true, faq: true, contact: true
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-4xl text-[var(--color-gold-300)]">Theme &amp; Sections</h1>
        <p className="font-body text-xs text-slate-400 mt-1">Customize website metadata, colors, typography and visible landing page blocks</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: General settings */}
        <div className="lg:col-span-2 space-y-6 bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl p-6 md:p-8">
          <h2 className="font-display text-xl text-[var(--color-gold-200)] pb-4 border-b border-slate-800">
            General configurations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Groom Name */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Groom Name</label>
              <input
                type="text"
                name="groomName"
                value={settings.groomName || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
            
            {/* Bride Name */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Bride Name</label>
              <input
                type="text"
                name="brideName"
                value={settings.brideName || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wedding Date */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Wedding Date &amp; Time (ISO String)</label>
              <input
                type="text"
                name="weddingDate"
                value={settings.weddingDate || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
                placeholder="2026-12-18T10:00:00+05:30"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Tagline / Motto</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
          </div>

          {/* Invitation Message */}
          <div>
            <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Invitation Welcome Message</label>
            <textarea
              name="invitationMessage"
              value={settings.invitationMessage || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Theme Colors */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Primary Color (Hex)</label>
              <input
                type="text"
                name="themePrimaryColor"
                value={settings.themePrimaryColor || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Secondary Color (Hex)</label>
              <input
                type="text"
                name="themeSecondaryColor"
                value={settings.themeSecondaryColor || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Accent Color (Hex)</label>
              <input
                type="text"
                name="themeAccentColor"
                value={settings.themeAccentColor || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
            {/* SEO settings */}
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">SEO Title Tag</label>
              <input
                type="text"
                name="seoTitle"
                value={settings.seoTitle || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">SEO Description</label>
              <input
                type="text"
                name="seoDescription"
                value={settings.seoDescription || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              />
            </div>
          </div>

          {/* Hero BG Image URL */}
          <div>
            <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Hero Background Image URL</label>
            <input
              type="text"
              name="heroBgImageUrl"
              value={settings.heroBgImageUrl || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] disabled:bg-slate-800 text-white font-body uppercase tracking-widest text-xs px-6 py-3 rounded-xl transition-all font-semibold"
            >
              {saving ? 'Saving changes...' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* Right Side: Section Visibility toggles */}
        <div className="bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl p-6 space-y-6">
          <h2 className="font-display text-xl text-[var(--color-gold-200)] pb-4 border-b border-slate-800">
            Show / Hide Sections
          </h2>

          <div className="space-y-3 font-body text-xs">
            {[
              { id: 'hero', name: 'Hero Welcome Banner' },
              { id: 'couple', name: 'Bride & Groom Profile' },
              { id: 'story', name: 'Timeline Story' },
              { id: 'events', name: 'Events Grid' },
              { id: 'venue', name: 'Venues Map Section' },
              { id: 'rsvp', name: 'Interactive RSVP form' },
              { id: 'gallery', name: 'Photo Gallery' },
              { id: 'travel', name: 'Travel & Accommodation' },
              { id: 'faq', name: 'FAQs Accordion' },
              { id: 'contact', name: 'Planners / Registry Contact' },
            ].map((sect) => (
              <button
                key={sect.id}
                type="button"
                onClick={() => handleSectionToggle(sect.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                  (sections as any)[sect.id] !== false
                    ? 'bg-[var(--color-maroon-500)]/20 border-[var(--color-maroon-500)] text-white font-semibold'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <span>{sect.name}</span>
                <span className="uppercase text-[9px] tracking-wider font-semibold">
                  {(sections as any)[sect.id] !== false ? '✅ Active' : '❌ Hidden'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
