import { useState, useEffect } from 'react'

/**
 * useLocalStorage - Sync state with localStorage
 * 
 * Purpose:
 * - Persist state across page refreshes
 * - Automatically syncs with localStorage
 * - Type-safe JSON serialization
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 * @returns {[any, Function]} - [value, setValue] tuple like useState
 * 
 * Example:
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 * setTheme('dark') // Automatically saved to localStorage
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
