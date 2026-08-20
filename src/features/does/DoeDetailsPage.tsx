import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Badge, Button, Card } from '../../components/ui'
import { ArrowLeft, Edit3, CalendarClock } from 'lucide-react'
import { useDoeDetails } from './useDoes'
import { GestationCountdown } from './components/GestationCountdown'
import { MilestoneTimeline } from './components/MilestoneTimeline'
import { RecentActivityFeed } from './components/RecentActivityFeed'
import { EditDoeModal } from './components/EditDoeModal'
import { MatingPopup } from './components/MatingPopup'
import { LoadingScreen } from '../../components/ui/LoadingScreen'

export function DoeDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data, refetch } = useDoeDetails(id ?? '')
  // const { doe, activeLitter, recentActivity } = data ?? {}
  const [editOpen, setEditOpen] = useState(false)
  const [matingOpen, setMatingOpen] = useState(false)

  if (!data ) {
    return <LoadingScreen />
  }

  const { doe, activeLitter, recentActivity } = data

  return (
    <div>
      <Link
        to="/does"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13.5, marginBottom: 14, fontWeight: 600 }}
      >
        <ArrowLeft size={15} /> Back to Does
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600 }}>{doe.name} — Doe Details</h1>
        <Button variant="pink" onClick={() => setEditOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Edit3 size={14} /> Edit Info
        </Button>
      </div>

      <Card accent="pink" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
              background: 'var(--accent-pink-soft)', display: 'grid', placeItems: 'center', fontSize: 26,
            }}
          >
            ♥
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600 }}>{doe.name}</span>
              <Badge status={doe.status}>{doe.status}</Badge>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {doe.breedName} · {ageFromHatchDate(doe.hatchDate)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <MiniField label="Hatch Date" value={doe.hatchDate ?? '—'} />
            <MiniField label="Mating Date" value={doe.matingDate ?? '—'} />
            <MiniField label="Section" value={doe.sectionCode ?? '—'} />
            {activeLitter && (
              <button
                onClick={() => setMatingOpen(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: 'none', border: 'none', color: 'var(--accent-pink)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', paddingBottom: 2,
                }}
              >
                <CalendarClock size={13} /> Edit
              </button>
            )}
          </div>
        </div>
      </Card>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 20,
        }}
        className="doe-detail-grid"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <GestationCountdown
            expectedNestingDate={activeLitter?.expectedNestingDate}
            expectedBirthDate={activeLitter?.expectedBirthDate}
            expectedBirthDateLatest={activeLitter?.expectedBirthDateLatest}
            daysRemaining={daysUntil(activeLitter?.expectedNestingDate)}
          />
          <Card>
            <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14.5 }}>Metrics</div>
            <MiniField label="Current Weight" value={doe.currentWeightKg ? `${doe.currentWeightKg} kg` : '—'} block />
            <div style={{ height: 12 }} />
            <MiniField label="Total Kits" value={String(doe.currentKits ?? activeLitter?.totalKits ?? 0)} block />
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {activeLitter?.milestones && <MilestoneTimeline milestones={activeLitter.milestones} />}
          <RecentActivityFeed entries={recentActivity ?? []} />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .doe-detail-grid { grid-template-columns: 280px 1fr !important; }
        }
      `}</style>

      <EditDoeModal open={editOpen} onClose={() => setEditOpen(false)} doe={doe} onSaved={() => refetch()} />

      {activeLitter && (
        <MatingPopup
          open={matingOpen}
          onClose={() => setMatingOpen(false)}
          doeId={doe.id}
          existingLitterId={activeLitter.id}
          initialMatingDate={activeLitter.matingDate}
          initialSireId={activeLitter.sireId}
          onSaved={() => refetch()}
        />
      )}
    </div>
  )
}

function MiniField({ label, value, block }: { label: string; value: string; block?: boolean }) {
  return (
    <div style={{ display: block ? 'flex' : 'block', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: block ? 15 : 13.5, marginTop: block ? 0 : 3 }}>{value}</div>
    </div>
  )
}

function ageFromHatchDate(hatchDate?: string): string {
  if (!hatchDate) return 'Age unknown'
  const years = (Date.now() - new Date(hatchDate).getTime()) / (365.25 * 24 * 3600 * 1000)
  return `${years.toFixed(1)} Years Old`
}

function daysUntil(dateStr?: string): number | undefined {
  if (!dateStr) return undefined
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.max(0, Math.round(diff / (24 * 3600 * 1000)))
}
