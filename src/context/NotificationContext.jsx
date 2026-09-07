import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const NotificationContext = createContext(null)

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'appointment',
    icon: '📅',
    iconClass: 'blue',
    title: 'Upcoming checkup with Dr. Sarah Johnson',
    description: 'Cardiology follow-up visit scheduled for tomorrow at 10:00 AM.',
    time: 'Tomorrow, 10:00 AM',
    category: 'Upcoming',
    unread: true,
  },
  {
    id: 'n2',
    type: 'lab',
    icon: '🧪',
    iconClass: 'green',
    title: 'Blood test lab results ready',
    description: 'Your CBC and lipid panel are now available under Medical Records.',
    time: '2 hours ago',
    category: 'Results',
    unread: true,
  },
  {
    id: 'n3',
    type: 'prescription',
    icon: '💊',
    iconClass: 'purple',
    title: 'Prescription refill reminder',
    description: 'Lisinopril 10mg is due for refill within 3 days.',
    time: '1 day ago',
    category: 'Reminders',
    unread: true,
  },
  {
    id: 'n4',
    type: 'message',
    icon: '✉️',
    iconClass: 'amber',
    title: 'New message from Dr. Smith',
    description: 'Please review the post-visit notes sent to your inbox.',
    time: '2 days ago',
    category: 'Messages',
    unread: false,
  },
  {
    id: 'n5',
    type: 'vaccine',
    icon: '💉',
    iconClass: 'rose',
    title: 'Flu shot recommended',
    description: 'Annual influenza vaccination is now available at your clinic.',
    time: '4 days ago',
    category: 'Reminders',
    unread: false,
  },
  {
    id: 'n6',
    type: 'billing',
    icon: '🧾',
    iconClass: 'gray',
    title: 'Insurance claim processed',
    description: 'Claim #CS-22381 has been approved by your provider.',
    time: '1 week ago',
    category: 'Billing',
    unread: false,
  },
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('caresync_notifications')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load notifications from localStorage:', e)
    }
    return INITIAL_NOTIFICATIONS
  })

  // Toast banner for newly raised notification
  const [activeToast, setActiveToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('caresync_notifications', JSON.stringify(notifications))
    } catch (e) {
      console.error('Failed to save notifications to localStorage:', e)
    }
  }, [notifications])

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  )

  const addNotification = ({
    type = 'appointment',
    icon = '🔔',
    iconClass = 'blue',
    title,
    description,
    category = 'Upcoming',
    time = 'Just now',
    link = '/dashboard/appointments',
  }) => {
    const newNotif = {
      id: `n-${Date.now()}`,
      type,
      icon,
      iconClass,
      title,
      description,
      time,
      category,
      unread: true,
      link,
    }

    setNotifications((prev) => [newNotif, ...prev])

    // Trigger floating toast feedback
    setActiveToast(newNotif)
    setTimeout(() => {
      setActiveToast((current) => (current?.id === newNotif.id ? null : current))
    }, 4000)
  }

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const dismissToast = () => {
    setActiveToast(null)
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markRead,
        markAllRead,
        removeNotification,
      }}
    >
      {children}
      {/* Dynamic Toast Popup Notification */}
      {activeToast && (
        <div
          className="notification-toast-popup"
          role="alert"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: '#ffffff',
            border: '1.5px solid #6366f1',
            borderRadius: '14px',
            padding: '14px 18px',
            boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            maxWidth: '380px',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              fontSize: '1.4rem',
              lineHeight: 1,
              padding: '6px',
              borderRadius: '50%',
              background: '#eef2ff',
            }}
          >
            {activeToast.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0f172a', marginBottom: '3px' }}>
              {activeToast.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>
              {activeToast.description}
            </div>
          </div>
          <button
            onClick={dismissToast}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '0 4px',
            }}
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
