import { useState } from 'react'
import { useAuth } from '../context/useAuth'

/**
 * ProfilePage - User Profile view with edit functionality
 */
export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [patientId] = useState(() => `PT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`)
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Alex Patient',
    email: user?.email || 'patient@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    bloodType: 'O+',
    height: '170',
    weight: '68',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    emergencyContactName: 'Jane Patient',
    emergencyContactPhone: '+1 (555) 987-6543',
    emergencyContactRelation: 'Spouse',
    allergies: 'Penicillin, Peanuts',
    medications: 'Lisinopril 10mg daily',
    conditions: 'Hypertension',
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'BCBS-123456789',
  })

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSaving(false)
    setIsEditing(false)
    
    alert('✅ Profile updated successfully!\n\nYour changes have been saved.')
  }

  const handleCancel = () => {
    // Reset to original values (in real app, would reload from server)
    setIsEditing(false)
  }

  const handlePrivacySettings = () => {
    alert('🔒 Privacy Settings\n\nManage your privacy preferences:\n• Data sharing settings\n• Communication preferences\n• Account security\n• Connected apps')
  }

  return (
    <section aria-labelledby="profile-heading">
      {/* Page Header with Actions */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="profile-heading" className="page-main-title">My Profile</h1>
          <p className="page-subtitle">Manage your personal information and health profile</p>
        </div>
        <div className="page-header-actions">
          <button 
            className="btn-secondary-action"
            onClick={handlePrivacySettings}
          >
            <span className="btn-icon">🔒</span>
            <span className="btn-text">Privacy Settings</span>
          </button>
          {!isEditing && (
            <button 
              className="btn-primary-action"
              onClick={() => setIsEditing(true)}
            >
              <span className="btn-icon">✏️</span>
              <span className="btn-text">Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="profile-container">
        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {profileData.name.charAt(0).toUpperCase()}
            </div>
            {isEditing && (
              <button className="avatar-upload-btn" title="Change photo">
                📷
              </button>
            )}
          </div>
          <div className="profile-header-info">
            <h2>{profileData.name}</h2>
            <p className="profile-email">{profileData.email}</p>
            <div className="profile-badges">
              <span className="badge badge-primary">Patient ID: {patientId}</span>
              <span className="badge badge-success">Verified ✓</span>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>👤 Personal Information</h3>
          </div>
          <div className="profile-grid">
            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Full Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.name}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  className="field-input"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.email}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Phone Number:</label>
              {isEditing ? (
                <input
                  type="tel"
                  className="field-input"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.phone}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Date of Birth:</label>
              {isEditing ? (
                <input
                  type="date"
                  className="field-input"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Gender:</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={profileData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={saving}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <span className="field-value">{profileData.gender}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Blood Type:</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={profileData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  disabled={saving}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <span className="field-value">{profileData.bloodType}</span>
              )}
            </div>
          </div>
        </div>

        {/* Physical Measurements */}
        <div className="profile-section">
          <div className="section-header">
            <h3>📏 Physical Measurements</h3>
          </div>
          <div className="profile-grid">
            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Height (cm):</label>
              {isEditing ? (
                <input
                  type="number"
                  className="field-input"
                  value={profileData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.height} cm</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Weight (kg):</label>
              {isEditing ? (
                <input
                  type="number"
                  className="field-input"
                  value={profileData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.weight} kg</span>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="profile-section">
          <div className="section-header">
            <h3>📍 Address</h3>
          </div>
          <div className="profile-grid">
            <div className="profile-field field-full">
              <label className="field-label">Street Address:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.address}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">City:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.city}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">State:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.state}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">ZIP Code:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.zipCode}</span>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="profile-section">
          <div className="section-header">
            <h3>🚨 Emergency Contact</h3>
          </div>
          <div className="profile-grid">
            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Contact Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.emergencyContactName}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Contact Phone:</label>
              {isEditing ? (
                <input
                  type="tel"
                  className="field-input"
                  value={profileData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.emergencyContactPhone}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Relationship:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.emergencyContactRelation}
                  onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.emergencyContactRelation}</span>
              )}
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="profile-section">
          <div className="section-header">
            <h3>🏥 Medical Information</h3>
          </div>
          <div className="profile-grid">
            <div className="profile-field field-full">
              <label className="field-label">Allergies:</label>
              {isEditing ? (
                <textarea
                  className="field-textarea"
                  value={profileData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  disabled={saving}
                  rows="2"
                />
              ) : (
                <span className="field-value">{profileData.allergies}</span>
              )}
            </div>

            <div className="profile-field field-full">
              <label className="field-label">Current Medications:</label>
              {isEditing ? (
                <textarea
                  className="field-textarea"
                  value={profileData.medications}
                  onChange={(e) => handleInputChange('medications', e.target.value)}
                  disabled={saving}
                  rows="2"
                />
              ) : (
                <span className="field-value">{profileData.medications}</span>
              )}
            </div>

            <div className="profile-field field-full">
              <label className="field-label">Chronic Conditions:</label>
              {isEditing ? (
                <textarea
                  className="field-textarea"
                  value={profileData.conditions}
                  onChange={(e) => handleInputChange('conditions', e.target.value)}
                  disabled={saving}
                  rows="2"
                />
              ) : (
                <span className="field-value">{profileData.conditions}</span>
              )}
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="profile-section">
          <div className="section-header">
            <h3>🛡️ Insurance Information</h3>
          </div>
          <div className="profile-grid">
            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Insurance Provider:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.insuranceProvider}
                  onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.insuranceProvider}</span>
              )}
            </div>

            <div className={`profile-field ${isEditing ? 'editing' : ''}`}>
              <label className="field-label">Policy Number:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="field-input"
                  value={profileData.insurancePolicyNumber}
                  onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <span className="field-value">{profileData.insurancePolicyNumber}</span>
              )}
            </div>
          </div>
        </div>

        {/* Edit Mode Actions */}
        {isEditing && (
          <div className="profile-actions">
            <button 
              className="btn-cancel"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
            <button 
              className="btn-save"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? '💾 Saving...' : '💾 Save Changes'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
