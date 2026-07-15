'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    // Hide native cursor globally with high priority
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = 'html, body, *, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      try {
        mousePos.current = { x: e.clientX, y: e.clientY };
        setVisible(true);
        
        if (dotRef.current) {
          dotRef.current.style.left = `${e.clientX - 4}px`;
          dotRef.current.style.top = `${e.clientY - 4}px`;
        }
      } catch (err) {
        console.error(err);
      }
    };

    const animateRing = () => {
      try {
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
        if (ringRef.current) {
          const size = hoverRef.current ? 52 : 34;
          ringRef.current.style.left = `${ringPos.current.x - size / 2}px`;
          ringRef.current.style.top = `${ringPos.current.y - size / 2}px`;
        }
      } catch (err) {
        console.error(err);
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const checkHover = (e: MouseEvent) => {
      try {
        const target = e.target as Element | null;
        if (target && typeof target.closest === 'function') {
          const isInteractive = !!target.closest('a, button, [role="button"], input, select, textarea, label');
          hoverRef.current = isInteractive;
          setIsHovering(isInteractive);
        } else {
          hoverRef.current = false;
          setIsHovering(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
      const el = document.getElementById('custom-cursor-style');
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: '#00d4ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          display: visible ? 'block' : 'none',
          boxShadow: '0 0 8px #00d4ff, 0 0 18px rgba(0,212,255,0.6)',
          transform: 'translate(0,0)',
          willChange: 'left, top',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: isHovering ? '52px' : '34px',
          height: isHovering ? '52px' : '34px',
          border: isHovering
            ? '1.5px solid rgba(139,92,246,0.9)'
            : '1.5px solid rgba(0,212,255,0.55)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          display: visible ? 'block' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
          background: isHovering ? 'rgba(139,92,246,0.07)' : 'transparent',
          willChange: 'left, top',
        }}
      />
    </>
  );
}
