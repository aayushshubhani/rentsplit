import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import Link from 'next/link'
import { approveJoinRequest, rejectJoinRequest, removeMember, regenerateInviteToken } from '@/lib/actions/houses'
import { headers } from 'next/headers'

export default async function MembersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  if (!session) redirect('/login')

  const house = await db.house.findUnique({
    where: { id },
    include: {
      members: { include: { user: true }, orderBy: { joinedAt: 'asc' } },
      joinRequests: { where: { status: 'pending' }, include: { user: true } },
    },
  })
  if (!house) notFound()
  const isAdmin = house.adminId === session.userId
  if (!isAdmin) redirect(`/dashboard/houses/${id}`)

  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const inviteUrl = `${protocol}://${host}/join/${house.inviteToken}`

  const card = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href={`/dashboard/houses/${id}`} style={{ color: '#475569', textDecoration: 'none', fontSize: '0.85rem' }}>← Back to House</Link>
        <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', marginTop: '14px', marginBottom: '8px' }}>Member Management</h1>
        <p style={{ color: '#475569' }}>{house.name} · {house.members.length} members</p>
      </div>

      {/* Invite Link */}
      <div style={{ ...card, marginBottom: '28px', background: 'rgba(0,212,255,0.03)', borderColor: 'rgba(0,212,255,0.15)' }}>
        <h3 style={{ color: '#00d4ff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '12px', letterSpacing: '0.5px' }}>🔗 INVITE LINK</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <code style={{ flex: 1, padding: '10px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#94a3b8', fontSize: '0.78rem', wordBreak: 'break-all', border: '1px solid rgba(255,255,255,0.06)' }}>{inviteUrl}</code>
        </div>
        <form action={async () => { 'use server'; await regenerateInviteToken(id) }} style={{ marginTop: '10px' }}>
          <button type="submit" style={{ padding: '7px 14px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px', color: '#00d4ff', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>🔄 Regenerate Link</button>
        </form>
        <p style={{ color: '#334155', fontSize: '0.75rem', marginTop: '8px' }}>Share this link. New members must be approved by you.</p>
      </div>

      {/* Pending requests */}
      {house.joinRequests.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#f59e0b', fontWeight: '700', fontSize: '0.9rem', marginBottom: '12px', letterSpacing: '0.5px' }}>⏳ PENDING REQUESTS ({house.joinRequests.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {house.joinRequests.map(req => (
              <div key={req.id} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '0.9rem' }}>{req.user.name}</div>
                  <div style={{ color: '#475569', fontSize: '0.78rem' }}>{req.user.email}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <form action={async () => { 'use server'; await approveJoinRequest(req.id) }}>
                    <button type="submit" style={{ padding: '7px 14px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', color: '#10b981', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>✅ Approve</button>
                  </form>
                  <form action={async () => { 'use server'; await rejectJoinRequest(req.id) }}>
                    <button type="submit" style={{ padding: '7px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', color: '#f87171', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>❌ Reject</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members list */}
      <div>
        <h3 style={{ color: '#94a3b8', fontWeight: '700', fontSize: '0.9rem', marginBottom: '12px', letterSpacing: '0.5px' }}>CURRENT MEMBERS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {house.members.map(m => (
            <div key={m.userId} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', color: 'white' }}>{m.user.name[0]}</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '0.9rem' }}>{m.user.name} {m.userId === session.userId && <span style={{ color: '#475569', fontWeight: '400' }}>(you)</span>}</div>
                  <div style={{ color: '#334155', fontSize: '0.75rem' }}>{m.user.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '20px', background: m.role === 'admin' ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.06)', color: m.role === 'admin' ? '#00d4ff' : '#64748b', fontSize: '0.7rem', fontWeight: '700' }}>{m.role.toUpperCase()}</span>
                {m.role !== 'admin' && (
                  <form action={async () => { 'use server'; await removeMember(id, m.userId) }}>
                    <button type="submit" style={{ padding: '5px 10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '7px', color: '#f87171', fontWeight: '600', fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Remove</button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
