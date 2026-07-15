'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 24px',
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(3,7,18,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', color: 'white', fontFamily: 'Orbitron,monospace', boxShadow: '0 0 15px rgba(0,212,255,0.3)' }}>R</div>
          <span style={{ fontFamily: 'Orbitron,monospace', fontWeight: '700', fontSize: '1.2rem', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '1px' }}>RentSplit</span>
        </Link>

        {/* Desktop Nav Links — hidden on mobile via inline style */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
          className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '500', padding: '8px 14px', borderRadius: '8px', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#00d4ff'; (e.target as HTMLElement).style.background = 'rgba(0,212,255,0.06)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = '#94a3b8'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Sign In — now a real Link */}
          <Link
            href="/login"
            style={{ background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '9px 20px', fontSize: '0.85rem', fontWeight: '500', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#f8fafc'; el.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.color = '#94a3b8'; el.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            Sign In
          </Link>

          {/* Get Started — now a real Link */}
          <Link
            href="/register"
            style={{ background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,212,255,0.25)', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 25px rgba(0,212,255,0.4)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 15px rgba(0,212,255,0.25)'; }}
          >
            Get Started Free
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'none' }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <div style={{ width: '22px', height: '2px', background: '#94a3b8', marginBottom: '5px', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: '22px', height: '2px', background: '#94a3b8', marginBottom: '5px', opacity: mobileOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <div style={{ width: '22px', height: '2px', background: '#94a3b8', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: 'rgba(3,7,18,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {link.label}
            </a>
          ))}
          <Link href="/login" onClick={() => setMobileOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            Sign In
          </Link>
          <Link href="/register" onClick={() => setMobileOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '700', padding: '12px 16px', borderRadius: '10px', background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', textAlign: 'center' }}>
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  );
}
