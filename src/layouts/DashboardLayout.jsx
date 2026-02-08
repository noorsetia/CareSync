import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useState } from 'react'

/**
 * DashboardLayout - Modern SaaS-style layout with left sidebar
 * 
 * Purpose:
 * - Provides consistent sidebar navigation across dashboard pages
 * - Shows user info and logout control
 * - Wraps child routes with <Outlet />
 * - Feels like a real healthcare product
 * 
 * Used by: All /dashboard/* routes
 */
export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const handleHelp = () => {
    setShowHelp(!showHelp)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div className="dashboard-layout">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className="menu-icon">{mobileMenuOpen ? '✕' : '☰'}</span>
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Mobile Close Button */}
        <button 
          className="sidebar-close-btn" 
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <span className="close-icon">✕</span>
        </button>

        {/* Logo & Branding - CaresSync */}
        <div className="sidebar-brand">
          <span className="brand-icon" aria-hidden="true">🏥</span>
          <div className="brand-text">
            <h1 className="brand-name">CaresSync</h1>
            <span className="brand-tagline">Healthcare Portal</span>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>
        </div>

        {/* Quick Action CTA */}
        <div className="sidebar-cta">
          <Link to="/dashboard/book" className="cta-button" onClick={closeMobileMenu}>
            <span className="cta-icon">➕</span>
            <span className="cta-text">Book Appointment</span>
          </Link>
        </div>

        {/* Primary Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list" role="menu">
            <li role="none">
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') && location.pathname === '/dashboard' ? 'active' : ''}`}
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon" aria-hidden="true">📊</span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/dashboard/appointments" 
                className={`nav-link ${isActive('/dashboard/appointments') ? 'active' : ''}`}
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon" aria-hidden="true">📅</span>
                <span className="nav-text">Appointments</span>
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/dashboard/records" 
                className={`nav-link ${isActive('/dashboard/records') ? 'active' : ''}`}
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon" aria-hidden="true">📋</span>
                <span className="nav-text">Medical Records</span>
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/dashboard/profile" 
                className={`nav-link ${isActive('/dashboard/profile') ? 'active' : ''}`}
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon" aria-hidden="true">👤</span>
                <span className="nav-text">Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button onClick={() => { logout(); closeMobileMenu(); }} className="sidebar-logout-btn" aria-label="Sign out">
            <span className="nav-icon" aria-hidden="true">🚪</span>
            <span className="nav-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Bar (optional - for breadcrumbs, search, notifications) */}
        <div className="dashboard-topbar">
          <div className="topbar-left">
            <h2 className="page-title">
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/dashboard/search' && 'Find Doctors'}
              {location.pathname === '/dashboard/book' && 'Book Appointment'}
              {location.pathname === '/dashboard/appointments' && 'Appointments'}
              {location.pathname === '/dashboard/records' && 'Medical Records'}
              {location.pathname === '/dashboard/profile' && 'Profile'}
            </h2>
          </div>
          <div className="topbar-right">
            <button 
              className="topbar-icon-btn" 
              aria-label="Notifications"
              onClick={handleNotifications}
            >
              🔔
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <span className="notification-badge">3</span>
                  </div>
                  <div className="notification-list">
                    <div className="notification-item">
                      <span className="notification-icon">📅</span>
                      <div className="notification-content">
                        <p className="notification-text">Upcoming appointment with Dr. Sarah Johnson</p>
                        <span className="notification-time">Tomorrow at 10:00 AM</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <span className="notification-icon">📋</span>
                      <div className="notification-content">
                        <p className="notification-text">New lab results available</p>
                        <span className="notification-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <span className="notification-icon">💊</span>
                      <div className="notification-content">
                        <p className="notification-text">Prescription refill reminder</p>
                        <span className="notification-time">1 day ago</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="view-all-btn"
                    onClick={() => {
                      setShowNotifications(false)
                      navigate('/dashboard/appointments')
                    }}
                  >
                    View All
                  </button>
                </div>
              )}
            </button>
            <button 
              className="topbar-icon-btn" 
              aria-label="Help"
              onClick={handleHelp}
            >
              ❓
              {showHelp && (
                <div className="help-dropdown">
                  <div className="dropdown-header">
                    <h3>Help & Support</h3>
                  </div>
                  <div className="help-list">
                    <button className="help-item" onClick={() => alert('📖 User Guide\n\nLearn how to use HealthPortal features:\n• Book appointments\n• View medical records\n• Manage prescriptions\n• Contact doctors')}>
                      <span className="help-icon">📖</span>
                      <span>User Guide</span>
                    </button>
                    <button className="help-item" onClick={() => alert('💬 Contact Support\n\nGet help from our team:\n📧 Email: support@healthportal.com\n📞 Phone: 1-800-HEALTH\n⏰ Hours: 24/7')}>
                      <span className="help-icon">💬</span>
                      <span>Contact Support</span>
                    </button>
                    <button className="help-item" onClick={() => alert('❓ FAQs\n\nCommon questions:\n• How do I book an appointment?\n• Where can I view my medical records?\n• How do I update my profile?\n• What payment methods are accepted?')}>
                      <span className="help-icon">❓</span>
                      <span>FAQs</span>
                    </button>
                    <button className="help-item" onClick={() => alert('🔒 Privacy & Security\n\nYour data is protected:\n• HIPAA compliant\n• Encrypted storage\n• Secure communication\n• Regular security audits')}>
                      <span className="help-icon">🔒</span>
                      <span>Privacy & Security</span>
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
