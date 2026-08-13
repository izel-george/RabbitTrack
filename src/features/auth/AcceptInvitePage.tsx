import { useState, type FormEvent } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Card, Button, FormField, inputStyle } from '../../components/ui'
import { useAuth } from './useAuth'

export function AcceptInvitePage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const email = params.get('email') ?? ''
  const { acceptInvite, loading, error } = useAuth()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    acceptInvite(token, email, name, password)
  }

  if (!token || !email) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Card style={{ maxWidth: 380, padding: 28, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
            This invite link looks incomplete. Ask your admin to resend it.
          </p>
          <Link to="/login" style={{ color: 'var(--accent-purple)', fontWeight: 600, fontSize: 13.5 }}>
            Back to sign in
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'radial-gradient(circle at 20% -10%, rgba(167,139,250,0.12), transparent 45%), radial-gradient(circle at 90% 10%, rgba(234,75,133,0.10), transparent 40%), var(--bg)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 11,
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
              display: 'grid', placeItems: 'center', fontSize: 20,
            }}
          >
            🐇
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>RabbitTrack</span>
        </div>

        <Card style={{ padding: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>You're Invited</h1>
            <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
              Set up your account for <strong style={{ color: 'var(--text-secondary)' }}>{email}</strong> to finish joining the farm.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FormField label="Your Name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maria Lopez"
                style={inputStyle}
              />
            </FormField>
            <FormField label="Password">
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                style={inputStyle}
              />
            </FormField>

            {error && (
              <div style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 14 }}>{error}</div>
            )}

            <Button type="submit" fullWidth disabled={loading} style={{ marginTop: 6 }}>
              {loading ? 'Setting up…' : 'Join Farm'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
