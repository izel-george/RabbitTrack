import { useState } from 'react'
import { Modal, Button, FormField, inputStyle } from '../../../components/ui'
import { api } from '../../../utils/api'
import type { HerdBatch } from '../../../types'

interface EditHerdBatchModalProps {
  open: boolean
  onClose: () => void
  batch: HerdBatch
  onSaved: () => void
}

export function EditHerdBatchModal({ open, onClose, batch, onSaved }: EditHerdBatchModalProps) {
  const [maleCount, setMaleCount] = useState(batch.maleCount.toString())
  const [femaleCount, setFemaleCount] = useState(batch.femaleCount.toString())
  const [avgWeightKg, setAvgWeightKg] = useState(batch.avgWeightKg?.toString() ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await api.herd.editBatch(batch.id, {
        maleCount: maleCount !== '' ? Number(maleCount) : undefined,
        femaleCount: femaleCount !== '' ? Number(femaleCount) : undefined,
        avgWeightKg: avgWeightKg !== '' ? Number(avgWeightKg) : undefined,
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
      title={`Edit ${batch.label ?? 'Batch'}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </>
      }
    >
      {batch.contributingLitters.length > 1 && (
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 14 }}>
          Merged from {batch.contributingLitters.length} does: {batch.contributingLitters.map((l) => l.damName).join(', ')}
        </p>
      )}

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

      <FormField label="Average Weight (kg)">
        <input
          type="number"
          step="0.01"
          min="0"
          value={avgWeightKg}
          onChange={(e) => setAvgWeightKg(e.target.value)}
          style={inputStyle}
        />
      </FormField>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</div>}
    </Modal>
  )
}
