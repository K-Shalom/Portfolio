import { useState, useCallback } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import { projects } from '../data/projects';

const FILTERS = ['All', 'Web', 'Applications', 'Academic', 'IoT'];

function ProjectCard({ project, index }) {
  const { ref, activate } = useAntigravity(index * 80);
  const triggerRef = useScrollTrigger(
    useCallback(() => activate(), [activate]),
    null, { threshold: 0.08 }
  );

  return (
    <div
      ref={(el) => { ref.current = el; triggerRef.current = el; }}
      className="card-lift"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        background: 'var(--bg-surface)',
        border: '0.5px solid var(--border-accent)',
        borderRadius: '6px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), transparent)',
        opacity: 0.4,
      }} />

      {/* Category badges */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {project.categories.map((cat) => (
          <span key={cat} className="tag-pill-teal" style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.65rem',
            padding: '0.15rem 0.5rem',
            borderRadius: '2px',
            background: 'rgba(0,201,167,0.08)',
            border: '0.5px solid rgba(0,201,167,0.25)',
            color: 'var(--accent-secondary)',
            letterSpacing: '0.05em',
          }}>{cat}</span>
        ))}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.4,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.83rem',
        color: 'var(--text-muted)',
        lineHeight: 1.75,
        flexGrow: 1,
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {project.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 1rem',
            background: 'rgba(232,255,0,0.06)',
            border: '0.5px solid rgba(232,255,0,0.2)',
            borderRadius: '3px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.72rem',
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,255,0,0.12)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(232,255,0,0.06)'; }}
        >
          ⌥ GitHub
        </a>
        {project.live !== '#' && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              background: 'rgba(0,201,167,0.06)',
              border: '0.5px solid rgba(0,201,167,0.2)',
              borderRadius: '3px',
              fontFamily: 'var(--font-code)',
              fontSize: '0.72rem',
              color: 'var(--accent-secondary)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,201,167,0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,201,167,0.06)'; }}
          >
            ↗ Live
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref: titleRef, activate: activateTitle } = useAntigravity(0);
  const titleTrigger = useScrollTrigger(
    useCallback(() => activateTitle(), [activateTitle]),
    null, { threshold: 0.1 }
  );

  const filtered = projects.filter((p) =>
    activeFilter === 'All' || p.categories.includes(activeFilter)
  );

  return (
    <section id="projects" className="section-wrapper" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div
        ref={(el) => { titleRef.current = el; titleTrigger.current = el; }}
        style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '3rem' }}
      >
        <p className="section-label" style={{ marginBottom: '0.75rem' }}>// 04. Projects</p>
        <h2 className="section-title">
          Built <span style={{ color: 'var(--accent-primary)' }}>Systems</span>
        </h2>
        <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '1rem' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '500px', lineHeight: 1.7 }}>
          A curated matrix of production-grade, academic, and experimental engineering projects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3" style={{ marginBottom: '2.5rem' }}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '0.45rem 1.1rem',
                background: isActive ? 'rgba(232,255,0,0.1)' : 'transparent',
                border: `0.5px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '3px',
                fontFamily: 'var(--font-code)',
                fontSize: '0.75rem',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                letterSpacing: '0.05em',
              }}
            >
              {filter}
              {isActive && (
                <span style={{ marginLeft: '0.4rem', opacity: 0.6 }}>
                  [{filtered.length}]
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* GitHub CTA */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a
          href="https://github.com/K-Shalom"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          ⌥ View All on GitHub
        </a>
      </div>
    </section>
  );
}
