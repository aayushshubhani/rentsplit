'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function CTASection() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 40,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 40,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div
          style={{
            borderRadius: '32px',
            padding: '80px 60px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(0,212,255,0.15)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.6s ease',
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            opacity: visible ? 1 : 0,
            boxShadow: '0 40px 120px rgba(0,0,0,0.4), 0 0 80px rgba(0,212,255,0.06)',
          }}
        >
          {/* Animated gradient background */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, rgba(0,212,255,0.08) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)`,
            transition: 'background 0.1s ease',
            pointerEvents: 'none',
          }} />

          {/* Spinning rings */}
          <div style={{
            position: 'absolute',
            top: '-100px', right: '-100px',
            width: '350px', height: '350px',
            border: '1px solid rgba(0,212,255,0.06)',
            borderRadius: '50%',
            animation: 'spin-slow 30s linear infinite',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-80px', left: '-80px',
            width: '280px', height: '280px',
            border: '1px solid rgba(139,92,246,0.06)',
            borderRadius: '50%',
            animation: 'spin-reverse 20s linear infinite',
            pointerEvents: 'none',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '24px', animation: 'float 4s ease-in-out infinite' }}>🚀</div>

            <h2 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: '900', color: '#f8fafc',
              marginBottom: '20px', letterSpacing: '-0.5px',
              lineHeight: 1.15,
            }}>
              Ready to end the{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
              }}>expense drama?</span>
            </h2>

            <p style={{
              color: '#64748b', fontSize: '1.1rem', lineHeight: 1.7,
              maxWidth: '540px', margin: '0 auto 48px',
            }}>
              Join thousands of roommates who split smarter. Set up your house in 2 minutes — completely free.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/register"
                style={{
                  padding: '18px 44px',
                  background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                  border: 'none', borderRadius: '14px',
                  fontWeight: '800', fontSize: '1rem', color: 'white',
                  cursor: 'pointer', letterSpacing: '0.3px',
                  boxShadow: '0 8px 30px rgba(0,212,255,0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,212,255,0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,212,255,0.3)';
                }}
              >
                🏠 Create Your House — Free
              </Link>
              <Link
                href="/login"
                style={{
                  padding: '18px 36px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  fontWeight: '600', fontSize: '1rem', color: '#94a3b8',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  textDecoration: 'none', display: 'inline-block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                  e.currentTarget.style.color = '#00d4ff';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Already have an account? Sign In
              </Link>
            </div>

            <div style={{
              marginTop: '36px', display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap',
              color: '#334155', fontSize: '0.82rem',
            }}>
              {['No credit card required', 'Free forever plan', 'Cancel anytime'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10b981' }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
