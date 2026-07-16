'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const sections = [
  { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
  { id: 'create-house', label: 'Create a House', icon: '🏠' },
  { id: 'invite-members', label: 'Invite Members', icon: '🔗' },
  { id: 'join-approval', label: 'Join & Approval', icon: '✅' },
  { id: 'add-expenses', label: 'Add Expenses', icon: '💸' },
  { id: 'split-options', label: 'Split Options', icon: '⚡' },
  { id: 'settle-debts', label: 'Settle Debts', icon: '💳' },
  { id: 'ai-verification', label: 'AI Verification', icon: '🤖' },
  { id: 'dashboard', label: 'Dashboard & Analytics', icon: '📊' },
  { id: 'roles', label: 'Roles & Permissions', icon: '🛡️' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'audit-logs', label: 'Audit Logs', icon: '📋' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
];

function Step({ number, title, description, tip, color = '#00d4ff' }: {
  number: number; title: string; description: string; tip?: string; color?: string;
}) {
  return (
    <div style={{
      display: 'flex', gap: '20px', marginBottom: '28px',
    }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: `${color}20`, border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Orbitron, monospace', fontWeight: '700', fontSize: '0.85rem',
          color,
        }}>{String(number).padStart(2, '0')}</div>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '1rem', marginBottom: '6px' }}>{title}</h4>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: tip ? '10px' : 0 }}>{description}</p>
        {tip && (
          <div style={{
            background: `${color}0d`, border: `1px solid ${color}25`,
            borderRadius: '10px', padding: '10px 14px',
            fontSize: '0.82rem', color, lineHeight: 1.6,
          }}>
            💡 <strong>Tip:</strong> {tip}
          </div>
        )}
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px', padding: '16px 20px', marginBottom: '20px',
      fontFamily: 'monospace', fontSize: '0.85rem', color: '#00d4ff',
      lineHeight: 1.7, overflowX: 'auto',
    }}>
      {children}
    </div>
  );
}

