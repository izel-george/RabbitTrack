import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'pink' | 'green' | 'ghost'
  fullWidth?: boolean
}

const variants: Record<string, { bg: string; color: string; border: string }> = {
  primary: { bg: 'var(--accent-purple)', color: '#180f2e', border: 'transparent' },
  pink: { bg: 'var(--accent-pink)', color: '#1a0610', border: 'transparent' },
  green: { bg: 'var(--accent-green)', color: '#0b1f10', border: 'transparent' },
  secondary: { bg: 'transparent', color: 'var(--text-primary)', border: 'var(--border-strong)' },
  ghost: { bg: 'transparent', color: 'var(--accent-purple)', border: 'transparent' },
}

export function Button({ variant = 'primary', fullWidth, style, children, ...rest }: ButtonProps) {
  const v = variants[variant]
  return (
    <button
      {...rest}
      style={{
        width: fullWidth ? '100%' : undefined,
        background: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        borderRadius: 'var(--radius-md)',
        padding: '11px 18px',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'opacity 0.15s ease, transform 0.1s ease',
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  )
}
