import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AppointmentsPage from './pages/AppointmentsPage'
import RecordsPage from './pages/RecordsPage'
import ProfilePage from './pages/ProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import SupportPage from './pages/SupportPage'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import { useAuth } from './context/useAuth'

// Lazy load heavy components for performance
const SearchDoctorsPage = lazy(() => import('./pages/SearchDoctorsPage'))
const BookAppointmentPage = lazy(() => import('./pages/BookAppointmentPage'))

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Routes with Sidebar Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="records" element={<RecordsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="support" element={<SupportPage />} />
          
          {/* Lazy loaded routes with Suspense */}
          <Route 
            path="search" 
            element={
              <Suspense fallback={<div className="loading-state"><div className="spinner">⏳</div><p>Loading...</p></div>}>
                <SearchDoctorsPage />
              </Suspense>
            } 
          />
          <Route 
            path="book" 
            element={
              <Suspense fallback={<div className="loading-state"><div className="spinner">⏳</div><p>Loading...</p></div>}>
                <BookAppointmentPage />
              </Suspense>
            } 
          />
        </Route>

        {/* Default route: send authenticated users to dashboard, others to login */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        
        {/* Fallback 404-like route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
