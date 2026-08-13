import { useState } from 'react'
import { Modal, Button, FormField, inputStyle, selectStyle } from '../../../components/ui'
import { api } from '../../../utils/api'

type Source = { type: 'litter'; litterId: string } | { type: 'batch'; batchId: string }

interface PromoteToBreedingModalProps {
  open: boolean
  onClose: () => void
  source: Source
  groupLabel: string
  onSaved: () => void
}

export function PromoteToBreedingModal({
  open, onClose, source, groupLabel, onSaved,
}: PromoteToBreedingModalProps) {
  const [name, setName] = useState('')
  const [sex, setSex] = useState<'M' | 'F'>('F')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (!name.trim()) {
      setError('Give this rabbit a name.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (source.type === 'litter') {
        await api.litters.promoteToBreeding(source.litterId, { name: name.trim(), sex })
      } else {
        await api.herd.promoteFromBatch(source.batchId, { name: name.trim(), sex })
      }
      onSaved()
      onClose()
    } catch {
      setError('Could not save — check there are still kits of that sex remaining in the group.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Promote to Breeding Stock"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="pink" onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
            {saving ? 'Saving…' : 'Promote'}
          </Button>
        </>
      }
    >
      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Pulls one rabbit out of {groupLabel} to keep for breeding. It'll get its own profile going forward;
        the group's remaining count drops by one.
        {source.type === 'batch' && (
          <> Since this batch merged kits from more than one doe, its parentage won't be recorded.</>
        )}
      </p>

      <FormField label="Name">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Willow"
          style={inputStyle}
        />
      </FormField>

      <FormField label="Sex">
        <select value={sex} onChange={(e) => setSex(e.target.value as 'M' | 'F')} style={selectStyle}>
          <option value="F">Female (becomes a doe)</option>
          <option value="M">Male (becomes a buck)</option>
        </select>
      </FormField>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</div>}
    </Modal>
  )
}
