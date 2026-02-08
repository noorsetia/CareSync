import { useOfflineMode } from '../../hooks/useOfflineMode'

/**
 * OfflineIndicator - Shows online/offline status
 * 
 * Features:
 * - Visual indicator when offline
 * - Notification when status changes
 * - ARIA live region for screen readers
 */
export default function OfflineIndicator() {
  const { online, showNotification } = useOfflineMode()

  if (!showNotification && online) {
    return null
  }

  return (
    <div
      className={`offline-indicator ${online ? 'online' : 'offline'}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="offline-icon" aria-hidden="true">
        {online ? '🌐' : '🔌'}
      </span>
      <span className="offline-text">
        {online ? 'Back online - Data synced' : 'Offline mode - Showing cached data'}
      </span>
    </div>
  )
}
