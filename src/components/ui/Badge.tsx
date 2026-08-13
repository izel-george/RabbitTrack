import type { ReactNode } from 'react'

type Tone = 'purple' | 'pink' | 'blue' | 'green' | 'neutral'

const toneStyle: Record<Tone, { bg: string; color: string }> = {
  purple: { bg: 'var(--accent-purple-soft)', color: 'var(--accent-purple)' },
  pink: { bg: 'var(--accent-pink-soft)', color: 'var(--accent-pink)' },
  blue: { bg: 'var(--accent-blue-soft)', color: 'var(--accent-blue)' },
  green: { bg: 'var(--success-soft)', color: 'var(--success)' },
  neutral: { bg: 'var(--surface-hover)', color: 'var(--text-secondary)' },
}

const statusTone: Record<string, Tone> = {
  active: 'green', pregnant: 'pink', nursing: 'purple', resting: 'neutral',
  growing: 'blue', ready_for_herd: 'blue',
  for_sale: 'purple', sold: 'neutral', transferred: 'neutral', deceased: 'neutral',
}

export function Badge({ status, children }: { status?: string; children: ReactNode }) {
  const tone = status ? statusTone[status] ?? 'neutral' : 'neutral'
  const s = toneStyle[tone]
  return (
    <span
      style={{
        display: 'inline-block',
        background: s.bg,
        color: s.color,
        fontSize: 12,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 999,
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
