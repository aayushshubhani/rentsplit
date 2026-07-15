import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import Link from 'next/link'
import { markAllNotificationsRead } from '@/lib/actions/notifications'

export default async function NotificationsPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const notifications = await db.notification.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', marginBottom: '8px' }}>Notifications</h1>
          <p style={{ color: '#475569' }}>{notifications.filter(n => !n.read).length} unread</p>
        </div>
        {notifications.some(n => !n.read) && (
          <form action={async () => { 'use server'; await markAllNotificationsRead(session.userId) }}>
            <button type="submit" style={{ padding: '9px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#94a3b8', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Mark all read</button>
          </form>
        )}
      </div>

      {notifications.length === 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '56px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔔</div>
          <p style={{ color: '#475569' }}>You&apos;re all caught up!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {notifications.map(n => (
            <div key={n.id} style={{ background: n.read ? 'rgba(255,255,255,0.015)' : 'rgba(0,212,255,0.04)', border: `1px solid ${n.read ? 'rgba(255,255,255,0.05)' : 'rgba(0,212,255,0.12)'}`, borderRadius: '14px', padding: '16px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.read ? '#334155' : '#00d4ff', flexShrink: 0, marginTop: '6px', boxShadow: n.read ? 'none' : '0 0 6px #00d4ff' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: n.read ? '#94a3b8' : '#e2e8f0', fontSize: '0.9rem', marginBottom: '4px' }}>{n.title}</div>
                <div style={{ color: '#475569', fontSize: '0.82rem', marginBottom: '6px' }}>{n.body}</div>
                <div style={{ color: '#334155', fontSize: '0.73rem' }}>{new Date(n.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              {n.link && (
                <Link href={n.link} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94a3b8', fontSize: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>View →</Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
