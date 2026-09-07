import { useState } from 'react'

/**
 * Mock historical vitals data for 7 Days, 30 Days, and 3 Months
 */
const MOCK_VITALS_HISTORY = {
  '7d': [
    {
      id: 'bp',
      title: 'Blood Pressure',
      icon: '🩸',
      latest: '120/80',
      unit: 'mmHg',
      trend: 'Stable',
      trendType: 'normal',
      minY: 110,
      maxY: 130,
      points: [
        { date: 'Feb 24', value: 122, display: '122/81 mmHg' },
        { date: 'Feb 25', value: 121, display: '121/80 mmHg' },
        { date: 'Feb 26', value: 119, display: '119/78 mmHg' },
        { date: 'Feb 27', value: 120, display: '120/80 mmHg' },
        { date: 'Feb 28', value: 118, display: '118/79 mmHg' },
        { date: 'Mar 01', value: 121, display: '121/81 mmHg' },
        { date: 'Mar 02', value: 120, display: '120/80 mmHg' },
      ]
    },
    {
      id: 'hr',
      title: 'Heart Rate',
      icon: '❤️',
      latest: '72',
      unit: 'bpm',
      trend: 'Normal',
      trendType: 'normal',
      minY: 60,
      maxY: 90,
      points: [
        { date: 'Feb 24', value: 75, display: '75 bpm' },
        { date: 'Feb 25', value: 74, display: '74 bpm' },
        { date: 'Feb 26', value: 71, display: '71 bpm' },
        { date: 'Feb 27', value: 73, display: '73 bpm' },
        { date: 'Feb 28', value: 70, display: '70 bpm' },
        { date: 'Mar 01', value: 74, display: '74 bpm' },
        { date: 'Mar 02', value: 72, display: '72 bpm' },
      ]
    },
    {
      id: 'temp',
      title: 'Temperature',
      icon: '🌡️',
      latest: '98.6',
      unit: '°F',
      trend: 'Stable',
      trendType: 'normal',
      minY: 97.0,
      maxY: 100.0,
      points: [
        { date: 'Feb 24', value: 98.4, display: '98.4 °F' },
        { date: 'Feb 25', value: 98.6, display: '98.6 °F' },
        { date: 'Feb 26', value: 98.3, display: '98.3 °F' },
        { date: 'Feb 27', value: 98.7, display: '98.7 °F' },
        { date: 'Feb 28', value: 98.5, display: '98.5 °F' },
        { date: 'Mar 01', value: 98.4, display: '98.4 °F' },
        { date: 'Mar 02', value: 98.6, display: '98.6 °F' },
      ]
    },
    {
      id: 'spo2',
      title: 'Oxygen Saturation',
      icon: '🫁',
      latest: '99',
      unit: '%',
      trend: 'Improving',
      trendType: 'improving',
      minY: 94,
      maxY: 100,
      points: [
        { date: 'Feb 24', value: 97, display: '97%' },
        { date: 'Feb 25', value: 98, display: '98%' },
        { date: 'Feb 26', value: 98, display: '98%' },
        { date: 'Feb 27', value: 97, display: '97%' },
        { date: 'Feb 28', value: 99, display: '99%' },
        { date: 'Mar 01', value: 98, display: '98%' },
        { date: 'Mar 02', value: 99, display: '99%' },
      ]
    }
  ],
  '30d': [
    {
      id: 'bp',
      title: 'Blood Pressure',
      icon: '🩸',
      latest: '120/80',
      unit: 'mmHg',
      trend: 'Improving',
      trendType: 'improving',
      minY: 110,
      maxY: 130,
      points: [
        { date: 'Feb 01', value: 125, display: '125/83 mmHg' },
        { date: 'Feb 05', value: 124, display: '124/82 mmHg' },
        { date: 'Feb 09', value: 122, display: '122/81 mmHg' },
        { date: 'Feb 13', value: 123, display: '123/81 mmHg' },
        { date: 'Feb 17', value: 121, display: '121/80 mmHg' },
        { date: 'Feb 21', value: 119, display: '119/79 mmHg' },
        { date: 'Feb 25', value: 120, display: '120/80 mmHg' },
        { date: 'Mar 02', value: 120, display: '120/80 mmHg' },
      ]
    },
    {
      id: 'hr',
      title: 'Heart Rate',
      icon: '❤️',
      latest: '72',
      unit: 'bpm',
      trend: 'Stable',
      trendType: 'normal',
      minY: 60,
      maxY: 90,
      points: [
        { date: 'Feb 01', value: 78, display: '78 bpm' },
        { date: 'Feb 05', value: 76, display: '76 bpm' },
        { date: 'Feb 09', value: 75, display: '75 bpm' },
        { date: 'Feb 13', value: 73, display: '73 bpm' },
        { date: 'Feb 17', value: 74, display: '74 bpm' },
        { date: 'Feb 21', value: 71, display: '71 bpm' },
        { date: 'Feb 25', value: 73, display: '73 bpm' },
        { date: 'Mar 02', value: 72, display: '72 bpm' },
      ]
    },
    {
      id: 'temp',
      title: 'Temperature',
      icon: '🌡️',
      latest: '98.6',
      unit: '°F',
      trend: 'Stable',
      trendType: 'normal',
      minY: 97.0,
      maxY: 100.0,
      points: [
        { date: 'Feb 01', value: 98.5, display: '98.5 °F' },
        { date: 'Feb 05', value: 98.7, display: '98.7 °F' },
        { date: 'Feb 09', value: 98.4, display: '98.4 °F' },
        { date: 'Feb 13', value: 98.6, display: '98.6 °F' },
        { date: 'Feb 17', value: 98.3, display: '98.3 °F' },
        { date: 'Feb 21', value: 98.8, display: '98.8 °F' },
        { date: 'Feb 25', value: 98.5, display: '98.5 °F' },
        { date: 'Mar 02', value: 98.6, display: '98.6 °F' },
      ]
    },
    {
      id: 'spo2',
      title: 'Oxygen Saturation',
      icon: '🫁',
      latest: '99',
      unit: '%',
      trend: 'Stable',
      trendType: 'normal',
      minY: 94,
      maxY: 100,
      points: [
        { date: 'Feb 01', value: 97, display: '97%' },
        { date: 'Feb 05', value: 98, display: '98%' },
        { date: 'Feb 09', value: 97, display: '97%' },
        { date: 'Feb 13', value: 99, display: '99%' },
        { date: 'Feb 17', value: 98, display: '98%' },
        { date: 'Feb 21', value: 98, display: '98%' },
        { date: 'Feb 25', value: 99, display: '99%' },
        { date: 'Mar 02', value: 99, display: '99%' },
      ]
    }
  ],
  '3m': [
    {
      id: 'bp',
      title: 'Blood Pressure',
      icon: '🩸',
      latest: '120/80',
      unit: 'mmHg',
      trend: 'Improving',
      trendType: 'improving',
      minY: 110,
      maxY: 135,
      points: [
        { date: 'Dec 15', value: 128, display: '128/85 mmHg' },
        { date: 'Jan 01', value: 126, display: '126/84 mmHg' },
        { date: 'Jan 15', value: 124, display: '124/82 mmHg' },
        { date: 'Feb 01', value: 123, display: '123/81 mmHg' },
        { date: 'Feb 15', value: 121, display: '121/80 mmHg' },
        { date: 'Mar 02', value: 120, display: '120/80 mmHg' },
      ]
    },
    {
      id: 'hr',
      title: 'Heart Rate',
      icon: '❤️',
      latest: '72',
      unit: 'bpm',
      trend: 'Slight Increase',
      trendType: 'info',
      minY: 60,
      maxY: 90,
      points: [
        { date: 'Dec 15', value: 68, display: '68 bpm' },
        { date: 'Jan 01', value: 70, display: '70 bpm' },
        { date: 'Jan 15', value: 71, display: '71 bpm' },
        { date: 'Feb 01', value: 73, display: '73 bpm' },
        { date: 'Feb 15', value: 75, display: '75 bpm' },
        { date: 'Mar 02', value: 72, display: '72 bpm' },
      ]
    },
    {
      id: 'temp',
      title: 'Temperature',
      icon: '🌡️',
      latest: '98.6',
      unit: '°F',
      trend: 'Stable',
      trendType: 'normal',
      minY: 97.0,
      maxY: 100.0,
      points: [
        { date: 'Dec 15', value: 98.6, display: '98.6 °F' },
        { date: 'Jan 01', value: 98.4, display: '98.4 °F' },
        { date: 'Jan 15', value: 98.7, display: '98.7 °F' },
        { date: 'Feb 01', value: 98.5, display: '98.5 °F' },
        { date: 'Feb 15', value: 98.6, display: '98.6 °F' },
        { date: 'Mar 02', value: 98.6, display: '98.6 °F' },
      ]
    },
    {
      id: 'spo2',
      title: 'Oxygen Saturation',
      icon: '🫁',
      latest: '99',
      unit: '%',
      trend: 'Stable',
      trendType: 'normal',
      minY: 94,
      maxY: 100,
      points: [
        { date: 'Dec 15', value: 98, display: '98%' },
        { date: 'Jan 01', value: 98, display: '98%' },
        { date: 'Jan 15', value: 99, display: '99%' },
        { date: 'Feb 01', value: 97, display: '97%' },
        { date: 'Feb 15', value: 99, display: '99%' },
        { date: 'Mar 02', value: 99, display: '99%' },
      ]
    }
  ]
}

