import { useState } from 'react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui'
import { useBucks } from './useBucks'
import { BuckCard } from './components/BuckCard'
import { AddBuckModal } from './components/AddBuckModal'

export function BucksListPage() {
  const { data: bucks, refetch } = useBucks()
  const [addOpen, setAddOpen] = useState(false)

  if (!bucks) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PageHeader
        title="Bucks"
        subtitle="Manage your male breeding rabbits."
        action={<Button onClick={() => setAddOpen(true)}>+ Add Buck</Button>}
      />

      <div className="card-grid">
        {bucks.map((buck) => (
          <BuckCard key={buck.id} buck={buck} />
        ))}
      </div>

      <AddBuckModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={() => refetch()} />
    </div>
  )
}
