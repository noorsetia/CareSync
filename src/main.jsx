import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './context/AuthContext'
import './index.css'
import App from './App.jsx'

// Create a QueryClient with sensible defaults for a healthcare app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't retry infinitely — be conservative in healthcare contexts
      retry: 1,
      // Keep data fresh for a short while to balance UX and staleness
      staleTime: 1000 * 60 * 1, // 1 minute
      // Use conservative cache time
      cacheTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
