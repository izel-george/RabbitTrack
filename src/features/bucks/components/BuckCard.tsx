import { useState } from 'react'
import { Card, Badge, Button } from '../../../components/ui'
import { Rabbit as RabbitIcon, Edit3 } from 'lucide-react'
import type { Rabbit } from '../../../types'
import { EditBuckModal } from '../EditBuckModal'
import { useBucks } from '../useBucks'

export function BuckCard({ buck }: { buck: Rabbit }) {
  const [editOpen, setEditOpen] = useState(false)
  const { refetch } = useBucks()

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--accent-blue-soft)', display: 'grid', placeItems: 'center',
            }}
          >
            <RabbitIcon size={17} color="var(--accent-blue)" />
          </div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{buck.name}</div>
        </div>
        <Badge status={buck.status}>{buck.status}</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '18px 0', fontSize: 13 }}>
        <Field label="Breed" value={buck.breedName ?? '—'} />
        <Field label="Weight" value={buck.currentWeightKg ? `${buck.currentWeightKg} kg` : '—'} />
        <Field label="Section" value={buck.sectionCode ?? '—'} />
        <Field label="Hatch Date" value={buck.hatchDate ?? '—'} />
      </div>

      <Button
        variant="secondary"
        fullWidth
        onClick={() => setEditOpen(true)}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
      >
        <Edit3 size={14} /> Edit Info
      </Button>

      <EditBuckModal open={editOpen} onClose={() => setEditOpen(false)} buck={buck} onSaved={() => refetch()} />
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
