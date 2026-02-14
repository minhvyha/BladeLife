export type IceType = 'Hard' | 'Soft' | 'Rough'

export type EdgeRating = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'

export interface Session {
  id: string
  rinkId: string
  rinkName: string
  date: string
  startTime: number // timestamp when session started
  endTime?: number  // timestamp when session ended
  duration: number  // in hours
  iceType: IceType
  status?: 'JUST SHARPENED' | 'NEEDS SHARPEN'
}

export interface ActiveSession {
  rinkId: string
  rinkName: string
  iceType: IceType
  startTime: number
}

export interface Sharpening {
  id: string
  date: string
  shop: string
  hollowRadius: string
  iceHardness: 'Soft' | 'Hard'
}

export interface BladeLife {
  currentMm: number
  maxMm: number
  minMm: number
  hoursRemaining: number
  totalHours: number
}

export interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

export interface RinkSession {
  start: string
  end: string | null
  type: string
  notes: string
}

export interface RinkScheduleDay {
  date: string
  sessions: RinkSession[]
}

export interface Rink {
  id: string
  name: string
  address: string
  imageUrl?: string
  mapEmbedUrl?: string
  schedule?: RinkScheduleDay[]
  nextSession?: {
    date: string
    time: string
  }
}
