export type ActivityType =
  | 'weight_check' | 'routine_checkup' | 'mating_event' | 'nest_box_added'
  | 'birth' | 'transfer' | 'health_note' | 'status_change' | 'sale'

export interface ActivityLogEntry {
  id: string
  activityType: ActivityType
  title: string
  description?: string
  occurredAt: string
  recordedByName?: string
}

export interface WeightLogEntry {
  id: string
  weightKg: number
  recordedAt: string
  recordedByName?: string
}
