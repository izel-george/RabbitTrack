import { useState } from 'react'
import { Modal, Button, FormField, inputStyle, selectStyle } from '../../../components/ui'
import { api } from '../../../utils/api'
import type { FarmRole } from '../../../types'

interface InviteUserModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
}

export function InviteUserModal({ open, onClose, onSaved }: InviteUserModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<FarmRole>('user')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (!email.trim()) {
      setError('Enter an email address to invite.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await api.admin.invites.create(email.trim(), role)
      onSaved()
      onClose()
      setEmail('')
      setRole('user')
    } catch {
      setError('Could not send the invite — please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invite a User"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="green" onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Sending…' : 'Send Invite'}
          </Button>
        </>
      }
    >
      <FormField label="Email">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="them@example.com"
          style={inputStyle}
        />
      </FormField>

      <FormField label="Role">
        <select value={role} onChange={(e) => setRole(e.target.value as FarmRole)} style={selectStyle}>
          <option value="user">User — full access to farm data</option>
          <option value="admin">Admin — full access + manages users</option>
        </select>
      </FormField>

      <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
        They'll get an email with a link to set up their own password.
      </p>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13, marginTop: 10 }}>{error}</div>}
    </Modal>
  )
}
