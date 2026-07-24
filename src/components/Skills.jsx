import { useCallback } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import { useSkillBar } from '../hooks/useSkillBar';
import { skillGroups } from '../data/skills';

function SkillBar({ name, level, delay }) {
  const { barRef, animate } = useSkillBar(level, delay);
  const containerRef = useScrollTrigger(
    useCallback(() => animate(), [animate]),
    null, { threshold: 0.1, once: true }
  );

  return (
    <div ref={containerRef} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--accent-primary)' }}>{level}%</span>
      </div>
      {/* Track */}
      <div style={{
        height: '4px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Fill */}
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, var(--accent-teal), #65d4c2)',
            borderRadius: '2px',
            boxShadow: '0 0 8px rgba(79, 184, 168, 0.4)',
            position: 'relative',
          }}
        >
          {/* Shimmer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </div>
  );
}

function SkillGroup({ group, groupIndex }) {
  const { ref: antigravRef, activate } = useAntigravity(groupIndex * 100);
  const triggerRef = useScrollTrigger(
    useCallback(() => activate(), [activate]),
    null, { threshold: 0.1 }
  );

  const setGroupRef = useCallback((el) => {
    antigravRef.current = el;
    triggerRef.current = el;
  }, [antigravRef, triggerRef]);

  return (
    <div
      ref={setGroupRef}
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        background: 'var(--bg-surface)',
        border: '0.5px solid var(--border-accent)',
        borderRadius: '6px',
        padding: '1.75rem',
      }}
    >
      {/* Group header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{group.icon}</span>
        <span style={{
          fontFamily: 'var(--font-code)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>{group.category}</span>
      </div>

      {/* Skill bars */}
      {group.skills.map((skill, si) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          delay={groupIndex * 100 + si * 80}
        />
      ))}
    </div>
  );
}

export default function Skills() {
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
    <section id="skills" className="section-wrapper" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          ref={setTitleRef}
          style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '4rem' }}
        >
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>// 05. Skills</p>
          <h2 className="section-title">
            Calibrated <span style={{ color: 'var(--accent-primary)' }}>Metrics</span>
          </h2>
          <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '500px', lineHeight: 1.7 }}>
            Skill proficiency mapped across full-stack, embedded, and infrastructure domains.
          </p>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <SkillGroup key={group.category} group={group} groupIndex={gi} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
