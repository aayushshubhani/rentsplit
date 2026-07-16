import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const memberships = await db.houseMember.findMany({
    where: { userId: session.userId },
    include: { house: { include: { expenses: { include: { splits: true, payments: true } }, members: true } } },
  })

  const notifications = await db.notification.findMany({
    where: { userId: session.userId, read: false },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Tally balances
  let totalOwed = 0
  let totalOwedToMe = 0
  for (const m of memberships) {
    for (const expense of m.house.expenses) {
      if (expense.paidById === session.userId) {
        for (const split of expense.splits) {
          if (split.userId === session.userId) continue
          const paid = expense.payments.find(p => p.payerId === split.userId && ['ai_verified','admin_approved'].includes(p.status))
          if (!paid) totalOwedToMe += split.amount
        }
      } else {
        const mySplit = expense.splits.find(s => s.userId === session.userId)
        if (mySplit) {
          const myPayment = expense.payments.find(p => p.payerId === session.userId && ['ai_verified','admin_approved'].includes(p.status))
          if (!myPayment) totalOwed += mySplit.amount
        }
      }
    }
  }

  const card = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.9rem', fontWeight: '800', color: '#f8fafc', marginBottom: '8px' }}>
          Welcome back, {session.name.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#475569' }}>Your financial overview across all shared spaces.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: 'You Owe', value: `₹${totalOwed.toFixed(0)}`, color: '#f43f5e', icon: '⬆️' },
          { label: 'Owed to You', value: `₹${Math.max(0, totalOwedToMe).toFixed(0)}`, color: '#10b981', icon: '⬇️' },
          { label: 'Houses', value: memberships.length, color: '#00d4ff', icon: '🏠' },
          { label: 'Unread Alerts', value: notifications.length, color: '#f59e0b', icon: '🔔' },
        ].map(( s: any, i: any ) => (
          <div key={i} style={card}>
            <div style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{s.icon}</div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.7rem', fontWeight: '800', color: s.color }}>{s.value}</div>
            <div style={{ color: '#475569', fontSize: '0.78rem', fontWeight: '500', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Houses */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1rem', fontWeight: '700', color: '#e2e8f0' }}>Your Houses</h2>
          <Link href="/dashboard/houses/new" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '10px', color: 'white', fontWeight: '600', fontSize: '0.82rem', textDecoration: 'none' }}>
            + New House
          </Link>
        </div>

        {memberships.length === 0 ? (
          <div style={{ ...card, textAlign: 'center', padding: '48px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🏠</div>
            <p style={{ color: '#475569', marginBottom: '20px' }}>You haven&apos;t joined any houses yet.</p>
            <Link href="/dashboard/houses/new" style={{ padding: '10px 28px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '10px', color: 'white', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>Create your first house</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '16px' }}>
            {memberships.map(( m : any ) => (
              <Link key={m.house.id} href={`/dashboard/houses/${m.house.id}`} style={{ ...card, textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '1rem', margin: 0 }}>{m.house.name}</h3>
                  <span style={{ padding: '3px 10px', borderRadius: '20px', background: m.role === 'admin' ? 'rgba(0,212,255,0.15)' : 'rgba(139,92,246,0.12)', color: m.role === 'admin' ? '#00d4ff' : '#a78bfa', fontSize: '0.7rem', fontWeight: '700' }}>
                    {m.role.toUpperCase()}
                  </span>
                </div>
                <div style={{ color: '#475569', fontSize: '0.82rem' }}>{m.house.members.length} members · {m.house.expenses.length} expenses</div>
                {m.house.city && <div style={{ color: '#334155', fontSize: '0.78rem', marginTop: '6px' }}>📍 {m.house.city}</div>}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1rem', fontWeight: '700', color: '#e2e8f0' }}>Recent Alerts</h2>
            <Link href="/dashboard/notifications" style={{ color: '#00d4ff', fontSize: '0.82rem', textDecoration: 'none' }}>View all</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {notifications.map(( n : any ) => (
              <div key={n.id} style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: '12px', padding: '14px 18px' }}>
                <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '0.87rem', marginBottom: '3px' }}>{n.title}</div>
                <div style={{ color: '#64748b', fontSize: '0.81rem' }}>{n.body}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
