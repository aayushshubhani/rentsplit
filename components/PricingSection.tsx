'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for small groups just starting out.',
    color: '#64748b',
    features: [
      '1 House group',
      'Up to 4 members',
      'Equal split only',
      'Basic expense tracking',
      'Cloud sync (7 days history)',
      '5 receipt uploads/month',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹149',
    period: 'per month',
    description: 'For active shared households that need full power.',
    color: '#00d4ff',
    features: [
      '3 House groups',
      'Unlimited members',
      'Equal / Percentage / Custom split',
      'AI Payment Verification',
      'OCR receipt scanning',
      'Full audit logs',
      'Analytics dashboard',
      'Real-time notifications',
      'Unlimited cloud history',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '₹499',
    period: 'per month',
    description: 'For hostels, PGs, and co-living spaces at scale.',
    color: '#8b5cf6',
    features: [
      'Unlimited House groups',
      'Unlimited members per group',
      'All Pro features',
      'Multiple admins',
      'UPI integration (soon)',
      'PDF/Excel export',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '50px', padding: '7px 18px',
            fontSize: '0.8rem', fontWeight: '600', color: '#f59e0b',
            letterSpacing: '0.5px', marginBottom: '24px',
          }}>
            💎 Simple Pricing
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '800',
            color: '#f8fafc',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}>
            Plans for every{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>shared home</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 32px' }}>
            Start free. Upgrade when you need more. Cancel anytime.
          </p>

          {/* Toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '50px', padding: '6px 6px 6px 18px',
          }}>
            <span style={{ fontSize: '0.85rem', color: !annual ? '#f1f5f9' : '#64748b', fontWeight: '600' }}>Monthly</span>
            <div
              onClick={() => setAnnual(!annual)}
              style={{
                width: '48px', height: '26px',
                background: annual ? 'linear-gradient(135deg, #00d4ff, #8b5cf6)' : 'rgba(255,255,255,0.1)',
                borderRadius: '13px', cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                position: 'absolute', top: '3px',
                left: annual ? '25px' : '3px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'white', transition: 'left 0.3s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }} />
            </div>
            <span style={{ fontSize: '0.85rem', color: annual ? '#f1f5f9' : '#64748b', fontWeight: '600' }}>Annual</span>
            {annual && (
              <span style={{
                fontSize: '0.72rem', fontWeight: '700',
                background: 'rgba(16,185,129,0.15)', color: '#10b981',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '20px', padding: '3px 10px',
              }}>Save 20%</span>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                background: plan.popular
                  ? 'rgba(0,212,255,0.04)'
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${plan.popular ? 'rgba(0,212,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '24px',
                padding: '36px 32px',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: hoveredPlan === i ? 'translateY(-8px)' : plan.popular ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredPlan === i
                  ? `0 30px 80px rgba(0,0,0,0.4), 0 0 40px ${plan.color}20`
                  : plan.popular ? `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${plan.color}10` : '0 4px 20px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                  borderRadius: '20px', padding: '4px 14px',
                  fontSize: '0.72rem', fontWeight: '700', color: 'white',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 15px rgba(0,212,255,0.3)',
                }}>
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Glow blob */}
              <div style={{
                position: 'absolute', top: '-40px', left: '-40px',
                width: '150px', height: '150px',
                background: `radial-gradient(circle, ${plan.color}12, transparent 70%)`,
                borderRadius: '50%', pointerEvents: 'none',
              }} />

              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.85rem', fontWeight: '700',
                  color: plan.color, letterSpacing: '2px',
                  textTransform: 'uppercase', marginBottom: '12px',
                }}>
                  {plan.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '2.8rem', fontWeight: '900',
                    background: `linear-gradient(135deg, ${plan.color}, #fff)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    {annual && plan.price !== '₹0'
                      ? `₹${Math.floor(parseInt(plan.price.replace('₹', '')) * 0.8 * 12)}`
                      : plan.price}
                  </span>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>
                    {annual && plan.price !== '₹0' ? '/year' : `/${plan.period}`}
                  </span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{plan.description}</p>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {plan.features.map((feature, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                      background: `${plan.color}20`, border: `1px solid ${plan.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', color: plan.color,
                    }}>✓</div>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/register" style={{
                width: '100%', padding: '14px',
                background: plan.popular
                  ? 'linear-gradient(135deg, #00d4ff, #8b5cf6)'
                  : `${plan.color}15`,
                border: plan.popular ? 'none' : `1px solid ${plan.color}30`,
                borderRadius: '12px', cursor: 'pointer',
                fontWeight: '700', fontSize: '0.92rem',
                color: plan.popular ? 'white' : plan.color,
                transition: 'all 0.3s ease',
                letterSpacing: '0.3px',
                boxShadow: plan.popular ? '0 8px 25px rgba(0,212,255,0.25)' : 'none',
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  if (!plan.popular) e.currentTarget.style.background = `${plan.color}25`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  if (!plan.popular) e.currentTarget.style.background = `${plan.color}15`;
                }}
              >
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div style={{
          textAlign: 'center', marginTop: '48px',
          color: '#475569', fontSize: '0.88rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <span>🛡️</span>
          <span>30-day money-back guarantee on all paid plans · No questions asked</span>
        </div>
      </div>
    </section>
  );
}
