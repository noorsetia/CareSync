/**
 * formatters.js - Utility functions for formatting data
 * 
 * Purpose:
 * - Centralize formatting logic for dates, times, phone numbers, etc.
 * - Ensure consistent formatting across the application
 * - Make code more readable and maintainable
 */

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date string
 * 
 * Example: formatDate('2026-02-06') => 'February 6, 2026'
 */
export function formatDate(date, locale = 'en-US') {
  if (!date) return ''
  
  const dateObj = date instanceof Date ? date : new Date(date)
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * Format time for display
 * @param {string|Date} time - Time to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted time string
 * 
 * Example: formatTime('14:30') => '2:30 PM'
 */
export function formatTime(time, locale = 'en-US') {
  if (!time) return ''
  
  const timeObj = time instanceof Date ? time : new Date(`2000-01-01T${time}`)
  
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(timeObj)
}

/**
 * Format phone number for display
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 * 
 * Example: formatPhoneNumber('1234567890') => '(123) 456-7890'
 */
export function formatPhoneNumber(phone) {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 * 
 * Example: capitalize('john doe') => 'John Doe'
 */
export function capitalize(str) {
  if (!str) return ''
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