function SectionCard({ id, icon, title, color, children }: {
  id: string; icon: string; title: string; color: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid rgba(255,255,255,0.07)`,
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '32px',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.5s ease',
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        scrollMarginTop: '100px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: `${color}18`, border: `1px solid ${color}35`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem',
        }}>{icon}</div>
        <h2 style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '1.3rem', fontWeight: '700',
          color: '#f1f5f9', margin: 0,
        }}>{title}</h2>
      </div>
      <div style={{ borderTop: `1px solid ${color}15`, paddingTop: '28px' }}>
        {children}
      </div>
    </div>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
      background: `${color}18`, border: `1px solid ${color}35`,
      fontSize: '0.75rem', fontWeight: '700', color, marginRight: '8px', marginBottom: '8px',
    }}>{text}</span>
  );
}

function RoleTable() {
  const rows = [
    { action: 'Create / Delete House', admin: true, member: false },
    { action: 'Generate Invite Link', admin: true, member: false },
    { action: 'Approve / Reject Join Requests', admin: true, member: false },
    { action: 'Add / Remove Members', admin: true, member: false },
    { action: 'Add Expense', admin: true, member: true },
    { action: 'Edit Own Expense', admin: true, member: true },
    { action: 'Edit Any Expense', admin: true, member: false },
    { action: 'Delete Any Expense', admin: true, member: false },
    { action: 'View All Expenses', admin: true, member: true },
    { action: 'Upload Payment Proof', admin: true, member: true },
    { action: 'Mark Own Debt as Paid', admin: true, member: true },
    { action: 'Mark Others\' Debt as Paid', admin: true, member: false },
    { action: 'Review AI Verification', admin: true, member: false },
    { action: 'View Analytics Dashboard', admin: true, member: true },
    { action: 'View Audit Logs', admin: true, member: false },
    { action: 'Lock / Archive Group', admin: true, member: false },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontSize: '0.8rem', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Action</th>
            <th style={{ textAlign: 'center', padding: '12px 16px', color: '#00d4ff', fontSize: '0.8rem', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Admin</th>
            <th style={{ textAlign: 'center', padding: '12px 16px', color: '#8b5cf6', fontSize: '0.8rem', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Member</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(( row: any, i: any ) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
              <td style={{ padding: '11px 16px', color: '#94a3b8', fontSize: '0.87rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{row.action}</td>
              <td style={{ textAlign: 'center', padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.admin ? <span style={{ color: '#10b981', fontSize: '1.1rem' }}>✓</span> : <span style={{ color: '#334155' }}>—</span>}
              </td>
              <td style={{ textAlign: 'center', padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.member ? <span style={{ color: '#10b981', fontSize: '1.1rem' }}>✓</span> : <span style={{ color: '#334155' }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const found = sections.find(s => {
        const el = document.getElementById(s.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      if (found) setActiveSection(found.id);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Grid bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Top Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(3,7,18,0.95)' : 'rgba(3,7,18,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 32px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
            color: '#94a3b8', fontSize: '0.85rem', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget).style.color = '#00d4ff'}
            onMouseLeave={e => (e.currentTarget).style.color = '#94a3b8'}
          >
            ← Back to Home
          </Link>
          <span style={{ color: '#1e293b', fontSize: '1rem' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px',
              background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '900', color: 'white',
              fontFamily: 'Orbitron, monospace',
            }}>R</div>
            <span style={{
              fontFamily: 'Orbitron, monospace', fontWeight: '700', fontSize: '1rem',
              background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>RentSplit Guide</span>
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: '20px', padding: '5px 14px', fontSize: '0.78rem', color: '#10b981', fontWeight: '600',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          v1.0 — Complete Guide
        </div>
      </nav>

      <div style={{ display: 'flex', maxWidth: '1280px', margin: '0 auto', padding: '0 24px', paddingTop: '80px', gap: '48px', position: 'relative', zIndex: 10 }}>

        {/* Sidebar */}
        <aside style={{
          width: '240px', flexShrink: 0,
          position: 'sticky', top: '80px',
          height: 'calc(100vh - 100px)',
          overflowY: 'auto', paddingTop: '32px', paddingBottom: '32px',
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1.5px', color: '#334155', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '12px' }}>
            Contents
          </div>
          {sections.map(( s : any ) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', borderRadius: '10px', marginBottom: '2px',
                textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500',
                transition: 'all 0.2s ease',
                color: activeSection === s.id ? '#00d4ff' : '#475569',
                background: activeSection === s.id ? 'rgba(0,212,255,0.08)' : 'transparent',
                borderLeft: activeSection === s.id ? '2px solid #00d4ff' : '2px solid transparent',
              }}
            >
              <span style={{ fontSize: '0.95rem' }}>{s.icon}</span>
              <span style={{ lineHeight: 1.3 }}>{s.label}</span>
            </a>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, paddingTop: '32px', paddingBottom: '80px', minWidth: 0 }}>

          {/* Hero */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '50px', padding: '6px 16px',
              fontSize: '0.78rem', fontWeight: '600', color: '#00d4ff', marginBottom: '20px',
            }}>
              📖 Complete User Guide
            </div>
            <h1 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: '900', color: '#f8fafc',
              marginBottom: '16px', lineHeight: 1.15, letterSpacing: '-0.5px',
            }}>
              How to use{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>RentSplit</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px' }}>
              Everything you need to know — from creating your first house group to AI-verified payment settlements. Follow this guide to get your shared home running smoothly.
            </p>
          </div>

          {/* ── Getting Started ── */}
          <SectionCard id="getting-started" icon="🚀" title="Getting Started" color="#00d4ff">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              RentSplit works with any shared living situation — a 2-person flat, a 10-person hostel, or a PG building with multiple blocks. Before anything else, you need an account.
            </p>
            <Step number={1} title="Create your account" color="#00d4ff"
              description="Click 'Get Started Free' on the homepage. Sign up using Google Sign-In for the fastest experience, or use email and password. You'll receive a verification email — confirm it before proceeding."
              tip="Use Google Sign-In to skip email verification and get started instantly." />
            <Step number={2} title="Complete your profile" color="#00d4ff"
              description="Add your display name and optionally a profile photo. This is what your roommates will see when you add expenses or send payment proofs."
            />
            <Step number={3} title="Choose your role" color="#00d4ff"
              description="You'll either create a new house (becoming Admin) or join an existing one via an invite link (becoming a Member). The person who pays rent or manages the flat should be Admin."
              tip="Only one person needs to be Admin to start. You can transfer admin rights later." />
          </SectionCard>

          {/* ── Create House ── */}
          <SectionCard id="create-house" icon="🏠" title="Create a House" color="#8b5cf6">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              As the Admin, you create the House group that all your roommates will join. This is your shared financial workspace.
            </p>
            <Step number={1} title="Go to Dashboard → New House" color="#8b5cf6"
              description="From your dashboard, click 'Create House'. You'll be prompted to fill in house details." />
            <Step number={2} title="Fill in house details" color="#8b5cf6"
              description="Enter a house name (e.g. 'Skyline PG Block B'), an optional description, your city, and the number of expected members. This info helps members know they're joining the right group."
              tip="Pick a specific name so roommates can instantly recognize it from the invite link." />
            <Step number={3} title="Configure default split rule" color="#8b5cf6"
              description="Choose the default split method for expenses: Equal Split (divide by member count), Percentage-based, or Custom per-member. This can be overridden for individual expenses." />
            <Step number={4} title="House is created — you're the Admin" color="#8b5cf6"
              description="Your house dashboard is now live. You'll see an empty expense list and a Members panel with just your name. Next step: invite your roommates." />
            <div style={{
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '14px', padding: '18px 22px',
              fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.7,
            }}>
              <strong style={{ color: '#8b5cf6' }}>Admin powers you get:</strong> Approve/reject members · Edit any expense · Delete any expense · View audit logs · Lock/archive the group · Review AI payment verifications
            </div>
          </SectionCard>

          {/* ── Invite Members ── */}
          <SectionCard id="invite-members" icon="🔗" title="Invite Members" color="#ec4899">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              RentSplit uses a secure invite-link system. You share a link; roommates click it to request access. No one gets in without your approval.
            </p>
            <Step number={1} title="Generate an invite link" color="#ec4899"
              description="In your house dashboard, go to Members → Invite Members → Generate Link. RentSplit creates a unique, secure link tied to your house." />
            <Step number={2} title="Set link expiry (optional)" color="#ec4899"
              description="You can set the link to expire after 24 hours, 7 days, or keep it permanent. Permanent links are convenient for ongoing use; expiring links are safer for one-time invites."
              tip="For security, use expiring links when inviting new members you don't fully know yet." />
            <Step number={3} title="Share the link" color="#ec4899"
              description="Copy and share via WhatsApp, email, or any messaging app. When your roommate clicks it, they're taken to RentSplit's join request page for your specific house." />
            <Step number={4} title="Revoke a link anytime" color="#ec4899"
              description="If a link is shared incorrectly, go to Members → Manage Links → Revoke. The link instantly becomes invalid — no one who hasn't already joined can use it." />
          </SectionCard>

          {/* ── Join & Approval ── */}
          <SectionCard id="join-approval" icon="✅" title="Join & Approval Workflow" color="#10b981">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              Every member goes through an approval step. This ensures only the right people access your group's financial data.
            </p>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#10b981', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Approval Flow</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', alignItems: 'center' }}>
                {['Admin shares invite link', 'Member clicks link & signs up', 'Join request submitted', 'Admin gets notification', 'Admin Approves or Rejects', 'Member gains / loses access'].map((step, i, arr) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      padding: '8px 14px', borderRadius: '10px',
                      background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                      fontSize: '0.8rem', color: '#10b981', fontWeight: '600', whiteSpace: 'nowrap',
                    }}>{step}</div>
                    {i < arr.length - 1 && <span style={{ color: '#1e293b', fontSize: '1.2rem', margin: '0 4px' }}>→</span>}
                  </div>
                ))}
              </div>
            </div>
            <Step number={1} title="Member's perspective" color="#10b981"
              description="After clicking the invite link, the member signs in (or creates an account). They see the house name and click 'Request to Join'. Their status immediately shows as Pending." />
            <Step number={2} title="Admin notification" color="#10b981"
              description="You (the Admin) receive an in-app notification and optionally an email: '[Name] has requested to join Skyline PG Block B'. You can see their name, email, and join date."
              tip="Review requests promptly — pending members cannot see any expenses until approved." />
            <Step number={3} title="Approve or Reject" color="#10b981"
              description="In Members → Join Requests, click Approve to grant access immediately, or Reject with an optional reason. The member is notified of the outcome either way." />
            <Step number={4} title="After approval" color="#10b981"
              description="Approved members can immediately view all historical expenses, their share of each bill, current balances, and the group's full expense history." />
          </SectionCard>

          {/* ── Add Expenses ── */}
          <SectionCard id="add-expenses" icon="💸" title="Adding Expenses" color="#f59e0b">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              Any approved member can log an expense. The person who paid gets marked as the payer, and the cost is split among the selected members.
            </p>
            <Step number={1} title="Click 'Add Expense'" color="#f59e0b"
              description="From the house dashboard, click the + Add Expense button. A form opens with all required fields." />
            <Step number={2} title="Fill in expense details" color="#f59e0b"
              description="Enter: Title (e.g. 'Electricity Bill'), Total Amount, Category (Rent / Utilities / Groceries / Food / Transport / Other), Date, and optionally a Description or note."
              tip="Be specific with the title — 'July Electricity Bill' is clearer than just 'Bill'." />
            <Step number={3} title="Upload receipt (optional but recommended)" color="#f59e0b"
              description="Attach a photo or PDF of the receipt. This is stored in the cloud and visible to all members. It adds credibility and reduces disputes." />
            <Step number={4} title="Choose who to split with" color="#f59e0b"
              description="By default, the expense is split among all house members. You can deselect specific members (e.g. if someone was travelling and didn't benefit from that grocery run)." />
            <Step number={5} title="Save the expense" color="#f59e0b"
              description="Click Save. The expense appears instantly in everyone's dashboard. Balances are recalculated in real time — everyone sees what they owe immediately." />
          </SectionCard>

          {/* ── Split Options ── */}
          <SectionCard id="split-options" icon="⚡" title="Split Options" color="#06b6d4">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              RentSplit supports three ways to divide an expense. You can choose a different method for each individual expense.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              {[
                { name: 'Equal Split', icon: '÷', desc: 'Divide the total equally among all selected members. Best for shared utilities and rent.', color: '#06b6d4' },
                { name: 'Percentage Split', icon: '%', desc: 'Assign a percentage to each member. Useful when rooms are different sizes (e.g. master bedroom vs. single room).', color: '#8b5cf6' },
                { name: 'Custom Split', icon: '✎', desc: 'Enter a specific rupee amount for each member manually. Maximum flexibility for complex situations.', color: '#10b981' },
              ].map(( opt: any, i: any ) => (
                <div key={i} style={{
                  background: `${opt.color}0d`, border: `1px solid ${opt.color}25`,
                  borderRadius: '16px', padding: '20px',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: `${opt.color}20`, border: `1px solid ${opt.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', fontWeight: '700', color: opt.color,
                    marginBottom: '12px',
                  }}>{opt.icon}</div>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', marginBottom: '8px' }}>{opt.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.83rem', lineHeight: 1.6 }}>{opt.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '14px 18px', fontSize: '0.85rem', color: '#f59e0b', lineHeight: 1.7 }}>
              💡 The default split method is set when you create the house, but you can always override it per expense.
            </div>
          </SectionCard>

          {/* ── Settle Debts ── */}
          <SectionCard id="settle-debts" icon="💳" title="Settling Debts" color="#a855f7">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              When you've paid your share of an expense, you mark it as settled by uploading a payment proof. The AI then verifies it automatically.
            </p>
            <Step number={1} title="Go to your balance or the expense" color="#a855f7"
              description="In your dashboard, under 'You Owe', find the expense you've paid. Click 'Settle Debt' next to it." />
            <Step number={2} title="Upload payment screenshot" color="#a855f7"
              description="Take a screenshot of your UPI/NEFT/bank transfer confirmation. Upload it directly in the settlement form. Supported formats: PNG, JPG, PDF."
              tip="Make sure the screenshot shows the full amount, receiver name, date, and transaction ID clearly." />
            <Step number={3} title="AI verification runs automatically" color="#a855f7"
              description="Within seconds, our AI/OCR engine extracts key data from your screenshot and compares it with the recorded expense. No waiting." />
            <Step number={4} title="High confidence → Auto-approved" color="#a855f7"
              description="If the AI confidence score is high (amount matches, receiver verified, no tampering detected), the debt is marked 'AI Verified' and settled automatically." />
            <Step number={5} title="Low confidence → Admin review" color="#a855f7"
              description="If the AI is uncertain, the proof is flagged for Admin review. The Admin sees the screenshot, the extracted data, and the confidence breakdown, then approves or rejects manually."
              tip="If your payment gets flagged, ensure your screenshot is clear and unedited. Try re-uploading a higher quality image." />
          </SectionCard>

          {/* ── AI Verification ── */}
          <SectionCard id="ai-verification" icon="🤖" title="AI Payment Verification" color="#00d4ff">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              RentSplit's AI verification system is the core of our anti-fraud protection. Here's exactly what it checks:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '28px' }}>
              {[
                { icon: '🔍', title: 'OCR Extraction', desc: 'Reads amount, date, receiver name, and transaction ID from the screenshot image.', color: '#00d4ff' },
                { icon: '💰', title: 'Amount Matching', desc: 'Compares extracted amount with the recorded debt. Flags discrepancies above ₹1.', color: '#8b5cf6' },
                { icon: '👤', title: 'Receiver Verification', desc: "Checks that the payment was sent to the correct person (payer's registered name/UPI ID).", color: '#10b981' },
                { icon: '🔑', title: 'Transaction ID Check', desc: 'Validates the transaction ID format and checks for duplicates (same proof used twice).', color: '#f59e0b' },
                { icon: '🕵️', title: 'Tampering Detection', desc: 'Pixel-level analysis detects if the image has been edited or digitally altered.', color: '#ec4899' },
                { icon: '📊', title: 'Confidence Score', desc: 'A 0–100% score combining all checks. Above 85% = auto-approved. Below = admin review.', color: '#a855f7' },
              ].map(( item: any, i: any ) => (
                <div key={i} style={{
                  background: `${item.color}0a`, border: `1px solid ${item.color}20`,
                  borderRadius: '14px', padding: '18px',
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{item.icon}</div>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px 24px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>Confidence Score Guide</div>
              {[
                { range: '85–100%', status: '✅ Auto Approved', color: '#10b981', desc: 'All checks passed. Debt settled immediately.' },
                { range: '60–84%', status: '⚠️ Admin Review', color: '#f59e0b', desc: 'Some uncertainty detected. Admin makes final decision.' },
                { range: '0–59%', status: '❌ Likely Rejected', color: '#ec4899', desc: 'Multiple red flags. Admin review strongly recommended.' },
              ].map(( row: any, i: any ) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: i < 2 ? '12px' : 0 }}>
                  <div style={{
                    minWidth: '80px', padding: '4px 12px', borderRadius: '20px',
                    background: `${row.color}15`, border: `1px solid ${row.color}30`,
                    fontSize: '0.78rem', fontWeight: '700', color: row.color, textAlign: 'center',
                  }}>{row.range}</div>
                  <div style={{ fontWeight: '600', fontSize: '0.88rem', color: row.color, minWidth: '140px' }}>{row.status}</div>
                  <div style={{ color: '#64748b', fontSize: '0.83rem' }}>{row.desc}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Dashboard ── */}
          <SectionCard id="dashboard" icon="📊" title="Dashboard & Analytics" color="#f59e0b">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              Your dashboard is the financial command center for your house. Everything you need is at a glance.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
              {[
                { icon: '💸', label: 'Total Spent', desc: 'Sum of all expenses logged this month across the house.', color: '#00d4ff' },
                { icon: '⬆️', label: 'You Owe', desc: 'Total amount you personally still owe to others.', color: '#ec4899' },
                { icon: '⬇️', label: 'Owed to You', desc: 'Total amount others owe you (for expenses you paid).', color: '#10b981' },
                { icon: '✅', label: 'Settlements', desc: 'How many of the open debts have been settled so far.', color: '#f59e0b' },
              ].map(( card: any, i: any ) => (
                <div key={i} style={{
                  background: `${card.color}0a`, border: `1px solid ${card.color}20`,
                  borderRadius: '14px', padding: '16px',
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{card.icon}</div>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '4px' }}>{card.label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5 }}>{card.desc}</div>
                </div>
              ))}
            </div>
            <Step number={1} title="Monthly Spending Graph" color="#f59e0b"
              description="A bar chart showing total house spending per month. Hover any bar to see the exact amount. Helps identify high-spend months." />
            <Step number={2} title="Category Breakdown" color="#f59e0b"
              description="A pie or donut chart showing what % of spending went to Rent, Utilities, Groceries, Food, Transport, etc. Great for budgeting decisions." />
            <Step number={3} title="Pending Settlements" color="#f59e0b"
              description="A list of all open debts across the house — who owes whom and how much. Admins can see everyone's; members see only their own."
              tip="Use this view at the end of each month to do a quick reconciliation before anyone moves out." />
            <Step number={4} title="Recent Activity" color="#f59e0b"
              description="A live feed of the last 20 actions in your house: expenses added, payments settled, members joined, etc." />
          </SectionCard>

          {/* ── Roles ── */}
          <SectionCard id="roles" icon="🛡️" title="Roles & Permissions" color="#8b5cf6">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
              RentSplit has two roles: <Badge text="Admin" color="#00d4ff" /> and <Badge text="Member" color="#8b5cf6" />. Here's what each can do:
            </p>
            <RoleTable />
            <div style={{ marginTop: '24px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '12px', padding: '14px 18px', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.7 }}>
              <strong style={{ color: '#8b5cf6' }}>Note:</strong> Even members cannot edit expenses added by other members — they only have edit rights on their own entries. Admin override is always available.
            </div>
          </SectionCard>

          {/* ── Notifications ── */}
          <SectionCard id="notifications" icon="🔔" title="Notifications" color="#ec4899">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              RentSplit keeps everyone in the loop with smart real-time notifications.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { who: 'Admin', trigger: 'New join request received', icon: '👋', color: '#00d4ff' },
                { who: 'All Members', trigger: 'New expense added to the house', icon: '💸', color: '#8b5cf6' },
                { who: 'Payer', trigger: 'A member settled their debt', icon: '💳', color: '#10b981' },
                { who: 'Admin', trigger: 'Payment proof uploaded — needs review', icon: '🤖', color: '#f59e0b' },
                { who: 'Member', trigger: 'Your payment proof was approved / rejected', icon: '✅', color: '#ec4899' },
                { who: 'Member', trigger: 'You were added to / removed from an expense', icon: '📋', color: '#a855f7' },
                { who: 'All Members', trigger: 'A member left or was removed from the group', icon: '🚪', color: '#64748b' },
              ].map(( n: any, i: any ) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px 18px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: '1.3rem' }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{n.trigger}</span>
                  </div>
                  <Badge text={`→ ${n.who}`} color={n.color} />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Audit Logs ── */}
          <SectionCard id="audit-logs" icon="📋" title="Audit Logs" color="#14b8a6">
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
              Every significant action in your house is logged permanently. Only Admins can view the full audit log.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 2 }}>
              {[
                { time: '2026-07-10 20:42', icon: '👤', text: 'Rohan Mehta joined the house (approved by admin)', color: '#10b981' },
                { time: '2026-07-10 19:15', icon: '💸', text: 'Expense "Electricity Bill ₹2,400" added by Ananya Sharma', color: '#00d4ff' },
                { time: '2026-07-10 18:30', icon: '✅', text: 'Debt of ₹600 settled by Rohan Mehta — AI Verified (score: 92%)', color: '#8b5cf6' },
                { time: '2026-07-09 22:10', icon: '✏️', text: 'Expense "Groceries ₹3,200" edited by Ananya Sharma (amount changed)', color: '#f59e0b' },
                { time: '2026-07-09 14:00', icon: '❌', text: 'Payment proof rejected by admin — low confidence score (41%)', color: '#ec4899' },
                { time: '2026-07-08 09:00', icon: '🔗', text: 'Invite link generated by admin (expires in 7 days)', color: '#64748b' },
              ].map(( log: any, i: any ) => (
                <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: '4px', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ color: '#334155', minWidth: '140px', fontSize: '0.75rem' }}>{log.time}</span>
                  <span>{log.icon}</span>
                  <span style={{ color: log.color }}>{log.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '18px', color: '#475569', fontSize: '0.85rem', lineHeight: 1.7 }}>
              Audit logs cannot be deleted or edited — not even by the Admin. This ensures a permanent, tamper-proof record of all house activity.
            </div>
          </SectionCard>

          {/* ── FAQ ── */}
          <SectionCard id="faq" icon="❓" title="Frequently Asked Questions" color="#f97316">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { q: 'Can I be in multiple house groups?', a: 'Yes! You can be a member or admin of multiple house groups simultaneously. Switch between them from the top-left dropdown on your dashboard.' },
                { q: 'What if someone refuses to upload payment proof?', a: "Admins can manually mark a debt as settled on behalf of any member. This action is logged in the audit trail with the admin's name." },
                { q: 'Can I export expense data?', a: 'PDF and Excel export is coming in the next release (Enterprise plan). For now, you can view all data via the Analytics dashboard and Audit Logs.' },
                { q: 'Is there a limit to how many expenses I can add?', a: 'Free plan has unlimited expenses but 7 days of history. Pro plan has unlimited history. Enterprise is fully unlimited.' },
                { q: 'What happens to data if I delete the house?', a: 'Data is permanently deleted after a 30-day grace period. During this period, the admin can restore the group. After 30 days, deletion is irreversible.' },
                { q: 'Can I change the Admin?', a: 'Currently, Admin role transfer is done by contacting support. Multi-admin support is on the roadmap for a future release.' },
                { q: 'Does RentSplit work offline?', a: 'RentSplit requires an internet connection for all operations since all data is cloud-based. Offline mode is planned for a future mobile app.' },
              ].map(( faq: any, i: any ) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px', padding: '20px 24px',
                }}>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.95rem', marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#f97316', marginTop: '1px' }}>Q.</span> {faq.q}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, paddingLeft: '20px' }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Bottom CTA */}
          <div style={{
            background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: '24px', padding: '48px 40px', textAlign: 'center', marginTop: '16px',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', fontWeight: '800', color: '#f8fafc', marginBottom: '12px' }}>
              Ready to get started?
            </h3>
            <p style={{ color: '#64748b', marginBottom: '28px', fontSize: '0.95rem' }}>
              Create your house in 2 minutes. Free forever for small groups.
            </p>
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
              borderRadius: '12px', textDecoration: 'none',
              color: 'white', fontWeight: '700', fontSize: '0.95rem',
              boxShadow: '0 8px 25px rgba(0,212,255,0.25)',
              transition: 'all 0.3s ease',
            }}>
              🏠 Create Your House — Free
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
