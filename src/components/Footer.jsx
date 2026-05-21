export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: '#050710',
        borderTop: '0.5px solid rgba(232,255,0,0.08)',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
        opacity: 0.3,
      }} />

      <div className="mx-auto flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Signature */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-code)',
            fontSize: '1.2rem',
            color: 'var(--accent-primary)',
            fontWeight: 700,
            textShadow: '0 0 20px rgba(232,255,0,0.4)',
          }}>SK.</span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}>
            Shalom Kubwimbabazi
          </span>
        </div>

        {/* Pulse indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--accent-secondary)',
            boxShadow: '0 0 10px var(--accent-secondary)',
            animation: 'footerPulse 2.5s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            SYSTEMS ONLINE — Rwanda 🇷🇼
          </span>
        </div>

        <div className="accent-divider" style={{ width: '120px' }} />

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-code)',
          fontSize: '0.68rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}>
          © {year} Shalom Kubwimbabazi. Built with React + Physics ⚡
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            background: 'none',
            border: '0.5px solid rgba(232,255,0,0.2)',
            borderRadius: '4px',
            padding: '0.5rem 1.25rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-code)',
            fontSize: '0.68rem',
            color: 'var(--accent-primary)',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            marginTop: '0.25rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(232,255,0,0.1)';
            e.currentTarget.style.borderColor = 'rgba(232,255,0,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(232,255,0,0.2)';
          }}
        >
          ↑ BACK TO TOP
        </button>
      </div>

      <style>{`
        @keyframes footerPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px var(--accent-secondary); }
          50% { opacity: 0.4; box-shadow: 0 0 4px var(--accent-secondary); }
        }
      `}</style>
    </footer>
  );
}
