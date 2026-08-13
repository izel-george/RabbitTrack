import { useState, type CSSProperties } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  value?: string // 'YYYY-MM-DD'
  onChange: (date: string) => void
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function Calendar({ value, onChange }: CalendarProps) {
  const selected = value ? new Date(value + 'T00:00:00') : null
  const [viewDate, setViewDate] = useState(selected ?? new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startWeekday = firstOfMonth.getDay()

  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          style={navButtonStyle}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontWeight: 600, fontSize: 14 }}>{monthLabel}</span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          style={navButtonStyle}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
        {WEEKDAYS.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />
          const cellDate = new Date(year, month, day)
          const iso = toISODate(cellDate)
          const isSelected = value === iso
          const isToday = toISODate(new Date()) === iso

          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(iso)}
              style={{
                aspectRatio: '1',
                borderRadius: 8,
                border: isToday && !isSelected ? '1px solid var(--accent-purple)' : '1px solid transparent',
                background: isSelected ? 'var(--accent-purple)' : 'transparent',
                color: isSelected ? '#180f2e' : 'var(--text-primary)',
                fontSize: 13,
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
              }}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const navButtonStyle: CSSProperties = {
  width: 28, height: 28, borderRadius: 8, border: 'none',
  background: 'var(--surface-hover)', color: 'var(--text-secondary)',
  display: 'grid', placeItems: 'center', cursor: 'pointer',
}
