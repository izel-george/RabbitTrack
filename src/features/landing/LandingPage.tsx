import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="app-shell" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
      
      {/* Navigation Header */}
      <header style={{
        height: 'var(--nav-height)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'rgba(21, 19, 27, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1180px',
          height: '100%',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          
          <div 
            onClick={() => navigate('/')} 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                🐰
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
              RabbitTrack
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '8px 12px',
                transition: 'color 0.2s'
              }}
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: '9px 18px',
                fontSize: '14px',
                fontWeight: 600,
                background: 'var(--accent-purple)',
                color: '#15131b',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
                transition: 'opacity 0.2s'
              }}
            >
              Get full access
            </button>
          </div>

        </div>
      </header>

      {/* Main Hero Section (Split Layout matching your Tailwind/Catalyst reference) */}
      <main className="app-main" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          padding: '40px 0'
        }}>
          
          {/* Left Column: Typography & CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent-purple-soft)',
              border: '1px solid var(--border)',
              color: 'var(--accent-purple)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
               Rabbit & Farm Management System
            </div>
            
            <h1 style={{
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '20px'
            }}>
              RabbitTrack, a powerful accounting app built for <span style={{ color: 'var(--accent-purple)' }}>modern Bunny farming</span>.
            </h1>
            
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '520px',
              marginBottom: '32px'
            }}>
              Move as fast as you can with a unified platform without compromising on your workflow. Track records, litters, and breeding metrics effortlessly.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  padding: '12px 24px',
                  background: 'var(--accent-purple)',
                  color: '#15131b',
                  fontWeight: 600,
                  fontSize: '15px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Get full access <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '15px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Right Column: Mock Dashboard Preview Card */}
          <div style={{ width: '100%' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-strong)',
              padding: '24px',
              boxShadow: 'var(--shadow-card)',
              boxSizing: 'border-box'
            }}>
              
              {/* Window Top Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fbbf24' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                </div>
                <span style={{
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: 'var(--text-tertiary)',
                  backgroundColor: 'var(--surface)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)'
                }}>
                  Teule Rabbit Farm
                </span>
              </div>

              {/* Simulated UI Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--accent-purple-soft)',
                      color: 'var(--accent-purple)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Activity size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Active Breeding Cycles</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>All metrics operating normally</div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--success)',
                    backgroundColor: 'var(--success-soft)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(74, 222, 128, 0.2)'
                  }}>Live</span>
                </div>

                <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Herd Count</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>___ Bucks & Does</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Health Records</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'var(--font-display)' }}>100% Updated</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{
        width: '100%',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        padding: '24px 0',
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--text-tertiary)'
      }}>
        &copy; {new Date().getFullYear()} RabbitTrack. All rights reserved.
      </footer>
    </div>
  );
}