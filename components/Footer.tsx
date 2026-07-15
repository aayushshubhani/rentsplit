'use client';

export default function Footer() {
  const links: Record<string, string[]> = {
    Product: ['Features', 'Dashboard', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'],
    Support: ['Documentation', 'Help Center', 'Community', 'Status Page'],
  };

  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 24px 40px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '38px', height: '38px',
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                borderRadius: '11px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: '900', color: 'white',
                fontFamily: 'Orbitron, monospace',
                boxShadow: '0 0 15px rgba(0,212,255,0.25)',
              }}>R</div>
              <span style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: '700', fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: '1px',
              }}>RentSplit</span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '260px', marginBottom: '24px' }}>
              The smartest cloud-based expense manager for shared living. AI-powered, transparent, and built for roommates.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['𝕏', '💼', '📸', '📺'].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: '36px', height: '36px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,212,255,0.08)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,212,255,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div style={{
                fontWeight: '700', fontSize: '0.78rem', letterSpacing: '1.5px',
                textTransform: 'uppercase', color: '#64748b', marginBottom: '20px',
              }}>
                {category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map(item => (
                  <a
                    key={item}
                    href="#"
                    style={{ color: '#475569', textDecoration: 'none', fontSize: '0.87rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = '#00d4ff'; }}
                    onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = '#475569'; }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ color: '#334155', fontSize: '0.82rem' }}>
            © 2026 RentSplit. All rights reserved. Built with ❤️ for roommates everywhere.
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#10b981', boxShadow: '0 0 8px #10b981',
            }} />
            <span style={{ color: '#334155', fontSize: '0.8rem' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
