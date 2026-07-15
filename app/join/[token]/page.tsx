'use client'
import { useEffect, useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { requestToJoin } from '@/lib/actions/houses'

export default function JoinPage() {
  const params = useParams()
  const token = params.token as string
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ error?: string; success?: boolean; houseName?: string } | null>(null)

  const handleJoin = () => {
    startTransition(async () => {
      const r = await requestToJoin(token)
      setResult(r)
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '48px 36px' }}>
          {!result ? (
            <>
              <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🏠</div>
              <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.4rem', fontWeight: '800', color: '#f8fafc', marginBottom: '12px' }}>You&apos;re Invited!</h1>
              <p style={{ color: '#475569', marginBottom: '32px', lineHeight: 1.6 }}>You&apos;ve been invited to join a house on RentSplit. Click below to request access — the admin will approve your request.</p>
              <button onClick={handleJoin} disabled={isPending} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1, fontFamily: 'Inter,sans-serif', marginBottom: '12px' }}>
                {isPending ? 'Sending Request…' : '🚀 Request to Join'}
              </button>
              <Link href="/login" style={{ color: '#475569', fontSize: '0.85rem', textDecoration: 'none' }}>Need to sign in first?</Link>
            </>
          ) : result.error ? (
            <>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
              <h2 style={{ color: '#f87171', fontWeight: '700', marginBottom: '12px' }}>Oops!</h2>
              <p style={{ color: '#475569', marginBottom: '24px' }}>{result.error}</p>
              <Link href="/dashboard" style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '10px', color: 'white', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>Go to Dashboard</Link>
            </>
          ) : (
            <>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>✅</div>
              <h2 style={{ fontFamily: 'Orbitron,monospace', color: '#10b981', fontWeight: '800', marginBottom: '12px' }}>Request Sent!</h2>
              <p style={{ color: '#475569', marginBottom: '24px' }}>Your request to join <strong style={{ color: '#e2e8f0' }}>{result.houseName}</strong> has been sent. The admin will approve you shortly.</p>
              <Link href="/dashboard" style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '10px', color: 'white', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>Go to Dashboard</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
