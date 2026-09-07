import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useNotifications } from '../context/NotificationContext'
import { useState } from 'react'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  const handleNotifications = () => {
    closeMobileMenu()
    navigate('/dashboard/notifications')
  }

  const handleHelp = () => {
    closeMobileMenu()
    navigate('/dashboard/support')
  }

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(path)
  }

  const getInitials = (name) => {
    if (!name) return 'PT'
    const parts = name.split(' ')
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="dashboard-layout">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        )}
      </button>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`} role="navigation" aria-label="Main navigation">
        <button 
          className="sidebar-close-btn" 
          onClick={closeMobileMenu}
          aria-label="Close sidebar"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
          </div>
          <div className="brand-text">
            <h1 className="brand-name">CareSync</h1>
            <span className="brand-tagline">Health Portal</span>
          </div>
        </div>

        {/* User Card */}
        <div className="sidebar-user">
          <div className="user-avatar-ring">
            <div className="user-avatar-text">
              {getInitials(user?.name)}
            </div>
          </div>
          <div className="user-info">
            <h3 className="user-name">{user?.name || 'Patient'}</h3>
            <p className="user-email">{user?.email || 'patient@caresync.com'}</p>
            <span className="verified-patient-badge">Verified Patient</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="sidebar-cta">
          <Link to="/dashboard/book" className="cta-button" onClick={closeMobileMenu}>
            <svg className="cta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span className="cta-text">
              <span className="cta-text-line">Book</span>
              <span className="cta-text-line">Appointment</span>
            </span>
          </Link>
        </div>

        {/* Primary Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list" role="menu">
            <li role="none">
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
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
                <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                <span className="nav-text">Appointments</span>
              </Link>
            </li>

            <li role="none">
              <Link 
                to="/dashboard/search" 
                className={`nav-link ${isActive('/dashboard/search') ? 'active' : ''}`}
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/></svg>
                <span className="nav-text">Find Doctors</span>
              </Link>
            </li>

            <li role="none">
              <Link 
                to="/dashboard/records" 
                className={`nav-link ${isActive('/dashboard/records') ? 'active' : ''}`}
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
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
                <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="nav-text">Profile & Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer Logout */}
        <div className="sidebar-footer">
          <button onClick={() => { logout(); closeMobileMenu(); }} className="sidebar-logout-btn" aria-label="Sign out">
            <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span className="nav-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h2 className="topbar-page-title">
              {location.pathname === '/dashboard' && 'Patient Overview'}
              {location.pathname === '/dashboard/search' && 'Find Doctors & Specialists'}
              {location.pathname === '/dashboard/book' && 'Book New Appointment'}
              {location.pathname === '/dashboard/appointments' && 'My Appointments'}
              {location.pathname === '/dashboard/records' && 'Medical Records & Labs'}
              {location.pathname === '/dashboard/profile' && 'Patient Profile & Settings'}
              {location.pathname === '/dashboard/notifications' && 'Notifications'}
              {location.pathname === '/dashboard/support' && 'CareSync Support'}
            </h2>
          </div>

<div className="topbar-center">
            <button
              className="topbar-search-btn"
              onClick={() => navigate('/dashboard/search')}
              title="Search doctors or specialties"
            >
              <svg className="topbar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span className="topbar-search-text">Search doctors...</span>
            </button>
          </div>

          <div className="topbar-actions">
            {/* Notification Bell */}
            <div className="topbar-dropdown-wrapper">
              <button
                className={`topbar-icon-btn ${location.pathname === '/dashboard/notifications' ? 'active' : ''}`}
                aria-label="Open notifications"
                title="Notifications"
                onClick={handleNotifications}
              >
                <svg className="topbar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                {unreadCount > 0 ? (
                  <span className="notification-count-badge" aria-label={`${unreadCount} unread notifications`}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                ) : (
                  <span className="notification-dot" style={{ display: 'none' }}></span>
                )}
              </button>
            </div>

            {/* Help / CareSync Support Button */}
            <div className="topbar-dropdown-wrapper">
              <button
                className={`topbar-icon-btn ${location.pathname === '/dashboard/support' ? 'active' : ''}`}
                aria-label="Open CareSync Support"
                title="CareSync Support"
                onClick={handleHelp}
              >
                <svg className="topbar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
