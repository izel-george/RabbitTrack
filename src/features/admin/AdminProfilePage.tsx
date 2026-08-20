import { useState } from 'react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card, Badge, Button, StatCard } from '../../components/ui'
import { Copy, Check, Mail, RotateCcw, X, Edit3 } from 'lucide-react'
import { useSession } from '../../utils/sessionStore'
import { useFarmUsers, usePendingInvites } from './useAdmin'
import { InviteUserModal } from './components/InviteUserModal'
import { EditFarmUserModal } from './components/EditFarmUserModal'
import { api } from '../../utils/api'
import type { FarmUserSummary } from '../../types'
import {LoadingScreen} from '../../components/ui/LoadingScreen'

export function AdminProfilePage() {
  const { farmName, farmCode } = useSession()
  const { data: users=[], refetch: refetchUsers } = useFarmUsers()
  const { data: invites=[], refetch: refetchInvites } = usePendingInvites()

  const [inviteOpen, setInviteOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<FarmUserSummary | null>(null)
  const [copied, setCopied] = useState(false)


  function copyCode() {
    if (!farmCode) return
    navigator.clipboard.writeText(farmCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  async function handleCancelInvite(id: string) {
    await api.admin.invites.cancel(id)
    refetchInvites()
  }

  async function handleResendInvite(id: string) {
    await api.admin.invites.resend(id)
    refetchInvites()
  }

  if (!farmName || !farmCode) {
    return <LoadingScreen />
  }

  return (
    <div>
      <PageHeader
        title="Admin"
        subtitle={`Manage users and settings for ${farmName ?? 'your farm'}.`}
        action={<Button variant="green" onClick={() => setInviteOpen(true)}>+ Invite User</Button>}
      />

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 24 }}>
        <StatCard label="Users" value={users.length} accent="purple" />
        <StatCard label="Pending Invites" value={invites.length} accent="blue" />
      </div>

      <Card style={{ marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
            Farm Code
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600 }}>{farmCode}</div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
            Share this with anyone you invite — they'll need it to sign in.
          </div>
        </div>
        <Button variant="secondary" onClick={copyCode} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
        </Button>
      </Card>

      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Users</h2>
      <div className="card-grid" style={{ marginBottom: 32 }}>
        {users.map((u) => (
          <Card key={u.userId}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{u.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{u.email}</div>
              </div>
              <Badge status={u.role === 'admin' ? 'active' : undefined}>{u.role}</Badge>
            </div>

            <div style={{ display: 'flex', gap: 16, fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 16 }}>
              <span>{u.activityCount} actions logged</span>
              {u.lastActiveAt && <span>Last active {new Date(u.lastActiveAt).toLocaleDateString()}</span>}
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => setEditingUser(u)}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Edit3 size={13} /> Edit
            </Button>
          </Card>
        ))}
      </div>

      {invites.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Pending Invites</h2>
          <div className="card-grid">
            {invites.map((inv) => (
              <Card key={inv.id} accent={inv.expired ? undefined : 'blue'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Mail size={15} color="var(--text-tertiary)" />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{inv.email}</span>
                  </div>
                  <Badge status={undefined}>{inv.role}</Badge>
                </div>
                <div style={{ fontSize: 12, color: inv.expired ? 'var(--danger)' : 'var(--text-tertiary)', marginBottom: 14 }}>
                  {inv.expired ? 'Expired' : `Expires ${new Date(inv.expiresAt).toLocaleDateString()}`}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    variant="secondary"
                    style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12.5 }}
                    onClick={() => handleResendInvite(inv.id)}
                  >
                    <RotateCcw size={12} /> Resend
                  </Button>
                  <Button
                    variant="secondary"
                    style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12.5, color: 'var(--danger)' }}
                    onClick={() => handleCancelInvite(inv.id)}
                  >
                    <X size={12} /> Cancel
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <InviteUserModal open={inviteOpen} onClose={() => setInviteOpen(false)} onSaved={() => refetchInvites()} />
      {editingUser && (
        <EditFarmUserModal
          open={Boolean(editingUser)}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          onSaved={() => refetchUsers()}
        />
      )}
    </div>
  )
}
