import { Card } from '../../../components/ui'

interface Props {
  expectedNestingDate?: string
  expectedBirthDate?: string
  expectedBirthDateLatest?: string
  daysRemaining?: number
}

export function GestationCountdown({
  expectedNestingDate,
  expectedBirthDate,
  expectedBirthDateLatest,
  daysRemaining,
}: Props) {
  const birthWindow =
    expectedBirthDate && expectedBirthDateLatest
      ? `${expectedBirthDate} – ${expectedBirthDateLatest}`
      : 'N/A'

  return (
    <Card>
      <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14.5 }}>Gestation</div>
      <Row label="Expected Nesting" value={expectedNestingDate ?? 'N/A'} />
      <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
      <Row label="Expected Birth Window" value={birthWindow} />
      <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
      <Row label="Days Remaining" value={daysRemaining != null ? `${daysRemaining} Days` : '—'} emphasize />
    </Card>
  )
}

function Row({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ fontWeight: 700, fontSize: emphasize ? 18 : 14, color: emphasize ? 'var(--accent-purple)' : 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  )
}
