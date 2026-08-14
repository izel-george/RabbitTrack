import { NavLink } from 'react-router-dom'
import { Home, PawPrint, Rabbit as RabbitIcon, Users, LogOut, ShieldCheck } from 'lucide-react'
import { useSession } from '../../utils/sessionStore'
import { useAuth } from '../../features/auth/useAuth'

const baseNavItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/does', label: 'Does', icon: PawPrint },
  { to: '/bucks', label: 'Bucks', icon: RabbitIcon },
  { to: '/herd', label: 'Herd', icon: Users },
]

const adminNavItem = { to: '/admin', label: 'Admin', icon: ShieldCheck }

export function Navigation() {
  const { farmName, userName, role } = useSession()
  const { logout } = useAuth()

  const navItems = role === 'admin' ? [...baseNavItems, adminNavItem] : baseNavItems

  return (
    <>
      {/* Desktop top bar */}
      <header
        style={{
          display: 'none',
          height: 'var(--nav-height)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-elevated)',
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
        className="nav-desktop"
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            height: '100%',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32, height: 32, borderRadius: 9,
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
                display: 'grid', placeItems: 'center', fontSize: 16,
              }}
            >
              🐇
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>RabbitTrack</span>
          </div>

          <nav style={{ display: 'flex', gap: 4 }}>
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/dashboard'}
                style={({ isActive }) => ({
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? '#180f2e' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-purple)' : 'transparent',
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {farmName && (
              <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
                {farmName}{userName ? ` · ${userName}` : ''}
              </span>
            )}

            <button
              onClick={logout}
              title="Sign out"
              style={{
                width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center',
                background: 'var(--surface-hover)', border: '1px solid var(--border-strong)',
                color: 'var(--text-secondary)', cursor: 'pointer', padding: 0,
              }}
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'var(--bottom-nav-height)',
          background: 'var(--bg-elevated)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          zIndex: 20,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        className="nav-mobile"
      >
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            style={({ isActive }) => ({
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              color: isActive ? 'var(--accent-purple)' : 'var(--text-tertiary)',
            })}
          >
            <Icon size={20} strokeWidth={2.2} />
            <span style={{ fontSize: 10.5, fontWeight: 600 }}>{label}</span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: block !important; }
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
