import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
      }}
    >
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 600 }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
