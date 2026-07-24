import { useEffect, useState, useRef } from 'react';

export default function CursorTrail() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);

  const requestRef = useRef(null);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.closest('a') ||
          target.closest('button') ||
          target.classList.contains('interactive') ||
          target.classList.contains('btn-primary') ||
          target.classList.contains('card-lift'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const animateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#BFDBFE',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          boxShadow: '0 0 10px #BFDBFE, 0 0 20px #BFDBFE',
          transition: 'transform 0.05s ease-out',
        }}
      />

      {/* Trailing Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '44px' : '28px',
          height: isHovered ? '44px' : '28px',
          border: '1.5px solid rgba(96, 165, 250, 0.6)',
          backgroundColor: isHovered ? 'rgba(96, 165, 250, 0.08)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          transform: `translate3d(${trailingPos.x - (isHovered ? 22 : 14)}px, ${trailingPos.y - (isHovered ? 22 : 14)}px, 0)`,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
          boxShadow: isHovered ? '0 0 15px rgba(96, 165, 250, 0.3)' : 'none',
        }}
      />
    </>
  );
}
