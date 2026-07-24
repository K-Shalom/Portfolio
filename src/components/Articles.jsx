import { useState, useCallback } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Articles({ articles = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
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

  const filteredArticles = articles.filter((art) => {
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      (art.tags && art.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <section id="articles" className="section-wrapper" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      {/* Background ambient mesh */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, var(--glow-primary), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={setTitleRef}
          style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '0.5rem' }}>// 06. Insights & Engineering Notes</p>
              <h2 className="section-title">
                Articles & <span style={{ color: 'var(--accent-primary)' }}>Publications</span>
              </h2>
              <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '0.75rem' }} />
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <input
                type="text"
                placeholder="Search articles & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem 0.6rem 2.2rem',
                  background: 'var(--bg-surface)',
                  border: '0.5px solid var(--border-accent)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
              <SearchIcon style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1rem' }} />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, idx) => (
            <ArticleCard
              key={article.id || idx}
              article={article}
              index={idx}
              onSelect={() => setSelectedArticle(article)}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', fontSize: '0.85rem' }}>
            No articles found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
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
          onClick={() => setSelectedArticle(null)}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-accent)',
              borderRadius: '8px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 0 40px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
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

            {selectedArticle.coverImage && (
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
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

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--accent-primary)' }}>
                {selectedArticle.date}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--accent-secondary)' }}>
                {selectedArticle.readTime || '5 min read'}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '1rem', lineHeight: 1.3 }}>
              {selectedArticle.title}
            </h3>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {selectedArticle.tags && selectedArticle.tags.map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>

            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.92rem',
              color: 'var(--text-primary)',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              borderTop: '0.5px solid var(--border-accent)',
              paddingTop: '1.25rem',
            }}>
              {selectedArticle.content || selectedArticle.summary}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ArticleCard({ article, index, onSelect }) {
  const { ref: antigravRef, activate } = useAntigravity(index * 120);
  const triggerRef = useScrollTrigger(
    useCallback(() => activate(), [activate]),
    null, { threshold: 0.1 }
  );

  const [isHovered, setIsHovered] = useState(false);

  const setCardRef = useCallback((el) => {
    antigravRef.current = el;
    triggerRef.current = el;
  }, [antigravRef, triggerRef]);

  return (
    <div
      ref={setCardRef}
      className="card-lift"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        background: 'var(--bg-surface)',
        border: '0.5px solid var(--border-accent)',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.5), 0 0 20px var(--glow-primary)' : 'none',
      }}
    >
      {article.coverImage && (
        <div style={{ height: '165px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={article.coverImage}
            alt={article.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.12)' : 'scale(1.0)',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            background: 'var(--bg-surface)', padding: '0.25rem 0.65rem',
            borderRadius: '4px', fontFamily: 'var(--font-code)', fontSize: '0.65rem',
            color: 'var(--accent-primary)', border: '0.5px solid var(--border-accent)',
            boxShadow: '0 0 10px var(--glow-primary)',
            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          }}>
            <AccessTimeIcon style={{ fontSize: '0.8rem' }} /> {article.readTime || '5 min'}
          </div>
        </div>
      )}

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontFamily: 'var(--font-code)',
          fontSize: '0.7rem',
          color: 'var(--accent-secondary)',
          background: 'rgba(0,201,167,0.08)',
          padding: '0.2rem 0.5rem',
          borderRadius: '3px',
          border: '0.5px solid rgba(0,201,167,0.2)',
          width: 'fit-content',
          marginBottom: '0.75rem',
        }}>
          <CalendarTodayIcon style={{ fontSize: '0.75rem' }} /> {article.date}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.98rem',
          fontWeight: 600,
          color: isHovered ? 'var(--accent-primary)' : 'var(--text-primary)',
          marginBottom: '0.6rem',
          lineHeight: 1.35,
          transition: 'color 0.2s ease',
        }}>
          {article.title}
        </h3>

        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1, marginBottom: '1rem' }}>
          {article.summary}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {article.tags && article.tags.slice(0, 2).map((t) => (
              <span key={t} className="tag-pill" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem' }}>{t}</span>
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>Read Article <ArrowForwardIcon style={{ fontSize: '0.8rem' }} /></span>
        </div>
      </div>
    </div>
  );
}
