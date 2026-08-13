import { useSyncExternalStore } from 'react'
import type { FarmRole } from '../types'

interface SessionState {
  token: string | null
  farmId: string | null
  farmName: string | null
  farmCode: string | null
  userName: string | null
  role: FarmRole | null
}

const STORAGE_KEY = 'rabbittrack_session'

const EMPTY_STATE: SessionState = {
  token: null, farmId: null, farmName: null, farmCode: null, userName: null, role: null,
}

function load(): SessionState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore corrupt storage */
  }
  return EMPTY_STATE
}

let state: SessionState = load()
const listeners = new Set<() => void>()

function persist() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  listeners.forEach((l) => l())
}

export const sessionStore = {
  getState: () => state,
  setSession: (next: Partial<SessionState>) => {
    state = { ...state, ...next }
    persist()
  },
  clear: () => {
    state = { ...EMPTY_STATE }
    persist()
  },
  subscribe: (fn: () => void) => {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}

export function useSession(): SessionState {
  return useSyncExternalStore(sessionStore.subscribe, sessionStore.getState)
}

export function useIsAdmin(): boolean {
  return useSession().role === 'admin'
}
