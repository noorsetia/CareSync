/**
 * validators.js - Input validation utilities
 * 
 * Purpose:
 * - Centralize validation logic for forms
 * - Ensure consistent validation rules across the app
 * - Provide helpful error messages for users
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export function validateEmail(email) {
  if (!email) {
    return { isValid: false, error: 'Email is required' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }
  
  return { isValid: true, error: null }
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, error: string, strength: string }
 */
export function validatePassword(password) {
  if (!password) {
    return { isValid: false, error: 'Password is required', strength: 'none' }
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters', strength: 'weak' }
  }
  
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*]/.test(password)
  
  const strengthScore = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length
  
  if (strengthScore < 3) {
    return { 
      isValid: false, 
      error: 'Password must include uppercase, lowercase, and numbers', 
      strength: 'weak' 
    }
  }
  
  return { 
    isValid: true, 
    error: null, 
    strength: strengthScore === 4 ? 'strong' : 'medium' 
  }
}

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone number to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export function validatePhone(phone) {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' }
  }
  
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length !== 10) {
    return { isValid: false, error: 'Phone number must be 10 digits' }
  }
  
  return { isValid: true, error: null }
}

/**
 * Validate date is not in the past
 * @param {string|Date} date - Date to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export function validateFutureDate(date) {
  if (!date) {
    return { isValid: false, error: 'Date is required' }
  }
  
  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (selectedDate < today) {
    return { isValid: false, error: 'Date cannot be in the past' }
  }
  
  return { isValid: true, error: null }
}
