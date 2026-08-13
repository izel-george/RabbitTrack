import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, FormField, inputStyle } from '../../components/ui'
import { useAuth } from './useAuth'

export function LoginPage() {
  const { login, loading, error } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [farmCode, setFarmCode] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    login(email, password, farmCode)
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
            <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Sign In</h1>
            <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
              Every account needs the farm code — ask your admin if you don't have it.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FormField label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@farm.com"
                style={inputStyle}
              />
            </FormField>
            <FormField label="Password">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </FormField>
            <FormField label="Farm Code">
              <input
                required
                value={farmCode}
                onChange={(e) => setFarmCode(e.target.value)}
                placeholder="e.g. 4f2a9c1b"
                style={inputStyle}
              />
            </FormField>

            {error && (
              <div style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 14 }}>{error}</div>
            )}

            <Button type="submit" fullWidth disabled={loading} style={{ marginTop: 6 }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </Card>

        <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text-tertiary)', marginTop: 18 }}>
          Starting a new farm?{' '}
          <Link to="/signup" style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
