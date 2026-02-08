import { useState, lazy, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/useAuth'
import { fetchMedicalRecords } from '../api/mockApi'

// Lazy load the chart component for performance
const VitalsChart = lazy(() => import('../components/records/VitalsChart'))

/**
 * RecordsPage - Medical Records view with lab results and vitals
 * 
 * Features:
 * - Display lab results and vitals
 * - Filter by category
 * - Optional charting (lazy loaded)
 * - React Query for data fetching
 */
export default function RecordsPage() {
  const { token } = useAuth()
  const [category, setCategory] = useState('all')
  const [showChart, setShowChart] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadingRecord, setDownloadingRecord] = useState(null)
  
  const { data: records, isLoading, error } = useQuery({
    queryKey: ['medicalRecords', { category }],
    queryFn: () => fetchMedicalRecords({ token, category }),
    enabled: !!token,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'status-normal'
      case 'borderline': return 'status-borderline'
      case 'high': return 'status-high'
      case 'low': return 'status-low'
      default: return ''
    }
  }

  const handleDownloadAll = async () => {
    setDownloading(true)
    
    // Simulate PDF generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create a blob with sample PDF content
    const content = `
MEDICAL RECORDS - PATIENT PORTAL
================================

Patient: Alex Patient
Date: ${new Date().toLocaleDateString()}

LAB RESULTS & VITALS SUMMARY
${records?.map(record => `
${record.title}
Date: ${record.date}
Provider: ${record.provider}
`).join('\n')}

This is a simulated download. In production, this would be a proper PDF with all medical records.
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `medical-records-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setDownloading(false)
  }

  const handleDownloadRecord = async (recordTitle, recordDate, recordProvider) => {
    setDownloadingRecord(recordTitle)
    
    // Simulate PDF generation delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create a blob with sample PDF content
    const content = `
MEDICAL RECORD
==============

Title: ${recordTitle}
Date: ${recordDate}
Provider: ${recordProvider}
Downloaded: ${new Date().toLocaleString()}

This is a simulated download. In production, this would be a secure, encrypted PDF document with detailed test results.
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${recordTitle.toLowerCase().replace(/\s+/g, '-')}-${recordDate}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setDownloadingRecord(null)
  }

  return (
    <section aria-labelledby="records-heading">
      {/* Page Header with Actions */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <h1 id="records-heading" className="page-main-title">Medical Records</h1>
          <p className="page-subtitle">Access your test results, reports, and health documents</p>
        </div>
        <div className="page-header-actions">
          <button 
            className="btn-secondary-action"
            onClick={() => setShowChart(!showChart)}
          >
            <span className="btn-icon">{showChart ? '📋' : '📊'}</span>
            <span className="btn-text">{showChart ? 'Hide Chart' : 'View Chart'}</span>
          </button>
          <button 
            className="btn-primary-action"
            onClick={handleDownloadAll}
            disabled={downloading}
          >
            <span className="btn-icon">{downloading ? '⏳' : '⬇️'}</span>
            <span className="btn-text">{downloading ? 'Preparing...' : 'Download All'}</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls" role="group" aria-label="Filter records">
        <button 
          onClick={() => setCategory('all')}
          className={category === 'all' ? 'active' : ''}
        >
          All Records
        </button>
        <button 
          onClick={() => setCategory('lab')}
          className={category === 'lab' ? 'active' : ''}
        >
          🧪 Lab Results
        </button>
        <button 
          onClick={() => setCategory('vitals')}
          className={category === 'vitals' ? 'active' : ''}
        >
          ❤️ Vitals
        </button>
      </div>

      {/* Vitals Chart (Lazy Loaded) */}
      {showChart && (
        <Suspense fallback={
          <div className="chart-loading">
            <div className="spinner">⏳</div>
            <p>Loading chart...</p>
          </div>
        }>
          <VitalsChart records={records?.filter(r => r.category === 'vitals') || []} />
        </Suspense>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="loading-state" role="status">
          <div className="spinner">⏳</div>
          <p>Loading medical records...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state" role="alert">
          <div className="error-icon">⚠️</div>
          <p>Unable to load records. Please try again.</p>
        </div>
      )}

      {/* Records List */}
      {records && records.length > 0 && (
        <div className="records-list">
          {records.map(record => (
            <article key={record.id} className="record-card">
              <div className="record-header">
                <div className="record-info">
                  <span className={`record-type-badge ${record.category}`}>
                    {record.type}
                  </span>
                  <h3 className="record-title">{record.title}</h3>
                  <div className="record-meta">
                    <span className="record-date">
                      📅 {new Date(record.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="record-doctor">
                      👨‍⚕️ {record.doctor}
                    </span>
                  </div>
                </div>
                <button 
                  className="btn-icon-only"
                  aria-label={`Download ${record.title}`}
                  onClick={() => handleDownloadRecord(record.title, record.date, record.doctor)}
                  disabled={downloadingRecord === record.title}
                >
                  {downloadingRecord === record.title ? '⏳' : '⬇️'}
                </button>
              </div>

              <div className="record-body">
                {/* Lab Results */}
                {record.results && (
                  <div className="lab-results">
                    <table className="results-table">
                      <thead>
                        <tr>
                          <th>Test</th>
                          <th>Value</th>
                          <th>Unit</th>
                          <th>Reference Range</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.results.map((result, idx) => (
                          <tr key={idx}>
                            <td className="test-name">{result.test}</td>
                            <td className="test-value">{result.value}</td>
                            <td className="test-unit">{result.unit}</td>
                            <td className="test-range">{result.range}</td>
                            <td>
                              <span className={`status-badge ${getStatusColor(result.status)}`}>
                                {result.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Vitals */}
                {record.vitals && (
                  <div className="vitals-grid">
                    {record.vitals.map((vital, idx) => (
                      <div key={idx} className="vital-item">
                        <div className="vital-metric">{vital.metric}</div>
                        <div className="vital-value-large">
                          {vital.value} <span className="vital-unit">{vital.unit}</span>
                        </div>
                        <span className={`status-badge ${getStatusColor(vital.status)}`}>
                          {vital.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {records && records.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No records found</h3>
          <p>Your medical records will appear here once available</p>
        </div>
      )}
    </section>
  )
}
