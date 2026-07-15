'use client';

import { useState, useRef, useEffect } from 'react';

const steps = [
  {
    step: '01',
    icon: '🏠',
    title: 'Admin Creates a House',
    description: 'Set up your shared home in seconds. Add a name, description, and configure split rules.',
    detail: 'Admin gets full control — manage members, expenses, and all settings.',
    color: '#00d4ff',
  },
  {
    step: '02',
    icon: '🔗',
    title: 'Share Invite Link',
    description: 'Generate a secure, time-limited invite link and share it with your roommates.',
    detail: 'Links can be revoked anytime. QR codes coming soon.',
    color: '#8b5cf6',
  },
  {
    step: '03',
    icon: '✋',
    title: 'Members Request to Join',
    description: 'Roommates click the link, sign in, and submit a join request with their details.',
    detail: 'Status shows as "Pending" until admin reviews.',
    color: '#ec4899',
  },
  {
    step: '04',
    icon: '✅',
    title: 'Admin Approves / Rejects',
    description: 'Admin reviews pending requests and approves the right people with one click.',
    detail: 'Approved members instantly gain access to the group.',
    color: '#10b981',
  },
  {
    step: '05',
    icon: '💰',
    title: 'Add & Split Expenses',
    description: 'Any member can log expenses. Split equally, by percentage, or custom amounts.',
    detail: 'Balances update in real time for all members.',
    color: '#f59e0b',
  },
  {
    step: '06',
    icon: '🤖',
    title: 'AI Verifies Payment Proof',
    description: 'Upload a payment screenshot. AI extracts and verifies all key details automatically.',
    detail: 'OCR + tampering detection + confidence score generation.',
    color: '#a855f7',
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section id="how-it-works" ref={sectionRef} style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '50px', padding: '7px 18px',
            fontSize: '0.8rem', fontWeight: '600', color: '#10b981',
            letterSpacing: '0.5px', marginBottom: '24px',
          }}>
            🔄 Simple Workflow
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '800',
            color: '#f8fafc',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}>
            How{' '}
            <span style={{
              background: 'linear-gradient(135deg, #10b981, #00d4ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>RentSplit</span>
            {' '}works
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
            From setup to settlement in 6 simple steps.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left: Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {steps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeStep === i
                    ? `linear-gradient(135deg, ${step.color}12, ${step.color}04)`
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeStep === i ? step.color + '30' : 'rgba(255,255,255,0.05)'}`,
                  transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                {/* Step number */}
                <div style={{
                  minWidth: '40px', height: '40px',
                  borderRadius: '12px',
                  background: activeStep === i ? step.color : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.7rem', fontWeight: '700',
                  color: activeStep === i ? '#030712' : '#475569',
                  transition: 'all 0.3s ease',
                  boxShadow: activeStep === i ? `0 4px 15px ${step.color}40` : 'none',
                }}>
                  {step.step}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '700', fontSize: '0.92rem',
                    color: activeStep === i ? '#f1f5f9' : '#94a3b8',
                    marginBottom: '2px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    transition: 'color 0.3s',
                  }}>
                    <span>{step.icon}</span> {step.title}
                  </div>
                  {activeStep === i && (
                    <div style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>
                      {step.description}
                    </div>
                  )}
                </div>

                {activeStep === i && (
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: step.color,
                    boxShadow: `0 0 8px ${step.color}`,
                    animation: 'pulse-glow 2s ease-in-out infinite',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Right: Visual showcase */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '40px',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.5s ease',
            boxShadow: `0 30px 80px rgba(0,0,0,0.3), 0 0 40px ${steps[activeStep].color}10`,
            minHeight: '380px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at center, ${steps[activeStep].color}08 0%, transparent 70%)`,
              transition: 'all 0.5s ease',
            }} />

            {/* Step icon - large */}
            <div style={{
              fontSize: '5rem', marginBottom: '28px',
              transition: 'all 0.4s ease',
              filter: `drop-shadow(0 0 20px ${steps[activeStep].color}60)`,
              animation: 'float 4s ease-in-out infinite',
            }}>
              {steps[activeStep].icon}
            </div>

            <div style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.75rem', fontWeight: '600',
              color: steps[activeStep].color,
              letterSpacing: '2px', marginBottom: '12px',
              textTransform: 'uppercase',
            }}>
              Step {steps[activeStep].step}
            </div>

            <h3 style={{
              fontSize: '1.4rem', fontWeight: '700',
              color: '#f1f5f9', marginBottom: '16px',
            }}>
              {steps[activeStep].title}
            </h3>

            <p style={{
              color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7,
              maxWidth: '320px',
            }}>
              {steps[activeStep].description}
            </p>

            <div style={{
              marginTop: '20px', padding: '10px 20px',
              background: `${steps[activeStep].color}12`,
              border: `1px solid ${steps[activeStep].color}25`,
              borderRadius: '10px',
              fontSize: '0.82rem', color: steps[activeStep].color,
              lineHeight: 1.5,
            }}>
              💡 {steps[activeStep].detail}
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '28px' }}>
              {steps.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    width: activeStep === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: activeStep === i ? steps[activeStep].color : 'rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
