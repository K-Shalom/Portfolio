import { useState, useCallback } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Certificates({ certificates = [] }) {
  const [activeCert, setActiveCert] = useState(null);

  const { ref: titleRef, activate: activateTitle } = useAntigravity(0);
  const titleTriggerRef = useScrollTrigger(
    useCallback(() => activateTitle(), [activateTitle]),
    null, { threshold: 0.1 }
  );

  const setTitleRef = useCallback((el) => {
    titleRef.current = el;
    titleTriggerRef.current = el;
  }, [titleRef, titleTriggerRef]);

  return (
    <section id="certificates" className="section-wrapper" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={setTitleRef}
          style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '3.5rem' }}
        >
          <p className="section-label" style={{ marginBottom: '0.5rem' }}>// 07. Verification & Accreditations</p>
          <h2 className="section-title">
            Certificates & <span style={{ color: 'var(--accent-secondary)' }}>Achievements</span>
          </h2>
          <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '0.75rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '520px', lineHeight: 1.7 }}>
            Verified technical certifications, diplomas, and academic honors earned across full-stack, database, and embedded hardware domains.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {certificates.map((cert, idx) => (
            <CertificateCard
              key={cert.id || idx}
              cert={cert}
              index={idx}
              onVerify={() => setActiveCert(cert)}
            />
          ))}
        </div>
      </div>

      {/* Verification Modal */}
      {activeCert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 7, 12, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setActiveCert(null)}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--accent-secondary)',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 0 40px rgba(0, 201, 167, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCert(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '0.5px solid var(--border-accent)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'var(--accent-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloseIcon style={{ fontSize: '1.2rem' }} />
            </button>

            {activeCert.coverImage && (
              <img
                src={activeCert.coverImage}
                alt={activeCert.title}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '1.5rem',
                  border: '0.5px solid rgba(0,201,167,0.3)',
                }}
              />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <VerifiedIcon style={{ color: 'var(--accent-secondary)', fontSize: '1.2rem' }} />
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--accent-secondary)', letterSpacing: '0.1em' }}>
                VERIFIED CREDENTIAL
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {activeCert.title}
            </h3>

            <p style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Issued by: <strong style={{ color: 'var(--text-primary)' }}>{activeCert.issuer}</strong> ({activeCert.issueDate})
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '4px', border: '0.5px solid var(--border-accent)', marginBottom: '1.5rem', fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div>Credential ID: <span style={{ color: 'var(--accent-primary)' }}>{activeCert.credentialId}</span></div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <a
                href={activeCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ background: 'var(--accent-secondary)', color: '#07090f', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <LaunchIcon style={{ fontSize: '0.95rem' }} /> Open Official Verification
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CertificateCard({ cert, index, onVerify }) {
  const { ref: antigravRef, activate } = useAntigravity(index * 90);
  const triggerRef = useScrollTrigger(
    useCallback(() => activate(), [activate]),
    null, { threshold: 0.1 }
  );

  const setCardRef = useCallback((el) => {
    antigravRef.current = el;
    triggerRef.current = el;
  }, [antigravRef, triggerRef]);

  return (
    <div
      ref={setCardRef}
      className="card-lift"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        background: 'var(--bg-surface)',
        border: '0.5px solid var(--border-accent)',
        borderRadius: '6px',
        padding: '1.5rem',
        display: 'flex',
        gap: '1.25rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {cert.coverImage && (
        <img
          src={cert.coverImage}
          alt={cert.title}
          style={{
            width: '100px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '4px',
            border: '0.5px solid rgba(0,201,167,0.3)',
            flexShrink: 0,
          }}
        />
      )}

      <div style={{ flexGrow: 1, minWidth: '220px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--accent-secondary)', letterSpacing: '0.08em' }}>
            [{cert.category || 'CERTIFICATION'}]
          </span>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            • {cert.issueDate}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          {cert.title}
        </h3>

        <p style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          {cert.issuer}
        </p>

        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {cert.skills && cert.skills.map((s) => (
            <span key={s} className="tag-pill-teal" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem' }}>
              {s}
            </span>
          ))}
        </div>

        <button
          onClick={onVerify}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            fontFamily: 'var(--font-code)',
            fontSize: '0.72rem',
            color: 'var(--accent-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <VerifiedIcon style={{ fontSize: '0.85rem' }} /> Verify Credential ({cert.credentialId}) <ArrowForwardIcon style={{ fontSize: '0.85rem' }} />
        </button>
      </div>
    </div>
  );
}
