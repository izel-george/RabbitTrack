export type RabbitRole = 'doe' | 'buck' | 'kit'

export type RabbitStatus =
  | 'active' | 'pregnant' | 'nursing' | 'resting' | 'available'
  | 'growing' | 'ready_for_herd' | 'for_sale' | 'sold' | 'transferred' | 'deceased'

export interface Rabbit {
  id: string
  farmId: string
  name: string
  role: RabbitRole
  status: RabbitStatus
  breedName?: string
  sex: 'M' | 'F'
  damId?: string
  sireId?: string
  litterId?: string
  hatchDate?: string
  sectionCode?: string
  currentWeightKg?: number
  colorTag?: string
}

export interface Doe extends Rabbit {
  role: 'doe'
  currentLitterId?: string // needed so the mating-edit popup knows which litter to PATCH
  matingDate?: string
  expectedNestingDate?: string
  expectedBirthDate?: string
  expectedBirthDateLatest?: string
  currentKits?: number
}
