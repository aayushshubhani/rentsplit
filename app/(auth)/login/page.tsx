'use client'
import { useActionState } from 'react'
import Link from 'next/link'
import { loginAction } from '@/lib/actions/auth'

const S = {
  page: { minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' } as React.CSSProperties,
  grid: { position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' } as React.CSSProperties,
  orb: { position: 'fixed', top: '15%', left: '25%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' } as React.CSSProperties,
  wrap: { width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 } as React.CSSProperties,
  logoWrap: { textAlign: 'center', marginBottom: '40px' } as React.CSSProperties,
  logoBox: { width: '48px', height: '48px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '900', color: 'white', fontFamily: 'Orbitron,monospace', verticalAlign: 'middle', marginRight: '10px' } as React.CSSProperties,
  logoText: { fontFamily: 'Orbitron,monospace', fontWeight: '700', fontSize: '1.5rem', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', verticalAlign: 'middle' } as React.CSSProperties,
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', backdropFilter: 'blur(20px)' } as React.CSSProperties,
  error: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#f87171', fontSize: '0.88rem' } as React.CSSProperties,
  label: { display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#64748b', marginBottom: '8px', letterSpacing: '1px' } as React.CSSProperties,
  input: { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter,sans-serif' } as React.CSSProperties,
  fieldErr: { color: '#f87171', fontSize: '0.78rem', marginTop: '4px' } as React.CSSProperties,
  btn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter,sans-serif' } as React.CSSProperties,
}

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined)
  return (
    <div style={S.page}>
      <div style={S.grid} />
      <div style={S.orb} />
      <div style={S.wrap}>
        <div style={S.logoWrap}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={S.logoBox}>R</span>
            <span style={S.logoText}>RentSplit</span>
          </Link>
          <p style={{ color: '#475569', marginTop: '12px', fontSize: '0.9rem' }}>Sign in to your account</p>
        </div>
        <div style={S.card}>
          {state?.message && <div style={S.error}>{state.message}</div>}
          <form action={action}>
            <div style={{ marginBottom: '20px' }}>
              <label style={S.label}>EMAIL</label>
              <input name="email" type="email" required placeholder="you@example.com" style={S.input} />
              {state?.errors?.email && <p style={S.fieldErr}>{state.errors.email[0]}</p>}
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={S.label}>PASSWORD</label>
              <input name="password" type="password" required placeholder="••••••••" style={S.input} />
              {state?.errors?.password && <p style={S.fieldErr}>{state.errors.password[0]}</p>}
            </div>
            <button type="submit" disabled={pending} style={{ ...S.btn, opacity: pending ? 0.7 : 1, cursor: pending ? 'not-allowed' : 'pointer' }}>
              {pending ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '24px', color: '#475569', fontSize: '0.88rem' }}>
            No account?{' '}<Link href="/register" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: '600' }}>Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
