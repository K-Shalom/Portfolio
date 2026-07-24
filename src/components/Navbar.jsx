import { useState, useEffect, useCallback, useRef } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const NAV_LINKS = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'projects',     label: 'Projects' },
  { id: 'articles',     label: 'Articles' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'events',       label: 'Events' },
  { id: 'skills',       label: 'Skills' },
  { id: 'contact',      label: 'Contact' },
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
  const [isDark, setIsDark]       = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const activeSection             = useActiveSection(SECTION_IDS);
  const headerRef                 = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

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
          ? 'var(--navbar-bg)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '0.5px solid var(--navbar-border)'
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
          color: 'var(--navbar-text)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}>
          SK.
        </span>
        <span style={{
          fontFamily: 'var(--font-code)',
          fontSize: '0.65rem',
          color: 'var(--navbar-text)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 0.7,
        }}>
          portfolio
        </span>
      </button>

      {/* Right controls (Nav, Theme Toggle, Hamburger) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Desktop Nav */}
        <nav aria-label="Main navigation" style={{ gap: '0.2rem', alignItems: 'center' }}
          className="hidden md:flex"
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
                  padding: '0.4rem 0.65rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--navbar-text)' : 'var(--navbar-text)',
                  opacity: isActive ? 1 : 0.7,
                  letterSpacing: '0.02em',
                  position: 'relative',
                  transition: 'color 0.2s ease, opacity 0.2s ease',
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
                    background: 'var(--navbar-text)',
                    borderRadius: '1px',
                    boxShadow: '0 0 8px var(--navbar-text)',
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark((d) => !d)}
          aria-label="Toggle theme"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--navbar-border)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--navbar-text)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 0 10px var(--glow-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <LightModeIcon style={{ fontSize: '1.1rem', color: 'var(--accent-secondary)' }} />
          ) : (
            <DarkModeIcon style={{ fontSize: '1.1rem', color: 'var(--accent-primary)' }} />
          )}
        </button>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
        <button
          className="navbar-hamburger inline-flex"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-accent)',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            color: 'var(--accent-primary)',
            transition: 'all 0.3s var(--physics-spring)',
            zIndex: 1001,
            outline: 'none',
            boxShadow: menuOpen ? '0 0 15px var(--glow-primary)' : 'none',
          }}
        >
          <div style={{
            position: 'relative',
            width: '18px',
            height: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <span style={{
              width: '18px',
              height: '2px',
              background: 'currentColor',
              borderRadius: '2px',
              transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }} />
            <span style={{
              width: '18px',
              height: '2px',
              background: 'currentColor',
              borderRadius: '2px',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              width: '18px',
              height: '2px',
              background: 'currentColor',
              borderRadius: '2px',
              transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }} />
          </div>
        </button>
      </div>
    </div>

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
