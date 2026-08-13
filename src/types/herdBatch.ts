export interface HerdBatchContributingLitter {
  litterId: string
  litterNumber?: string
  damName?: string
}

export interface HerdBatch {
  id: string
  label?: string
  weekStartDate: string
  weekEndDate: string
  maleCount: number
  femaleCount: number
  avgWeightKg?: number
  transferredAt: string
  contributingLitters: HerdBatchContributingLitter[]
}

export interface WeekReadyGroup {
  weekStart: string
  weekEnd: string
  label: string
  ageLabel: string
  totalKits: number
  maleKits: number
  femaleKits: number
  litters: Array<{ litterId: string; damName: string; totalKits: number }>
}
