import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError } from '../../utils/api'
import { sessionStore } from '../../utils/sessionStore'
import type { AuthResponse } from '../../utils/api'

function applySession(res: AuthResponse) {
  sessionStore.setSession({
    token: res.token,
    farmId: res.farm.id,
    farmName: res.farm.name,
    farmCode: res.farm.code,
    userName: res.user.name,
    role: res.role ?? 'admin',
  })
}

export function useAuth() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function signup(farmName: string, name: string, email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await api.auth.signup(farmName, name, email, password)
      applySession(res)
      navigate('/dashboard')
    } catch (e) {
      setError(e instanceof ApiError && e.status === 409 ? 'An account with this email already exists.' : 'Could not create your farm — please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, password: string, farmCode: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await api.auth.login(email, password, farmCode)
      applySession(res)
      navigate('/')
    } catch {
      setError('Could not sign in — check your email, password, and farm code.')
    } finally {
      setLoading(false)
    }
  }

  async function acceptInvite(token: string, email: string, name: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await api.auth.acceptInvite(token, email, name, password)
      applySession(res)
      navigate('/')
    } catch {
      setError('This invite link is invalid or has expired — ask your admin to resend it.')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    sessionStore.clear()
    navigate('/login')
  }

  return { signup, login, acceptInvite, logout, loading, error }
}
