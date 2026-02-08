import { useContext } from 'react'
import { AuthContext } from './authContextCore'

// Small hook to read auth context. Kept separate from the provider to
// satisfy fast-refresh rules which require files that export components to
// not export other utilities.
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
