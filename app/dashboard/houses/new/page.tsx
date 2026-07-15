'use client'
import { useActionState } from 'react'
import Link from 'next/link'
import { createHouseAction } from '@/lib/actions/houses'

export default function NewHousePage() {
  const [state, action, pending] = useActionState(createHouseAction, undefined)
  const inp = { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'Inter,sans-serif' }
  const lbl = { display: 'block' as const, fontSize: '0.78rem', fontWeight: '600' as const, color: '#64748b', marginBottom: '8px', letterSpacing: '1px' }
  return (
    <div style={{ maxWidth: '540px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href="/dashboard/houses" style={{ color: '#475569', textDecoration: 'none', fontSize: '0.85rem' }}>← Back to Houses</Link>
        <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', marginTop: '14px', marginBottom: '8px' }}>Create a House</h1>
        <p style={{ color: '#475569' }}>Set up your shared living space in seconds.</p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '36px', backdropFilter: 'blur(20px)' }}>
        {state?.message && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#f87171', fontSize: '0.88rem' }}>{state.message}</div>}
        <form action={action}>
          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>HOUSE NAME *</label>
            <input name="name" required placeholder="Skyline PG Block B" style={inp} />
            {state?.errors?.name && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '4px' }}>{state.errors.name[0]}</p>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>DESCRIPTION (optional)</label>
            <input name="description" placeholder="3BHK near Metro, 4 roommates" style={inp} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>CITY (optional)</label>
            <input name="city" placeholder="Mumbai" style={inp} />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label style={lbl}>DEFAULT SPLIT METHOD</label>
            <select name="splitMode" defaultValue="equal" style={{ ...inp, cursor: 'pointer' }}>
              <option value="equal">Equal Split</option>
              <option value="percent">Percentage Split</option>
              <option value="custom">Custom Amounts</option>
            </select>
          </div>
          <button type="submit" disabled={pending} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.7 : 1, fontFamily: 'Inter,sans-serif' }}>
            {pending ? 'Creating…' : '🏠 Create House'}
          </button>
        </form>
      </div>
    </div>
  )
}
