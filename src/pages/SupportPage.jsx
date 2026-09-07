import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { useNotifications } from '../context/NotificationContext'

const FAQ = [
  {
    id: 1,
    q: 'How do I book an appointment with a doctor?',
    a: 'Open Find Doctors from the sidebar, pick a specialist, then click Book Appointment to choose a time slot that works for you.',
  },
  {
    id: 2,
    q: 'Where can I view my lab results?',
    a: 'All lab reports and vitals appear under Medical Records. You can also download a printable summary.',
  },
  {
    id: 3,
    q: 'How do I update my personal or insurance information?',
    a: 'Go to Profile & Settings → Personal Information or Insurance to edit your details. Changes are saved automatically.',
  },
  {
    id: 4,
    q: 'Is my health data secure?',
    a: 'CareSync uses 256-bit encryption and is fully HIPAA compliant. Only you and your verified providers can access your records.',
  },
  {
    id: 5,
    q: 'Can I share my records with another provider?',
    a: 'Yes. Open Profile & Settings → Privacy & Sharing to generate a secure share link or revoke existing access.',
  },
]

const CHANNELS = [
  {
    icon: '📧',
    title: 'Email Support',
    detail: 'support@caresync.com',
    note: 'Reply within 2 hours',
  },
  {
    icon: '📞',
    title: '24/7 Phone Line',
    detail: '1-800-CARESYNC',
    note: 'Toll-free, any time',
  },
  {
    icon: '💬',
    title: 'Live Chat',
    detail: 'Chat with a CareSync agent',
    note: 'Average wait 30 seconds',
    actionLabel: 'Start live chat',
  },
]

export default function SupportPage() {
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const [openId, setOpenId] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketRef, setTicketRef] = useState('')
  const [form, setForm] = useState({
    subject: '',
    category: 'General',
    message: '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.subject.trim() || !form.message.trim()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    const ref = `CS-${Math.floor(10000 + Math.random() * 90000)}`
    setTicketRef(ref)
    addNotification({
      type: 'message',
      icon: '✉️',
      iconClass: 'amber',
      title: 'Support Ticket Submitted',
      description: `Ticket #${ref} regarding "${form.subject}" was submitted. Our care team will reply shortly.`,
      category: 'Messages',
      time: 'Just now',
      link: '/dashboard/support',
    })
    setSubmitting(false)
    setSubmitted(true)
    setForm({ subject: '', category: 'General', message: '' })
  }

  return (
    <section aria-labelledby="support-heading" className="support-page">
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="support-heading" className="page-main-title">CareSync Support</h1>
          <p className="page-subtitle">
            We're here to help, {user?.name?.split(' ')[0] || 'Patient'}. Pick a channel below or send us a message.
          </p>
        </div>
      </div>

      <div className="support-channels">
        {CHANNELS.map((c) => (
          <div key={c.title} className="support-channel-card glass-card">
            <div className="support-channel-icon" aria-hidden="true">{c.icon}</div>
            <h3>{c.title}</h3>
            <p className="support-channel-detail">{c.detail}</p>
            <span className="support-channel-note">{c.note}</span>
            {c.actionLabel && (
              <button type="button" className="cta-button-secondary support-channel-action">
                {c.actionLabel}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="support-grid">
        <div className="support-faq glass-card">
          <div className="dropdown-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <ul className="support-faq-list">
            {FAQ.map((item) => {
              const open = openId === item.id
              return (
                <li key={item.id} className={`support-faq-item ${open ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="support-faq-toggle"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span>{item.q}</span>
                    <span className="support-faq-chev" aria-hidden="true">
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  {open && <p className="support-faq-answer">{item.a}</p>}
                </li>
              )
            })}
          </ul>
        </div>

        <form className="support-form glass-card" onSubmit={handleSubmit}>
          <div className="dropdown-header">
            <h2>Send us a message</h2>
            <span className="support-form-note">We respond within 2 hours</span>
          </div>

          {submitted && (
            <div className="support-form-success" role="status">
              ✅ Thanks! Your message has been received. Reference #{ticketRef}.
            </div>
          )}

          <label className="support-field">
            <span>Subject</span>
            <input
              type="text"
              value={form.subject}
              onChange={update('subject')}
              placeholder="Brief summary of your issue"
              required
            />
          </label>

          <label className="support-field">
            <span>Category</span>
            <select value={form.category} onChange={update('category')}>
              <option>General</option>
              <option>Appointments</option>
              <option>Medical Records</option>
              <option>Billing & Insurance</option>
              <option>Account & Login</option>
              <option>Technical Issue</option>
            </select>
          </label>

          <label className="support-field">
            <span>Message</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={update('message')}
              placeholder="Describe what's going on..."
              required
            />
          </label>

          <button type="submit" className="cta-button" disabled={submitting}>
            {submitting ? 'Sending...' : 'Submit ticket'}
          </button>
        </form>
      </div>
    </section>
  )
}