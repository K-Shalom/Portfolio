import { useState, useCallback, useRef } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const FILTERS = ['All', 'Web', 'Applications', 'Academic', 'IoT'];

function ProjectCard({ project, index, onSelect }) {
  const { ref: antigravRef, activate } = useAntigravity(index * 70);
  const triggerRef = useScrollTrigger(
    useCallback(() => activate(), [activate]),
    null, { threshold: 0.08 }
  );

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isImgHovered, setIsImgHovered] = useState(false);
  const containerRef = useRef(null);

  const setCardRef = useCallback((el) => {
    antigravRef.current = el;
    triggerRef.current = el;
    containerRef.current = el;
  }, [antigravRef, triggerRef]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    setIsImgHovered(false);
  };

  return (
    <div
      ref={setCardRef}
      className="card-lift"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: 0,
        transform: `perspective(1000px) translateY(40px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease, opacity 0.5s ease' : 'transform 0.1s ease-out, opacity 0.5s ease',
        background: 'var(--bg-surface)',
        border: '0.5px solid var(--border-accent)',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: tilt.x !== 0 ? '0 15px 35px rgba(0,0,0,0.5), 0 0 20px var(--glow-primary)' : 'none',
      }}
    >
      {/* Dynamic Glare Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, var(--glow-primary), transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), transparent)',
        opacity: 0.6,
        zIndex: 2,
      }} />

      {/* Project Cover Image */}
      {project.coverImage && (
        <div
          onClick={() => onSelect(project)}
          onMouseEnter={() => setIsImgHovered(true)}
          style={{ height: '170px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isImgHovered ? 'scale(1.12)' : 'scale(1.0)',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,9,15,0.9) 0%, transparent 60%)',
          }} />

          {/* Languages Badges Overlay */}
          <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {project.languages && project.languages.map((lang) => (
              <span key={lang} style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.62rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '2px',
                background: 'var(--glow-secondary)',
                border: '0.5px solid var(--border-accent)',
                color: 'var(--accent-primary)',
                fontWeight: 600,
              }}>
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.85rem' }}>
        {/* Category badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {project.categories && project.categories.map((cat) => (
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
        <h3
          onClick={() => onSelect(project)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.02rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            cursor: 'pointer',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.83rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          flexGrow: 1,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {project.tags && project.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '0.5px solid var(--border-accent)',
                borderRadius: '3px',
                fontFamily: 'var(--font-code)',
                fontSize: '0.72rem',
                color: 'var(--accent-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <GitHubIcon style={{ fontSize: '0.9rem' }} /> GitHub
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                background: 'rgba(0,201,167,0.06)',
                border: '0.5px solid rgba(0,201,167,0.2)',
                borderRadius: '3px',
                fontFamily: 'var(--font-code)',
                fontSize: '0.72rem',
                color: 'var(--accent-secondary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <LaunchIcon style={{ fontSize: '0.9rem' }} /> Live
            </a>
          )}
          <button
            onClick={() => onSelect(project)}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-code)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <InfoOutlinedIcon style={{ fontSize: '0.85rem' }} /> Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { ref: titleRef, activate: activateTitle } = useAntigravity(0);
  const titleTriggerRef = useScrollTrigger(
    useCallback(() => activateTitle(), [activateTitle]),
    null, { threshold: 0.1 }
  );

  const setTitleRef = useCallback((el) => {
    titleRef.current = el;
    titleTriggerRef.current = el;
  }, [titleRef, titleTriggerRef]);

  const filtered = projects.filter((p) => {
    const matchesFilter = activeFilter === 'All' || (p.categories && p.categories.includes(activeFilter));
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
      (p.languages && p.languages.some((l) => l.toLowerCase().includes(q)));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="section-wrapper" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div
        ref={setTitleRef}
        style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '3rem' }}
      >
        <p className="section-label" style={{ marginBottom: '0.75rem' }}>// 04. Systems & Codebase</p>
        <h2 className="section-title">
          Engineering <span style={{ color: 'var(--accent-primary)' }}>Projects</span>
        </h2>
        <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '1rem' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '520px', lineHeight: 1.7 }}>
          A curated catalog of enterprise applications, embedded hardware IoT systems, and full-stack solutions.
        </p>
      </div>

      {/* Controls Bar: Filters + Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
                style={{
                  padding: '0.45rem 1.1rem',
                  background: isActive ? 'var(--glow-secondary)' : 'transparent',
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
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', minWidth: '220px' }}>
          <input
            type="text"
            placeholder="Search projects or languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.85rem 0.5rem 2rem',
              background: 'var(--bg-surface)',
              border: '0.5px solid var(--border-accent)',
              borderRadius: '4px',
              fontFamily: 'var(--font-code)',
              fontSize: '0.75rem',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <SearchIcon style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1rem' }} />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id || i} project={project} index={i} onSelect={setSelectedProject} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', fontSize: '0.85rem' }}>
          No projects found matching the filter criteria.
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
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
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--accent-primary)',
              borderRadius: '8px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 0 40px var(--glow-primary)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '0.5px solid var(--border-accent)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'var(--accent-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloseIcon style={{ fontSize: '1.2rem' }} />
            </button>

            {selectedProject.coverImage && (
              <img
                src={selectedProject.coverImage}
                alt={selectedProject.title}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '1.5rem',
                  border: '0.5px solid var(--border-accent)',
                }}
              />
            )}

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              {selectedProject.title}
            </h3>

            {selectedProject.languages && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {selectedProject.languages.map((l) => (
                  <span key={l} style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '3px', background: 'var(--glow-secondary)', color: 'var(--accent-primary)', border: '0.5px solid var(--border-accent)' }}>
                    {l}
                  </span>
                ))}
              </div>
            )}

            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {selectedProject.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {selectedProject.github && selectedProject.github !== '#' && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GitHubIcon style={{ fontSize: '1.1rem' }} /> View Source Code on GitHub
                </a>
              )}
              {selectedProject.live && selectedProject.live !== '#' && (
                <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LaunchIcon style={{ fontSize: '1.1rem' }} /> Launch Live System
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
