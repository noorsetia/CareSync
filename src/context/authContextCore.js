import { createContext } from 'react'

// Small core file that only defines the context object. Separating this
// avoids mixing non-component exports in the same file as React components
// which can trip React Fast Refresh rules in some setups.
export const AuthContext = createContext(null)
