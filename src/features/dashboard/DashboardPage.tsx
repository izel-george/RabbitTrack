import { PageHeader } from '../../components/layout/PageHeader'
import { StatCard, Card } from '../../components/ui'
import { useDashboard } from './useDashboard'
import { ActiveKitGroupCard } from './components/ActiveKitGroupCard'
import { ClipboardList, HeartPulse } from 'lucide-react'

export function DashboardPage() {
  const { data } = useDashboard()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PageHeader title="Dashboard Overview" subtitle="Record births and manage your breeding cycles." />

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Total Rabbits" value={data.totals.rabbits} accent="purple" />
        <StatCard label="Does" value={data.totals.does} accent="pink" />
        <StatCard label="Bucks" value={data.totals.bucks} accent="blue" />
        <StatCard label="Herd" value={data.totals.herd} accent="green" />
      </div>

      <Card style={{ marginBottom: 28 }}>
        <div className="card-grid" style={{ gridTemplateColumns: '1fr', gap: 20 }}>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 12, flex: '1 1 240px' }}>
              <ClipboardList size={20} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>Breeding Information</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Track breeding records, hatch dates, and offspring to maintain a healthy pedigree
                  and genetic diversity across your herd.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flex: '1 1 240px' }}>
              <HeartPulse size={20} color="var(--accent-pink)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>Health Management</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Monitor weight and development. Keep detailed records to identify patterns
                  and ensure optimal care for every animal.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Active Kit Groups</h2>
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Automated age tracking</span>
      </div>

      <div className="card-grid">
        {data.activeKitGroups.map((g) => (
          <ActiveKitGroupCard
            key={g.litterId}
            label={g.label}
            damName={g.damName}
            totalKits={g.totalKits}
            ageLabel={g.ageLabel}
          />
        ))}
      </div>
    </div>
  )
}
