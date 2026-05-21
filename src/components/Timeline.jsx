import { useCallback, useRef, useState, useEffect } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import { timelineEvents } from '../data/timeline';
import PHYSICS from '../config/physics';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function TimelineNode({ event, index, isLeft }) {
  const nodeRef = useRef(null);
  const contentRef = useRef(null);
  const { ref: antigravRef, activate } = useAntigravity(index * 120);
  const [popped, setPopped] = useState(false);

  const triggerRef = useScrollTrigger(
    useCallback(() => {
      activate();
      if (!prefersReducedMotion()) {
        setTimeout(() => setPopped(true), index * 120);
      } else {
        setPopped(true);
      }
    }, [activate, index]),
    null,
    { threshold: 0.2 }
  );

  return (
    <div
      ref={(el) => { antigravRef.current = el; triggerRef.current = el; contentRef.current = el; }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        gap: 0,
        alignItems: 'flex-start',
        opacity: 0,
        transform: 'translateY(40px)',
        marginBottom: '2rem',
      }}
    >
      {/* Left content */}
      <div style={{ paddingRight: '2rem', textAlign: 'right', paddingTop: '0.25rem' }}>
        {isLeft ? (
          <NodeContent event={event} />
        ) : (
          <div style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            paddingTop: '0.5rem',
          }}>
            {event.year}
          </div>
        )}
      </div>

      {/* Center node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div
          ref={nodeRef}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: `1px solid ${popped ? 'var(--accent-primary)' : 'rgba(232,255,0,0.2)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            boxShadow: popped ? '0 0 20px rgba(232,255,0,0.25)' : 'none',
            transform: popped ? 'scale(1)' : 'scale(0)',
            transition: prefersReducedMotion()
              ? 'none'
              : `transform ${PHYSICS.timelineNode.duration}ms ${PHYSICS.timelineNode.easing} ${index * PHYSICS.timelineNode.delay}ms,
                 box-shadow 0.4s ease,
                 border-color 0.4s ease`,
            zIndex: 2,
            flexShrink: 0,
          }}
        >
          {event.icon}
        </div>
      </div>

      {/* Right content */}
      <div style={{ paddingLeft: '2rem', paddingTop: '0.25rem' }}>
        {!isLeft ? (
          <NodeContent event={event} />
        ) : (
          <div style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            paddingTop: '0.5rem',
            textAlign: 'left',
          }}>
            {event.year}
          </div>
        )}
      </div>
    </div>
  );
}

function NodeContent({ event }) {
  return (
    <div style={{
      padding: '1.25rem',
      background: 'var(--bg-surface)',
      border: '0.5px solid var(--border-accent)',
      borderRadius: '4px',
      textAlign: 'left',
    }}>
      <div style={{
        fontFamily: 'var(--font-code)',
        fontSize: '0.68rem',
        color: 'var(--accent-primary)',
        letterSpacing: '0.12em',
        marginBottom: '0.4rem',
      }}>{event.year}</div>
      <h4 style={{
        fontSize: '0.95rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
        lineHeight: 1.3,
      }}>{event.title}</h4>
      <p style={{
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        lineHeight: 1.7,
        marginBottom: '0.75rem',
      }}>{event.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {event.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  const { ref: titleRef, activate: activateTitle } = useAntigravity(0);
  const titleTrigger = useScrollTrigger(
    useCallback(() => activateTitle(), [activateTitle]),
    null, { threshold: 0.1 }
  );

  return (
    <section id="timeline" className="section-wrapper" style={{ background: '#080b12', position: 'relative' }}>
      {/* Background dots */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(232,255,0,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={(el) => { titleRef.current = el; titleTrigger.current = el; }}
          style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '4rem' }}
        >
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>// 03. Journey</p>
          <h2 className="section-title">
            My <span style={{ color: 'var(--accent-primary)' }}>Timeline</span>
          </h2>
          <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '500px', lineHeight: 1.7 }}>
            A gravity-driven roadmap of milestones — each node a chapter in an evolving engineering story.
          </p>
        </div>

        {/* Timeline vertical line + nodes */}
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(232,255,0,0.2) 10%, rgba(232,255,0,0.2) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {/* Mobile vertical line */}
          <div className="md:hidden" style={{
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(232,255,0,0.2) 10%, rgba(232,255,0,0.2) 90%, transparent)',
          }} />

          {/* Desktop timeline */}
          <div className="hidden md:block">
            {timelineEvents.map((event, i) => (
              <TimelineNode
                key={event.year + event.title}
                event={event}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden pl-5 flex flex-col gap-6">
            {timelineEvents.map((event, i) => (
              <MobileTimelineNode key={event.year + event.title} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileTimelineNode({ event, index }) {
  const { ref, activate } = useAntigravity(index * 100);
  const [popped, setPopped] = useState(false);
  const triggerRef = useScrollTrigger(
    useCallback(() => { activate(); setTimeout(() => setPopped(true), index * 100); }, [activate, index]),
    null, { threshold: 0.1 }
  );

  return (
    <div ref={(el) => { ref.current = el; triggerRef.current = el; }}
      style={{ opacity: 0, transform: 'translateY(40px)', position: 'relative' }}>
      {/* Node dot */}
      <div style={{
        position: 'absolute',
        left: '-38px',
        top: '1rem',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: 'var(--bg-surface)',
        border: `1px solid ${popped ? 'var(--accent-primary)' : 'rgba(232,255,0,0.2)'}`,
        boxShadow: popped ? '0 0 12px rgba(232,255,0,0.3)' : 'none',
        transform: popped ? 'scale(1)' : 'scale(0)',
        transition: `transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${index * 100}ms`,
      }} />
      <div style={{
        padding: '1.25rem',
        background: 'var(--bg-surface)',
        border: '0.5px solid var(--border-accent)',
        borderRadius: '4px',
      }}>
        <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>{event.year}</div>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{event.title}</h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.6rem' }}>{event.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {event.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>
      </div>
    </div>
  );
}
