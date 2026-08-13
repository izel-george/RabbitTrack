import { useQuery } from '@tanstack/react-query'
import { api } from '../../utils/api'

export function useBucks() {
  return useQuery({
    queryKey: ['bucks'],
    queryFn: () => api.bucks.list(),
    staleTime: 20_000,
  })
}
