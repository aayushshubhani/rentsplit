import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import Link from 'next/link'
import { deleteExpenseAction, approvePaymentAction, rejectPaymentAction } from '@/lib/actions/expenses'

export default async function HouseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  if (!session) redirect('/login')

  const house = await db.house.findUnique({
    where: { id },
    include: {
      members: { include: { user: true } },
      expenses: {
        include: {
          paidBy: true,
          splits: { include: { user: true } },
          payments: { include: { payer: true } },
        },
        orderBy: { date: 'desc' },
      },
    },
  })

  if (!house) notFound()

  const isMember = house.members.some(m => m.userId === session.userId)
  if (!isMember) redirect('/dashboard')

  const isAdmin = house.adminId === session.userId
  const categoryColors: Record<string, string> = {
    rent: '#f43f5e', utilities: '#f59e0b', groceries: '#10b981',
    food: '#8b5cf6', transport: '#00d4ff', other: '#64748b',
  }

  const card = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link href="/dashboard/houses" style={{ color: '#475569', textDecoration: 'none', fontSize: '0.85rem' }}>← All Houses</Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '14px' }}>
          <div>
            <h1 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', marginBottom: '6px' }}>{house.name}</h1>
            {house.city && <p style={{ color: '#475569', fontSize: '0.88rem' }}>📍 {house.city}</p>}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link href={`/dashboard/houses/${id}/expenses/new`} style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '10px', color: 'white', fontWeight: '600', fontSize: '0.88rem', textDecoration: 'none' }}>+ Add Expense</Link>
            {isAdmin && <Link href={`/dashboard/houses/${id}/members`} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#e2e8f0', fontWeight: '600', fontSize: '0.88rem', textDecoration: 'none' }}>👥 Members</Link>}
            <Link href={`/dashboard/houses/${id}/audit`} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#e2e8f0', fontWeight: '600', fontSize: '0.88rem', textDecoration: 'none' }}>📋 Audit</Link>
          </div>
        </div>
      </div>

      {/* Members strip */}
      <div style={{ ...card, marginBottom: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ color: '#475569', fontSize: '0.82rem', fontWeight: '600' }}>MEMBERS:</span>
        {house.members.map(( m : any ) => (
          <div key={m.userId} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', color: 'white' }}>{m.user.name[0]}</div>
            <span style={{ fontSize: '0.83rem', color: '#e2e8f0' }}>{m.user.name}</span>
            {m.role === 'admin' && <span style={{ fontSize: '0.65rem', color: '#00d4ff', fontWeight: '700' }}>ADMIN</span>}
          </div>
        ))}
      </div>

      {/* Expenses */}
      <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1rem', fontWeight: '700', color: '#e2e8f0', marginBottom: '16px' }}>Expenses</h2>

      {house.expenses.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💸</div>
          <p style={{ color: '#475569', marginBottom: '20px' }}>No expenses yet. Add the first one!</p>
          <Link href={`/dashboard/houses/${id}/expenses/new`} style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '10px', color: 'white', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>Add Expense</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {house.expenses.map(( expense : any ) => {
            const mySplit = expense.splits.find(s => s.userId === session.userId)
            const myPayment = expense.payments.find(p => p.payerId === session.userId)
            const isPayer = expense.paidById === session.userId
            const settled = myPayment && ['ai_verified','admin_approved'].includes(myPayment.status)

            return (
              <div key={expense.id} style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '6px', background: `${categoryColors[expense.category] || '#64748b'}22`, color: categoryColors[expense.category] || '#64748b', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>{expense.category}</span>
                      {settled && <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '700' }}>✅ SETTLED</span>}
                      {myPayment && myPayment.status === 'pending' && <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: '700' }}>⏳ PENDING</span>}
                      {myPayment && myPayment.status === 'admin_review' && <span style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: '700' }}>🔍 IN REVIEW</span>}
                    </div>
                    <h3 style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '1rem', marginBottom: '4px' }}>{expense.title}</h3>
                    <p style={{ color: '#475569', fontSize: '0.8rem' }}>Paid by {expense.paidBy.name} · {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    {mySplit && !isPayer && (
                      <p style={{ fontSize: '0.82rem', marginTop: '6px', color: settled ? '#10b981' : '#f43f5e' }}>
                        Your share: ₹{mySplit.amount.toFixed(0)} {settled ? '(paid)' : '(unpaid)'}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.1rem', fontWeight: '700', color: '#f1f5f9' }}>₹{expense.amount.toFixed(0)}</div>
                    <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: '4px' }}>{expense.splits.length} splits</div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      {mySplit && !isPayer && !settled && (
                        <Link href={`/dashboard/houses/${id}/settle/${expense.id}`} style={{ padding: '6px 12px', background: 'linear-gradient(135deg,#10b981,#059669)', borderRadius: '8px', color: 'white', fontWeight: '600', fontSize: '0.75rem', textDecoration: 'none' }}>💳 Settle</Link>
                      )}
                      {isAdmin && (
                        <form action={async () => { 'use server'; await deleteExpenseAction(expense.id, id) }}>
                          <button type="submit" style={{ padding: '6px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', fontWeight: '600', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>🗑 Delete</button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pending payments for admin review */}
                {isAdmin && expense.payments.filter(p => p.status === 'admin_review').map(( payment : any ) => (
                  <div key={payment.id} style={{ marginTop: '12px', padding: '12px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.82rem', color: '#a78bfa', fontWeight: '600' }}>🔍 Review: {payment.payer.name} — ₹{payment.amount.toFixed(0)}</span>
                      <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#64748b' }}>AI: {payment.aiScore?.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <form action={async () => { 'use server'; await approvePaymentAction(payment.id) }}>
                        <button type="submit" style={{ padding: '5px 12px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '7px', color: '#10b981', fontWeight: '600', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>✅ Approve</button>
                      </form>
                      <form action={async () => { 'use server'; await rejectPaymentAction(payment.id) }}>
                        <button type="submit" style={{ padding: '5px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '7px', color: '#f87171', fontWeight: '600', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>❌ Reject</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
