import { useQuery } from '@tanstack/react-query'
import { api } from '../../utils/api'

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.dashboard.get(),
    // Swap in the real call once the backend is live — mock keeps the UI buildable now.
    staleTime: 20_000,
  })
}
