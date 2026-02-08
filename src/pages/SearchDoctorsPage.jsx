import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { searchDoctors } from '../api/mockApi'

/**
 * SearchDoctorsPage - Search and filter doctors
 * 
 * Features:
 * - Filter by specialty and location
 * - React Query with caching
 * - Display availability
 * - Navigate to booking
 */
export default function SearchDoctorsPage() {
  const navigate = useNavigate()
  const [specialty, setSpecialty] = useState('all')
  const [location, setLocation] = useState('all')
  
  const { data: doctors, isLoading, error } = useQuery({
    queryKey: ['doctors', { specialty, location }],
    queryFn: () => searchDoctors({ specialty, location }),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  })

  const handleBookDoctor = (doctorId) => {
    navigate(`/dashboard/book?doctor=${doctorId}`)
  }

  const specialties = ['all', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology']
  const locations = ['all', 'Downtown Medical Center', 'Northside Clinic', 'Children\'s Health Center', 'Sports Medicine Institute', 'Brain & Spine Center']

  return (
    <section aria-labelledby="search-heading">
      {/* Page Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="search-heading" className="page-main-title">Search Doctors</h1>
          <p className="page-subtitle">Find and book appointments with healthcare providers</p>
        </div>
        <div className="page-header-actions">
          <button 
            className="btn-primary-action"
            onClick={() => navigate('/dashboard/appointments')}
          >
            <span className="btn-icon">📋</span>
            <span className="btn-text">My Appointments</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="search-filters-card">
        <div className="filter-group">
          <label htmlFor="specialty-filter" className="filter-label">
            Specialty
          </label>
          <select
            id="specialty-filter"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="filter-select"
            aria-label="Filter by specialty"
          >
            {specialties.map(s => (
              <option key={s} value={s}>
                {s === 'all' ? 'All Specialties' : s}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="location-filter" className="filter-label">
            Location
          </label>
          <select
            id="location-filter"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="filter-select"
            aria-label="Filter by location"
          >
            {locations.map(l => (
              <option key={l} value={l}>
                {l === 'all' ? 'All Locations' : l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-state" role="status">
          <div className="spinner">⏳</div>
          <p>Finding doctors...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state" role="alert">
          <div className="error-icon">⚠️</div>
          <p>Unable to load doctors. Please try again.</p>
        </div>
      )}

      {/* Doctors Grid */}
      {doctors && doctors.length > 0 && (
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <article key={doctor.id} className="doctor-card">
              <div className="doctor-card-header">
                <div className="doctor-avatar">{doctor.image}</div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <div className="doctor-meta">
                    <span className="doctor-rating">
                      ⭐ {doctor.rating}
                    </span>
                    <span className="doctor-experience">
                      {doctor.experience}
                    </span>
                  </div>
                </div>
              </div>

              <div className="doctor-card-body">
                <div className="doctor-detail">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{doctor.location}</span>
                </div>
                <div className="doctor-detail">
                  <span className="detail-icon">💰</span>
                  <span className="detail-text">Consultation: {doctor.fees}</span>
                </div>
              </div>

              <div className="doctor-availability">
                <h4 className="availability-title">Available Dates</h4>
                <div className="availability-dates">
                  {doctor.availability.slice(0, 3).map((date, idx) => (
                    <span key={idx} className="availability-badge">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="doctor-book-btn"
                onClick={() => handleBookDoctor(doctor.id)}
                aria-label={`Book appointment with ${doctor.name}`}
              >
                <span className="btn-icon">📅</span>
                <span className="btn-text">Book Appointment</span>
              </button>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {doctors && doctors.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No doctors found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </section>
  )
}
