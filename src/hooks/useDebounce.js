import { useEffect, useState } from 'react'

/**
 * useDebounce - Custom hook to debounce a value
 * 
 * Purpose:
 * - Delays updating the returned value until after a specified delay
 * - Useful for search inputs, API calls triggered by user typing
 * - Reduces unnecessary API calls and re-renders
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {any} - The debounced value
 * 
 * Example:
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearch = useDebounce(searchTerm, 500)
 * 
 * // Only triggers when user stops typing for 500ms
 * useEffect(() => {
 *   if (debouncedSearch) searchAPI(debouncedSearch)
 * }, [debouncedSearch])
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set up the timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: cancel the timeout if value changes before delay
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
