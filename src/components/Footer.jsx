import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--bg-primary)',
        borderTop: '0.5px solid var(--border-accent)',
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
            textShadow: '0 0 20px var(--glow-primary)',
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
            background: 'var(--accent-teal)',
            boxShadow: '0 0 10px var(--accent-teal)',
            animation: 'footerPulse 2.5s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            SYSTEMS ONLINE — Rwanda 🇷🇼
          </span>
        </div>

        {/* Copyright & Subtle Admin Access */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            margin: 0,
          }}>
            © {year} Shalom Kubwimbabazi. Built with React + Spring
          </p>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              aria-label="CMS Admin"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '2px 4px',
                margin: 0,
                color: 'var(--text-muted)',
                opacity: 0.3,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.3')}
              title="Admin CMS"
            >
              <SettingsIcon style={{ fontSize: '0.85rem' }} />
            </button>
          )}
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            background: 'none',
            border: '0.5px solid var(--border-accent)',
            borderRadius: '4px',
            padding: '0.5rem 1.25rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-code)',
            fontSize: '0.68rem',
            color: 'var(--accent-primary)',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            marginTop: '0.25rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 20px var(--glow-primary)';
            e.currentTarget.style.borderColor = 'var(--accent-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--border-accent)';
          }}
        >
          <KeyboardArrowUpIcon style={{ fontSize: '1rem' }} /> BACK TO TOP
        </button>
      </div>

      <style>{`
        @keyframes footerPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px var(--accent-teal); }
          50% { opacity: 0.4; box-shadow: 0 0 4px var(--accent-teal); }
        }
      `}</style>
    </footer>
  );
}
