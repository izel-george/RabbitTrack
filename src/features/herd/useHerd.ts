import { useQuery } from '@tanstack/react-query'
import { api } from '../../utils/api'

export function useHerd() {
  return useQuery({
    queryKey: ['herd'],
    queryFn: () => api.herd.overview(),
    staleTime: 20_000,
  })
}
