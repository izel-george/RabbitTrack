import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../utils/sessionStore'

export function ProtectedRoute() {
  const { token, farmId } = useSession()
  if (!token || !farmId) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
