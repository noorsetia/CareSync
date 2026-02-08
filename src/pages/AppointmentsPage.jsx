import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/useAuth'
import { fetchAppointments } from '../api/mockApi'
import AppointmentCard from '../components/appointments/AppointmentCard'

/**
 * AppointmentsPage - Full page component for appointments management
 * 
 * Purpose:
 * - Lists all patient appointments (sorted)
 * - Allows filtering by status
 * - Provides booking, canceling, and rescheduling
 * - Page-level component (used in routing)
 */
export default function AppointmentsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { token } = useAuth()
  const [filter, setFilter] = useState('upcoming')
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [rescheduling, setRescheduling] = useState(false)
  const [rescheduledAppointments, setRescheduledAppointments] = useState({})
  
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments', { status: filter }],
    queryFn: () => fetchAppointments({ token, status: filter }),
    enabled: !!token,
    staleTime: 3 * 60 * 1000, // 3 minutes cache,
  })

  // Merge rescheduled data with original appointments
  const displayAppointments = appointments?.map(apt => {
    if (rescheduledAppointments[apt.id]) {
      return { ...apt, ...rescheduledAppointments[apt.id] }
    }
    return apt
  })

  const handleCancel = (appointmentId) => {
    // Implementation would call mutation hook
    console.log('Cancel appointment:', appointmentId)
    alert('Cancel functionality would be implemented here')
  }

  const handleReschedule = (appointmentId) => {
    // Find the appointment details
    const appointment = displayAppointments?.find(apt => apt.id === appointmentId)
    if (appointment) {
      setSelectedAppointment(appointment)
      setNewDate(appointment.date)
      setNewTime(appointment.time)
      setShowRescheduleModal(true)
    }
  }

  const handleRescheduleSubmit = async () => {
    if (!newDate || !newTime) {
      alert('Please select both date and time')
      return
    }

    setRescheduling(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store the rescheduled appointment data
    setRescheduledAppointments(prev => ({
      ...prev,
      [selectedAppointment.id]: { date: newDate, time: newTime }
    }))
    
    setRescheduling(false)
    setShowRescheduleModal(false)
    
    alert(`✅ Appointment rescheduled successfully!\n\nNew Date: ${newDate}\nNew Time: ${newTime}\n\nConfirmation email sent to your registered email address.`)
    
    // Reset form
    setSelectedAppointment(null)
    setNewDate('')
    setNewTime('')
  }

  // Show success message if redirected after booking
  const successMessage = location.state?.message

  return (
    <section aria-labelledby="appointments-heading">
      {/* Page Header with Actions */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="appointments-heading" className="page-main-title">My Appointments</h1>
          <p className="page-subtitle">Manage your upcoming and past appointments</p>
        </div>
        <div className="page-header-actions">
          <button 
            className="btn-secondary-action"
            onClick={() => setFilter('past')}
          >
            <span className="btn-icon">📋</span>
            <span className="btn-text">View History</span>
          </button>
          <button 
            className="btn-primary-action"
            onClick={() => navigate('/dashboard/book')}
          >
            <span className="btn-icon">➕</span>
            <span className="btn-text">Book New</span>
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-banner" role="alert">
          ✅ {successMessage}
        </div>
      )}

      <div className="filter-controls" role="group" aria-label="Filter appointments">
        <button 
          onClick={() => setFilter('upcoming')}
          className={filter === 'upcoming' ? 'active' : ''}
        >
          📅 Upcoming
        </button>
        <button 
          onClick={() => setFilter('past')}
          className={filter === 'past' ? 'active' : ''}
        >
          ✅ Past
        </button>
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          📋 All
        </button>
      </div>

      {isLoading && (
        <div className="loading-state" role="status">
          <div className="spinner">⏳</div>
          <p>Loading appointments...</p>
        </div>
      )}
      
      {error && (
        <div className="error-state" role="alert">
          <div className="error-icon">⚠️</div>
          <p>Unable to load appointments. Please try again later.</p>
        </div>
      )}

      {displayAppointments && displayAppointments.length > 0 && (
        <div className="appointments-grid">
          {displayAppointments.map(apt => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onCancel={handleCancel}
              onReschedule={handleReschedule}
            />
          ))}
        </div>
      )}

      {displayAppointments && displayAppointments.length === 0 && !isLoading && (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No {filter !== 'all' ? filter : ''} appointments</h3>
          <p>
            {filter === 'upcoming' 
              ? "You don't have any upcoming appointments. Book one now!"
              : "No appointments found"}
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/dashboard/search')}
          >
            Search Doctors
          </button>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowRescheduleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📅 Reschedule Appointment</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowRescheduleModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="current-appointment-info">
                <h3>Current Appointment</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-icon">👨‍⚕️</span>
                    <div>
                      <p className="info-label">Doctor</p>
                      <p className="info-value">{selectedAppointment.doctorName}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <div>
                      <p className="info-label">Specialty</p>
                      <p className="info-value">{selectedAppointment.specialty}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📅</span>
                    <div>
                      <p className="info-label">Current Date</p>
                      <p className="info-value">{selectedAppointment.date}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🕐</span>
                    <div>
                      <p className="info-label">Current Time</p>
                      <p className="info-value">{selectedAppointment.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reschedule-form">
                <h3>Select New Date & Time</h3>
                <div className="form-group">
                  <label htmlFor="new-date" className="form-label">
                    New Date <span className="required">*</span>
                  </label>
                  <input
                    id="new-date"
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                    disabled={rescheduling}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-time" className="form-label">
                    New Time <span className="required">*</span>
                  </label>
                  <select
                    id="new-time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="form-select"
                    disabled={rescheduling}
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="9:30 AM">9:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="2:30 PM">2:30 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="3:30 PM">3:30 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>

                <p className="reschedule-note">
                  ℹ️ Rescheduling is subject to doctor's availability. You'll receive a confirmation email once confirmed.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowRescheduleModal(false)}
                disabled={rescheduling}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleRescheduleSubmit}
                disabled={rescheduling || !newDate || !newTime}
              >
                {rescheduling ? '⏳ Rescheduling...' : '✅ Confirm Reschedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
