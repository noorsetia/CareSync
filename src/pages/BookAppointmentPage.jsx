import { useState, useReducer, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useNotifications } from '../context/NotificationContext'
import { fetchDoctorDetails, bookAppointment, searchDoctors } from '../api/mockApi'

/**
 * BookAppointmentPage - Multi-step appointment booking form
 * 
 * Features:
 * - Multi-step wizard (doctor, date/time, patient info)
 * - Controlled form components
 * - Focus management
 * - Form validation with useReducer
 * - React Query mutations
 */

// Form reducer for complex state management
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { 
        ...state, 
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' }
      }
    case 'SET_ERROR':
      return { 
        ...state, 
        errors: { ...state.errors, [action.field]: action.error }
      }
    case 'RESET':
      return action.initialState
    default:
      return state
  }
}

const initialFormState = {
  doctorId: '',
  date: '',
  time: '',
  type: 'Consultation',
  patientName: '',
  phone: '',
  email: '',
  reason: '',
  notes: '',
  errors: {}
}

export default function BookAppointmentPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { token } = useAuth()
  const { addNotification } = useNotifications()
  const queryClient = useQueryClient()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, dispatch] = useReducer(formReducer, {
    ...initialFormState,
    doctorId: searchParams.get('doctor') || ''
  })
  
  // Refs for focus management
  const doctorSelectRef = useRef(null)
  const dateInputRef = useRef(null)
  const nameInputRef = useRef(null)

  // Focus on first input when step changes
  useEffect(() => {
    if (currentStep === 1 && doctorSelectRef.current) {
      doctorSelectRef.current.focus()
    } else if (currentStep === 2 && dateInputRef.current) {
      dateInputRef.current.focus()
    } else if (currentStep === 3 && nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [currentStep])

  // Fetch doctors for step 1
  const { data: doctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => searchDoctors({}),
  })

  // Fetch selected doctor details
  const { data: selectedDoctor } = useQuery({
    queryKey: ['doctor', formData.doctorId],
    queryFn: () => fetchDoctorDetails(formData.doctorId),
    enabled: !!formData.doctorId,
  })

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: (bookingData) => bookAppointment({ token, ...bookingData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      const docName = selectedDoctor?.name || 'Healthcare Provider'
      addNotification({
        type: 'appointment',
        icon: '📅',
        iconClass: 'blue',
        title: `Appointment Booked with ${docName}`,
        description: `${formData.type} scheduled for ${formData.date} at ${formData.time}.`,
        category: 'Upcoming',
        time: 'Just now',
        link: '/dashboard/appointments',
      })
      navigate('/dashboard/appointments', { 
        state: { message: 'Appointment booked successfully!' } 
      })
    },
  })

  const setField = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.doctorId) {
        dispatch({ type: 'SET_ERROR', field: 'doctorId', error: 'Please select a doctor' })
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.date) {
        dispatch({ type: 'SET_ERROR', field: 'date', error: 'Please select a date' })
        return false
      }
      if (!formData.time) {
        dispatch({ type: 'SET_ERROR', field: 'time', error: 'Please select a time' })
        return false
      }
    } else if (currentStep === 3) {
      if (!formData.patientName.trim()) {
        dispatch({ type: 'SET_ERROR', field: 'patientName', error: 'Name is required' })
        return false
      }
      if (!formData.phone.trim()) {
        dispatch({ type: 'SET_ERROR', field: 'phone', error: 'Phone is required' })
        return false
      }
      if (!formData.reason.trim()) {
        dispatch({ type: 'SET_ERROR', field: 'reason', error: 'Reason is required' })
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep()) {
      bookingMutation.mutate({
        doctorId: formData.doctorId,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        notes: `${formData.reason}. ${formData.notes}`
      })
    }
  }

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ]

  const appointmentTypes = ['Consultation', 'Follow-up', 'Treatment', 'Check-up']

  return (
    <section aria-labelledby="booking-heading">
      {/* Page Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="booking-heading" className="page-main-title">Book Appointment</h1>
          <p className="page-subtitle">Schedule your visit in 3 easy steps</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="booking-progress" role="progressbar" aria-valuenow={currentStep} aria-valuemin="1" aria-valuemax="3">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Select Doctor</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Date & Time</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Patient Info</div>
        </div>
      </div>

      {/* Multi-Step Form */}
      <form onSubmit={handleSubmit} className="booking-form">
        
        {/* Step 1: Select Doctor */}
        {currentStep === 1 && (
          <div className="form-step" role="tabpanel">
            <h2 className="step-title">Choose Your Doctor</h2>
            
            <div className="form-group">
              <label htmlFor="doctor-select" className="form-label">
                Doctor <span className="required">*</span>
              </label>
              <select
                id="doctor-select"
                ref={doctorSelectRef}
                value={formData.doctorId}
                onChange={(e) => setField('doctorId', e.target.value)}
                className={`form-select ${formData.errors.doctorId ? 'error' : ''}`}
                aria-required="true"
                aria-invalid={!!formData.errors.doctorId}
                aria-describedby={formData.errors.doctorId ? 'doctor-error' : undefined}
              >
                <option value="">Select a doctor</option>
                {doctors?.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} - {doc.specialty}
                  </option>
                ))}
              </select>
              {formData.errors.doctorId && (
                <p id="doctor-error" className="error-message" role="alert">
                  {formData.errors.doctorId}
                </p>
              )}
            </div>

            {selectedDoctor && (
              <div className="selected-doctor-card">
                <div className="doctor-avatar-large">{selectedDoctor.image}</div>
                <h3>{selectedDoctor.name}</h3>
                <p className="specialty-badge">{selectedDoctor.specialty}</p>
                <div className="doctor-details-grid">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{selectedDoctor.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">⭐</span>
                    <span>{selectedDoctor.rating} rating</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💼</span>
                    <span>{selectedDoctor.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💰</span>
                    <span>{selectedDoctor.fees}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 2 && (
          <div className="form-step" role="tabpanel">
            <h2 className="step-title">Select Date & Time</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="appointment-date" className="form-label">
                  Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="appointment-date"
                  ref={dateInputRef}
                  value={formData.date}
                  onChange={(e) => setField('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`form-input ${formData.errors.date ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!formData.errors.date}
                  aria-describedby={formData.errors.date ? 'date-error' : undefined}
                />
                {formData.errors.date && (
                  <p id="date-error" className="error-message" role="alert">
                    {formData.errors.date}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="appointment-type" className="form-label">
                  Appointment Type
                </label>
                <select
                  id="appointment-type"
                  value={formData.type}
                  onChange={(e) => setField('type', e.target.value)}
                  className="form-select"
                >
                  {appointmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Time Slot <span className="required">*</span>
              </label>
              <div className="time-slots-grid" role="radiogroup" aria-label="Available time slots">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setField('time', slot)}
                    className={`time-slot ${formData.time === slot ? 'selected' : ''}`}
                    role="radio"
                    aria-checked={formData.time === slot}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {formData.errors.time && (
                <p className="error-message" role="alert">
                  {formData.errors.time}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Patient Info */}
        {currentStep === 3 && (
          <div className="form-step" role="tabpanel">
            <h2 className="step-title">Patient Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patient-name" className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="patient-name"
                  ref={nameInputRef}
                  value={formData.patientName}
                  onChange={(e) => setField('patientName', e.target.value)}
                  className={`form-input ${formData.errors.patientName ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  aria-required="true"
                  aria-invalid={!!formData.errors.patientName}
                  aria-describedby={formData.errors.patientName ? 'name-error' : undefined}
                />
                {formData.errors.patientName && (
                  <p id="name-error" className="error-message" role="alert">
                    {formData.errors.patientName}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="patient-phone" className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="patient-phone"
                  value={formData.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  className={`form-input ${formData.errors.phone ? 'error' : ''}`}
                  placeholder="(555) 123-4567"
                  aria-required="true"
                  aria-invalid={!!formData.errors.phone}
                  aria-describedby={formData.errors.phone ? 'phone-error' : undefined}
                />
                {formData.errors.phone && (
                  <p id="phone-error" className="error-message" role="alert">
                    {formData.errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="patient-email" className="form-label">
                Email (optional)
              </label>
              <input
                type="email"
                id="patient-email"
                value={formData.email}
                onChange={(e) => setField('email', e.target.value)}
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="visit-reason" className="form-label">
                Reason for Visit <span className="required">*</span>
              </label>
              <input
                type="text"
                id="visit-reason"
                value={formData.reason}
                onChange={(e) => setField('reason', e.target.value)}
                className={`form-input ${formData.errors.reason ? 'error' : ''}`}
                placeholder="e.g., Annual checkup, Follow-up, Symptoms"
                aria-required="true"
                aria-invalid={!!formData.errors.reason}
                aria-describedby={formData.errors.reason ? 'reason-error' : undefined}
              />
              {formData.errors.reason && (
                <p id="reason-error" className="error-message" role="alert">
                  {formData.errors.reason}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="additional-notes" className="form-label">
                Additional Notes (optional)
              </label>
              <textarea
                id="additional-notes"
                value={formData.notes}
                onChange={(e) => setField('notes', e.target.value)}
                className="form-textarea"
                rows="4"
                placeholder="Any additional information for the doctor..."
              />
            </div>

            {/* Confirmation Summary */}
            <div className="booking-summary">
              <h3 className="summary-title">Appointment Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Doctor:</span>
                  <span className="summary-value">{selectedDoctor?.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Date:</span>
                  <span className="summary-value">
                    {formData.date ? new Date(formData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : '-'}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Time:</span>
                  <span className="summary-value">{formData.time || '-'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Type:</span>
                  <span className="summary-value">{formData.type}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Navigation */}
        <div className="form-actions">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="btn-secondary"
              disabled={bookingMutation.isPending}
            >
              ← Previous
            </button>
          )}
          
          <button
            type="button"
            onClick={() => navigate('/dashboard/search')}
            className="btn-text"
            disabled={bookingMutation.isPending}
          >
            Cancel
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
            </button>
          )}
        </div>

        {bookingMutation.isError && (
          <div className="error-banner" role="alert">
            Failed to book appointment. Please try again.
          </div>
        )}
      </form>
    </section>
  )
}
