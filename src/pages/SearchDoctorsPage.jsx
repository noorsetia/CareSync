import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { searchDoctors } from '../api/mockApi'

const SearchIcon = () => (
  <svg className="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const ExperienceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const FeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const DoctorProfileModal = ({ doctor, onClose, onBook }) => {
  if (!doctor) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content doctor-profile-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close profile">
          <CloseIcon />
        </button>
        <div className="profile-header">
          <div className="profile-avatar">{doctor.image}</div>
          <h2 className="profile-name">{doctor.name}</h2>
          <p className="profile-specialty">{doctor.specialty}</p>
        </div>
        <div className="profile-details">
          <div className="profile-detail-row">
            <div className="profile-detail-icon"><StarIcon /></div>
            <div className="profile-detail-info">
              <span className="profile-detail-label">Rating</span>
              <span className="profile-detail-value">{doctor.rating} / 5.0</span>
            </div>
          </div>
          <div className="profile-detail-row">
            <div className="profile-detail-icon"><ExperienceIcon /></div>
            <div className="profile-detail-info">
              <span className="profile-detail-label">Experience</span>
              <span className="profile-detail-value">{doctor.experience}</span>
            </div>
          </div>
          <div className="profile-detail-row">
            <div className="profile-detail-icon"><LocationIcon /></div>
            <div className="profile-detail-info">
              <span className="profile-detail-label">Clinic / Hospital</span>
              <span className="profile-detail-value">{doctor.location}</span>
            </div>
          </div>
          <div className="profile-detail-row">
            <div className="profile-detail-icon"><FeeIcon /></div>
            <div className="profile-detail-info">
              <span className="profile-detail-label">Consultation Fee</span>
              <span className="profile-detail-value">{doctor.fees}</span>
            </div>
          </div>
          <div className="profile-detail-row">
            <div className="profile-detail-icon"><ClockIcon /></div>
            <div className="profile-detail-info">
              <span className="profile-detail-label">Available Dates</span>
              <span className="profile-detail-value">
                {doctor.availability.map(date =>
                  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                ).join(', ')}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn-secondary-action" onClick={onClose}>Close</button>
          <button className="btn-primary-action" onClick={() => onBook(doctor.id)}>Book Appointment</button>
        </div>
      </div>
    </div>
  )
}

