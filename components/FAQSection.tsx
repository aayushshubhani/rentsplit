'use client';

import { useRef, useEffect, useState } from 'react';

const faqs = [
  {
    q: 'How does AI payment verification work?',
    a: 'When a member uploads a payment screenshot, our OCR engine extracts the amount, date, receiver name, and transaction ID. The AI then compares these with the recorded expense details, checks for image tampering, and generates a confidence score. High-confidence matches are auto-approved; low-confidence ones go to admin review.',
  },
  {
    q: 'Can members fake payment screenshots?',
    a: 'RentSplit uses multi-layer detection: OCR data validation, metadata analysis, pixel-level tampering detection, and duplicate screenshot detection. Suspicious proofs are always escalated to the admin, who has final approval authority.',
  },
  {
    q: 'What happens if admin rejects a payment proof?',
    a: 'The member is notified via an in-app notification. The debt status remains "Pending" and the member can upload a new, valid payment proof. All rejections are recorded in the audit log.',
  },
  {
    q: 'Can I have multiple house groups?',
    a: 'Free plan supports 1 group. Pro plan supports up to 3. Enterprise has unlimited groups — perfect for hostels and PG operators managing multiple buildings.',
  },
  {
    q: 'Is my financial data safe?',
    a: 'Yes. All data is encrypted at rest and in transit. We use industry-standard JWT authentication, role-based access control, and all file uploads are stored on secure cloud storage (Cloudinary/AWS S3). We never share your data with third parties.',
  },
  {
    q: 'How do I remove a member who moved out?',
    a: 'Only admins can remove members. Go to the Members section, select the member, and click "Remove". Their past expense contributions remain recorded for the historical record, and all other members are notified.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(236,72,153,0.08)',
            border: '1px solid rgba(236,72,153,0.2)',
            borderRadius: '50px', padding: '7px 18px',
            fontSize: '0.8rem', fontWeight: '600', color: '#ec4899',
            letterSpacing: '0.5px', marginBottom: '24px',
          }}>
            ❓ Got Questions?
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '800', color: '#f8fafc',
            marginBottom: '16px', letterSpacing: '-0.5px',
          }}>
            Frequently Asked{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Questions</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: openIndex === i ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${openIndex === i ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 24px',
                  background: 'transparent', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                }}
              >
                <span style={{ fontWeight: '600', fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  {faq.q}
                </span>
                <div style={{
                  minWidth: '28px', height: '28px',
                  borderRadius: '8px',
                  background: openIndex === i ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${openIndex === i ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: openIndex === i ? '#00d4ff' : '#475569',
                  fontSize: '1.2rem', fontWeight: '300',
                  transition: 'all 0.3s ease',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>
                  +
                </div>
              </button>
              {openIndex === i && (
                <div style={{
                  padding: '0 24px 20px',
                  color: '#64748b',
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  paddingTop: '16px',
                  marginTop: '0',
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
