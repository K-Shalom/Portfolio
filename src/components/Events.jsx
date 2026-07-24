import { useCallback } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

export default function Events({ events = [] }) {
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
    <section id="events" className="section-wrapper" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={setTitleRef}
          style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '3.5rem' }}
        >
          <p className="section-label" style={{ marginBottom: '0.5rem' }}>// 08. Summits, Hackathons & Expos</p>
          <h2 className="section-title">
            Events Attended & <span style={{ color: 'var(--accent-primary)' }}>Activities</span>
          </h2>
          <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '0.75rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '520px', lineHeight: 1.7 }}>
            A timeline of technology conferences, hackathons, hardware expositions, and developer summits attended across Rwanda and East Africa.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((evt, idx) => (
            <EventCard key={evt.id || idx} event={evt} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }) {
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
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {event.coverImage && (
        <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={event.coverImage}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', top: '0.75rem', left: '0.75rem',
            background: 'var(--bg-surface)', padding: '0.2rem 0.6rem',
            borderRadius: '3px', fontFamily: 'var(--font-code)', fontSize: '0.65rem',
            color: 'var(--accent-primary)', border: '0.5px solid var(--border-accent)',
          }}>
            {event.category || 'EVENT'}
          </div>
        </div>
      )}

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <LocationOnIcon style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }} /> {event.location}
          </span>
          <span style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <EventIcon style={{ fontSize: '0.8rem' }} /> {event.date}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.02rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: 1.35 }}>
          {event.title}
        </h3>

        <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--accent-secondary)', marginBottom: '0.75rem' }}>
          Role: {event.role} ({event.organization})
        </div>

        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem', flexGrow: 1 }}>
          {event.description}
        </p>

        {event.highlights && event.highlights.length > 0 && (
          <div style={{ borderTop: '0.5px solid var(--border-surface)', paddingTop: '0.75rem', marginTop: 'auto' }}>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              // Key Highlights
            </div>
            <ul style={{ paddingLeft: '1rem', margin: 0 }}>
              {event.highlights.map((h, i) => (
                <li key={i} style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
