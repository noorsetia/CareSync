import { useState, useEffect } from 'react'
import { isOnline, setupOfflineListeners } from '../services/offlineService'

/**
 * useOfflineMode - Hook to track online/offline status
 * 
 * Features:
 * - Detects online/offline status
 * - Provides real-time updates
 * - Shows notification when status changes
 */
export function useOfflineMode() {
  const [online, setOnline] = useState(isOnline())
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 5000)
    }

    const handleOffline = () => {
      setOnline(false)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 5000)
    }

    setupOfflineListeners(handleOnline, handleOffline)

    // Cleanup not needed for native events, but good practice
    return () => {
      // Native events don't need cleanup in this case
    }
  }, [])

  return {
    online,
    offline: !online,
    showNotification
  }
}
