/**
 * Button - Reusable button component
 * 
 * Purpose:
 * - Provides consistent button styling across the app
 * - Supports different variants (primary, secondary, danger)
 * - Handles loading and disabled states
 * - Fully accessible with proper ARIA attributes
 */
export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props 
}) {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
