'use client';

import { useState, useEffect, useRef } from 'react';

const expenses = [
  { name: 'Ananya Sharma', avatar: 'AS', avatarColor: '#00d4ff', item: 'Monthly Rent', amount: 18000, split: 4500, status: 'settled', category: '🏠' },
  { name: 'Rohan Mehta', avatar: 'RM', avatarColor: '#8b5cf6', item: 'Electricity Bill', amount: 2400, split: 600, status: 'pending', category: '⚡' },
  { name: 'Priya Iyer', avatar: 'PI', avatarColor: '#ec4899', item: 'Groceries', amount: 3200, split: 800, status: 'ai-verified', category: '🛒' },
  { name: 'Karan Singh', avatar: 'KS', avatarColor: '#10b981', item: 'WiFi Bill', amount: 1200, split: 300, status: 'settled', category: '📶' },
  { name: 'Ananya Sharma', avatar: 'AS', avatarColor: '#00d4ff', item: 'LPG Cylinder', amount: 960, split: 240, status: 'pending', category: '🔥' },
];

const balances = [
  { name: 'Ananya Sharma', avatar: 'AS', color: '#00d4ff', owes: 0, owed: 1340, net: 1340 },
  { name: 'Rohan Mehta', avatar: 'RM', color: '#8b5cf6', owes: 600, owed: 0, net: -600 },
  { name: 'Priya Iyer', avatar: 'PI', color: '#ec4899', owes: 800, owed: 0, net: -800 },
  { name: 'Karan Singh', avatar: 'KS', color: '#10b981', owes: 0, owed: 60, net: 60 },
];

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'analytics'>('expenses');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setBarWidths([75, 45, 90, 30, 60, 85, 50]), 400);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const amounts = [22400, 18900, 29800, 15600, 24100, 31200, 26800];

  return (
    <section id="dashboard" ref={sectionRef} style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.2)',
            borderRadius: '50px', padding: '7px 18px',
            fontSize: '0.8rem', fontWeight: '600', color: '#00d4ff',
            letterSpacing: '0.5px', marginBottom: '24px',
          }}>
            📊 Live Dashboard
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '800',
            color: '#f8fafc',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}>
            Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #10b981)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>financial command</span>
            {' '}center
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>
            Everything your house needs, in one real-time dashboard.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '28px',
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
          transition: 'all 0.6s ease',
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          opacity: visible ? 1 : 0,
        }}>
          {/* Top bar */}
          <div style={{
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
                <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px',
              padding: '6px 16px', fontSize: '0.78rem', color: '#475569',
              fontFamily: 'monospace', maxWidth: '300px', margin: '0 auto',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              🔒 app.rentsplit.io/dashboard
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600',
                background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981',
              }}>● Live</div>
            </div>
          </div>

          {/* Dashboard Body */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '500px' }}>
            {/* Sidebar */}
            <div style={{
              borderRight: '1px solid rgba(255,255,255,0.06)',
              padding: '24px 16px',
              background: 'rgba(255,255,255,0.01)',
            }}>
              {/* House name */}
              <div style={{
                padding: '12px', borderRadius: '12px',
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.15)',
                marginBottom: '24px',
              }}>
                <div style={{ fontSize: '0.7rem', color: '#475569', marginBottom: '4px' }}>Current House</div>
                <div style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '0.92rem' }}>🏠 Skyline PG Block B</div>
                <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '4px' }}>4 members · Admin</div>
              </div>

              {/* Nav items */}
              {[
                { icon: '📊', label: 'Dashboard', active: true },
                { icon: '💸', label: 'Expenses', active: false },
                { icon: '💳', label: 'Settlements', active: false },
                { icon: '👥', label: 'Members', active: false },
                { icon: '🔔', label: 'Notifications', badge: '3', active: false },
                { icon: '📋', label: 'Audit Logs', active: false },
                { icon: '⚙️', label: 'Settings', active: false },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px', marginBottom: '4px',
                  background: item.active ? 'rgba(0,212,255,0.1)' : 'transparent',
                  border: item.active ? '1px solid rgba(0,212,255,0.15)' : '1px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <span style={{
                    fontSize: '0.82rem', fontWeight: item.active ? '600' : '400',
                    color: item.active ? '#00d4ff' : '#64748b', flex: 1,
                  }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      background: '#ec4899', color: 'white',
                      borderRadius: '10px', fontSize: '0.65rem', fontWeight: '700',
                      padding: '1px 7px',
                    }}>{item.badge}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div style={{ padding: '24px', overflow: 'auto' }}>
              {/* Summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Total Spent', value: '₹25,760', icon: '💸', color: '#00d4ff', change: '+12%' },
                  { label: 'You Owe', value: '₹1,400', icon: '⬆️', color: '#ec4899', change: '2 pending' },
                  { label: 'Owed to You', value: '₹3,200', icon: '⬇️', color: '#10b981', change: 'from 2' },
                  { label: 'Settlements', value: '8/12', icon: '✅', color: '#f59e0b', change: '67%' },
                ].map((card, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${card.color}20`,
                    borderRadius: '14px', padding: '16px',
                    transition: 'all 0.3s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{card.icon}</span>
                      <span style={{
                        fontSize: '0.65rem', fontWeight: '600',
                        color: card.color, background: `${card.color}15`,
                        borderRadius: '8px', padding: '3px 8px',
                      }}>{card.change}</span>
                    </div>
                    <div style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '1.1rem', fontWeight: '700', color: card.color, marginBottom: '4px',
                    }}>{card.value}</div>
                    <div style={{ fontSize: '0.72rem', color: '#475569' }}>{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
                {(['expenses', 'balances', 'analytics'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '8px 18px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                      fontWeight: '600', fontSize: '0.8rem',
                      background: activeTab === tab ? 'rgba(0,212,255,0.1)' : 'transparent',
                      color: activeTab === tab ? '#00d4ff' : '#475569',
                      transition: 'all 0.2s',
                      textTransform: 'capitalize',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'expenses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {expenses.map((exp, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{ fontSize: '1.3rem' }}>{exp.category}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.item}</div>
                        <div style={{ fontSize: '0.72rem', color: '#475569' }}>by {exp.name}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#f1f5f9' }}>₹{exp.amount.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Your share: ₹{exp.split}</div>
                      </div>
                      <div style={{
                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600', whiteSpace: 'nowrap',
                        ...(exp.status === 'settled'
                          ? { background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }
                          : exp.status === 'ai-verified'
                          ? { background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.25)' }
                          : { background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }),
                      }}>
                        {exp.status === 'settled' ? '✓ Settled' : exp.status === 'ai-verified' ? '🤖 AI Verified' : '⏳ Pending'}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'balances' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {balances.map((bal, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '14px 18px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '14px',
                    }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: `${bal.color}20`, border: `1px solid ${bal.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: '700', color: bal.color,
                      }}>{bal.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '0.88rem', color: '#e2e8f0' }}>{bal.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '6px' }}>
                          <div style={{
                            height: '4px', borderRadius: '2px',
                            background: 'rgba(255,255,255,0.08)', overflow: 'hidden', width: '150px',
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${Math.abs(bal.net) / 1500 * 100}%`,
                              background: bal.net > 0 ? 'linear-gradient(90deg, #10b981, #00d4ff)' : 'linear-gradient(90deg, #ec4899, #8b5cf6)',
                              borderRadius: '2px',
                              transition: 'width 1s ease',
                            }} />
                          </div>
                        </div>
                      </div>
                      <div style={{
                        fontFamily: 'Orbitron, monospace',
                        fontWeight: '700', fontSize: '1rem',
                        color: bal.net > 0 ? '#10b981' : '#ec4899',
                      }}>
                        {bal.net > 0 ? '+' : ''}₹{Math.abs(bal.net)}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: bal.net > 0 ? '#10b981' : '#ec4899' }}>
                        {bal.net > 0 ? 'gets back' : 'owes'}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '16px' }}>Monthly Spending (₹)</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '180px' }}>
                    {months.map((month, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ fontSize: '0.65rem', color: '#475569' }}>
                          {(amounts[i] / 1000).toFixed(0)}k
                        </div>
                        <div style={{
                          width: '100%', borderRadius: '6px 6px 0 0',
                          height: `${barWidths[i]}%`,
                          background: i === 5
                            ? 'linear-gradient(to top, #00d4ff, #8b5cf6)'
                            : 'linear-gradient(to top, rgba(0,212,255,0.3), rgba(139,92,246,0.3))',
                          transition: 'height 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          boxShadow: i === 5 ? '0 -4px 15px rgba(0,212,255,0.3)' : 'none',
                          cursor: 'pointer',
                        }} />
                        <div style={{ fontSize: '0.65rem', color: '#475569' }}>{month}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
