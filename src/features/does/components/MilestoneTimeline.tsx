import { Card } from '../../../components/ui'
import type { LitterMilestone } from '../../../types'

const dayOffsets: Record<string, number> = { birth: 0, eyes_open: 10, eating_solids: 21, ready_for_herd: 45 }
const labels: Record<string, string> = { birth: 'Birth', eyes_open: 'Eyes Open', eating_solids: 'Eating Solids', ready_for_herd: 'Ready for Herd' }

export function MilestoneTimeline({ milestones }: { milestones: LitterMilestone[] }) {
  const completedCount = milestones.filter((m) => m.completed).length
  const progressPct = milestones.length > 1 ? (completedCount - 1) / (milestones.length - 1) * 100 : 0

  return (
    <Card>
      <div style={{ fontWeight: 600, marginBottom: 22, fontSize: 14.5 }}>Litter Progression Timeline</div>
      <div style={{ position: 'relative', paddingTop: 6 }}>
        <div style={{ position: 'absolute', top: 15, left: 15, right: 15, height: 2, background: 'var(--border)' }} />
        <div
          style={{
            position: 'absolute', top: 15, left: 15, height: 2,
            width: `calc(${Math.max(progressPct, 0)}% - ${progressPct > 0 ? 30 * (progressPct / 100) : 0}px)`,
            background: 'var(--accent-pink)',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {milestones.map((m) => (
            <div key={m.milestone} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 30 }}>
              <div
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: m.completed ? 'var(--accent-pink)' : 'var(--surface)',
                  border: `2px solid ${m.completed ? 'var(--accent-pink)' : 'var(--border-strong)'}`,
                  display: 'grid', placeItems: 'center', fontSize: 13, flexShrink: 0,
                }}
              >
                {m.completed && <span style={{ color: '#1a0610' }}>✓</span>}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: m.completed ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                  {labels[m.milestone]}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 1 }}>Day {dayOffsets[m.milestone]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
