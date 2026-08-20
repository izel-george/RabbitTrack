import { PageHeader } from '../../components/layout/PageHeader'
import { StatCard } from '../../components/ui'
import { useHerd } from './useHerd'
import { HerdBatchCard } from './components/HerdBatchCard'
import { WeekReadyGroupCard } from './components/WeekReadyGroupCard'
import {LoadingScreen} from '../../components/ui/LoadingScreen'

export function HerdPage() {
  const { data } = useHerd()

  if (!data) {
    return <LoadingScreen />
  }

  return (
    <div>
      <PageHeader
        title="Herd Management"
        subtitle="Organize and monitor your herd rabbits by developmental groups."
      />

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 28 }}>
        <StatCard label="Total Herd Size" value={data.totalHerdSize} accent="green" />
        <StatCard label="Active Groups" value={data.activeGroups} sublabel="Batches in herd" accent="pink" />
        <StatCard label="Due for Herd" value={data.dueForHerd} sublabel="Kits ready for transfer" accent="blue" />
      </div>

      {data.kitsReadyForTransfer.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>🎁 Kits Ready for Transfer</h2>
          <div className="card-grid" style={{ marginBottom: 32 }}>
            {data.kitsReadyForTransfer.map((wg) => (
              <WeekReadyGroupCard key={wg.weekStart} weekGroup={wg} />
            ))}
          </div>
        </>
      )}

      {data.ageGroups.map((group) => (
        <div key={group.ageLabel} style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>{group.ageLabel}</h2>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Expected {group.expectedWeightRange}</span>
          </div>
          <div className="card-grid">
            {group.batches.map((batch) => (
              <HerdBatchCard key={batch.id} batch={batch} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
