'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface CollectionTab {
  id: string
  name: string
  emoji: string
  fields: { name: string; label: string; type: string; placeholder?: string; options?: string[] }[]
}

const TABS: CollectionTab[] = [
  {
    id: 'event',
    name: 'Events',
    emoji: '🌸',
    fields: [
      { name: 'title', label: 'Event Title', type: 'text', placeholder: 'e.g., Sangeet Ceremony' },
      { name: 'eventType', label: 'Event Type', type: 'select', options: ['roka', 'haldi', 'mehendi', 'sangeet', 'wedding', 'reception', 'other'] },
      { name: 'eventDate', label: 'Event Date (YYYY-MM-DD)', type: 'text', placeholder: 'e.g., 2026-12-17' },
      { name: 'startTime', label: 'Start Time', type: 'text', placeholder: 'e.g., 7:00 PM' },
      { name: 'endTime', label: 'End Time', type: 'text', placeholder: 'e.g., 11:30 PM' },
      { name: 'venue', label: 'Venue Name', type: 'text', placeholder: 'e.g., Leela Palace, New Delhi' },
      { name: 'address', label: 'Venue Address', type: 'text', placeholder: 'e.g., Diplomatic Enclave, Chanakyapuri' },
      { name: 'mapsLink', label: 'Google Maps URL', type: 'text', placeholder: 'e.g., https://maps.google.com/...' },
      { name: 'dressCode', label: 'Dress Code Description', type: 'text', placeholder: 'e.g., Indian Festive / Ethnic Chic' },
      { name: 'note', label: 'Important Note (Optional)', type: 'text', placeholder: 'e.g., Kindly make your way by 6:45 PM' },
      { name: 'icon', label: 'Emoji Icon', type: 'text', placeholder: 'e.g., 🎵' },
      { name: 'displayOrder', label: 'Display Order (Number)', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'milestone',
    name: 'Story Milestones',
    emoji: '☕',
    fields: [
      { name: 'title', label: 'Milestone Title', type: 'text', placeholder: 'e.g., The First Date' },
      { name: 'date', label: 'Date string', type: 'text', placeholder: 'e.g., March 2022' },
      { name: 'description', label: 'Detailed Description', type: 'textarea', placeholder: 'Describe how it happened...' },
      { name: 'imageUrl', label: 'Image URL (Optional)', type: 'text', placeholder: 'https://images.unsplash.com/...' },
      { name: 'icon', label: 'Emoji Icon', type: 'text', placeholder: 'e.g., 🌅' },
      { name: 'displayOrder', label: 'Display Order (Number)', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'venue',
    name: 'Venues',
    emoji: '🏛️',
    fields: [
      { name: 'name', label: 'Venue Name', type: 'text', placeholder: 'e.g., Leela Palace' },
      { name: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Write a few details...' },
      { name: 'address', label: 'Full Address', type: 'text' },
      { name: 'mapsLink', label: 'Google Maps Link', type: 'text' },
      { name: 'mapsEmbedUrl', label: 'Google Maps Embed URL (src parameter of iframe)', type: 'text', placeholder: 'https://www.google.com/maps/embed?...' },
      { name: 'imageUrl', label: 'Photo URL', type: 'text' },
      { name: 'phone', label: 'Venue Phone Number', type: 'text' },
      { name: 'parkingNotes', label: 'Parking Advice', type: 'text' },
      { name: 'accommodationNotes', label: 'Hotel Booking Info', type: 'text' },
      { name: 'displayOrder', label: 'Display Order (Number)', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'gallery',
    name: 'Gallery Items',
    emoji: '🖼️',
    fields: [
      { name: 'imageUrl', label: 'Photo URL', type: 'text', placeholder: 'https://images.unsplash.com/...' },
      { name: 'caption', label: 'Image Caption', type: 'text', placeholder: 'e.g., Our Roka Ceremony' },
      { name: 'category', label: 'Category Filter', type: 'text', placeholder: 'e.g., roka, general, sangeet' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'faq',
    name: 'FAQs',
    emoji: '❓',
    fields: [
      { name: 'question', label: 'Question text', type: 'text' },
      { name: 'answer', label: 'Answer text', type: 'textarea' },
      { name: 'category', label: 'Category', type: 'text', placeholder: 'general' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'travel',
    name: 'Travel Guides',
    emoji: '🚕',
    fields: [
      { name: 'type', label: 'Guide Type', type: 'select', options: ['hotel', 'transport', 'airport', 'note'] },
      { name: 'title', label: 'Card Title', type: 'text', placeholder: 'e.g., Delhi IGI Airport (DEL)' },
      { name: 'description', label: 'Details', type: 'textarea' },
      { name: 'address', label: 'Address (Optional)', type: 'text' },
      { name: 'phone', label: 'Phone Contact (Optional)', type: 'text' },
      { name: 'websiteUrl', label: 'External Website URL (Optional)', type: 'text' },
      { name: 'mapsLink', label: 'Google Maps Link (Optional)', type: 'text' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'contact',
    name: 'Help Contacts',
    emoji: '📞',
    fields: [
      { name: 'name', label: 'Person Name', type: 'text', placeholder: 'e.g., Rohan Sharma (Bride\'s Brother)' },
      { name: 'role', label: 'Role / Designation', type: 'text', placeholder: 'e.g., Transport Coordinator' },
      { name: 'phone', label: 'Phone Number', type: 'text' },
      { name: 'email', label: 'Email Address (Optional)', type: 'text' },
      { name: 'whatsapp', label: 'WhatsApp Number (with country code, no + or spaces)', type: 'text', placeholder: '919876543210' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'couple',
    name: 'Couple Profiles',
    emoji: '💑',
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text' },
      { name: 'nickname', label: 'Nickname / Short Name', type: 'text' },
      { name: 'photoUrl', label: 'Profile Photo URL', type: 'text' },
      { name: 'bio', label: 'Biography', type: 'textarea' },
      { name: 'familyIntro', label: 'Family Introduction Description', type: 'textarea' },
      { name: 'parentsNames', label: 'Parents\' Names', type: 'text', placeholder: 'Mr. & Mrs. Sharma' },
      { name: 'siblings', label: 'Siblings Names', type: 'text' }
    ]
  }
]

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState('event')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Modals state
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})

  const currentTab = TABS.find(t => t.id === activeTab)!

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/content?type=${activeTab}`)
      const data = await res.json()
      if (data.success) {
        setItems(data.items)
      } else {
        toast.error('Failed to load items')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error fetching content')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [activeTab])

  const handleOpenCreate = () => {
    const defaultData: any = {}
    currentTab.fields.forEach(f => {
      defaultData[f.name] = f.type === 'number' ? 0 : f.type === 'select' ? f.options?.[0] || '' : ''
    })
    setFormData(defaultData)
    setEditId(null)
    setShowModal(true)
  }

  const handleOpenEdit = (item: any) => {
    setFormData({ ...item })
    setEditId(item._id)
    setShowModal(true)
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editId ? 'PUT' : 'POST'

    try {
      const res = await fetch(`/api/admin/content?type=${activeTab}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(editId ? 'Item updated successfully!' : 'Item created successfully!')
        setShowModal(false)
        fetchItems()
      } else {
        toast.error(data.error || 'Failed to save item')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error saving item')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      const res = await fetch(`/api/admin/content?type=${activeTab}&id=${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Item deleted successfully!')
        setItems(prev => prev.filter(item => item._id !== id))
      } else {
        toast.error(data.error || 'Failed to delete item')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error deleting item')
    }
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--color-gold-300)]">Manage Content</h1>
          <p className="font-body text-xs text-slate-400 mt-1">Add, update, or remove text cards, milestones, photos, and contacts</p>
        </div>

        {activeTab !== 'couple' && (
          <button
            onClick={handleOpenCreate}
            className="bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] text-white px-5 py-2.5 rounded-xl text-xs uppercase font-body tracking-wider font-semibold transition-colors"
          >
            ➕ Add {currentTab.name.slice(0, -1)}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-body text-xs uppercase tracking-wider transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-850 text-white border border-[var(--color-gold-900)]/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-transparent'
            }`}
          >
            {tab.emoji} {tab.name}
          </button>
        ))}
      </div>

      {/* List content */}
      <div className="bg-[var(--color-slate-900)] border border-slate-800 rounded-3xl p-6 shadow-xl">
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm font-body">Loading collection list...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm font-body">
            No items in {currentTab.name} yet. Click &quot;Add&quot; to populate.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div 
                key={item._id} 
                className="bg-slate-850/50 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-display text-lg text-white font-semibold truncate flex-1">
                      {item.title || item.name || item.fullName || item.question || item.caption || 'Untitled'}
                    </h3>
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded text-[9px] font-mono font-semibold">
                      Order: {item.displayOrder !== undefined ? item.displayOrder : '-'}
                    </span>
                  </div>

                  <p className="font-body text-xs text-slate-400 line-clamp-3 mb-6">
                    {item.description || item.answer || item.address || item.bio || item.caption || '(No description)'}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="flex-1 text-center py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-[10px] uppercase font-body font-semibold tracking-wider transition-colors"
                  >
                    Edit
                  </button>
                  {activeTab !== 'couple' && (
                    <button
                      onClick={() => handleDelete(item._id, item.title || item.name || item.fullName || item.question || item.caption || 'Untitled')}
                      className="text-rose-500 hover:text-rose-400 text-[10px] uppercase font-body font-semibold tracking-wider px-3"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[var(--color-slate-900)] border border-slate-800 w-full max-w-lg rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-light focus:outline-none"
            >
              ✕
            </button>

            <h2 className="font-display text-2xl text-[var(--color-gold-300)] mb-6">
              {editId ? `Edit ${currentTab.name.slice(0, -1)}` : `Add ${currentTab.name.slice(0, -1)}`}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {currentTab.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-[10px] font-body uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                    {field.label}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder || ''}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)] resize-none"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] !== undefined ? formData[field.name] : ''}
                      onChange={(e) => handleInputChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                      placeholder={field.placeholder || ''}
                      className="w-full px-3 py-2 bg-slate-850 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--color-gold-500)]"
                    />
                  )}
                </div>
              ))}

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs uppercase font-body tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] text-white px-5 py-2 rounded-xl text-xs uppercase font-body tracking-wider font-semibold transition-colors"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
