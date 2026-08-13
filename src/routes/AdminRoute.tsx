import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../utils/sessionStore'

export function AdminRoute() {
  const { role } = useSession()
  if (role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
