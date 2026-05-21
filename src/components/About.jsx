import { useCallback } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';

const techMatrix = [
  { category: 'Frontend Systems',       icon: '◈', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS'] },
  { category: 'Backend Systems',        icon: '⬡', items: ['Java', 'Spring Boot', 'PHP', 'Node.js', 'REST APIs', 'Spring Security'] },
  { category: 'Embedded & IoT',         icon: '⬢', items: ['Arduino', 'IoT Systems', 'Sensors', 'Wokwi', 'Relay Modules', 'Servo'] },
  { category: 'Databases',              icon: '◆', items: ['MySQL', 'Oracle DB', 'JDBC', 'ERD Modeling', 'SQL'] },
  { category: 'Infrastructure & Tools', icon: '◇', items: ['Git', 'GitHub', 'Linux CLI', 'VS Code', 'GitHub Actions'] },
  { category: 'Design & Creative',      icon: '◉', items: ['Figma', 'UI/UX Thinking', 'Responsive Design'] },
];

const philosophyPoints = [
  { icon: '◈', title: 'Precision Engineering', desc: 'Every system I build is crafted with attention to detail, clean architecture, and long-term maintainability.' },
  { icon: '⬡', title: 'Human-Centered Design', desc: 'Technology only succeeds when it serves people intuitively. I design for clarity, accessibility, and delight.' },
  { icon: '◆', title: 'Continuous Evolution', desc: 'The best engineers are perpetual students. I stay at the frontier of emerging technologies and paradigms.' },
  { icon: '◇', title: 'Systems Thinking', desc: 'I approach every problem holistically — understanding how components interact at every layer of the stack.' },
];

function RevealBlock({ children, delay = 0 }) {
  const { ref, activate } = useAntigravity(delay);
  const triggerRef = useScrollTrigger(
    useCallback(() => activate(), [activate]),
    null,
    { threshold: 0.1 }
  );

  return (
    <div ref={(el) => { ref.current = el; triggerRef.current = el; }}
      style={{ opacity: 0, transform: 'translateY(40px)' }}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-wrapper" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      {/* Label */}
      <div style={{ marginBottom: '4rem' }}>
        <RevealBlock>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>// 02. Core DNA</p>
          <h2 className="section-title">
            Who I <span style={{ color: 'var(--accent-primary)' }}>Am</span>
          </h2>
          <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '1rem' }} />
        </RevealBlock>
      </div>

      {/* Two-column asymmetric grid */}
      <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr]" style={{ marginBottom: '5rem' }}>
        {/* Who I Am */}
        <RevealBlock delay={100}>
          <div style={{ padding: '2rem', background: 'var(--bg-surface)', border: '0.5px solid var(--border-accent)', borderRadius: '4px' }}>
            <h3 style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.75rem',
              color: 'var(--accent-primary)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>{'_identity'}</h3>

            <p style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              I'm <strong style={{ color: 'var(--accent-primary)' }}>Shalom Kubwimbabazi</strong>, an Advanced IT scholar at
              Rwanda Polytechnic – Karongi College. I engineer enterprise-grade applications,
              scalable backend systems, and embedded automation solutions.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>
              My passion lives at the intersection of software engineering precision and creative
              design thinking — building systems that are as elegant as they are performant.
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Location', value: 'Rwanda' },
                { label: 'Institution', value: 'Rwanda Polytechnic – Karongi' },
                { label: 'Focus', value: 'Full-Stack + Embedded Systems' },
                { label: 'Status', value: 'Available for Collaboration' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--text-muted)', minWidth: '90px', marginTop: '2px' }}>{label}:</span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--accent-secondary)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* Vision & Goals */}
        <RevealBlock delay={200}>
          <div style={{ padding: '2rem', background: 'var(--bg-surface)', border: '0.5px solid rgba(0,201,167,0.15)', borderRadius: '4px' }}>
            <h3 style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.75rem',
              color: 'var(--accent-secondary)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>{'_vision'}</h3>

            <p style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              I'm interested in intelligent digital systems, human-centered interfaces, and
              next-generation software experiences that combine engineering precision with
              creative design thinking.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              My goal is to architect integrated ecosystems that bridge embedded hardware intelligence
              with sophisticated cloud-connected software platforms.
            </p>

            <div style={{
              padding: '1rem',
              background: 'rgba(0,201,167,0.05)',
              border: '0.5px solid rgba(0,201,167,0.15)',
              borderRadius: '4px',
              fontFamily: 'var(--font-code)',
              fontSize: '0.78rem',
              color: 'var(--accent-secondary)',
              lineHeight: 1.7,
            }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{'// Engineering Mindset'}</div>
              <div>Build → Break → Learn → Improve</div>
              <div style={{ color: 'var(--text-muted)' }}>while(alive) {'{'} ship_better_code(); {'}'}</div>
            </div>
          </div>
        </RevealBlock>
      </div>

      {/* Engineering Philosophy */}
      <RevealBlock delay={100}>
        <p className="section-label" style={{ marginBottom: '0.75rem' }}>// Engineering Philosophy</p>
        <div className="grid gap-5 sm:grid-cols-2" style={{ marginBottom: '4rem' }}>
          {philosophyPoints.map((point, i) => (
            <RevealBlock key={point.title} delay={i * 80}>
              <div className="card-lift" style={{
                padding: '1.5rem',
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border-accent)',
                borderRadius: '4px',
                height: '100%',
              }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.75rem' }}>{point.icon}</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{point.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{point.desc}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </RevealBlock>

      {/* Technology Matrix */}
      <RevealBlock>
        <p className="section-label" style={{ marginBottom: '0.75rem' }}>// Technology Matrix</p>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '2rem',
        }}>Full Ecosystem <span style={{ color: 'var(--accent-primary)' }}>Overview</span></h3>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {techMatrix.map((group, gi) => (
            <RevealBlock key={group.category} delay={gi * 70}>
              <div style={{
                padding: '1.25rem',
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border-accent)',
                borderRadius: '4px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '1rem' }}>{group.icon}</span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{group.category}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {group.items.map((item) => (
                    <span key={item} className="tag-pill">{item}</span>
                  ))}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </RevealBlock>
    </section>
  );
}
