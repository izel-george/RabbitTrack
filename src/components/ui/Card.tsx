import type { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  accent?: 'purple' | 'pink' | 'green' | 'blue' | 'none'
  style?: CSSProperties
  className?: string
}

const accentColor: Record<string, string> = {
  purple: 'var(--accent-purple)',
  pink: 'var(--accent-pink)',
  green: 'var(--accent-green)',
  blue: 'var(--accent-blue)',
  none: 'transparent',
}

export function Card({ children, accent = 'none', style, className }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderTop: accent !== 'none' ? `3px solid ${accentColor[accent]}` : '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        boxShadow: 'var(--shadow-card)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
