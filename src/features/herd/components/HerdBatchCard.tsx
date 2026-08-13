import { useState } from 'react'
import { Card } from '../../../components/ui'
import { UserPlus } from 'lucide-react'
import type { HerdBatch } from '../../../types'
import { EditHerdBatchModal } from './EditHerdBatchModal'
import { PromoteToBreedingModal } from './PromoteToBreedingModal'
import { useHerd } from '../useHerd'

export function HerdBatchCard({ batch }: { batch: HerdBatch }) {
  const [editOpen, setEditOpen] = useState(false)
  const [promoteOpen, setPromoteOpen] = useState(false)
  const { refetch } = useHerd()

  const label = batch.label ?? `Batch #${batch.id}`
  const damNames = batch.contributingLitters.map((l) => l.damName).filter(Boolean).join(', ')

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{label}</div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
            {batch.contributingLitters.length > 1 ? `Merged from ${damNames}` : `Dam: ${damNames}`}
          </div>
        </div>
        <span
          style={{
            fontSize: 11.5, fontWeight: 600, padding: '3px 9px', borderRadius: 999,
            background: 'var(--success-soft)', color: 'var(--success)', textTransform: 'capitalize',
          }}
        >
          In Herd
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <MiniStat label="Total" value={batch.maleCount + batch.femaleCount} />
        <MiniStat label="Males" value={batch.maleCount} />
        <MiniStat label="Females" value={batch.femaleCount} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Avg Weight
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--accent-green)' }}>
            {batch.avgWeightKg?.toFixed(2) ?? '—'} kg
          </div>
        </div>
        <button
          onClick={() => setEditOpen(true)}
          style={{
            width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border-strong)',
            background: 'transparent', color: 'var(--text-secondary)', fontSize: 18, cursor: 'pointer',
          }}
        >
          ✎
        </button>
      </div>

      <button
        onClick={() => setPromoteOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)',
          border: '1px dashed var(--border-strong)', background: 'transparent',
          color: 'var(--accent-purple)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
        }}
      >
        <UserPlus size={13} /> Keep one for breeding
      </button>

      <EditHerdBatchModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        batch={batch}
        onSaved={() => refetch()}
      />
      <PromoteToBreedingModal
        open={promoteOpen}
        onClose={() => setPromoteOpen(false)}
        source={{ type: 'batch', batchId: batch.id }}
        groupLabel={label}
        onSaved={() => refetch()}
      />
    </Card>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        flex: 1, textAlign: 'center', background: 'var(--surface-hover)',
        borderRadius: 10, padding: '8px 4px',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15 }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
        {label}
      </div>
    </div>
  )
}
