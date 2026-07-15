'use client';

import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Aarav Kapoor',
    role: 'PG Resident, Bangalore',
    avatar: 'AK',
    avatarColor: '#00d4ff',
    stars: 5,
    text: 'Finally no more WhatsApp arguments about who paid what. RentSplit keeps everything transparent and the AI verification means nobody can fake a screenshot. Changed our house completely.',
  },
  {
    name: 'Sneha Reddy',
    role: 'Hostel Admin, Hyderabad',
    avatar: 'SR',
    avatarColor: '#8b5cf6',
    stars: 5,
    text: "Managing 40 students across two buildings was a nightmare. RentSplit's role system and audit logs mean I can delegate and still stay in control. Absolutely essential tool.",
  },
  {
    name: 'Mihir Shah',
    role: 'Roommate, Mumbai',
    avatar: 'MS',
    avatarColor: '#10b981',
    stars: 5,
    text: 'The OCR on payment screenshots is scary good. Tried to test it with an edited screenshot and it flagged it instantly. Legit technology that actually works.',
  },
  {
    name: 'Divya Menon',
    role: 'Co-living Manager, Pune',
    avatar: 'DM',
    avatarColor: '#ec4899',
    stars: 5,
    text: "The analytics dashboard alone is worth it. I can see exactly where our group's money goes month by month. The monthly graphs are so clear even my non-tech roommates love it.",
  },
  {
    name: 'Rishi Agarwal',
    role: 'Flat-mate, Delhi',
    avatar: 'RA',
    avatarColor: '#f59e0b',
    stars: 5,
    text: "Joined via the invite link in 2 minutes, admin approved me instantly. Adding an expense takes 10 seconds. The real-time sync means everyone sees it immediately. Perfect UX.",
  },
  {
    name: 'Nisha Patel',
    role: 'Student PG, Chennai',
    avatar: 'NP',
    avatarColor: '#a855f7',
    stars: 5,
    text: "We had constant disputes about electricity bills. Now with RentSplit, every bill is uploaded, split automatically, and payment proof is AI-verified. Zero disputes in 3 months!",
  },
];

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setOffset(prev => {
        const cardWidth = 380;
        const totalWidth = testimonials.length * (cardWidth + 24);
        return (prev + 1) % totalWidth;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [visible]);

  const allTestimonials = [...testimonials, ...testimonials]; // duplicate for seamless loop

  return (
    <section ref={sectionRef} style={{ padding: '120px 0', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to right, #030712, transparent)',
        zIndex: 20, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to left, #030712, transparent)',
        zIndex: 20, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', marginBottom: '60px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '50px', padding: '7px 18px',
            fontSize: '0.8rem', fontWeight: '600', color: '#f59e0b',
            letterSpacing: '0.5px', marginBottom: '24px',
          }}>
            ⭐ Loved by Roommates
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '800', color: '#f8fafc',
            marginBottom: '16px', letterSpacing: '-0.5px',
          }}>
            What people are{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>saying</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Real reviews from real shared homes across India.
          </p>
        </div>
      </div>

      {/* Scrolling testimonials */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex', gap: '24px',
            transform: `translateX(-${offset}px)`,
            width: 'max-content',
            paddingLeft: '24px',
          }}
        >
          {allTestimonials.map((t, i) => (
            <div
              key={i}
              style={{
                width: '380px', flexShrink: 0,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget).style.borderColor = `${t.avatarColor}30`;
                (e.currentTarget).style.background = `${t.avatarColor}06`;
              }}
              onMouseLeave={e => {
                (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              {/* Big quote mark */}
              <div style={{
                position: 'absolute', top: '-4px', left: '20px',
                fontFamily: 'Georgia, serif',
                fontSize: '5rem', color: `${t.avatarColor}15`,
                lineHeight: 1, userSelect: 'none',
              }}>"</div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
                ))}
              </div>

              <p style={{
                color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8,
                marginBottom: '24px', position: 'relative', zIndex: 1,
              }}>
                {t.text}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: `${t.avatarColor}20`,
                  border: `1px solid ${t.avatarColor}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: '700', color: t.avatarColor,
                  fontFamily: 'Orbitron, monospace',
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#e2e8f0' }}>{t.name}</div>
                  <div style={{ fontSize: '0.77rem', color: '#475569' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
