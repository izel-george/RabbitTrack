import { useQuery } from '@tanstack/react-query'
import { api } from '../../utils/api'

export function useFarmUsers() {
  return useQuery({
    queryKey: ['farmUsers'],
    queryFn: () => api.admin.users.list(),
    staleTime: 20_000,
  })
}

export function usePendingInvites() {
  return useQuery({
    queryKey: ['pendingInvites'],
    queryFn: () => api.admin.invites.list(),
    staleTime: 20_000,
  })
}
