import { useState, useCallback } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useAntigravity } from '../hooks/useAntigravity';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';
import LaunchIcon from '@mui/icons-material/Launch';

const SOCIALS = [
  {
    label: 'GitHub',
    icon: <GitHubIcon style={{ fontSize: '1.2rem' }} />,
    href: 'https://github.com/K-Shalom',
    desc: 'K-Shalom',
    color: 'var(--accent-primary)',
  },
  {
    label: 'LinkedIn',
    icon: <LinkedInIcon style={{ fontSize: '1.2rem' }} />,
    href: 'https://www.linkedin.com/in/shalom-kubwimbabazi/',
    desc: 'shalom-kubwimbabazi',
    color: 'var(--accent-secondary)',
  },
  {
    label: 'Instagram',
    icon: <InstagramIcon style={{ fontSize: '1.2rem' }} />,
    href: 'https://www.instagram.com/k__shalom/',
    desc: 'k__shalom',
    color: 'var(--accent-primary)',
  },
  {
    label: 'WhatsApp',
    icon: <WhatsAppIcon style={{ fontSize: '1.2rem' }} />,
    href: 'https://wa.me/250791293634',
    desc: '+250 791 293 634',
    color: 'var(--accent-secondary)',
  },
  {
    label: 'Email',
    icon: <MailOutlineIcon style={{ fontSize: '1.2rem' }} />,
    href: 'mailto:shalomkubwimbabazi@gmail.com',
    desc: 'shalomkubwimbabazi@gmail.com',
    color: 'var(--accent-primary)',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref: titleRef, activate: activateTitle } = useAntigravity(0);
  const titleTriggerRef = useScrollTrigger(
    useCallback(() => activateTitle(), [activateTitle]),
    null, { threshold: 0.1 }
  );
  const setTitleElementRef = useCallback((el) => {
    titleRef.current = el;
    titleTriggerRef.current = el;
  }, [titleRef, titleTriggerRef]);

  const { ref: formRef, activate: activateForm } = useAntigravity(150);
  const formTriggerRef = useScrollTrigger(
    useCallback(() => activateForm(), [activateForm]),
    null, { threshold: 0.1 }
  );
  const setFormElementRef = useCallback((el) => {
    formRef.current = el;
    formTriggerRef.current = el;
  }, [formRef, formTriggerRef]);

  const { ref: socialRef, activate: activateSocial } = useAntigravity(250);
  const socialTriggerRef = useScrollTrigger(
    useCallback(() => activateSocial(), [activateSocial]),
    null, { threshold: 0.1 }
  );
  const setSocialElementRef = useCallback((el) => {
    socialRef.current = el;
    socialTriggerRef.current = el;
  }, [socialRef, socialTriggerRef]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setErrors({});

    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setErrors({ general: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }));
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    background: 'var(--bg-surface)',
    border: `1px solid ${hasError ? '#ff4d4d' : 'var(--border-accent)'}`,
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.88rem',
    color: 'var(--text-heading)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  });

  return (
    <section id="contact" className="section-wrapper" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      {/* Glow orb */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,201,167,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
        {/* Header */}
        <div
          ref={setTitleElementRef}
          style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: '4rem' }}
        >
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>// 06. Contact</p>
          <h2 className="section-title">
            Get In <span style={{ color: 'var(--accent-primary)' }}>Touch</span>
          </h2>
          <div className="accent-divider" style={{ maxWidth: '80px', marginTop: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '500px', lineHeight: 1.7 }}>
            Open to collaborations, freelance projects, internships, and conversations about technology.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          {/* Form */}
          <div
            ref={setFormElementRef}
            style={{ opacity: 0, transform: 'translateY(40px)' }}
          >
            {sent && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: 'rgba(0,201,167,0.08)',
                border: '0.5px solid rgba(0,201,167,0.3)',
                borderRadius: '4px',
                fontFamily: 'var(--font-code)',
                fontSize: '0.78rem',
                color: 'var(--accent-secondary)',
              }}>
                ✓ Message sent successfully.
              </div>
            )}

            {errors.general && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: 'rgba(255,77,77,0.08)',
                border: '0.5px solid rgba(255,77,77,0.3)',
                borderRadius: '4px',
                fontFamily: 'var(--font-code)',
                fontSize: '0.78rem',
                color: '#ff4d4d',
              }}>
                ✕ {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--text-primary)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>NAME</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle(errors.name)}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 12px var(--glow-primary)'; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.name ? '#ff4d4d' : 'var(--border-accent)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.name && <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: '#ff4d4d', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>EMAIL</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle(errors.email)}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 12px var(--glow-primary)'; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.email ? '#ff4d4d' : 'var(--border-accent)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.email && <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: '#ff4d4d', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>SUBJECT</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  style={inputStyle(errors.subject)}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 12px var(--glow-primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.subject ? '#ff4d4d' : 'var(--border-accent)'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.subject && <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: '#ff4d4d', marginTop: '0.25rem', display: 'block' }}>{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>MESSAGE</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: '140px' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 12px var(--glow-primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.message ? '#ff4d4d' : 'var(--border-accent)'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.message && <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: '#ff4d4d', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full sm:w-auto" 
                style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                disabled={loading}
              >
                <SendIcon style={{ fontSize: '1rem' }} /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Social Matrix */}
          <div
            ref={setSocialElementRef}
            style={{ opacity: 0, transform: 'translateY(40px)', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              <p style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {'// Social Ecosystem'}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Find me across the digital landscape. Always happy to connect, collaborate, or just talk tech.
              </p>
            </div>

            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="card-lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-surface)',
                  border: '0.5px solid var(--border-accent)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              >
                <span style={{ color: social.color, minWidth: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{social.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{social.label}</div>
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{social.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                  <LaunchIcon style={{ fontSize: '0.85rem' }} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
