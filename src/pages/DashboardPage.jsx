import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import * as mockApi from '../api/mockApi'

// Dashboard displays minimal patient data. Use React Query for caching and retries.
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
    // In healthcare UI, avoid aggressive retries to prevent duplicate side-effects.
    retry: 1,
  })

  // Fetch health tips
  const { data: healthTips } = useQuery({
    queryKey: ['healthTips'],
    queryFn: () => mockApi.fetchHealthTips(),
    staleTime: 60 * 60 * 1000, // 1 hour cache
  })

  const handleMessageDoctor = () => {
    setShowMessageModal(true)
  }

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      alert('Please enter a message')
      return
    }

    setSendingMessage(true)
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSendingMessage(false)
    setShowMessageModal(false)
    setMessageText('')
    
    alert('✅ Message sent successfully!\n\nYour healthcare provider will respond within 24 hours.')
  }

  return (
    <>
      {/* Page Header with Actions */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 className="page-main-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's your health overview</p>
        </div>
        <div className="page-header-actions">
          <button 
            className="btn-secondary-action"
            onClick={() => navigate('/dashboard/records')}
          >
            <span className="btn-icon">📊</span>
            <span className="btn-text">View Reports</span>
          </button>
          <button 
            className="btn-primary-action"
            onClick={() => navigate('/dashboard/book')}
          >
            <span className="btn-icon">📅</span>
            <span className="btn-text">Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Quick Actions Banner */}
      <div className="quick-actions-banner">
        <button 
          className="primary-action-btn"
          onClick={() => navigate('/dashboard/book')}
        >
          <span className="action-btn-icon">📅</span>
          <div className="action-btn-content">
            <span className="action-btn-title">Book Appointment</span>
            <span className="action-btn-desc">Schedule with your provider</span>
          </div>
        </button>
        <button 
          className="primary-action-btn"
          onClick={() => navigate('/dashboard/records')}
        >
          <span className="action-btn-icon">📊</span>
          <div className="action-btn-content">
            <span className="action-btn-title">View Reports</span>
            <span className="action-btn-desc">Access lab results</span>
          </div>
        </button>
        <button 
          className="primary-action-btn"
          onClick={handleMessageDoctor}
        >
          <span className="action-btn-icon">💬</span>
          <div className="action-btn-content">
            <span className="action-btn-title">Message Doctor</span>
            <span className="action-btn-desc">Secure messaging</span>
          </div>
        </button>
      </div>

      {/* Main Content Grid */}
      {isLoading ? (
        <div className="loading-state" role="status">
          <div className="loading-spinner"></div>
          <p>Loading your health information…</p>
        </div>
      ) : error ? (
        <div className="error-state" role="alert">
          <div className="error-icon">⚠️</div>
          <h3>Unable to load patient data</h3>
          <p>Please try again later or contact support if the problem persists.</p>
        </div>
      ) : data ? (
        <>
          {/* Prominent Appointment Highlight Section */}
          <div className="appointment-highlight-card">
            <div className="appointment-highlight-content">
              <div className="appointment-highlight-header">
                <div className="highlight-icon">📅</div>
                <div className="highlight-text">
                  <h2 className="highlight-title">Next Appointment</h2>
                  <p className="highlight-subtitle">You have an upcoming appointment scheduled</p>
                </div>
              </div>
              
              <div className="appointment-highlight-details">
                <div className="appointment-detail-row">
                  <span className="detail-icon">👨‍⚕️</span>
                  <div className="detail-info">
                    <span className="detail-label">Doctor</span>
                    <span className="detail-value">Dr. Sarah Johnson</span>
                  </div>
                </div>
                <div className="appointment-detail-row">
                  <span className="detail-icon">📍</span>
                  <div className="detail-info">
                    <span className="detail-label">Department</span>
                    <span className="detail-value">General Medicine</span>
                  </div>
                </div>
                <div className="appointment-detail-row">
                  <span className="detail-icon">🕐</span>
                  <div className="detail-info">
                    <span className="detail-label">Date & Time</span>
                    <span className="detail-value">March 15, 2026 at 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="appointment-highlight-actions">
              <button 
                className="appointment-action-btn primary"
                onClick={() => navigate('/dashboard/book')}
              >
                <span className="action-icon">➕</span>
                <span>Book Appointment</span>
              </button>
              <button 
                className="appointment-action-btn secondary"
                onClick={() => navigate('/dashboard/appointments')}
              >
                <span className="action-icon">📆</span>
                <span>View Calendar</span>
              </button>
            </div>
          </div>

          {/* Section 1: Overview Cards - Key Health Metrics (3-column grid) */}
          <div className="overview-metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">❤️</div>
              <div className="metric-content">
                <span className="metric-label">Heart Rate</span>
                <span className="metric-value">72 bpm</span>
                <span className="metric-status normal">Normal</span>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🩺</div>
              <div className="metric-content">
                <span className="metric-label">Blood Pressure</span>
                <span className="metric-value">120/80</span>
                <span className="metric-status normal">Normal</span>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🌡️</div>
              <div className="metric-content">
                <span className="metric-label">Temperature</span>
                <span className="metric-value">98.6°F</span>
                <span className="metric-status normal">Normal</span>
              </div>
            </div>
          </div>

          {/* Section 2 & 3: Two-column layout - Upcoming Appointment + Patient Info */}
          <div className="dashboard-two-column-grid">
            {/* Upcoming Appointments - Left Column */}
            <section className="dashboard-card" aria-labelledby="appointments-heading">
              <div className="card-header">
                <h2 id="appointments-heading" className="card-title">Upcoming Appointments</h2>
                <a href="/dashboard/appointments" className="card-link">View all</a>
              </div>
              <div className="card-body">
                <div className="appointments-preview">
                  <div className="appointment-preview-item">
                    <div className="appointment-date">
                      <span className="date-day">15</span>
                      <span className="date-month">Mar</span>
                    </div>
                    <div className="appointment-info">
                      <h3 className="appointment-title">Annual Checkup</h3>
                      <p className="appointment-doctor">Dr. Sarah Johnson</p>
                      <p className="appointment-time">10:00 AM - General Medicine</p>
                    </div>
                  </div>
                  <div className="appointment-preview-item">
                    <div className="appointment-date">
                      <span className="date-day">22</span>
                      <span className="date-month">Mar</span>
                    </div>
                    <div className="appointment-info">
                      <h3 className="appointment-title">Follow-up Visit</h3>
                      <p className="appointment-doctor">Dr. Michael Chen</p>
                      <p className="appointment-time">2:30 PM - Cardiology</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Patient Information Summary - Right Column */}
            <section className="dashboard-card" aria-labelledby="patient-info-heading">
              <div className="card-header">
                <h2 id="patient-info-heading" className="card-title">Patient Information</h2>
              </div>
              <div className="card-body">
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{data.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date of Birth</span>
                    <span className="info-value">{data.dateOfBirth}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Visit</span>
                    <span className="info-value">{data.lastVisit}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Blood Type</span>
                    <span className="info-value">O+</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Section 4 & 5: Two-column layout - Medications + Health Summary */}
          <div className="dashboard-two-column-grid">
            {/* Current Medications - Left Column */}
            <section className="dashboard-card" aria-labelledby="medications-heading">
              <div className="card-header">
                <h2 id="medications-heading" className="card-title">Current Medications</h2>
                <span className="badge">{data.medications.length}</span>
              </div>
              <div className="card-body">
                <div className="medications-list">
                  {data.medications.map((med) => (
                    <div key={med.id} className="medication-item">
                      <div className="medication-icon">💊</div>
                      <div className="medication-details">
                        <h3 className="medication-name">{med.name}</h3>
                        <p className="medication-dosage">{med.dose} • {med.frequency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Health Summary / Vitals - Right Column */}
            <section className="dashboard-card" aria-labelledby="vitals-heading">
              <div className="card-header">
                <h2 id="vitals-heading" className="card-title">Recent Vitals</h2>
                <span className="card-link">Last updated: Today</span>
              </div>
              <div className="card-body">
                <div className="vitals-list">
                  <div className="vital-item">
                    <div className="vital-icon">⚖️</div>
                    <div className="vital-info">
                      <span className="vital-label">Weight</span>
                      <span className="vital-value">68 kg</span>
                    </div>
                  </div>
                  <div className="vital-item">
                    <div className="vital-icon">📏</div>
                    <div className="vital-info">
                      <span className="vital-label">Height</span>
                      <span className="vital-value">170 cm</span>
                    </div>
                  </div>
                  <div className="vital-item">
                    <div className="vital-icon">🫀</div>
                    <div className="vital-info">
                      <span className="vital-label">Oxygen Level</span>
                      <span className="vital-value">98%</span>
                    </div>
                  </div>
                  <div className="vital-item">
                    <div className="vital-icon">🍬</div>
                    <div className="vital-info">
                      <span className="vital-label">Blood Sugar</span>
                      <span className="vital-value">95 mg/dL</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Section 6: Health Tips */}
          <section className="dashboard-card health-tips-card" aria-labelledby="health-tips-heading">
            <div className="card-header">
              <h2 id="health-tips-heading" className="card-title">Health Tips</h2>
              <p className="card-sub">Daily wellness recommendations</p>
            </div>
            <div className="card-body">
              {healthTips && healthTips.length > 0 ? (
                <div className="health-tips-grid">
                  {healthTips.map(tip => (
                    <div key={tip.id} className="health-tip-card">
                      <div className="tip-icon">{tip.icon}</div>
                      <div className="tip-content">
                        <h3 className="tip-category">{tip.category}</h3>
                        <h4 className="tip-title">{tip.title}</h4>
                        <p className="tip-text">{tip.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Loading health tips...</p>
              )}
            </div>
          </section>

          {/* Section 7: Medical Reports / Records (Full-width highlight card, calm styling) */}
          <section className="dashboard-card medical-reports-card" aria-labelledby="reports-heading">
            <div className="card-header">
              <h2 id="reports-heading" className="card-title">Medical Reports</h2>
              <p className="card-sub">Access your lab results and vitals history</p>
            </div>
            <div className="card-body">
              <div className="reports-content">
                <p className="reports-desc">View and download your recent lab reports, and explore historical vitals to monitor progress over time.</p>
                <div className="reports-actions">
                  <button 
                    className="report-btn report-btn-primary" 
                    aria-label="View Lab Reports"
                    onClick={() => navigate('/dashboard/records')}
                  >
                    <span className="report-icon">🧪</span>
                    <span>View Lab Reports</span>
                  </button>
                  <button 
                    className="report-btn report-btn-secondary" 
                    aria-label="View Vitals History"
                    onClick={() => {
                      navigate('/dashboard/records')
                      // Scroll to vitals section after navigation
                      setTimeout(() => {
                        const vitalsSection = document.querySelector('[aria-label="Filter records"]')
                        vitalsSection?.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }}
                  >
                    <span className="report-icon">📈</span>
                    <span>View Vitals History</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {isFetching && !isLoading && (
        <div className="refreshing-indicator" aria-live="polite">
          Refreshing data…
        </div>
      )}

      {/* Message Doctor Modal */}
      {showMessageModal && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💬 Message Your Doctor</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowMessageModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Send a secure message to Dr. Sarah Johnson. Your doctor will respond within 24 hours.
              </p>
              <label htmlFor="message-text" className="form-label">
                Your Message <span className="required">*</span>
              </label>
              <textarea
                id="message-text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="form-textarea"
                rows="6"
                placeholder="Type your message here... (e.g., questions about medications, symptoms, or appointment follow-up)"
                disabled={sendingMessage}
              />
              <p className="message-note">
                🔒 All messages are encrypted and HIPAA compliant
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowMessageModal(false)}
                disabled={sendingMessage}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleSendMessage}
                disabled={sendingMessage || !messageText.trim()}
              >
                {sendingMessage ? '📤 Sending...' : '📤 Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
