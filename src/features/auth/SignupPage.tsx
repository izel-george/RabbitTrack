import { useState, type FormEvent } from 'react'
import { Card, Button, FormField, inputStyle } from '../../components/ui'
import { useAuth } from './useAuth'

export function SignupPage() {
  const { signup, loading, error } = useAuth()

  const [farmName, setFarmName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

function handleSubmit(e: FormEvent) {
    e.preventDefault()
  signup(farmName, name, email, password)

  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'radial-gradient(circle at 20% -10%, rgba(167,139,250,0.12), transparent 45%), radial-gradient(circle at 90% 10%, rgba(74,222,128,0.10), transparent 40%), var(--bg)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 11,
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-green))',
              display: 'grid', placeItems: 'center', fontSize: 20,
            }}
          >
            🐇
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>RabbitTrack</span>
        </div>

        <Card style={{ padding: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Create Your Farm</h1>
            <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
              You'll become this farm's first admin — you can invite others once you're in.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FormField label="Farm Name">
              <input
                required
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="e.g. Teule Rabbit Farm"
                style={inputStyle}
              />
            </FormField>
            <FormField label="Your Name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anzigale"
                style={inputStyle}
              />
            </FormField>
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

            <Button type="submit" variant="green" fullWidth disabled={loading} style={{ marginTop: 6 }}>
              {loading ? 'Creating farm…' : 'Create Farm'}
            </Button>
          </form>
        </Card>

        <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text-tertiary)', marginTop: 18 }}>
          Already have a farm?{' '}
          <Link to="/login" style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
