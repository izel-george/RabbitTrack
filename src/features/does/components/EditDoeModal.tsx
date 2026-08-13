import { useState } from 'react'
import { Modal, Button, FormField, inputStyle, selectStyle } from '../../../components/ui'
import { api } from '../../../utils/api'
import type { Doe, RabbitStatus } from '../../../types'

const STATUS_OPTIONS: RabbitStatus[] = ['active', 'pregnant', 'nursing', 'resting']

interface EditDoeModalProps {
  open: boolean
  onClose: () => void
  doe: Doe
  onSaved: () => void
}

export function EditDoeModal({ open, onClose, doe, onSaved }: EditDoeModalProps) {
  const [name, setName] = useState(doe.name)
  const [status, setStatus] = useState(doe.status)
  const [weight, setWeight] = useState(doe.currentWeightKg?.toString() ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await api.does.update(doe.id, {
        name,
        status,
        currentWeightKg: weight ? Number(weight) : undefined,
      })
      onSaved()
      onClose()
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
      title="Edit Doe Info"
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

      <FormField label="Status">
        <select value={status} onChange={(e) => setStatus(e.target.value as RabbitStatus)} style={selectStyle}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Current Weight (kg)">
        <input
          type="number"
          step="0.01"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={inputStyle}
        />
      </FormField>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13, marginTop: 4 }}>{error}</div>}
    </Modal>
  )
}
