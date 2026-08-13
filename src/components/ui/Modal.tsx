import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(10, 8, 15, 0.6)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        backdropFilter: 'blur(2px)',
      }}
      className="modal-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 440,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px 20px 0 0',
          boxShadow: 'var(--shadow-card)',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="modal-panel"
      >
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600 }}>{title}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center',
              background: 'var(--surface-hover)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: 20, overflowY: 'auto' }}>{children}</div>

        {footer && (
          <div
            style={{
              padding: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 10, flexShrink: 0,
            }}
          >
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .modal-backdrop { align-items: center !important; }
          .modal-panel { border-radius: 20px !important; margin: 20px; }
        }
      `}</style>
    </div>
  )
}
