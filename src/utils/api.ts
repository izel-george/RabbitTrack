import { sessionStore } from './sessionStore'
import type {
  Rabbit, Doe, Litter, HerdBatch,
  DashboardData, HerdData, ActivityLogEntry, WeightLogEntry,
  AuthUser, Farm, FarmRole, FarmUserSummary, PendingInvite,
} from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { token, farmId } = sessionStore.getState()
  const res = await fetch(`${BASE_URL}/farms/${farmId}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) throw new ApiError(res.status, await res.text())
  if (res.status === 204) return undefined as T
  return res.json()
}

async function publicRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!res.ok) throw new ApiError(res.status, await res.text())
  return res.json()
}

// ── Auth ──────────────────────────────────────────────
export interface AuthResponse {
  token: string
  user: AuthUser
  farm: Farm
  role?: FarmRole
}

export const authApi = {
  signup: (farmName: string, name: string, email: string, password: string) =>
    publicRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ farmName, name, email, password }),
    }),
  login: (email: string, password: string, farmCode: string) =>
    publicRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, farmCode }),
    }),
  acceptInvite: (token: string, email: string, name: string, password: string) =>
    publicRequest<AuthResponse>('/auth/accept-invite', {
      method: 'POST',
      body: JSON.stringify({ token, email, name, password }),
    }),
  logout: () => request('/auth/logout', { method: 'POST' }),
}

// ── Dashboard ─────────────────────────────────────────
export const dashboardApi = {
  get: () => request<DashboardData>('/dashboard'),
}

// ── Does ──────────────────────────────────────────────
export const doesApi = {
  list: (status?: string) => request<Doe[]>(`/does${status ? `?status=${status}` : ''}`),
  detail: (id: string) =>
    request<{ doe: Doe; activeLitter?: Litter; recentActivity: ActivityLogEntry[]; weightHistory: WeightLogEntry[] }>(
      `/does/${id}`
    ),
  create: (data: Partial<Doe>) => request<Doe>('/does', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Doe>) =>
    request<Doe>(`/does/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  recordMating: (id: string, sireId: string, matingDate: string) =>
    request<Litter>(`/does/${id}/mating`, { method: 'POST', body: JSON.stringify({ sireId, matingDate }) }),
  editMating: (id: string, matingDate: string, sireId?: string) =>
    request<Litter>(`/does/${id}/mating`, { method: 'PATCH', body: JSON.stringify({ matingDate, sireId }) }),
}

// ── Litters ───────────────────────────────────────────
export const littersApi = {
  update: (litterId: string, data: Partial<{ litterNumber: string; sectionId: string; kitsSurvived: number }>) =>
    request<Litter>(`/litters/${litterId}`, { method: 'PATCH', body: JSON.stringify(data) }),
  addNestBox: (litterId: string, date: string) =>
    request<Litter>(`/litters/${litterId}/nest-box`, { method: 'POST', body: JSON.stringify({ date }) }),
  recordBirth: (litterId: string, data: { actualBirthDate: string; totalKits: number; maleKits: number; femaleKits: number }) =>
    request<Litter>(`/litters/${litterId}/birth`, { method: 'POST', body: JSON.stringify(data) }),
  promoteToBreeding: (
    litterId: string,
    data: { name: string; sex: 'M' | 'F'; breedId?: string; sectionId?: string }
  ) => request<Rabbit>(`/litters/${litterId}/promote`, { method: 'POST', body: JSON.stringify(data) }),
}

// ── Bucks ─────────────────────────────────────────────
export const bucksApi = {
  list: () => request<Rabbit[]>('/bucks'),
  detail: (id: string) => request<Rabbit>(`/bucks/${id}`),
  create: (data: Partial<Rabbit>) => request<Rabbit>('/bucks', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Rabbit>) =>
    request<Rabbit>(`/bucks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
}

// ── Herd ──────────────────────────────────────────────
export const herdApi = {
  overview: () => request<HerdData>('/herd'),
  batchDetail: (batchId: string) => request<HerdBatch>(`/herd/batches/${batchId}`),
  transferWeek: (
    litterIds: string[],
    data: { maleCount: number; femaleCount: number; avgWeightKg?: number }
  ) =>
    request<HerdBatch>('/herd/batches/transfer', {
      method: 'POST',
      body: JSON.stringify({ litterIds, ...data }),
    }),
  editBatch: (batchId: string, data: Partial<{ maleCount: number; femaleCount: number; avgWeightKg: number }>) =>
    request<HerdBatch>(`/herd/batches/${batchId}`, { method: 'PATCH', body: JSON.stringify(data) }),
  promoteFromBatch: (batchId: string, data: { name: string; sex: 'M' | 'F'; breedId?: string; sectionId?: string }) =>
    request<Rabbit>(`/herd/batches/${batchId}/promote`, { method: 'POST', body: JSON.stringify(data) }),
}

// ── Shared rabbit actions ────────────────────────────
export const rabbitsApi = {
  addWeight: (id: string, weightKg: number) =>
    request(`/rabbits/${id}/weight`, { method: 'POST', body: JSON.stringify({ weightKg }) }),
  addActivity: (id: string, title: string, description?: string) =>
    request(`/rabbits/${id}/activity`, { method: 'POST', body: JSON.stringify({ title, description }) }),
  sell: (id: string) => request(`/rabbits/${id}/sell`, { method: 'POST' }),
  markDeceased: (id: string) => request(`/rabbits/${id}/mark-deceased`, { method: 'POST' }),
}

// ── Admin / setup ─────────────────────────────────────
export const adminApi = {
  sections: {
    list: () => request('/sections'),
    create: (data: { code: string; capacity?: number; notes?: string }) =>
      request('/sections', { method: 'POST', body: JSON.stringify(data) }),
  },
  breeds: {
    list: () => request('/breeds'),
    create: (data: { name: string; expectedWeightMinKg?: number; expectedWeightMaxKg?: number }) =>
      request('/breeds', { method: 'POST', body: JSON.stringify(data) }),
  },
  users: {
    list: () => request<FarmUserSummary[]>('/users'),
    update: (userId: string, data: Partial<{ name: string; role: FarmRole }>) =>
      request(`/users/${userId}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (userId: string) => request(`/users/${userId}`, { method: 'DELETE' }),
  },
  invites: {
    list: () => request<PendingInvite[]>('/invites'),
    create: (email: string, role: FarmRole) =>
      request('/invites', { method: 'POST', body: JSON.stringify({ email, role }) }),
    cancel: (inviteId: string) => request(`/invites/${inviteId}/cancel`, { method: 'POST' }),
    resend: (inviteId: string) => request(`/invites/${inviteId}/resend`, { method: 'POST' }),
  },
}

export const api = {
  auth: authApi,
  dashboard: dashboardApi,
  does: doesApi,
  litters: littersApi,
  bucks: bucksApi,
  herd: herdApi,
  rabbits: rabbitsApi,
  admin: adminApi,
}
