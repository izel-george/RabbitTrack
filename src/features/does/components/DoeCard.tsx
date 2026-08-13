import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from '../../../components/ui'
import { MapPin, Heart } from 'lucide-react'
import type { Doe } from '../../../types'
import { MatingPopup } from './MatingPopup'
import { RecordBirthModal } from './RecordBirthModal'
import { useDoes } from '../useDoes'

export function DoeCard({ doe }: { doe: Doe }) {
  const [matingOpen, setMatingOpen] = useState(false)
  const [birthOpen, setBirthOpen] = useState(false)
  const { refetch } = useDoes()

  const canRecordBirth = doe.status === 'pregnant' && doe.currentLitterId
  const primaryAction =
    doe.status === 'pregnant'
      ? { label: 'Record Birth', variant: 'primary' as const, onClick: () => setBirthOpen(true) }
      : { label: 'Record Mating', variant: 'secondary' as const, onClick: () => setMatingOpen(true) }

  const expectedBirthWindow =
    doe.expectedBirthDate && doe.expectedBirthDateLatest
      ? `${doe.expectedBirthDate} – ${doe.expectedBirthDateLatest}`
      : 'N/A'

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--accent-pink-soft)', display: 'grid', placeItems: 'center',
            }}
          >
            <MapPin size={17} color="var(--accent-pink)" />
          </div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{doe.name}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Heart size={16} color="var(--text-tertiary)" />
          <Badge status={doe.status}>{doe.status}</Badge>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '18px 0', fontSize: 13 }}>
        <Field label="Mating Date" value={doe.matingDate ?? 'N/A'} />
        <Field label="Weight" value={doe.currentWeightKg ? `${doe.currentWeightKg} kg` : '—'} />
        <Field label="Expected Birth" value={expectedBirthWindow} />
        <Field label="Current Kits" value={doe.currentKits ? `${doe.currentKits} Active` : '0'} />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          variant={primaryAction.variant}
          onClick={primaryAction.onClick}
          disabled={doe.status === 'pregnant' && !canRecordBirth}
          style={{ flex: 1 }}
        >
          {primaryAction.label}
        </Button>
        <Link to={`/does/${doe.id}`} style={{ flex: 1 }}>
          <Button variant="pink" fullWidth>View Details</Button>
        </Link>
      </div>

      <MatingPopup
        open={matingOpen}
        onClose={() => setMatingOpen(false)}
        doeId={doe.id}
        onSaved={() => refetch()}
      />
      {doe.currentLitterId && (
        <RecordBirthModal
          open={birthOpen}
          onClose={() => setBirthOpen(false)}
          litterId={doe.currentLitterId}
          onSaved={() => refetch()}
        />
      )}
    </Card>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ color: 'var(--text-tertiary)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </div>
      <div style={{ fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  )
}
