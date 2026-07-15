'use client'
import { useActionState, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createExpenseAction } from '@/lib/actions/expenses'

const CATEGORIES = ['rent','utilities','groceries','food','transport','other']
const inp = { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'Inter,sans-serif' }
const lbl = { display: 'block' as const, fontSize: '0.78rem', fontWeight: '600' as const, color: '#64748b', marginBottom: '8px', letterSpacing: '1px' }

export default function NewExpensePage() {
  const params = useParams()
  const houseId = params.id as string
  const router = useRouter()
  const [members, setMembers] = useState<{id:string;name:string}[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    fetch(`/api/houses/${houseId}/members`).then(r => r.json()).then(data => {
      setMembers(data)
      setSelectedIds(data.map((m:{id:string}) => m.id))
    }).catch(() => {})
  }, [houseId])

  const boundAction = createExpenseAction.bind(null, houseId, selectedIds)
  const [state, action, pending] = useActionState(boundAction, undefined)

  const toggle = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div style={{ maxWidth: '540px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href={`/dashboard/houses/${houseId}`} style={{ color: '#475569', textDecoration: 'none', fontSize: '0.85rem' }}>← Back to House</Link>
        <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', marginTop: '14px', marginBottom: '8px' }}>Add Expense</h1>
        <p style={{ color: '#475569' }}>Record a shared expense and split it.</p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '36px' }}>
        {state?.message && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#f87171', fontSize: '0.88rem' }}>{state.message}</div>}
        <form action={action}>
          <div style={{ marginBottom: '18px' }}>
            <label style={lbl}>TITLE *</label>
            <input name="title" required placeholder="Monthly Rent" style={inp} />
            {state?.errors?.title && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '4px' }}>{state.errors.title[0]}</p>}
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={lbl}>AMOUNT (₹) *</label>
            <input name="amount" type="number" required min="1" step="0.01" placeholder="5000" style={inp} />
            {state?.errors?.amount && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '4px' }}>{state.errors.amount[0]}</p>}
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={lbl}>CATEGORY</label>
            <select name="category" defaultValue="other" style={{ ...inp, cursor: 'pointer' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={lbl}>DATE</label>
            <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} style={inp} />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={lbl}>DESCRIPTION (optional)</label>
            <input name="description" placeholder="Additional notes" style={inp} />
          </div>
          <input type="hidden" name="splitMode" value="equal" />

          {/* Member selection */}
          {members.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <label style={lbl}>SPLIT BETWEEN</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {members.map(m => (
                  <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedIds.includes(m.id)} onChange={() => toggle(m.id)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{m.name}</span>
                  </label>
                ))}
              </div>
              <p style={{ color: '#475569', fontSize: '0.78rem', marginTop: '8px' }}>
                {selectedIds.length} selected — equal split
              </p>
            </div>
          )}

          <button type="submit" disabled={pending || selectedIds.length === 0} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: (pending || selectedIds.length === 0) ? 'not-allowed' : 'pointer', opacity: (pending || selectedIds.length === 0) ? 0.6 : 1, fontFamily: 'Inter,sans-serif' }}>
            {pending ? 'Adding…' : '💸 Add Expense'}
          </button>
        </form>
      </div>
    </div>
  )
}
