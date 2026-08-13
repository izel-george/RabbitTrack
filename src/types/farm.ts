export type FarmRole = 'admin' | 'user'

export interface Farm {
  id: string
  name: string
  code: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface FarmUserSummary {
  userId: string
  name: string
  email: string
  role: FarmRole
  joinedAt?: string
  activityCount: number
  lastActiveAt?: string
}

export interface PendingInvite {
  id: string
  email: string
  role: FarmRole
  expiresAt: string
  expired: boolean
  createdAt: string
}

export interface DashboardData {
  totals: { rabbits: number; does: number; bucks: number; herd: number; kits: number }
  activeKitGroups: Array<{
    litterId: string
    label: string
    damName: string
    totalKits: number
    bornAt: string
    ageLabel: string
  }>
}

export interface HerdData {
  totalHerdSize: number
  activeGroups: number
  dueForHerd: number
  kitsReadyForTransfer: import('./herdBatch').WeekReadyGroup[]
  ageGroups: Array<{
    ageLabel: string
    expectedWeightRange: string
    batches: import('./herdBatch').HerdBatch[]
  }>
}