export default function SearchDoctorsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [specialty, setSpecialty] = useState('all')
  const [location, setLocation] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [feeRange, setFeeRange] = useState('all')
  const [minRating, setMinRating] = useState('all')
  const [sortBy, setSortBy] = useState('recommended')
  const [favorites, setFavorites] = useState({})
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const { data: doctors, isLoading, error } = useQuery({
    queryKey: ['doctors', { specialty, location }],
    queryFn: () => searchDoctors({ specialty, location }),
    staleTime: 5 * 60 * 1000,
  })

  const specialties = ['all', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology']
  const locations = ['all', 'Downtown Medical Center', 'Northside Clinic', 'Children\'s Health Center', 'Sports Medicine Institute', 'Brain & Spine Center']

  const parseFee = (feeStr) => {
    const match = feeStr.match(/\$(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

  const parseExperience = (expStr) => {
    const match = expStr.match(/(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

  const getAvailabilityStatus = (availability) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    for (const dateStr of availability) {
      const date = new Date(dateStr)
      date.setHours(0, 0, 0, 0)
      if (date.getTime() === today.getTime()) return 'today'
      if (date.getTime() === tomorrow.getTime()) return 'tomorrow'
    }
    return null
  }

  const getNextAvailable = (availability) => {
    if (!availability || availability.length === 0) return 'Not available'
    const sorted = [...availability].sort((a, b) => new Date(a) - new Date(b))
    const next = sorted[0]
    const date = new Date(next)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const filteredAndSortedDoctors = useMemo(() => {
    if (!doctors) return []

    let result = [...doctors]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.specialty.toLowerCase().includes(query) ||
        d.location.toLowerCase().includes(query)
      )
    }

    if (availability === 'today') {
      result = result.filter(d => getAvailabilityStatus(d.availability) === 'today')
    } else if (availability === 'tomorrow') {
      result = result.filter(d => getAvailabilityStatus(d.availability) === 'tomorrow')
    } else if (availability === 'week') {
      const today = new Date()
      const weekEnd = new Date(today)
      weekEnd.setDate(weekEnd.getDate() + 7)
      result = result.filter(d =>
        d.availability.some(date => {
          const d = new Date(date)
          return d >= today && d <= weekEnd
        })
      )
    }

    if (feeRange !== 'all') {
      result = result.filter(d => {
        const fee = parseFee(d.fees)
        if (feeRange === 'under100') return fee < 100
        if (feeRange === '100to150') return fee >= 100 && fee <= 150
        if (feeRange === '150to200') return fee > 150 && fee <= 200
        if (feeRange === 'over200') return fee > 200
        return true
      })
    }

    if (minRating !== 'all') {
      const min = parseFloat(minRating)
      result = result.filter(d => d.rating >= min)
    }

    if (sortBy === 'highestRated') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'mostExperienced') {
      result.sort((a, b) => parseExperience(b.experience) - parseExperience(a.experience))
    } else if (sortBy === 'lowestFee') {
      result.sort((a, b) => parseFee(a.fees) - parseFee(b.fees))
    } else if (sortBy === 'earliestAvailability') {
      result.sort((a, b) => new Date(a.availability[0]) - new Date(b.availability[0]))
    }

    return result
  }, [doctors, searchQuery, availability, feeRange, minRating, sortBy])

  const toggleFavorite = (doctorId) => {
    setFavorites(prev => ({
      ...prev,
      [doctorId]: !prev[doctorId]
    }))
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSpecialty('all')
    setLocation('all')
    setAvailability('all')
    setFeeRange('all')
    setMinRating('all')
    setSortBy('recommended')
  }

  const handleBookDoctor = (doctorId) => {
    navigate(`/dashboard/book?doctor=${doctorId}`)
  }

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor)
  }

  const hasActiveFilters = searchQuery || specialty !== 'all' || location !== 'all' || availability !== 'all' || feeRange !== 'all' || minRating !== 'all'

  return (
    <section aria-labelledby="search-heading">
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="search-heading" className="page-main-title">Find Doctors & Specialists</h1>
          <p className="page-subtitle">Search and book appointments with healthcare providers</p>
        </div>
        <div className="page-header-actions">
          <button
            className="btn-primary-action"
            onClick={() => navigate('/dashboard/appointments')}
          >
            <span className="btn-text">My Appointments</span>
          </button>
        </div>
      </div>

      <div className="search-main-container">
        <div className="search-input-wrapper">
          <SearchIcon />
          <input
            type="text"
            className="search-main-input"
            placeholder="Search by doctor name, specialty, or clinic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search doctors"
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <CloseIcon />
            </button>
          )}
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="specialty-filter" className="filter-label">Specialty</label>
            <select
              id="specialty-filter"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="filter-select"
            >
              {specialties.map(s => (
                <option key={s} value={s}>{s === 'all' ? 'All Specialties' : s}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="location-filter" className="filter-label">Location</label>
            <select
              id="location-filter"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="filter-select"
            >
              {locations.map(l => (
                <option key={l} value={l}>{l === 'all' ? 'All Locations' : l}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="availability-filter" className="filter-label">Availability</label>
            <select
              id="availability-filter"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="filter-select"
            >
              <option value="all">Any Time</option>
              <option value="today">Available Today</option>
              <option value="tomorrow">Available Tomorrow</option>
              <option value="week">This Week</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="fee-filter" className="filter-label">Consultation Fee</label>
            <select
              id="fee-filter"
              value={feeRange}
              onChange={(e) => setFeeRange(e.target.value)}
              className="filter-select"
            >
              <option value="all">Any Fee</option>
              <option value="under100">Under $100</option>
              <option value="100to150">$100 - $150</option>
              <option value="150to200">$150 - $200</option>
              <option value="over200">Over $200</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="rating-filter" className="filter-label">Min Rating</label>
            <select
              id="rating-filter"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="filter-select"
            >
              <option value="all">Any Rating</option>
              <option value="4.5">4.5+</option>
              <option value="4.7">4.7+</option>
              <option value="4.9">4.9+</option>
            </select>
          </div>
        </div>

        <div className="controls-row">
          <div className="results-summary">
            {filteredAndSortedDoctors.length} doctor{filteredAndSortedDoctors.length !== 1 ? 's' : ''} found
          </div>

          <div className="controls-right">
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            )}

            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="recommended">Recommended</option>
                <option value="highestRated">Highest Rated</option>
                <option value="mostExperienced">Most Experienced</option>
                <option value="lowestFee">Lowest Consultation Fee</option>
                <option value="earliestAvailability">Earliest Availability</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="loading-state" role="status">
          <div className="spinner"></div>
          <p>Finding doctors...</p>
        </div>
      )}

      {error && (
        <div className="error-state" role="alert">
          <p>Unable to load doctors. Please try again.</p>
        </div>
      )}

      {!isLoading && !error && filteredAndSortedDoctors.length > 0 && (
        <div className="doctors-grid">
          {filteredAndSortedDoctors.map(doctor => {
            const availStatus = getAvailabilityStatus(doctor.availability)
            const nextAvailable = getNextAvailable(doctor.availability)
            const isFavorite = favorites[doctor.id]

            return (
              <article key={doctor.id} className="doctor-card">
                <button
                  className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(doctor.id)}
                  aria-label={isFavorite ? `Remove ${doctor.name} from favorites` : `Add ${doctor.name} to favorites`}
                >
                  <HeartIcon filled={isFavorite} />
                </button>

                {availStatus === 'today' && <span className="availability-badge available-today">Available Today</span>}
                {availStatus === 'tomorrow' && <span className="availability-badge available-tomorrow">Available Tomorrow</span>}

                <div className="doctor-card-header">
                  <div className="doctor-avatar">{doctor.image}</div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">{doctor.name}</h3>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <div className="doctor-meta">
                      <span className="doctor-rating"><StarIcon /> {doctor.rating}</span>
                      <span className="doctor-experience">{doctor.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="doctor-card-body">
                  <div className="doctor-detail">
                    <span className="detail-icon"><LocationIcon /></span>
                    <span className="detail-text">{doctor.location}</span>
                  </div>
                  <div className="doctor-detail">
                    <span className="detail-icon"><FeeIcon /></span>
                    <span className="detail-text">{doctor.fees}</span>
                  </div>
                  <div className="doctor-detail">
                    <span className="detail-icon"><ClockIcon /></span>
                    <span className="detail-text">Next: {nextAvailable}</span>
                  </div>
                </div>

                <div className="doctor-card-actions">
                  <button
                    className="btn-view-profile"
                    onClick={() => handleViewProfile(doctor)}
                    aria-label={`View profile of ${doctor.name}`}
                  >
                    View Profile
                  </button>
                  <button
                    className="btn-book-appointment"
                    onClick={() => handleBookDoctor(doctor.id)}
                    aria-label={`Book appointment with ${doctor.name}`}
                  >
                    Book Appointment
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {!isLoading && !error && filteredAndSortedDoctors.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
          <h3>No doctors found</h3>
          <p>Try adjusting your search or filters to see more results</p>
          {hasActiveFilters && (
            <button className="btn-primary-action empty-clear-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBook={(doctorId) => {
            setSelectedDoctor(null)
            handleBookDoctor(doctorId)
          }}
        />
      )}
    </section>
  )
}
