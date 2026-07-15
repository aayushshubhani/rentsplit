import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  if (!session) redirect('/login')

  const house = await db.house.findUnique({ where: { id } })
  if (!house) notFound()

  const logs = await db.auditLog.findMany({
    where: { houseId: id },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const actionColors: Record<string, string> = {
    'House created': '#00d4ff', 'Expense added': '#10b981', 'Expense deleted': '#f43f5e',
    'Member approved': '#10b981', 'Member rejected': '#f43f5e', 'Member removed': '#f59e0b',
    'Payment submitted': '#8b5cf6', 'Payment approved': '#10b981', 'Payment rejected': '#f43f5e',
    'Invite regenerated': '#f59e0b',
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href={`/dashboard/houses/${id}`} style={{ color: '#475569', textDecoration: 'none', fontSize: '0.85rem' }}>← Back to House</Link>
        <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', marginTop: '14px', marginBottom: '8px' }}>Audit Log</h1>
        <p style={{ color: '#475569' }}>{house.name} · All activity recorded</p>
      </div>

      {logs.length === 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📋</div>
          <p style={{ color: '#475569' }}>No activity recorded yet.</p>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {logs.map((log, i) => {
              const color = Object.entries(actionColors).find(([k]) => log.action.includes(k.split(' ')[0]))?.[1] || '#475569'
              return (
                <div key={log.id} style={{ display: 'flex', gap: '20px', paddingBottom: i < logs.length - 1 ? '20px' : 0 }}>
                  <div style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '50%', background: `${color}22`, border: `2px solid ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', zIndex: 1 }}>
                    {'⚡'}
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '0.88rem' }}>{log.action}</span>
                      <span style={{ color: '#334155', fontSize: '0.73rem', flexShrink: 0, marginLeft: '12px' }}>{new Date(log.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {log.details && <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '4px' }}>{log.details}</p>}
                    <span style={{ fontSize: '0.75rem', color: '#334155' }}>by {log.user.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
