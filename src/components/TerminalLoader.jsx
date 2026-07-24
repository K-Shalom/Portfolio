import { useState, useEffect } from 'react';

export default function TerminalLoader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sequence = [
      { text: '> Initializing Shalom (Shalx)...', delay: 200 },
      { text: '> Loading systems...', delay: 700 },
      { text: '> Ready.', delay: 1200 },
    ];

    const timers = [];

    sequence.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
      timers.push(t);
    });

    const doneTimer = setTimeout(() => {
      setIsDone(true);
      const hideTimer = setTimeout(() => {
        setHidden(true);
        if (onComplete) onComplete();
      }, 500);
      timers.push(hideTimer);
    }, 1700);

    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-code)',
        color: 'var(--accent-secondary)',
        padding: '2rem',
        opacity: isDone ? 0 : 1,
        transform: isDone ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isDone ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          background: '#0E1116',
          border: '1px solid var(--border-accent)',
          borderRadius: '8px',
          padding: '1.75rem 2.25rem',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 0 35px var(--glow-primary)',
        }}
      >
        {/* Terminal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
          <span style={{ fontSize: '0.72rem', color: '#888', marginLeft: 'auto', letterSpacing: '0.05em' }}>bash ~ shalom-k</span>
        </div>

        {/* Lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minHeight: '100px' }}>
          {lines.map((line, idx) => (
            <div key={idx} style={{ fontSize: '0.92rem', letterSpacing: '0.04em', lineHeight: '1.5', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>{line}</span>
              {idx === lines.length - 1 && !isDone && (
                <span style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--accent-primary)', animation: 'blink 0.8s infinite' }} />
              )}
            </div>
          ))}
          {lines.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>&gt; </span>
              <span style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--accent-primary)', animation: 'blink 0.8s infinite' }} />
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
