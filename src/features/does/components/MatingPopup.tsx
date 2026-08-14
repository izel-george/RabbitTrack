import { useState } from 'react'
import { Modal, Button, FormField, Calendar, selectStyle } from '../../../components/ui'
import { api } from '../../../utils/api'
import { useBucks } from '../../bucks/useBucks'

interface MatingPopupProps {
  open: boolean
  onClose: () => void
  doeId: string
  /** Present = editing an existing litter's mating date; absent = recording a brand-new mating. */
  existingLitterId?: string
  initialMatingDate?: string
  initialSireId?: string
  onSaved: () => void
}

export function MatingPopup({
  open, onClose, doeId, existingLitterId, initialMatingDate, initialSireId, onSaved,
}: MatingPopupProps) {
  const { data: bucks } = useBucks()
  const [matingDate, setMatingDate] = useState(initialMatingDate ?? '')
  const [sireId, setSireId] = useState(initialSireId ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEdit = Boolean(existingLitterId)

  async function handleSave() {
    if (!matingDate) {
      setError('Pick a mating date on the calendar.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (isEdit && existingLitterId) {
        await api.does.editMating(doeId, matingDate, sireId || undefined)
      } else {
        if (!sireId) {
          setError('Choose which buck was used.')
          setSaving(false)
          return
        }
        await api.does.recordMating(doeId, sireId, matingDate)
      }
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
      title={isEdit ? 'Edit Mating Date' : 'Record Mating'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </>
      }
    >
      <FormField label="Buck">
        <select value={sireId} onChange={(e) => setSireId(e.target.value)} style={selectStyle}>
          <option value="">Select a buck…</option>
          {(bucks??[]).map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Mating Date">
        <Calendar value={matingDate || undefined} onChange={setMatingDate} />
      </FormField>

      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>
        Nest box due date and the expected birth window are calculated automatically from this date.
      </p>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13, marginTop: 10 }}>{error}</div>}
    </Modal>
  )
}
