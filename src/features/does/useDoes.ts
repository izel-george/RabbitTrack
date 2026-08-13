import { useQuery } from '@tanstack/react-query'
import { api } from '../../utils/api'

export function useDoes() {
  return useQuery({
    queryKey: ['does'],
    queryFn: () => api.does.list(),
    staleTime: 20_000,
  })
}

export function useDoeDetails(id: string) {
  return useQuery({
    queryKey: ['doe', id],
    queryFn: () => api.does.detail(id),    staleTime: 20_000,
  })
}
