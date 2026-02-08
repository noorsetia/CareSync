import { useState } from 'react'

/**
 * CalendarUI - Interactive calendar for date selection
 * 
 * Features:
 * - Month navigation
 * - Date selection
 * - Disabled dates (past dates)
 * - Available dates highlighting
 * - ARIA labels for accessibility
 * - Lazy loaded for performance
 */
export default function CalendarUI({ selectedDate, onDateSelect, availableDates = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const isDateAvailable = (date) => {
    if (availableDates.length === 0) return true
    const dateStr = date.toISOString().split('T')[0]
    return availableDates.includes(dateStr)
  }

  const isDatePast = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateSelected = (date) => {
    if (!selectedDate) return false
    const selected = new Date(selectedDate)
    return date.toDateString() === selected.toDateString()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (date) => {
    if (!isDatePast(date)) {
      onDateSelect(date.toISOString().split('T')[0])
    }
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  // Generate calendar days
  const calendarDays = []
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty" aria-hidden="true"></div>)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const isPast = isDatePast(date)
    const isAvailable = isDateAvailable(date)
    const isSelected = isDateSelected(date)

    calendarDays.push(
      <button
        key={day}
        type="button"
        className={`calendar-day ${isPast ? 'past' : ''} ${isAvailable ? 'available' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => handleDateClick(date)}
        disabled={isPast}
        aria-label={`${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}${isSelected ? ', selected' : ''}${isAvailable ? ', available' : ''}`}
        aria-pressed={isSelected}
      >
        {day}
      </button>
    )
  }

  return (
    <div className="calendar-ui" role="application" aria-label="Date picker calendar">
      {/* Calendar Header */}
      <div className="calendar-header">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="calendar-nav-btn"
          aria-label="Previous month"
        >
          ◀
        </button>
        <h3 className="calendar-month-title" aria-live="polite">
          {monthName}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          className="calendar-nav-btn"
          aria-label="Next month"
        >
          ▶
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="calendar-weekdays" role="row">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-weekday" role="columnheader">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid" role="grid">
        {calendarDays}
      </div>

      {/* Legend */}
      <div className="calendar-legend" aria-label="Calendar legend">
        <div className="legend-item">
          <span className="legend-color selected"></span>
          <span className="legend-text">Selected</span>
        </div>
        <div className="legend-item">
          <span className="legend-color available"></span>
          <span className="legend-text">Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-color past"></span>
          <span className="legend-text">Unavailable</span>
        </div>
      </div>
    </div>
  )
}
