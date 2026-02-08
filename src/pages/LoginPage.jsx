import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// Accessible, controlled login form. Keeps component small and focused.
export default function Login() {
  const { login, loading } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const res = await login({ email, password }, { redirectTo: from })
    if (!res.ok) {
      // Show friendly error without leaking implementation details
      setError(res.error?.message || 'Login failed')
    }
  }

  return (
    <section className="login-page" aria-labelledby="login-heading">
      <div className="login-container">
        <div className="login-header">
          <div className="login-brand">
            <span className="login-brand-icon">🏥</span>
            <h1 className="login-brand-name">CaresSync</h1>
          </div>
          <p className="login-tagline">Your trusted healthcare portal</p>
        </div>

        <h2 id="login-heading" className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to access your health records</p>

      <form onSubmit={handleSubmit} className="login-form" aria-describedby={error ? 'login-error' : undefined}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="patient@example.com"
            autoComplete="email"
            aria-label="Email address"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-label="Password"
            className="form-input"
          />
        </div>

        <div className="forgot-password-row">
          <a href="#" className="forgot-password-link">Forgot password?</a>
        </div>

        {error && (
          <div id="login-error" className="error-message" role="alert">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        <button type="submit" className="login-button" disabled={loading} aria-busy={loading}>
          {loading ? (
            <>
              <span className="spinner">⏳</span> Signing in...
            </>
          ) : (
            <>
              <span className="button-icon">🚀</span> Sign In
            </>
          )}
        </button>

        <div className="login-divider">
          <span>OR</span>
        </div>

        <Link to="/register" className="register-cta-button">
          <span className="button-icon">✨</span>
          Create New Account
        </Link>

        <div className="login-footer">
          <div className="demo-credentials">
            <strong>💡 Login Information:</strong><br />
            <span className="demo-item">✅ Use any valid email address</span><br />
            <span className="demo-item">✅ Enter any password to sign in</span>
          </div>
        </div>
      </form>
      </div>
    </section>
  )
}
