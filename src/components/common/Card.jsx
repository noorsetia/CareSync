/**
 * Card - Reusable card container component
 * 
 * Purpose:
 * - Provides consistent card styling for content sections
 * - Supports optional header and footer sections
 * - Responsive and accessible
 */
export default function Card({ 
  children, 
  header, 
  footer, 
  className = '',
  ...props 
}) {
  return (
    <article className={`card ${className}`} {...props}>
      {header && <header className="card-header">{header}</header>}
      <div className="card-body">{children}</div>
      {footer && <footer className="card-footer">{footer}</footer>}
    </article>
  )
}
