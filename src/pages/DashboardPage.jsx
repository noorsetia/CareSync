import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { motion as Motion } from 'framer-motion'
import './Dashboard.css'
import {
  Heart, Activity, Droplet, Thermometer, Calendar, Search, FileText,
  Lightbulb, Bell, ChevronRight, TrendingDown, TrendingUp, Stethoscope,
  CheckCircle2, Clock, MapPin, Sparkles, Award, AlertCircle
} from 'lucide-react'
import * as mockApi from '../api/mockApi'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
}

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const formatDateLong = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

const formatDateShort = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { token, user } = useAuth()
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['patientData', user?.id],
    queryFn: () => mockApi.fetchPatientData({ token }),
    enabled: !!token && !!user,
    retry: 1,
  })

  const { data: healthTips } = useQuery({
    queryKey: ['healthTips'],
    queryFn: () => mockApi.fetchHealthTips(),
    staleTime: 60 * 60 * 1000,
  })

  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments', { status: 'upcoming' }],
    queryFn: () => mockApi.fetchAppointments({ token, status: 'upcoming' }),
    enabled: !!token,
  })

  const upcoming = [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date))
  const nextAppointment = upcoming[0] || null
  const recentAppointments = upcoming.slice(0, 3)

  const sendMessage = async () => {
    if (!messageText.trim()) return
    setSendingMessage(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setSendingMessage(false)
    setShowMessageModal(false)
    setMessageText('')
  }

  const firstName = user?.name?.split(' ')[0] || 'there'

  const vitals = [
    { key: 'hr', label: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', trend: '-2%', dir: 'down', icon: Heart, tone: 'rose' },
    { key: 'bp', label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Stable', trend: '-1%', dir: 'down', icon: Activity, tone: 'indigo' },
    { key: 'ox', label: 'Oxygen Saturation', value: '98', unit: '%', status: 'Normal', trend: '+1%', dir: 'up', icon: Droplet, tone: 'sky' },
    { key: 'tp', label: 'Temperature', value: '98.6', unit: '°F', status: 'Normal', trend: '0%', dir: 'flat', icon: Thermometer, tone: 'amber' },
  ]

  const quickActions = [
    { key: 'book', label: 'Book Appointment', desc: 'Schedule a visit', icon: Calendar, to: '/dashboard/book' },
    { key: 'find', label: 'Find Doctor', desc: 'Browse specialists', icon: Search, to: '/dashboard/search' },
    { key: 'records', label: 'Medical Records', desc: 'View reports & labs', icon: FileText, to: '/dashboard/records' },
    { key: 'insights', label: 'Health Insights', desc: 'Personalized tips', icon: Lightbulb, to: '/dashboard/records' },
  ]

  const insight = healthTips?.[0]

  const healthScore = 86
  const circumference = 2 * Math.PI * 42
  const dashOffset = circumference - (healthScore / 100) * circumference

  return (
    <Motion.div
      className="dashboard-v2"
      initial="hidden"
      animate="show"
      variants={stagger}
    >
      <Motion.section className="dash-header" variants={fadeUp} aria-labelledby="greeting-heading">
        <div className="dash-header-left">
          <h1 id="greeting-heading" className="dash-greeting">
            {getGreeting()}, <span className="dash-greeting-name">{firstName}</span> <span aria-hidden="true">👋</span>
          </h1>
          <p className="dash-subtitle">Here's your health overview for today.</p>
        </div>
        <div className="dash-header-right">
          <button
            className="dash-icon-btn"
            aria-label="Notifications"
            onClick={() => navigate('/dashboard/appointments')}
          >
            <Bell size={18} />
            <span className="dash-icon-dot" aria-hidden="true"></span>
          </button>
          <div className="dash-profile-chip" aria-label="Profile">
            <div className="dash-profile-avatar">{(user?.name || 'PT').substring(0, 2).toUpperCase()}</div>
            <div className="dash-profile-info">
              <span className="dash-profile-name">{user?.name || 'Patient'}</span>
              <span className="dash-profile-meta">Verified Patient</span>
            </div>
          </div>
        </div>
      </Motion.section>

      <Motion.section className="dash-section" aria-labelledby="overview-heading" variants={fadeUp}>
        <div className="dash-section-head">
          <h2 id="overview-heading" className="dash-section-title">Health Overview</h2>
          <span className="dash-section-sub">Vitals from your last checkup</span>
        </div>
        <div className="dash-vitals-grid">
          {vitals.map(v => {
            const Icon = v.icon
            const TrendIcon = v.dir === 'up' ? TrendingUp : v.dir === 'down' ? TrendingDown : Activity
            return (
              <Motion.div
                key={v.key}
                className={`vital-card vital-${v.tone}`}
                variants={fadeUp}
                whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="vital-card-top">
                  <div className="vital-icon-wrap" aria-hidden="true">
                    <Icon size={18} />
                  </div>
                  <span className="vital-status">
                    <CheckCircle2 size={12} /> {v.status}
                  </span>
                </div>
                <div className="vital-card-mid">
                  <span className="vital-value">{v.value}</span>
                  <span className="vital-unit">{v.unit}</span>
                </div>
                <div className="vital-card-bottom">
                  <span className="vital-label">{v.label}</span>
                  <span className={`vital-trend trend-${v.dir}`}>
                    <TrendIcon size={12} /> {v.trend} <span className="vital-trend-period">this week</span>
                  </span>
                </div>
              </Motion.div>
            )
          })}
        </div>
      </Motion.section>

      <Motion.section className="dash-mid-grid" variants={fadeUp}>
        <Motion.div
          className="dash-card health-score-card"
          whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}
          transition={{ duration: 0.2 }}
          aria-labelledby="health-score-heading"
        >
          <div className="dash-card-head">
            <h2 id="health-score-heading" className="dash-card-title">Health Score</h2>
            <Award size={16} className="dash-card-icon" />
          </div>
          <div className="health-score-body">
            <div className="score-ring-wrap">
              <svg className="score-ring" viewBox="0 0 100 100" width="140" height="140" aria-hidden="true">
                <circle cx="50" cy="50" r="42" className="score-ring-track" />
                <Motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="score-ring-progress"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="score-center">
                <span className="score-number">{healthScore}</span>
                <span className="score-of">/ 100</span>
                <span className="score-grade">Good</span>
              </div>
            </div>
            <ul className="score-indicators" aria-label="Score breakdown">
              <li>
                <span className="score-dot dot-vitals" aria-hidden="true"></span>
                <span className="score-label">Vitals</span>
                <span className="score-meta">In range</span>
              </li>
              <li>
                <span className="score-dot dot-appt" aria-hidden="true"></span>
                <span className="score-label">Appointments</span>
                <span className="score-meta">{upcoming.length} upcoming</span>
              </li>
              <li>
                <span className="score-dot dot-records" aria-hidden="true"></span>
                <span className="score-label">Records</span>
                <span className="score-meta">Up to date</span>
              </li>
            </ul>
          </div>
        </Motion.div>

        <Motion.div
          className="dash-card next-appt-card"
          whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}
          transition={{ duration: 0.2 }}
          aria-labelledby="next-appt-heading"
        >
          {nextAppointment ? (
            <>
              <div className="dash-card-head">
                <h2 id="next-appt-heading" className="dash-card-title">Next Appointment</h2>
                <span className="appt-pill">{nextAppointment.type || 'Visit'}</span>
              </div>
              <div className="next-appt-body">
                <div className="next-appt-doctor">
                  <div className="next-appt-avatar" aria-hidden="true">
                    <Stethoscope size={22} />
                  </div>
                  <div>
                    <p className="next-appt-name">{nextAppointment.doctorName}</p>
                    <p className="next-appt-specialty">{nextAppointment.specialty}</p>
                  </div>
                </div>
                <ul className="next-appt-meta">
                  <li><Calendar size={14} /> {formatDateLong(nextAppointment.date)}</li>
                  <li><Clock size={14} /> {nextAppointment.time}</li>
                  <li><MapPin size={14} /> {nextAppointment.location}</li>
                </ul>
                <button
                  className="btn-primary-action next-appt-btn"
                  onClick={() => navigate('/dashboard/appointments')}
                >
                  View Appointment
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="next-appt-empty">
              <div className="next-appt-empty-icon" aria-hidden="true">
                <Calendar size={28} />
              </div>
              <h3 className="next-appt-empty-title">No upcoming appointments</h3>
              <p className="next-appt-empty-desc">Book your next appointment to stay on track with your care.</p>
              <button
                className="btn-primary-action"
                onClick={() => navigate('/dashboard/book')}
              >
                Book your next appointment
              </button>
            </div>
          )}
        </Motion.div>
      </Motion.section>

      <Motion.section className="dash-section" aria-labelledby="quick-actions-heading" variants={fadeUp}>
        <div className="dash-section-head">
          <h2 id="quick-actions-heading" className="dash-section-title">Quick Actions</h2>
        </div>
        <div className="quick-actions-grid">
          {quickActions.map(a => {
            const Icon = a.icon
            return (
              <Motion.button
                key={a.key}
                className="quick-action"
                onClick={() => navigate(a.to)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                aria-label={a.label}
              >
                <div className="quick-action-icon" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <div className="quick-action-text">
                  <span className="quick-action-label">{a.label}</span>
                  <span className="quick-action-desc">{a.desc}</span>
                </div>
                <ChevronRight size={16} className="quick-action-chev" />
              </Motion.button>
            )
          })}
        </div>
      </Motion.section>

      <Motion.section className="dash-card upcoming-card" variants={fadeUp} aria-labelledby="upcoming-heading">
        <div className="dash-card-head">
          <h2 id="upcoming-heading" className="dash-card-title">Upcoming Appointments</h2>
          <button
            className="card-link"
            onClick={() => navigate('/dashboard/appointments')}
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        {recentAppointments.length > 0 ? (
          <ul className="upcoming-list">
            {recentAppointments.map((apt, i) => (
              <Motion.li
                key={apt.id}
                className="upcoming-row"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <div className="upcoming-date" aria-hidden="true">
                  <span className="upcoming-date-day">{new Date(apt.date).getDate()}</span>
                  <span className="upcoming-date-mon">{formatDateShort(apt.date).split(' ')[0]}</span>
                </div>
                <div className="upcoming-info">
                  <p className="upcoming-doctor">{apt.doctorName}</p>
                  <p className="upcoming-specialty">{apt.specialty} • {apt.time}</p>
                </div>
                <span className={`status-badge status-${apt.status}`}>{apt.status}</span>
                <button
                  className="upcoming-view-btn"
                  onClick={() => navigate('/dashboard/appointments')}
                  aria-label={`View appointment with ${apt.doctorName}`}
                >
                  View
                </button>
              </Motion.li>
            ))}
          </ul>
        ) : (
          <div className="upcoming-empty">
            <p>You have no upcoming appointments.</p>
            <button
              className="btn-secondary-action"
              onClick={() => navigate('/dashboard/book')}
            >
              Book Appointment
            </button>
          </div>
        )}
      </Motion.section>

      <Motion.section className="dash-card insights-card" variants={fadeUp} aria-labelledby="insights-heading">
        <div className="dash-card-head">
          <h2 id="insights-heading" className="dash-card-title">Health Insights</h2>
          <Sparkles size={16} className="dash-card-icon" />
        </div>
        <div className="insights-body">
          <div className="insight-item">
            <span className="insight-icon" aria-hidden="true">
              <TrendingUp size={16} />
            </span>
            <p className="insight-text">Your recent health metrics have remained stable.</p>
          </div>
          {insight && (
            <div className="insight-item insight-secondary">
              <span className="insight-icon" aria-hidden="true">
                <Lightbulb size={16} />
              </span>
              <div>
                <p className="insight-category">{insight.category}</p>
                <p className="insight-text">{insight.title} — {insight.tip}</p>
              </div>
            </div>
          )}
          <p className="insight-disclaimer">
            <AlertCircle size={12} /> Informational only. Not a medical diagnosis or advice. Please consult your doctor for clinical decisions.
          </p>
        </div>
      </Motion.section>

      {isLoading && (
        <div className="loading-state" role="status">
          <div className="spinner"></div>
          <p>Loading your health information…</p>
        </div>
      )}

      {error && (
        <div className="error-state" role="alert">
          <p>Unable to load patient data. Please try again.</p>
        </div>
      )}

      {data && (
        <p className="dash-data-foot" aria-live="polite">
          Patient: {data.name} • DOB: {data.dateOfBirth} • Last visit: {data.lastVisit}
        </p>
      )}

      {isFetching && !isLoading && (
        <div className="refreshing-indicator" aria-live="polite">Refreshing data…</div>
      )}

      {showMessageModal && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Stethoscope size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />Message Your Doctor</h2>
              <button className="modal-close" onClick={() => setShowMessageModal(false)} aria-label="Close modal">✕</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Send a secure message to Dr. Sarah Johnson. Your doctor will respond within 24 hours.
              </p>
              <label htmlFor="message-text" className="form-label">Your Message <span className="required">*</span></label>
              <textarea
                id="message-text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="form-textarea"
                rows="6"
                placeholder="Type your message here..."
                disabled={sendingMessage}
              />
              <p className="message-note">All messages are encrypted and HIPAA compliant.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowMessageModal(false)} disabled={sendingMessage}>Cancel</button>
              <button className="btn-primary" onClick={sendMessage} disabled={sendingMessage || !messageText.trim()}>
                {sendingMessage ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Motion.div>
  )
}
