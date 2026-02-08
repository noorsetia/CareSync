import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Beautiful registration page for new patients
export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setLoading(true)

    // Simulate registration API call
    setTimeout(() => {
      setLoading(false)
      // In a real app, you'd send this to your backend
      alert('Registration successful! Please login with your credentials.')
      navigate('/login')
    }, 1500)
  }

  return (
    <section className="login-page register-page" aria-labelledby="register-heading">
      <div className="login-container register-container">
        <div className="login-header">
          <div className="login-brand">
            <span className="login-brand-icon">🏥</span>
            <h1 className="login-brand-name">CaresSync</h1>
          </div>
          <p className="login-tagline">Your trusted healthcare portal</p>
        </div>

        <h2 id="register-heading" className="login-title">Create Account</h2>
        <p className="login-subtitle">Join CaresSync to access quality healthcare</p>

        <form onSubmit={handleSubmit} className="register-form" aria-describedby={error ? 'register-error' : undefined}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                autoComplete="given-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth *</label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              autoComplete="bday"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                autoComplete="new-password"
                minLength="8"
              />
            </div>
          </div>

          {error && (
            <div id="register-error" className="error-message" role="alert">
              <span className="error-icon">⚠️</span> {error}
            </div>
          )}

          <button type="submit" className="login-button register-button" disabled={loading} aria-busy={loading}>
            {loading ? (
              <>
                <span className="spinner">⏳</span> Creating Account...
              </>
            ) : (
              <>
                <span className="button-icon">✨</span> Create Account
              </>
            )}
          </button>

          <div className="login-footer register-footer">
            <p className="register-link">
              Already have an account? 
              <Link to="/login" className="link-primary">Sign In</Link>
            </p>
          </div>

          <div className="privacy-notice">
            <p>
              <span className="privacy-icon">🔒</span>
              By creating an account, you agree to our Terms of Service and Privacy Policy. 
              Your data is protected with industry-standard encryption.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
