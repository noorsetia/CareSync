import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthPages.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  // Password strength logic
  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '' }
    let score = 0
    if (pass.length >= 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: '#ef4444' }
      case 2:
        return { score: 50, label: 'Fair', color: '#f59e0b' }
      case 3:
        return { score: 75, label: 'Good', color: '#3b82f6' }
      case 4:
        return { score: 100, label: 'Strong', color: '#10b981' }
      default:
        return { score: 15, label: 'Very Weak', color: '#ef4444' }
    }
  }

  const passStrength = calculatePasswordStrength(formData.password)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please complete all required fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please recheck.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (!formData.termsAccepted) {
      setError('You must accept the Terms of Service & Privacy Policy to proceed.')
      return
    }

    setLoading(true)

    // Simulate backend registration call
    setTimeout(() => {
      setLoading(false)
      navigate('/login', { state: { registered: true } })
    }, 1200)
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        
        {/* Left Side - Hero Showcase */}
        <div className="auth-hero-section register-hero">
          <div className="auth-hero-overlay"></div>
          
          <div className="auth-hero-header">
            <Link to="/" className="auth-brand-logo">
              <div className="brand-icon-box teal">
                <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path d="M12 5v14"/>
                  <path d="M5 12h14"/>
                </svg>
              </div>
              <span className="brand-text">CareSync</span>
            </Link>
            <span className="brand-badge green">Patient Portal</span>
          </div>

          <div className="auth-hero-body">
            <h1 className="auth-hero-title">
              Join CareSync Today & <br />
              <span className="hero-gradient-text green">Take Control of Your Health</span>
            </h1>
            <p className="auth-hero-subtitle">
              Registration takes less than 2 minutes. Get instant access to online consultations, medical history, and personalized health recommendations.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-card">
                <div className="feature-icon-circle green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <h4 className="feature-title">Free Registration</h4>
                  <p className="feature-desc">No hidden membership fees or subscription charges</p>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="feature-icon-circle blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h4 className="feature-title">Top Rated Specialists</h4>
                  <p className="feature-desc">Connect with board-certified physicians anytime</p>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="feature-icon-circle purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h4 className="feature-title">Quick 24/7 Scheduling</h4>
                  <p className="feature-desc">Book appointments in seconds from phone or desktop</p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <div className="trust-pill">
              <span className="privacy-badge-icon">🔒</span>
              <span className="trust-text">Your privacy is protected with <strong>256-bit SSL</strong></span>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="auth-form-section">
          
          <div className="auth-mobile-header">
            <div className="auth-brand-logo">
              <div className="brand-icon-box teal">
                <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path d="M12 5v14"/>
                  <path d="M5 12h14"/>
                </svg>
              </div>
              <span className="brand-text">CareSync</span>
            </div>
          </div>

          {/* Navigation Switcher Tabs */}
          <div className="auth-nav-tabs" role="tablist">
            <button 
              className="nav-tab" 
              role="tab" 
              aria-selected="false"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
            <button className="nav-tab active" role="tab" aria-selected="true">
              Create Account
            </button>
          </div>

          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">Fill in your information to set up your CareSync patient profile</p>
          </div>

          {error && (
            <div className="auth-alert error" role="alert">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div className="alert-content">{error}</div>
              <button type="button" className="alert-close" onClick={() => setError(null)}>×</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            
            {/* First & Last Name Grid */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="reg-firstName" className="form-label">
                  First Name <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    id="reg-firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    autoComplete="given-name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-lastName" className="form-label">
                  Last Name <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    id="reg-lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    autoComplete="family-name"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                  className="form-input"
                />
              </div>
            </div>

            {/* Phone & Date of Birth */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="reg-phone" className="form-label">
                  Phone Number
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-dob" className="form-label">
                  Date of Birth
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <input
                    id="reg-dob"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    autoComplete="bday"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="reg-password" className="form-label">
                  Password <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    id="reg-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    className="form-input has-toggle"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirmPassword" className="form-label">
                  Confirm Password <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <input
                    id="reg-confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    className="form-input has-toggle"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Live Password Strength Indicator */}
            {formData.password && (
              <div className="password-strength-box">
                <div className="strength-header">
                  <span className="strength-label">Password Strength:</span>
                  <span className="strength-value" style={{ color: passStrength.color }}>
                    {passStrength.label}
                  </span>
                </div>
                <div className="strength-bar-track">
                  <div 
                    className="strength-bar-fill"
                    style={{ 
                      width: `${passStrength.score}%`, 
                      backgroundColor: passStrength.color 
                    }}
                  />
                </div>
              </div>
            )}

            {/* Terms & Privacy Checkbox */}
            <div className="form-options-row">
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
                <span className="checkbox-text">
                  I agree to CareSync's <a href="#terms" onClick={(e) => e.preventDefault()} className="link-underline">Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()} className="link-underline">Privacy Policy</a>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-primary-btn register-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading-state">
                  <span className="spinner-loader"></span>
                  Creating Account...
                </span>
              ) : (
                <span className="btn-content">
                  Create Patient Account
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              )}
            </button>
          </form>

          <div className="auth-footer-note">
            Already registered with CareSync?{' '}
            <Link to="/login" className="auth-inline-link">
              Sign In to account
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}
