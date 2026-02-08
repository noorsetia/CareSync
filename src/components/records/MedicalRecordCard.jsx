import { formatDate } from '../../utils/formatters'
import Card from '../common/Card'

/**
 * MedicalRecordCard - Display medical record summary
 * 
 * Purpose:
 * - Shows visit date, diagnosis, and provider
 * - Provides download/view actions for full record
 * - Feature-specific component for medical records domain
 */
export default function MedicalRecordCard({ record, onView, onDownload }) {
  const { id, date, diagnosis, provider, recordType } = record

  return (
    <Card className="medical-record-card">
      <div className="record-header">
        <h3>{recordType}</h3>
        <time dateTime={date}>{formatDate(date)}</time>
      </div>

      <dl className="record-details">
        <dt>Provider</dt>
        <dd>{provider}</dd>

        <dt>Diagnosis</dt>
        <dd>{diagnosis}</dd>
      </dl>

      <div className="record-actions">
        <button 
          onClick={() => onView(id)}
          className="btn-primary"
          aria-label={`View ${recordType} from ${formatDate(date)}`}
        >
          View Details
        </button>
        <button 
          onClick={() => onDownload(id)}
          className="btn-secondary"
          aria-label={`Download ${recordType} PDF`}
        >
          Download PDF
        </button>
      </div>
    </Card>
  )
}