/**
 * Reusable SVG Line Chart component for vitals data points
 */
function VitalsLineChart({ metricData }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const { points, minY, maxY } = metricData
  const width = 420
  const height = 160
  const padLeft = 40
  const padRight = 20
  const padTop = 20
  const padBottom = 30

  const chartW = width - padLeft - padRight
  const chartH = height - padTop - padBottom

  // Coordinates mapping
  const coords = points.map((p, idx) => {
    const x = padLeft + (idx / Math.max(1, points.length - 1)) * chartW
    const ratio = (p.value - minY) / (maxY - minY || 1)
    const y = padTop + chartH - Math.max(0, Math.min(1, ratio)) * chartH
    return { x, y, point: p }
  })

  // SVG Path String
  const pathD = coords.reduce((acc, c, idx) => {
    return idx === 0 ? `M ${c.x},${c.y}` : `${acc} L ${c.x},${c.y}`
  }, '')

  // Area Path String under line
  const areaD = coords.length > 0
    ? `${pathD} L ${coords[coords.length - 1].x},${padTop + chartH} L ${coords[0].x},${padTop + chartH} Z`
    : ''

  // Grid Ticks (3 lines: Min, Mid, Max)
  const midYVal = (minY + maxY) / 2
  const ticks = [
    { label: maxY.toString(), y: padTop },
    { label: Number.isInteger(midYVal) ? midYVal.toString() : midYVal.toFixed(1), y: padTop + chartH / 2 },
    { label: minY.toString(), y: padTop + chartH }
  ]

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        {/* Horizontal Gridlines & Axis Ticks */}
        {ticks.map((t, idx) => (
          <g key={idx}>
            <line
              x1={padLeft}
              y1={t.y}
              x2={width - padRight}
              y2={t.y}
              stroke="var(--gray-200, #e2e8f0)"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <text
              x={padLeft - 8}
              y={t.y + 4}
              fill="var(--gray-500, #64748b)"
              fontSize="11"
              fontWeight="500"
              textAnchor="end"
            >
              {t.label}
            </text>
          </g>
        ))}

        {/* X-axis Line */}
        <line
          x1={padLeft}
          y1={padTop + chartH}
          x2={width - padRight}
          y2={padTop + chartH}
          stroke="var(--gray-300, #cbd5e1)"
          strokeWidth="1.5"
        />

        {/* Gradient Fill under line */}
        {areaD && (
          <path
            d={areaD}
            fill="rgba(124, 58, 237, 0.08)"
            style={{ transition: 'd 0.3s ease' }}
          />
        )}

        {/* Trend Line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="var(--primary, #7c3aed)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'd 0.3s ease' }}
          />
        )}

        {/* X-axis Date Labels */}
        {coords.map((c, idx) => (
          <text
            key={idx}
            x={c.x}
            y={height - 6}
            fill="var(--gray-600, #475569)"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            {c.point.date}
          </text>
        ))}

        {/* Data Circles & Hover Target */}
        {coords.map((c, idx) => {
          const isHovered = hoveredIndex === idx
          return (
            <g 
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse effect on hover */}
              {isHovered && (
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="9"
                  fill="rgba(124, 58, 237, 0.25)"
                />
              )}
              <circle
                cx={c.x}
                cy={c.y}
                r={isHovered ? "5.5" : "4"}
                fill="var(--white, #ffffff)"
                stroke="var(--primary, #7c3aed)"
                strokeWidth={isHovered ? "3" : "2.5"}
                style={{ transition: 'all 0.2s ease' }}
              />
            </g>
          )
        })}

        {/* SVG Tooltip Box on Point Hover */}
        {hoveredIndex !== null && coords[hoveredIndex] && (
          <g transform={`translate(${Math.min(Math.max(coords[hoveredIndex].x, 60), width - 60)}, ${Math.max(coords[hoveredIndex].y - 35, 20)})`}>
            {/* Tooltip Background Card */}
            <rect
              x="-55"
              y="-18"
              width="110"
              height="28"
              rx="6"
              fill="var(--gray-900, #0f172a)"
              opacity="0.92"
            />
            {/* Tooltip Text */}
            <text
              x="0"
              y="-1"
              fill="#ffffff"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
            >
              {coords[hoveredIndex].point.date}: {coords[hoveredIndex].point.display}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

/**
 * VitalsChart - Component displaying visual health trend charts
 */
export default function VitalsChart() {
  const [timeRange, setTimeRange] = useState('7d') // '7d' | '30d' | '3m'

  const activeVitals = MOCK_VITALS_HISTORY[timeRange] || MOCK_VITALS_HISTORY['7d']

  const getTrendBadgeStyle = (type) => {
    switch (type) {
      case 'improving':
        return {
          background: '#dcfce7',
          color: '#15803d',
          border: '1px solid #86efac'
        }
      case 'info':
        return {
          background: '#fef3c7',
          color: '#b45309',
          border: '1px solid #fde68a'
        }
      case 'normal':
      default:
        return {
          background: '#f1f5f9',
          color: '#334155',
          border: '1px solid #cbd5e1'
        }
    }
  }

  const getTrendIcon = (type, text) => {
    if (type === 'improving') return '📈'
    if (type === 'info') return '↗️'
    if (text.toLowerCase().includes('stable')) return '🟢'
    return '🟢'
  }

  return (
    <div className="vitals-chart-container" style={{
      background: 'var(--white, #ffffff)',
      border: '1px solid var(--gray-200, #e2e8f0)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header Bar with Time Range Filter */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--gray-200, #e2e8f0)'
      }}>
        <div>
          <h3 className="chart-title" style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--gray-900, #0f172a)',
            margin: '0 0 0.25rem 0'
          }}>
            Vitals Trend Analysis
          </h3>
          <p className="chart-subtitle" style={{
            fontSize: '0.9rem',
            color: 'var(--gray-600, #64748b)',
            margin: 0
          }}>
            Visual representation of your vital measurements over time
          </p>
        </div>

        {/* Time-Range Selector Controls */}
        <div role="group" aria-label="Time range selector" style={{
          display: 'inline-flex',
          background: 'var(--gray-100, #f1f5f9)',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid var(--gray-200, #e2e8f0)'
        }}>
          <button
            type="button"
            onClick={() => setTimeRange('7d')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '7px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: timeRange === '7d' ? 'var(--white, #ffffff)' : 'transparent',
              color: timeRange === '7d' ? 'var(--primary, #7c3aed)' : 'var(--gray-600, #64748b)',
              boxShadow: timeRange === '7d' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            7 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('30d')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '7px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: timeRange === '30d' ? 'var(--white, #ffffff)' : 'transparent',
              color: timeRange === '30d' ? 'var(--primary, #7c3aed)' : 'var(--gray-600, #64748b)',
              boxShadow: timeRange === '30d' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            30 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('3m')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '7px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: timeRange === '3m' ? 'var(--white, #ffffff)' : 'transparent',
              color: timeRange === '3m' ? 'var(--primary, #7c3aed)' : 'var(--gray-600, #64748b)',
              boxShadow: timeRange === '3m' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            3 Months
          </button>
        </div>
      </div>

      {/* 4 Chart Cards Grid */}
      <div className="vitals-chart-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        {activeVitals.map(vital => {
          const badgeStyle = getTrendBadgeStyle(vital.trendType)
          const trendIcon = getTrendIcon(vital.trendType, vital.trend)

          return (
            <div 
              key={vital.id} 
              className="chart-card"
              style={{
                background: 'var(--gray-50, #f8fafc)',
                border: '1px solid var(--gray-200, #e2e8f0)',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Card Top: Metric Title, Trend Badge & Prominent Latest Value */}
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{vital.icon}</span>
                    <h4 style={{
                      margin: 0,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--gray-800, #1e293b)'
                    }}>
                      {vital.title}
                    </h4>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    ...badgeStyle
                  }}>
                    <span>{trendIcon}</span> {vital.trend}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    color: 'var(--gray-900, #0f172a)'
                  }}>
                    {vital.latest}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--gray-500, #64748b)'
                  }}>
                    {vital.unit}
                  </span>
                </div>
              </div>

              {/* Line Chart Visualization */}
              <div style={{ marginTop: 'auto' }}>
                <VitalsLineChart metricData={vital} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Footer Disclaimer */}
      <div className="chart-footer" style={{
        marginTop: '1.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--gray-200, #e2e8f0)',
        fontSize: '0.85rem',
        color: 'var(--gray-600, #64748b)',
        textAlign: 'center'
      }}>
        <p className="chart-note" style={{ margin: 0 }}>
          💡 <strong>Note:</strong> This is a simplified visualization. Consult your healthcare provider for detailed analysis.
        </p>
      </div>
    </div>
  )
}
