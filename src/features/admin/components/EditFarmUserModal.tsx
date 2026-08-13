import { useState } from 'react'
import { Modal, Button, FormField, inputStyle, selectStyle } from '../../../components/ui'
import { api } from '../../../utils/api'
import type { FarmRole, FarmUserSummary } from '../../../types'

interface EditFarmUserModalProps {
  open: boolean
  onClose: () => void
  user: FarmUserSummary
  onSaved: () => void
}

export function EditFarmUserModal({ open, onClose, user, onSaved }: EditFarmUserModalProps) {
  const [name, setName] = useState(user.name)
  const [role, setRole] = useState<FarmRole>(user.role)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await api.admin.users.update(user.userId, { name, role })
      onSaved()
      onClose()
    } catch {
      setError('Could not save — please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleRemove() {
    if (!confirm(`Remove ${user.name} from this farm?`)) return
    setSaving(true)
    setError(null)
    try {
      await api.admin.users.remove(user.userId)
      onSaved()
      onClose()
    } catch {
      setError('Could not remove this user — please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit User"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </>
      }
    >
      <FormField label="Name">
        <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      </FormField>

      <FormField label="Email">
        <input value={user.email} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
      </FormField>

      <FormField label="Role">
        <select value={role} onChange={(e) => setRole(e.target.value as FarmRole)} style={selectStyle}>
          <option value="user">User — full access to farm data</option>
          <option value="admin">Admin — full access + manages users</option>
        </select>
      </FormField>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 10 }}>{error}</div>}

      <button
        onClick={handleRemove}
        disabled={saving}
        style={{
          width: '100%', background: 'none', border: '1px dashed var(--danger)',
          borderRadius: 'var(--radius-sm)', color: 'var(--danger)', fontSize: 13, fontWeight: 600,
          padding: '9px 12px', cursor: 'pointer', marginTop: 4,
        }}
      >
        Remove from farm
      </button>
    </Modal>
  )
}
