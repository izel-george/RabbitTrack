import { Link } from 'react-router-dom'
import { Card, Button } from '../../../components/ui'
import { Users } from 'lucide-react'

interface Props {
  label: string
  damName: string
  totalKits: number
  ageLabel: string
}

export function ActiveKitGroupCard({ label, damName, totalKits, ageLabel }: Props) {
  return (
    <Card accent="pink">
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div
          style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'var(--accent-pink-soft)', display: 'grid', placeItems: 'center',
          }}
        >
          <Users size={20} color="var(--accent-pink)" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14.5 }}>{label}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>
            Mother {damName} · {totalKits} Kits
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)',
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-pink)' }}>{ageLabel}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Current age
          </div>
        </div>
        {/* Transfers are grouped by birth week now (possibly several does) — that flow
            lives on the Herd screen rather than here, to avoid duplicating the week-merge
            logic in two places. */}
        <Link to="/herd">
          <Button variant="pink" style={{ padding: '9px 14px', fontSize: 13 }}>
            View in Herd
          </Button>
        </Link>
      </div>
    </Card>
  )
}
