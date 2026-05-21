import { useState, useEffect, useCallback, useRef } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_LINKS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills' },
  { id: 'contact',  label: 'Contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

function NavLetter({ char, index }) {
  const [bounce, setBounce] = useState(false);

  const handleHover = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 400);
  };

  return (
    <span
      onMouseEnter={handleHover}
      style={{
        display: 'inline-block',
        transition: `transform 250ms cubic-bezier(0.34,1.56,0.64,1) ${index * 30}ms`,
        transform: bounce ? 'translateY(-4px)' : 'translateY(0)',
        willChange: 'transform',
      }}
    >
      {char}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const activeSection             = useActiveSection(SECTION_IDS);
  const headerRef                 = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <header
      ref={headerRef}
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(7, 9, 15, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '0.5px solid rgba(232,255,0,0.1)'
          : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo('home')}
        aria-label="Scroll to top"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-code)',
          fontSize: '1.1rem',
          color: 'var(--accent-primary)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}>
          SK.
        </span>
        <span style={{
          fontFamily: 'var(--font-code)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          portfolio
        </span>
      </button>

      {/* Desktop Nav */}
      <nav aria-label="Main navigation" style={{ gap: '0.25rem' }}
        className="hidden sm:flex"
      >
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem 0.85rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                letterSpacing: '0.03em',
                position: 'relative',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label.split('').map((char, i) => (
                <NavLetter key={i} char={char} index={i} />
              ))}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '2px',
                  background: 'var(--accent-primary)',
                  borderRadius: '1px',
                  boxShadow: '0 0 8px var(--accent-primary)',
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="navbar-hamburger inline-flex sm:hidden"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(232, 255, 0, 0.15)',
          borderRadius: '8px',
          cursor: 'pointer',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          color: 'var(--accent-primary)',
          transition: 'all 0.3s var(--physics-spring)',
          zIndex: 1001,
          outline: 'none',
          boxShadow: menuOpen ? '0 0 15px rgba(232, 255, 0, 0.15)' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(232, 255, 0, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(232, 255, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.borderColor = 'rgba(232, 255, 0, 0.15)';
        }}
      >
        <div style={{
          position: 'relative',
          width: '20px',
          height: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <span style={{
            width: '20px',
            height: '2px',
            background: 'currentColor',
            borderRadius: '2px',
            transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'center',
          }} />
          <span style={{
            width: '20px',
            height: '2px',
            background: 'currentColor',
            borderRadius: '2px',
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? 'scaleX(0)' : 'none',
            transition: 'opacity 0.2s, transform 0.2s',
            transformOrigin: 'center',
          }} />
          <span style={{
            width: '20px',
            height: '2px',
            background: 'currentColor',
            borderRadius: '2px',
            transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'center',
          }} />
        </div>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`mobile-menu-button ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
