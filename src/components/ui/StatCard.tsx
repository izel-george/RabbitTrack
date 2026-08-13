import { Card } from './Card'

interface StatCardProps {
  label: string
  value: string | number
  sublabel?: string
  accent?: 'purple' | 'pink' | 'green' | 'blue' | 'none'
}

export function StatCard({ label, value, sublabel, accent = 'none' }: StatCardProps) {
  return (
    <Card accent={accent} style={{ padding: 18 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, marginTop: 6, color: 'var(--text-primary)' }}>
        {value}
      </div>
      {sublabel && (
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{sublabel}</div>
      )}
    </Card>
  )
}
