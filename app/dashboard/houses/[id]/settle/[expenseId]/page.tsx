'use client'
import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { settleDebtAction } from '@/lib/actions/expenses'

export default function SettlePage() {
  const params = useParams()
  const houseId = params.id as string
  const expenseId = params.expenseId as string
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [hasProof, setHasProof] = useState(false)
  const [result, setResult] = useState<{ score: number; status: string; message: string } | null>(null)

  const handleSettle = () => {
    startTransition(async () => {
      const r = await settleDebtAction(expenseId, hasProof)
      setResult(r)
      if (r.status === 'ai_verified') {
        setTimeout(() => router.push(`/dashboard/houses/${houseId}`), 2500)
      }
    })
  }

  const scoreColor = (score: number) => score >= 85 ? '#10b981' : score >= 60 ? '#f59e0b' : '#f43f5e'

  return (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href={`/dashboard/houses/${houseId}`} style={{ color: '#475569', textDecoration: 'none', fontSize: '0.85rem' }}>← Back to House</Link>
        <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', marginTop: '14px', marginBottom: '8px' }}>Settle Debt</h1>
        <p style={{ color: '#475569' }}>Upload payment proof for AI verification.</p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '36px' }}>
        {!result ? (
          <>
            {/* Proof toggle */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>Did you make the payment? Upload a screenshot for AI verification.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setHasProof(true)} style={{ flex: 1, padding: '14px', background: hasProof ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hasProof ? '#10b981' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', color: hasProof ? 'white' : '#94a3b8', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: '0.9rem' }}>
                  📸 Yes, I have proof
                </button>
                <button onClick={() => setHasProof(false)} style={{ flex: 1, padding: '14px', background: !hasProof ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${!hasProof ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '12px', color: '#94a3b8', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: '0.9rem' }}>
                  ⏳ No proof yet
                </button>
              </div>
              {hasProof && (
                <div style={{ marginTop: '16px', padding: '14px 16px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', color: '#10b981', fontSize: '0.85rem' }}>
                  ✅ Proof marked as uploaded — AI will scan and verify automatically.
                </div>
              )}
            </div>

            <button onClick={handleSettle} disabled={isPending} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1, fontFamily: 'Inter,sans-serif' }}>
              {isPending ? '🤖 AI Verifying…' : '💳 Submit Settlement'}
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{result.status === 'ai_verified' ? '✅' : result.status === 'admin_review' ? '🔍' : '⏳'}</div>
            <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '12px' }}>
              {result.status === 'ai_verified' ? 'AI Verified!' : result.status === 'admin_review' ? 'Sent for Review' : 'Submitted'}
            </h2>
            {result.score > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px' }}>AI Confidence Score</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '50px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${result.score}%`, background: `linear-gradient(90deg, ${scoreColor(result.score)}, ${scoreColor(result.score)}aa)`, borderRadius: '50px', transition: 'width 1s ease' }} />
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: scoreColor(result.score), fontFamily: 'Orbitron,monospace', marginTop: '8px' }}>{result.score.toFixed(0)}%</div>
              </div>
            )}
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>{result.message}</p>
            <Link href={`/dashboard/houses/${houseId}`} style={{ padding: '10px 24px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#e2e8f0', textDecoration: 'none', fontWeight: '600', fontSize: '0.88rem' }}>
              ← Back to House
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
