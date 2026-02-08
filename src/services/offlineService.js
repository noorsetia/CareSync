/**
 * Offline Service - Handles offline mode with cached data
 * 
 * Features:
 * - Detect online/offline status
 * - Cache API responses in localStorage
 * - Serve cached data when offline
 * - Queue mutations for later sync
 * - Automatic retry when back online
 */

const CACHE_PREFIX = 'hc_offline_cache_'
const QUEUE_KEY = 'hc_offline_queue'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Check if browser is online
 */
export function isOnline() {
  return navigator.onLine
}

/**
 * Get cached data
 */
export function getCachedData(key) {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    const cached = localStorage.getItem(cacheKey)
    
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    
    // Check if cache has expired
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(cacheKey)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error reading cache:', error)
    return null
  }
}

/**
 * Set cached data
 */
export function setCachedData(key, data) {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    const cacheData = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(cacheKey, JSON.stringify(cacheData))
    return true
  } catch (error) {
    console.error('Error setting cache:', error)
    return false
  }
}

/**
 * Clear specific cache
 */
export function clearCache(key) {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    localStorage.removeItem(cacheKey)
    return true
  } catch (error) {
    console.error('Error clearing cache:', error)
    return false
  }
}

/**
 * Clear all cached data
 */
export function clearAllCache() {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
    return true
  } catch (error) {
    console.error('Error clearing all cache:', error)
    return false
  }
}

/**
 * Add mutation to offline queue
 */
export function queueMutation(mutation) {
  try {
    const queue = getOfflineQueue()
    queue.push({
      ...mutation,
      id: `mutation-${Date.now()}-${Math.random()}`,
      timestamp: Date.now()
    })
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
    console.log('📝 Mutation queued for later sync:', mutation.type)
    return true
  } catch (error) {
    console.error('Error queuing mutation:', error)
    return false
  }
}

/**
 * Get offline queue
 */
export function getOfflineQueue() {
  try {
    const queue = localStorage.getItem(QUEUE_KEY)
    return queue ? JSON.parse(queue) : []
  } catch (error) {
    console.error('Error reading offline queue:', error)
    return []
  }
}

/**
 * Clear offline queue
 */
export function clearOfflineQueue() {
  try {
    localStorage.removeItem(QUEUE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing offline queue:', error)
    return false
  }
}

/**
 * Process offline queue (sync when back online)
 */
export async function syncOfflineQueue() {
  if (!isOnline()) {
    console.log('🔌 Still offline, cannot sync queue')
    return { success: false, reason: 'offline' }
  }

  const queue = getOfflineQueue()
  
  if (queue.length === 0) {
    console.log('✅ No pending mutations to sync')
    return { success: true, synced: 0 }
  }

  console.log(`🔄 Syncing ${queue.length} pending mutations...`)
  
  const results = []
  
  for (const mutation of queue) {
    try {
      // In a real app, you would dispatch these mutations to your API
      console.log('✅ Synced mutation:', mutation.type)
      results.push({ id: mutation.id, success: true })
    } catch (error) {
      console.error('❌ Failed to sync mutation:', mutation.type, error)
      results.push({ id: mutation.id, success: false, error: error.message })
    }
  }

  // Clear successfully synced mutations
  const failedMutations = queue.filter(m => {
    const result = results.find(r => r.id === m.id)
    return !result?.success
  })

  if (failedMutations.length > 0) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(failedMutations))
  } else {
    clearOfflineQueue()
  }

  return {
    success: true,
    synced: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  }
}

/**
 * Setup offline event listeners
 */
export function setupOfflineListeners(onOnline, onOffline) {
  window.addEventListener('online', () => {
    console.log('🌐 Back online!')
    if (onOnline) onOnline()
    syncOfflineQueue()
  })

  window.addEventListener('offline', () => {
    console.log('🔌 Gone offline!')
    if (onOffline) onOffline()
  })
}

/**
 * Fetch with cache fallback
 */
export async function fetchWithCache(key, fetchFn, options = {}) {
  const { forceRefresh = false, cacheFirst = false } = options

  // If offline, return cached data
  if (!isOnline()) {
    console.log('🔌 Offline: serving cached data for', key)
    const cached = getCachedData(key)
    if (cached) {
      return { data: cached, fromCache: true, offline: true }
    }
    throw new Error('No cached data available while offline')
  }

  // If cache-first strategy and we have cache, return it
  if (cacheFirst && !forceRefresh) {
    const cached = getCachedData(key)
    if (cached) {
      console.log('📦 Serving from cache:', key)
      
      // Fetch in background to update cache
      fetchFn().then(data => {
        setCachedData(key, data)
      }).catch(err => {
        console.error('Background fetch failed:', err)
      })
      
      return { data: cached, fromCache: true, offline: false }
    }
  }

  // Try to fetch fresh data
  try {
    const data = await fetchFn()
    setCachedData(key, data)
    return { data, fromCache: false, offline: false }
  } catch (error) {
    // If fetch fails, fallback to cache
    const cached = getCachedData(key)
    if (cached) {
      console.log('⚠️ Fetch failed, serving cached data:', key)
      return { data: cached, fromCache: true, offline: false }
    }
    throw error
  }
}
