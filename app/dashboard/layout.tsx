import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import Link from 'next/link'
import { logoutAction } from '@/lib/actions/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  const unreadCount = await db.notification.count({
    where: { userId: session.userId, read: false },
  })

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/dashboard/houses', label: 'My Houses', icon: '🏘️' },
    { href: '/dashboard/notifications', label: unreadCount > 0 ? `Notifications (${unreadCount})` : 'Notifications', icon: '🔔' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#030712', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', flexShrink: 0, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '20px 14px', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflowY: 'auto' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px', padding: '4px 8px' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron,monospace', fontWeight: '900', color: 'white', fontSize: '13px' }}>R</div>
          <span style={{ fontFamily: 'Orbitron,monospace', fontWeight: '700', fontSize: '0.95rem', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>RentSplit</span>
        </Link>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(( item : any ) => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', textDecoration: 'none', color: '#64748b', fontSize: '0.87rem', fontWeight: '500', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
          <div style={{ padding: '6px 12px', marginBottom: '10px' }}>
            <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.name}</div>
            <div style={{ fontSize: '0.73rem', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.email}</div>
          </div>
          <form action={logoutAction}>
            <button type="submit" style={{ width: '100%', padding: '9px 12px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '10px', color: '#f87171', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter,sans-serif' }}>
              🚪 Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '36px 40px', minHeight: '100vh', maxWidth: 'calc(100vw - 240px)' }}>
        {children}
      </main>
    </div>
  )
}
