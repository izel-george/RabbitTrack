import { useState } from 'react'
import { Card, Button } from '../../../components/ui'
import { PackageOpen, Users } from 'lucide-react'
import type { WeekReadyGroup } from '../../../types'
import { TransferToHerdModal } from './TransferToHerdModal'
import { useHerd } from '../useHerd'

export function WeekReadyGroupCard({ weekGroup }: { weekGroup: WeekReadyGroup }) {
  const [open, setOpen] = useState(false)
  const { refetch } = useHerd()

  return (
    <Card accent="pink">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{weekGroup.label}</div>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--accent-pink)' }}>{weekGroup.ageLabel}</span>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 8 }}>
        <Users size={13} /> {weekGroup.litters.length} doe{weekGroup.litters.length !== 1 ? 's' : ''}
      </div>

      <div style={{ marginBottom: 12 }}>
        {weekGroup.litters.map((l) => (
          <div key={l.litterId} style={{ display: 'flex', gap: 6, fontSize: 12, color: 'var(--text-tertiary)' }}>
            <PackageOpen size={11} style={{ marginTop: 2, flexShrink: 0 }} />
            <span>{l.damName} · {l.totalKits} kits</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 16 }}>
        {weekGroup.totalKits} kits total ({weekGroup.maleKits}M / {weekGroup.femaleKits}F)
      </div>

      <Button variant="pink" fullWidth onClick={() => setOpen(true)}>Transfer Week to Herd</Button>

      <TransferToHerdModal
        open={open}
        onClose={() => setOpen(false)}
        weekGroup={weekGroup}
        onSaved={() => refetch()}
      />
    </Card>
  )
}
