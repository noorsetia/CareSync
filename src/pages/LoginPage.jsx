import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import './AuthPages.css'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccessMsg('')
    
    if (!email || !password) {
      setError('Please fill in all required fields.')
      return
    }

    const res = await login({ email, password }, { redirectTo: from })
    if (!res.ok) {
      setError(res.error?.message || 'Invalid email or password. Please try again.')
    }
  }

  const handleDemoLogin = (demoType) => {
    if (demoType === 'patient') {
      setEmail('patient@caresync.com')
      setPassword('Password123!')
    } else if (demoType === 'doctor') {
      setEmail('dr.smith@caresync.com')
      setPassword('DoctorPass123!')
    }
    setError(null)
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        
        {/* Left Side - Hero / Feature Showcase */}
        <div className="auth-hero-section">
          <div className="auth-hero-overlay"></div>
          
          <div className="auth-hero-header">
            <Link to="/" className="auth-brand-logo">
              <div className="brand-icon-box">
                <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path d="M12 5v14"/>
                  <path d="M5 12h14"/>
                </svg>
              </div>
              <span className="brand-text">CareSync</span>
            </Link>
            <span className="brand-badge">Healthcare Portal</span>
          </div>

          <div className="auth-hero-body">
            <h1 className="auth-hero-title">
              Your Health, <br />
              <span className="hero-gradient-text">Connected & Simplified</span>
            </h1>
            <p className="auth-hero-subtitle">
              Access your medical records, consult with top specialists, and manage your appointments all in one secure platform.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-card">
                <div className="feature-icon-circle green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <h4 className="feature-title">HIPAA Compliant & Secure</h4>
                  <p className="feature-desc">End-to-end 256-bit encryption for all your health data</p>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="feature-icon-circle blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                  <h4 className="feature-title">Instant Appointment Booking</h4>
                  <p className="feature-desc">Schedule visits with verified healthcare professionals 24/7</p>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="feature-icon-circle purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div>
                  <h4 className="feature-title">Digital Health Records</h4>
                  <p className="feature-desc">Access lab results, prescriptions, and history anywhere</p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <div className="trust-pill">
              <div className="avatar-group">
                <span className="avatar-mini">🏥</span>
                <span className="avatar-mini">👨‍⚕️</span>
                <span className="avatar-mini">👩‍⚕️</span>
              </div>
              <span className="trust-text">Trusted by over <strong>50,000+</strong> patients & doctors</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form Card */}
        <div className="auth-form-section">
          
          <div className="auth-mobile-header">
            <div className="auth-brand-logo">
              <div className="brand-icon-box">
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
            <button className="nav-tab active" role="tab" aria-selected="true">
              Sign In
            </button>
            <button 
              className="nav-tab" 
              role="tab" 
              aria-selected="false"
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          </div>

          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome Back</h2>
            <p className="auth-form-subtitle">Enter your credentials to access your patient portal</p>
          </div>

          {/* Demo fill shortcut pill */}
          <div className="demo-shortcuts">
            <span className="demo-shortcuts-label">⚡ Quick Fill:</span>
            <button 
              type="button" 
              className="demo-chip" 
              onClick={() => handleDemoLogin('patient')}
              title="Click to auto-fill sample patient details"
            >
              👤 Patient Demo
            </button>
            <button 
              type="button" 
              className="demo-chip secondary" 
              onClick={() => handleDemoLogin('doctor')}
              title="Click to auto-fill sample doctor details"
            >
              👨‍⚕️ Doctor Demo
            </button>
          </div>

          {error && (
            <div className="auth-alert error" role="alert">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div className="alert-content">{error}</div>
              <button type="button" className="alert-close" onClick={() => setError(null)}>×</button>
            </div>
          )}

          {successMsg && (
            <div className="auth-alert success" role="alert">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <div className="alert-content">{successMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@example.com"
                  autoComplete="email"
                  className="form-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="login-password" className="form-label">
                  Password <span className="required-star">*</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); setError('Password reset instructions sent to your email.'); }} className="forgot-password-link">
                  Forgot Password?
                </a>
              </div>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
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

            {/* Checkbox Options */}
            <div className="form-options-row">
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="checkbox-text">Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading-state">
                  <span className="spinner-loader"></span>
                  Signing in...
                </span>
              ) : (
                <span className="btn-content">
                  Sign In to Dashboard
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="social-buttons-grid">
            <button 
              type="button" 
              className="social-btn google-btn"
              onClick={() => handleDemoLogin('patient')}
            >
              <svg className="social-svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>
            <button 
              type="button" 
              className="social-btn apple-btn"
              onClick={() => handleDemoLogin('doctor')}
            >
              <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.57-.69.96-1.65.85-2.62-.83.03-1.83.55-2.42 1.24-.53.61-.99 1.59-.87 2.54.92.07 1.87-.47 2.44-1.16z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <div className="auth-footer-note">
            Don't have an account yet?{' '}
            <Link to="/register" className="auth-inline-link">
              Create free account
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}
