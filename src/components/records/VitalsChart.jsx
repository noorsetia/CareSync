/**
 * VitalsChart - Lazy-loaded vitals visualization component
 * 
 * This component is lazy-loaded for performance optimization
 * Simple bar chart visualization for vitals data
 */
export default function VitalsChart({ records }) {
  if (!records || records.length === 0) {
    return (
      <div className="chart-empty">
        <p>No vitals data available for charting</p>
      </div>
    )
  }

  // Extract vitals data for charting
  const chartData = records.flatMap(record => 
    record.vitals?.map(vital => ({
      date: record.date,
      metric: vital.metric,
      value: parseFloat(vital.value),
      unit: vital.unit,
      status: vital.status
    })) || []
  )

  // Group by metric
  const groupedData = chartData.reduce((acc, item) => {
    if (!acc[item.metric]) {
      acc[item.metric] = []
    }
    acc[item.metric].push(item)
    return acc
  }, {})

  return (
    <div className="vitals-chart-container">
      <h3 className="chart-title">Vitals Trend Analysis</h3>
      <p className="chart-subtitle">Visual representation of your recent vital measurements</p>
      
      <div className="chart-grid">
        {Object.entries(groupedData).map(([metric, values]) => (
          <div key={metric} className="chart-card">
            <h4 className="chart-metric-title">{metric}</h4>
            
            <div className="simple-bar-chart">
              {values.map((val, idx) => {
                // Simple normalization for visualization (0-100 scale)
                const normalized = Math.min(100, (parseFloat(val.value) / 200) * 100)
                
                return (
                  <div key={idx} className="bar-container">
                    <div className="bar-label">
                      {new Date(val.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="bar-wrapper">
                      <div 
                        className={`bar ${val.status}`}
                        style={{ height: `${normalized}%` }}
                        role="img"
                        aria-label={`${val.value} ${val.unit} on ${val.date}`}
                      >
                        <span className="bar-value">{val.value}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="chart-legend">
              <span className="legend-unit">{values[0]?.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-footer">
        <p className="chart-note">
          💡 <strong>Note:</strong> This is a simplified visualization. Consult with your healthcare provider for detailed analysis.
        </p>
      </div>
    </div>
  )
}
