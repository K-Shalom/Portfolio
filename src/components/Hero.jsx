import { useState, useEffect } from 'react';
import { useFloatLoop } from '../hooks/useFloatLoop';
import PHYSICS from '../config/physics';
import heroAsset from '../assets/hero.png';
import TextScramble from './TextScramble';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SchoolIcon from '@mui/icons-material/School';
import PaletteIcon from '@mui/icons-material/Palette';

const ROLES = [
  'Advanced Full-Stack Developer',
  'Embedded Systems Enthusiast',
  'Creative Thinker',
  'Enterprise Application Engineer',
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function RotatingSubtitle() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const { intervalMs, fadeDuration } = PHYSICS.subtitleRotation;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setFading(false);
      }, fadeDuration);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [fadeDuration, intervalMs]);

  return (
    <span
      style={{
        color: 'var(--accent-secondary)',
        fontFamily: 'var(--font-code)',
        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
        fontWeight: 400,
        display: 'inline-block',
        opacity: fading ? 0 : 1,
        transform: fading ? 'translateY(6px)' : 'translateY(0)',
        transition: `opacity ${fadeDuration}ms ease, transform ${fadeDuration}ms ease`,
      }}
    >
      {ROLES[index]}
    </span>
  );
}

export default function Hero() {
  const floatRef = useFloatLoop();
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCtaVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="section-wrapper"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Radial glow center */}
      <div style={{
        position: 'absolute', top: '40%', left: '30%',
        transform: 'translate(-50%,-50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Inner container */}
      <div 
        className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >

        {/* ── LEFT COLUMN (content) ── */}
        <div style={{
          flex: '1 1 540px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
          minWidth: 0,
          marginLeft: '1rem',          animation: 'heroEntrance 0.9s ease-out both',        }}>

          {/* Available badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--accent-teal)',
              boxShadow: '0 0 14px var(--accent-teal)',
              flexShrink: 0,
              animation: 'heroPulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.7rem',
              color: 'var(--accent-teal)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}>
              Available for Work
            </span>
          </div>

          {/* Code comment */}
          <span style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}>
            {'// Hello, World — I\'m'}
          </span>

          {/* Name */}
          <div style={{ lineHeight: 1.0, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
            <TextScramble
              text="Shalom K."
              autoStart={true}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3.2rem, 7vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--accent-primary)',
                textShadow: '0 0 25px var(--glow-primary)',
              }}
            />
            
          </div>

          {/* Role label + rotating subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              _role:
            </span>
            <RotatingSubtitle />
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.875rem, 1.8vw, 1rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.8,
            maxWidth: '560px',
            marginTop: '1rem',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            Advanced IT scholar at Rwanda Polytechnic – Karongi College,
            specialized in enterprise application engineering, scalable backend
            systems, embedded automation, and modern software architecture.
            Interested in intelligent digital systems and human-centered interfaces.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}>
            <button
              onClick={() => scrollTo('projects')}
              id="hero-cta-work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.6rem',
                background: 'var(--accent-primary)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.875rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ◈ View My Work
            </button>

            <button
              onClick={() => scrollTo('contact')}
              id="hero-cta-contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.6rem',
                background: 'transparent',
                color: 'var(--accent-secondary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '1px solid rgba(96, 165, 250, 0.4)',
                borderRadius: '4px',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.08)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(96, 165, 250, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              → Get In Touch
            </button>
          </div>

          {/* Stack pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            opacity: ctaVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.3s',
          }}>
            <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>STACK:</span>
            {['Java', 'Spring Boot', 'React', 'PHP', 'Arduino', 'MySQL'].map((tech) => (
              <span key={tech} style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.68rem',
                padding: '0.18rem 0.55rem',
                borderRadius: '2px',
                background: 'var(--glow-secondary)',
                border: '0.5px solid var(--border-accent)',
                color: 'var(--accent-primary)',
                letterSpacing: '0.04em',
              }}>{tech}</span>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN (floating orb with orbits) ── */}
        <div
          ref={floatRef}
          style={{
            flex: '0 0 280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hidden lg:flex"
        >
          <div style={{
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            border: '1px solid rgba(232,255,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 0 80px rgba(232,255,0,0.07), inset 0 0 60px rgba(232,255,0,0.03)',
            animation: 'heroOrbPulse 8s ease-in-out infinite',
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'rgba(14,17,23,0.05)',
              border: '0.5px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src="/profile.jpeg"
                alt="Shalom profile photo"
                onError={(e) => {
                  e.currentTarget.src = heroAsset;
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Orbit Ring 1 - Code */}
            <div style={{
              position: 'absolute',
              width: '310px', height: '310px',
              borderRadius: '50%',
              border: '0.5px dashed var(--border-accent)',
              animation: 'heroSpin 20s linear infinite',
            }} />

            {/* Orbit Icon 1 - Code */}
            <div style={{
              position: 'absolute',
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'var(--glow-secondary)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'heroOrbit1 20s linear infinite',
              backdropFilter: 'blur(10px)',
            }}>
              <CodeIcon sx={{ fontSize: '16px', color: 'var(--accent-primary)' }} />
            </div>

            {/* Orbit Ring 2 - Database */}
            <div style={{
              position: 'absolute',
              width: '350px', height: '350px',
              borderRadius: '50%',
              border: '0.5px dotted var(--border-accent)',
              animation: 'heroSpin 28s linear infinite reverse',
            }} />

            {/* Orbit Icon 2 - Storage */}
            <div style={{
              position: 'absolute',
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'var(--glow-secondary)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'heroOrbit2 28s linear infinite reverse',
              backdropFilter: 'blur(10px)',
            }}>
              <StorageIcon sx={{ fontSize: '16px', color: 'var(--accent-primary)' }} />
            </div>

            {/* Orbit Ring 3 - Learning */}
            <div style={{
              position: 'absolute',
              width: '390px', height: '390px',
              borderRadius: '50%',
              border: '0.5px dashed var(--border-accent)',
              animation: 'heroSpin 35s linear infinite',
            }} />

            {/* Orbit Icon 3 - School */}
            <div style={{
              position: 'absolute',
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'var(--glow-secondary)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'heroOrbit3 35s linear infinite',
              backdropFilter: 'blur(10px)',
            }}>
              <SchoolIcon sx={{ fontSize: '16px', color: 'var(--accent-primary)' }} />
            </div>

            {/* Orbit Ring 4 - Design */}
            <div style={{
              position: 'absolute',
              width: '430px', height: '430px',
              borderRadius: '50%',
              border: '0.5px dotted var(--border-accent)',
              animation: 'heroSpin 42s linear infinite reverse',
            }} />

            {/* Orbit Icon 4 - Design */}
            <div style={{
              position: 'absolute',
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'var(--glow-secondary)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'heroOrbit4 42s linear infinite reverse',
              backdropFilter: 'blur(10px)',
            }}>
              <PaletteIcon sx={{ fontSize: '16px', color: 'var(--accent-primary)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="hidden sm:flex"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          opacity: ctaVisible ? 0.9 : 0,
          transition: 'opacity 1s ease 1s',
        }}
      >
        <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.62rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.14em' }}>SCROLL</span>
        <div style={{
          width: '2px', height: '36px',
          background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
          animation: 'heroScrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes heroSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroOrbit1 {
          0%   { transform: rotate(0deg) translateX(155px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(155px) rotate(-360deg); }
        }
        @keyframes heroOrbit2 {
          0%   { transform: rotate(0deg) translateX(175px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(175px) rotate(-360deg); }
        }
        @keyframes heroOrbit3 {
          0%   { transform: rotate(0deg) translateX(195px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(195px) rotate(-360deg); }
        }
        @keyframes heroOrbit4 {
          0%   { transform: rotate(0deg) translateX(215px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(215px) rotate(-360deg); }
        }
        @keyframes heroOrbPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes heroEntrance {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroScrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
