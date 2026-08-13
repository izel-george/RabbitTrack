import { useState } from 'react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Button, Card } from '../../components/ui'
import { useDoes } from './useDoes'
import { DoeCard } from './components/DoeCard'
import { AddDoeModal } from './components/AddDoeModal'

const filters = ['All Does', 'Pregnant', 'Nursing', 'Resting'] as const

export function DoesListPage() {
  const { data: does, refetch } = useDoes()
  const [filter, setFilter] = useState<typeof filters[number]>('All Does')
  const [addOpen, setAddOpen] = useState(false)

  if (!does) {
    return <div>Loading...</div>
  }

  const filtered = does.filter((d) => {
    if (filter === 'All Does') return true
    return d.status === filter.toLowerCase()
  })
  
  if (!does) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PageHeader
        title="Does"
        subtitle="Manage your female breeding rabbits and their performance."
        action={<Button onClick={() => setAddOpen(true)}>+ Add Doe</Button>}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '7px 14px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              border: `1px solid ${filter === f ? 'var(--accent-purple)' : 'var(--border)'}`,
              background: filter === f ? 'var(--accent-purple-soft)' : 'transparent',
              color: filter === f ? 'var(--accent-purple)' : 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card-grid" style={{ marginBottom: 24 }}>
        {filtered.map((doe) => (
          <DoeCard key={doe.id} doe={doe} />
        ))}
      </div>

      <Card accent="purple">
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Doe Breeding Efficiency</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 14 }}>
          Your current average kit survival rate across the herd.
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600 }}>92%</span>
          <span style={{ fontSize: 12.5, color: 'var(--success)', fontWeight: 600 }}>+4% vs last month</span>
        </div>
      </Card>

      <AddDoeModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={() => refetch()} />
    </div>
  )
}
