export type LitterStatus =
  | 'mating_recorded' | 'expecting' | 'nesting' | 'born'
  | 'nursing' | 'weaning' | 'ready_for_herd' | 'transferred_to_herd'

export type MilestoneType = 'birth' | 'eyes_open' | 'eating_solids' | 'ready_for_herd'

export interface LitterMilestone {
  milestone: MilestoneType
  expectedDate?: string
  actualDate?: string
  completed: boolean
}

export interface Litter {
  id: string
  litterNumber?: string
  damId: string
  damName: string
  sireId?: string
  matingDate?: string
  expectedNestingDate?: string
  nestBoxAddedAt?: string
  expectedBirthDate?: string
  expectedBirthDateLatest?: string
  actualBirthDate?: string
  totalKits: number
  maleKits: number
  femaleKits: number
  kitsSurvived?: number
  status: LitterStatus
  sectionCode?: string
  herdBatchId?: string
  milestones?: LitterMilestone[]
}
