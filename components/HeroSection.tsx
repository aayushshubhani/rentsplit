'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const texts = ['Roommates', 'Hostels', 'PG Tenants', 'Shared Apartments', 'Co-living Spaces'];
  const textRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const type = () => {
      const current = texts[textRef.current];
      if (!deletingRef.current) {
        if (charRef.current < current.length) {
          setTypedText(current.slice(0, charRef.current + 1));
          charRef.current++;
          setTimeout(type, 80);
        } else {
          setTimeout(() => { deletingRef.current = true; type(); }, 1800);
        }
      } else {
        if (charRef.current > 0) {
          setTypedText(current.slice(0, charRef.current - 1));
          charRef.current--;
          setTimeout(type, 40);
        } else {
          deletingRef.current = false;
          textRef.current = (textRef.current + 1) % texts.length;
          setTimeout(type, 400);
        }
      }
    };
    const timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  const parallaxStyle = (depth: number) => ({
    transform: `translate(${mousePos.x * depth}px, ${mousePos.y * depth}px)`,
    transition: 'transform 0.1s ease-out',
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 80px',
        textAlign: 'center',
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px', zIndex: 1,
      }} />

      {/* Orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 1, ...parallaxStyle(-15) }} />
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 1, ...parallaxStyle(15) }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 1, ...parallaxStyle(-10) }} />

      {/* Floating icons */}
      <div style={{ position: 'absolute', top: '15%', right: '12%', width: '80px', height: '80px', zIndex: 2, ...parallaxStyle(25), animation: 'float 6s ease-in-out infinite' }}>
        <div style={{ width: '100%', height: '100%', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '20px', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>💸</div>
      </div>
      <div style={{ position: 'absolute', top: '25%', left: '8%', width: '70px', height: '70px', zIndex: 2, ...parallaxStyle(-20), animation: 'float 6s ease-in-out infinite 2s' }}>
        <div style={{ width: '100%', height: '100%', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '18px', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🤖</div>
      </div>
      <div style={{ position: 'absolute', bottom: '25%', right: '8%', width: '65px', height: '65px', zIndex: 2, ...parallaxStyle(18), animation: 'float 6s ease-in-out infinite 4s' }}>
        <div style={{ width: '100%', height: '100%', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>🏠</div>
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px', fontSize: '0.82rem', fontWeight: '600', color: '#00d4ff', letterSpacing: '0.5px', backdropFilter: 'blur(10px)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4ff', display: 'inline-block', boxShadow: '0 0 8px #00d4ff', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          AI-Powered Expense Management
        </div>

        <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: '900', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-1px' }}>
          <span style={{ color: '#f8fafc' }}>Split Bills for</span>
          <br />
          <span style={{ background: 'linear-gradient(135deg, #00d4ff, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundSize: '200% 200%', animation: 'gradient-shift 4s ease infinite' }}>
            {typedText}
            <span style={{ display: 'inline-block', width: '3px', height: '0.85em', background: '#00d4ff', marginLeft: '4px', verticalAlign: 'middle', animation: 'blink 1s infinite' }} />
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94a3b8', maxWidth: '640px', margin: '0 auto 48px', lineHeight: 1.7, fontWeight: '400' }}>
          The smartest cloud-based expense manager for shared living. AI-verified payments, real-time sync, role-based access, and zero disputes.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/register"
            style={{ padding: '16px 36px', fontSize: '1rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)', color: 'white', fontWeight: '700', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,212,255,0.3)', transition: 'all 0.3s ease' }}
          >
            <span>🚀</span> Start Free — No Credit Card
          </Link>
          <Link
            href="/guide"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 32px', fontSize: '1rem', fontWeight: '600', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)', display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <span>📖</span> View Guide
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.75rem', zIndex: 10, animation: 'float 3s ease-in-out infinite' }}>
        <span>Scroll to explore</span>
        <div style={{ width: '24px', height: '40px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
          <div style={{ width: '4px', height: '8px', background: '#00d4ff', borderRadius: '2px', animation: 'scan-line 2s linear infinite' }} />
        </div>
      </div>
    </section>
  );
}
