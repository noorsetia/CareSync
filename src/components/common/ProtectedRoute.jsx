import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

// ProtectedRoute component: small wrapper to guard routes that require auth.
// It reads auth state and either renders children or redirects to /login.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // While auth status is being determined, show a minimal accessible loading state.
  if (loading) {
    return (
      <div role="status" aria-live="polite">
        Loading…
      </div>
    )
  }

  if (!user) {
    // Send the user to /login and remember where they wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
