import { useState } from 'react'
import { Modal, Button, FormField, inputStyle } from '../../../components/ui'
import { api } from '../../../utils/api'
import type { WeekReadyGroup } from '../../../types'

interface TransferToHerdModalProps {
  open: boolean
  onClose: () => void
  weekGroup: WeekReadyGroup
  onSaved: () => void
}

export function TransferToHerdModal({ open, onClose, weekGroup, onSaved }: TransferToHerdModalProps) {
  const [maleCount, setMaleCount] = useState(weekGroup.maleKits.toString())
  const [femaleCount, setFemaleCount] = useState(weekGroup.femaleKits.toString())
  const [avgWeightKg, setAvgWeightKg] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (maleCount === '' || femaleCount === '') {
      setError('Enter how many males and females are moving to the herd.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await api.herd.transferWeek(
        weekGroup.litters.map((l) => l.litterId),
        {
          maleCount: Number(maleCount),
          femaleCount: Number(femaleCount),
          avgWeightKg: avgWeightKg ? Number(avgWeightKg) : undefined,
        }
      )
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
      title={`Transfer ${weekGroup.label} to Herd`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="green" onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Transferring…' : 'Transfer'}
          </Button>
        </>
      }
    >
      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12 }}>
        This merges kits from every litter born this week into one herd batch — tracked only by
        combined counts from here on, not by which doe each one came from.
      </p>

      <div style={{ marginBottom: 16 }}>
        {weekGroup.litters.map((l) => (
          <div
            key={l.litterId}
            style={{
              display: 'flex', justifyContent: 'space-between', fontSize: 12.5,
              padding: '6px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)',
            }}
          >
            <span>Dam: {l.damName}</span>
            <span>{l.totalKits} kits</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Count what's actually moving to the herd now — this may be lower than the combined birth
        count if any kits were lost.
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <FormField label="Males">
            <input
              type="number"
              min="0"
              value={maleCount}
              onChange={(e) => setMaleCount(e.target.value)}
              style={inputStyle}
            />
          </FormField>
        </div>
        <div style={{ flex: 1 }}>
          <FormField label="Females">
            <input
              type="number"
              min="0"
              value={femaleCount}
              onChange={(e) => setFemaleCount(e.target.value)}
              style={inputStyle}
            />
          </FormField>
        </div>
      </div>

      <FormField label="Average Weight (kg) — optional">
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Skip if you haven't weighed them yet"
          value={avgWeightKg}
          onChange={(e) => setAvgWeightKg(e.target.value)}
          style={inputStyle}
        />
      </FormField>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</div>}
    </Modal>
  )
}
