import { Card } from '../../../components/ui'
import { Scale, Stethoscope, Heart, PawPrint } from 'lucide-react'
import type { ActivityLogEntry } from '../../../types'

const icons: Record<string, typeof Scale> = {
  weight_check: Scale,
  routine_checkup: Stethoscope,
  mating_event: Heart,
  nest_box_added: PawPrint,
}

export function RecentActivityFeed({ entries }: { entries: ActivityLogEntry[] }) {
  return (
    <Card>
      <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 16 }}>Recent Activity</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {entries.map((e) => {
          const Icon = icons[e.activityType] ?? Stethoscope
          return (
            <div key={e.id} style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  background: 'var(--accent-blue-soft)', display: 'grid', placeItems: 'center',
                }}
              >
                <Icon size={15} color="var(--accent-blue)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>{e.title}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{e.occurredAt}</span>
                </div>
                {e.description && (
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3, lineHeight: 1.5 }}>
                    {e.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
