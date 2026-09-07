import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotifications } from '../context/NotificationContext'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'Upcoming', label: 'Upcoming' },
  { id: 'Results', label: 'Results' },
  { id: 'Reminders', label: 'Reminders' },
  { id: 'Messages', label: 'Messages' },
  { id: 'Billing', label: 'Billing' },
]

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markRead,
    markAllRead,
    removeNotification: remove,
  } = useNotifications()
  const [filter, setFilter] = useState('all')

  const visible = useMemo(() => {
    if (filter === 'all') return notifications
    if (filter === 'unread') return notifications.filter((n) => n.unread)
    return notifications.filter((n) => n.category === filter)
  }, [notifications, filter])

  return (
    <section aria-labelledby="notifications-heading" className="notifications-page">
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="notifications-heading" className="page-main-title">Notifications</h1>
          <p className="page-subtitle">
            You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}.
          </p>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            className="cta-button-secondary"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="notif-filter-bar" role="tablist" aria-label="Notification filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`notif-filter-chip ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            {f.id === 'unread' && unreadCount > 0 && (
              <span className="notif-filter-count">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="notif-empty glass-card">
          <div className="notif-empty-icon">🔕</div>
          <h3>No notifications to show</h3>
          <p>You're all caught up. We'll let you know when something new arrives.</p>
        </div>
      ) : (
        <ul className="notif-page-list">
          {visible.map((n) => (
            <li
              key={n.id}
              className={`notif-page-item glass-card ${n.unread ? 'unread' : ''}`}
            >
              <div className={`notif-page-icon notif-icon-circle ${n.iconClass}`}>
                <span aria-hidden="true">{n.icon}</span>
              </div>
              <div className="notif-page-body">
                <div className="notif-page-row">
                  <h3 className="notif-page-title">{n.title}</h3>
                  <span className="notif-page-time">{n.time}</span>
                </div>
                <p className="notif-page-desc">{n.description}</p>
                <div className="notif-page-meta">
                  <span className={`notif-page-badge badge-${n.category.toLowerCase()}`}>
                    {n.category}
                  </span>
                  {n.unread && <span className="notif-unread-dot" aria-label="Unread"></span>}
                </div>
              </div>
              <div className="notif-page-actions">
                {n.unread && (
                  <button
                    type="button"
                    className="notif-action-btn"
                    onClick={() => markRead(n.id)}
                  >
                    Mark read
                  </button>
                )}
                {n.type === 'appointment' && (
                  <Link to="/dashboard/appointments" className="notif-action-btn primary">
                    View appointment
                  </Link>
                )}
                {n.type === 'lab' && (
                  <Link to="/dashboard/records" className="notif-action-btn primary">
                    View records
                  </Link>
                )}
                <button
                  type="button"
                  className="notif-action-btn ghost"
                  aria-label="Dismiss notification"
                  onClick={() => remove(n.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}