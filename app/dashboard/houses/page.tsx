import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function HousesPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const memberships = await db.houseMember.findMany({
    where: { userId: session.userId },
    include: { house: { include: { members: true, expenses: true } } },
    orderBy: { joinedAt: 'desc' },
  })

  const card = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px', textDecoration: 'none', display: 'block' } as React.CSSProperties

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
        <div>
          <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.9rem', fontWeight: '800', color: '#f8fafc', marginBottom: '8px' }}>My Houses</h1>
          <p style={{ color: '#475569' }}>All your shared living spaces in one place.</p>
        </div>
        <Link href="/dashboard/houses/new" style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '12px', color: 'white', fontWeight: '700', textDecoration: 'none' }}>+ Create House</Link>
      </div>

      {memberships.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: '64px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏘️</div>
          <h2 style={{ color: '#f1f5f9', fontWeight: '700', marginBottom: '8px' }}>No houses yet</h2>
          <p style={{ color: '#475569', marginBottom: '28px' }}>Create a house or join one via an invite link.</p>
          <Link href="/dashboard/houses/new" style={{ padding: '12px 32px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '12px', color: 'white', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>Create First House</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: '20px' }}>
          {memberships.map(( m : any ) => (
            <Link key={m.house.id} href={`/dashboard/houses/${m.house.id}`} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg,rgba(0,212,255,0.15),rgba(139,92,246,0.15))', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🏠</div>
                <span style={{ padding: '4px 12px', borderRadius: '20px', background: m.role === 'admin' ? 'rgba(0,212,255,0.12)' : 'rgba(139,92,246,0.12)', color: m.role === 'admin' ? '#00d4ff' : '#a78bfa', fontSize: '0.7rem', fontWeight: '700' }}>{m.role.toUpperCase()}</span>
              </div>
              <h3 style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '1.1rem', marginBottom: '8px' }}>{m.house.name}</h3>
              {m.house.description && <p style={{ color: '#475569', fontSize: '0.83rem', marginBottom: '12px' }}>{m.house.description}</p>}
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#334155' }}>
                <span>👥 {m.house.members.length}</span>
                <span>💸 {m.house.expenses.length} expenses</span>
                {m.house.city && <span>📍 {m.house.city}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
