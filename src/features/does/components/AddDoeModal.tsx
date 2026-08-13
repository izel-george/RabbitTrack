import { useState } from 'react'
import { Modal, Button, FormField, Calendar, inputStyle } from '../../../components/ui'
import { api } from '../../../utils/api'

interface AddDoeModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
}

export function AddDoeModal({ open, onClose, onSaved }: AddDoeModalProps) {
  const [name, setName] = useState('')
  const [hatchDate, setHatchDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (!name.trim()) {
      setError('Give this doe a name.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await api.does.create({ name: name.trim(), sex: 'F', hatchDate: hatchDate || undefined })
      onSaved()
      onClose()
      setName('')
      setHatchDate('')
    } catch {
      setError('Could not save — please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Doe"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Saving…' : 'Add Doe'}
          </Button>
        </>
      }
    >
      <FormField label="Name">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Luna"
          style={inputStyle}
        />
      </FormField>

      <FormField label="Hatch Date — optional">
        <Calendar value={hatchDate || undefined} onChange={setHatchDate} />
      </FormField>

      <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
        Breed and section aren't set here yet — add them directly in the database for now if needed.
      </p>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13, marginTop: 10 }}>{error}</div>}
    </Modal>
  )
}
