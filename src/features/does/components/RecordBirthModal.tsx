import { useState } from 'react'
import { Modal, Button, FormField, Calendar, inputStyle } from '../../../components/ui'
import { api } from '../../../utils/api'

interface RecordBirthModalProps {
  open: boolean
  onClose: () => void
  litterId: string
  onSaved: () => void
}

export function RecordBirthModal({ open, onClose, litterId, onSaved }: RecordBirthModalProps) {
  const [birthDate, setBirthDate] = useState('')
  const [maleKits, setMaleKits] = useState('')
  const [femaleKits, setFemaleKits] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalKits = (Number(maleKits) || 0) + (Number(femaleKits) || 0)

  async function handleSave() {
    if (!birthDate) {
      setError('Pick the birth date on the calendar.')
      return
    }
    if (maleKits === '' || femaleKits === '') {
      setError('Enter how many male and female kits were born.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await api.litters.recordBirth(litterId, {
        actualBirthDate: birthDate,
        totalKits,
        maleKits: Number(maleKits),
        femaleKits: Number(femaleKits),
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
      title="Record Birth"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </>
      }
    >
      <FormField label="Birth Date">
        <Calendar value={birthDate || undefined} onChange={setBirthDate} />
      </FormField>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <FormField label="Male Kits">
            <input
              type="number"
              min="0"
              value={maleKits}
              onChange={(e) => setMaleKits(e.target.value)}
              style={inputStyle}
            />
          </FormField>
        </div>
        <div style={{ flex: 1 }}>
          <FormField label="Female Kits">
            <input
              type="number"
              min="0"
              value={femaleKits}
              onChange={(e) => setFemaleKits(e.target.value)}
              style={inputStyle}
            />
          </FormField>
        </div>
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
        Total: <strong style={{ color: 'var(--text-primary)' }}>{totalKits}</strong> kits.
        These kits are tracked as a group from here on — no individual profiles are created.
      </p>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13, marginTop: 10 }}>{error}</div>}
    </Modal>
  )
}
