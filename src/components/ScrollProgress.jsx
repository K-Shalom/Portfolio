import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (docHeight <= windowHeight) {
        setScrollPercent(0);
        return;
      }

      const totalScrollable = docHeight - windowHeight;
      const currentScroll = Math.min(100, Math.max(0, (scrollTop / totalScrollable) * 100));
      setScrollPercent(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollPercent}%`,
          backgroundColor: '#60A5FA',
          boxShadow: '0 0 10px #60A5FA, 0 0 5px #60A5FA',
          transition: 'width 0.1s cubic-bezier(0.1, 0.5, 0.5, 1)',
        }}
      />
    </div>
  );
}
