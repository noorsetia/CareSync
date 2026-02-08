import { formatDate } from '../../utils/formatters'
import Card from '../common/Card'

/**
 * AppointmentCard - Display individual appointment details
 * 
 * Purpose:
 * - Shows appointment date, time, doctor, and status
 * - Provides actions (cancel, reschedule)
 * - Feature-specific component for appointments domain
 */
export default function AppointmentCard({ appointment, onCancel, onReschedule }) {
  const { id, doctorName, date, time, status, specialty, location, type, notes } = appointment

  const statusColors = {
    upcoming: 'status-confirmed',
    completed: 'status-completed',
    cancelled: 'status-cancelled',
  }

  return (
    <Card className="appointment-card">
      <div className="appointment-header">
        <div className="appointment-header-main">
          <h3>{doctorName}</h3>
          <p className="appointment-specialty">{specialty}</p>
        </div>
        <span className={`status-badge ${statusColors[status] || 'status-confirmed'}`}>
          {status}
        </span>
      </div>

      <dl className="appointment-details">
        <dt>📅 Date</dt>
        <dd>{formatDate(date)}</dd>

        <dt>🕐 Time</dt>
        <dd>{time}</dd>

        <dt>📍 Location</dt>
        <dd>{location}</dd>

        {type && (
          <>
            <dt>📋 Type</dt>
            <dd>{type}</dd>
          </>
        )}

        {notes && (
          <>
            <dt>📝 Notes</dt>
            <dd>{notes}</dd>
          </>
        )}
      </dl>

      {status === 'upcoming' && (
        <div className="appointment-actions">
          <button 
            onClick={() => onReschedule(id)}
            className="btn-secondary"
            aria-label={`Reschedule appointment with ${doctorName}`}
          >
            Reschedule
          </button>
          <button 
            onClick={() => onCancel(id)}
            className="btn-danger"
            aria-label={`Cancel appointment with ${doctorName}`}
          >
            Cancel
          </button>
        </div>
      )}
    </Card>
  )
}
