import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as mockApi from '../api/mockApi'
import { AuthContext } from './authContextCore'

// AuthProvider component provides authentication state and actions.
// Keeping this file focused on the component avoids Fast Refresh lint rules.
export default function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('hc_user')
      return raw ? JSON.parse(raw) : null
    } catch (err) {
      // If parsing fails, clear stored value to avoid persistent errors.
      // Log the parsing error for diagnostics (does not leak secrets).
      console.error('Failed to parse stored user:', err)
      localStorage.removeItem('hc_user')
      return null
    }
  })

  const [token, setToken] = useState(() => localStorage.getItem('hc_token'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Persist minimal data to localStorage to survive refresh.
    if (user) localStorage.setItem('hc_user', JSON.stringify(user))
    else localStorage.removeItem('hc_user')
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem('hc_token', token)
    else localStorage.removeItem('hc_token')
  }, [token])

  async function login({ email, password }, { redirectTo } = {}) {
    setLoading(true)
    try {
      // mockApi.login simulates network latency and returns token + user
      const { token: tkn, user: usr } = await mockApi.login({ email, password })
      setToken(tkn)
      setUser(usr)
      // Redirect after successful login. Allow callers to opt into a specific destination
      navigate(redirectTo || '/dashboard', { replace: true })
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err }
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    // Clear local state and storage — keep it explicit and synchronous
    setToken(null)
    setUser(null)
    // Optionally notify server in a real app
    navigate('/login', { replace: true })
  }

  // Keep shape small and stable to make testing easier
  const value = { user, token, login, logout, loading }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
