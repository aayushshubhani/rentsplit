'use client';

import { useRef, useEffect, useState } from 'react';

const features = [
  {
    icon: '🛡️',
    title: 'Role-Based Access Control',
    description: 'Admin and Member roles with granular permissions. Only admins can approve members, edit any expense, or archive groups.',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,212,255,0.02))',
    border: 'rgba(0,212,255,0.15)',
  },
  {
    icon: '🤖',
    title: 'AI Payment Verification',
    description: 'OCR extracts amount, date, receiver & transaction ID from screenshots. AI detects tampering and generates confidence scores automatically.',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(139,92,246,0.02))',
    border: 'rgba(139,92,246,0.15)',
  },
  {
    icon: '☁️',
    title: 'Real-Time Cloud Sync',
    description: 'All data lives in the cloud. Every approved member sees the same live data instantly — no manual refreshes, no version conflicts.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02))',
    border: 'rgba(16,185,129,0.15)',
  },
  {
    icon: '⚡',
    title: 'Smart Expense Splitting',
    description: 'Split equally, by percentage, or custom amounts. Automatic balance calculation for every member with one click.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.02))',
    border: 'rgba(245,158,11,0.15)',
  },
  {
    icon: '🔗',
    title: 'Invite Link Workflow',
    description: 'Admin generates a secure invite link. New users request to join → Admin gets notified → Approves or rejects with one tap.',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(236,72,153,0.02))',
    border: 'rgba(236,72,153,0.15)',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Monthly spending graphs, category-wise charts, pending settlements at a glance. Know exactly where your money goes.',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(6,182,212,0.02))',
    border: 'rgba(6,182,212,0.15)',
  },
  {
    icon: '🔒',
    title: 'Audit Logs',
    description: 'Complete trail of every action — member joins, expense edits, payment approvals, role changes. Full transparency, zero disputes.',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(168,85,247,0.02))',
    border: 'rgba(168,85,247,0.15)',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    description: 'Real-time alerts for join requests, new expenses, settlement updates, and admin approvals. Stay in the loop always.',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.02))',
    border: 'rgba(249,115,22,0.15)',
  },
  {
    icon: '📸',
    title: 'Receipt & Proof Storage',
    description: 'Upload receipts and payment proofs directly. Stored securely in the cloud — accessible anytime by all approved members.',
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(20,184,166,0.02))',
    border: 'rgba(20,184,166,0.15)',
  },
];

export default function FeaturesSection() {
  const [visible, setVisible] = useState<boolean[]>(new Array(features.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mouseInCard, setMouseInCard] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 80);
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseInCard({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <section id="features" style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: '50px', padding: '7px 18px',
            fontSize: '0.8rem', fontWeight: '600', color: '#8b5cf6',
            letterSpacing: '0.5px', marginBottom: '24px',
          }}>
            ✨ Packed with Power
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '800',
            color: '#f8fafc',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}>
            Everything you need to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>split smarter</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Built for the real challenges of shared living — not just a basic expense splitter.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {features.map((feature, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              className="feature-card"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              style={{
                background: hoveredCard === i ? feature.gradient : 'rgba(255,255,255,0.02)',
                border: `1px solid ${hoveredCard === i ? feature.border : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '20px',
                padding: '28px',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: visible[i]
                  ? hoveredCard === i
                    ? `translateY(-6px) perspective(1000px) rotateX(${-mouseInCard.y * 0.3}deg) rotateY(${mouseInCard.x * 0.3}deg)`
                    : 'translateY(0)'
                  : 'translateY(40px)',
                opacity: visible[i] ? 1 : 0,
                boxShadow: hoveredCard === i
                  ? `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${feature.color}15`
                  : '0 4px 20px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow spot */}
              {hoveredCard === i && (
                <div style={{
                  position: 'absolute',
                  top: '-30px', right: '-30px',
                  width: '120px', height: '120px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${feature.color}20, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              )}

              <div style={{
                width: '52px', height: '52px',
                background: `${feature.color}15`,
                border: `1px solid ${feature.color}30`,
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', marginBottom: '18px',
                transition: 'all 0.3s ease',
                transform: hoveredCard === i ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                boxShadow: hoveredCard === i ? `0 8px 20px ${feature.color}25` : 'none',
              }}>
                {feature.icon}
              </div>

              <h3 style={{
                fontSize: '1.05rem', fontWeight: '700',
                color: '#f1f5f9', marginBottom: '10px',
                letterSpacing: '0.2px',
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#64748b', fontSize: '0.88rem',
                lineHeight: 1.7, margin: 0,
              }}>
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                height: '2px',
                width: hoveredCard === i ? '100%' : '0%',
                background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                transition: 'width 0.4s ease',
                borderRadius: '0 0 20px 20px',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
