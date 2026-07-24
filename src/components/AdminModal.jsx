import { useState } from 'react';

export default function AdminModal({ isOpen, onClose, cms }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [codeRequested, setCodeRequested] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [requestMsg, setRequestMsg] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  // New item creation form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    coverImage: '',
    description: '',
    tags: '',
    languages: '',
    categories: 'Web, Applications',
    github: '',
    live: '',
    featured: false,
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    coverImage: '',
    summary: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    tags: 'Java, Architecture',
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issueDate: new Date().toISOString().slice(0, 7),
    credentialId: '',
    credentialUrl: '',
    coverImage: '',
    category: 'Full-Stack',
    skills: 'Java, React',
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    organization: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    role: '',
    coverImage: '',
    description: '',
    highlights: '',
  });

  // Edit states for existing items
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectForm, setEditProjectForm] = useState({});

  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editArticleForm, setEditArticleForm] = useState({});

  const [editingCertId, setEditingCertId] = useState(null);
  const [editCertForm, setEditCertForm] = useState({});

  const [editingEventId, setEditingEventId] = useState(null);
  const [editEventForm, setEditEventForm] = useState({});

  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleRequestCode = async () => {
    setSendingCode(true);
    setRequestMsg('');
    setVerifyError('');
    try {
      const res = await fetch('/api/request-admin-code', { method: 'POST' });
      const data = await res.json();
      setSendingCode(false);
      setCodeRequested(true);
      if (data.demoCode) {
        setPasscode(data.demoCode);
      }
      if (data.message) {
        setRequestMsg(data.message);
      } else {
        setRequestMsg('Verification passcode requested!');
      }
    } catch (err) {
      console.error('Error requesting admin code:', err);
      setSendingCode(false);
      setVerifyError('Could not request passcode. Please try again.');
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!passcode) return;
    setVerifyError('');
    try {
      const res = await fetch('/api/verify-admin-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: passcode }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuthenticated(true);
        setVerifyError('');
      } else {
        setVerifyError(data.error || 'Invalid or expired passcode. Please request a new code.');
      }
    } catch (err) {
      console.error('Error verifying code:', err);
      setVerifyError('Server verification error. Please try again.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPasscode('');
    setCodeRequested(false);
    setRequestMsg('');
    setVerifyError('');
    setStatusMsg('Logged out of CMS admin');
    setTimeout(() => setStatusMsg(''), 2000);
  };

  // --- CREATE HANDLERS ---
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title) return;
    await cms.addProject({
      ...projectForm,
      tags: typeof projectForm.tags === 'string' ? projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : projectForm.tags,
      languages: typeof projectForm.languages === 'string' ? projectForm.languages.split(',').map((l) => l.trim()).filter(Boolean) : projectForm.languages,
      categories: typeof projectForm.categories === 'string' ? projectForm.categories.split(',').map((c) => c.trim()).filter(Boolean) : projectForm.categories,
    });
    setProjectForm({
      title: '',
      coverImage: '',
      description: '',
      tags: '',
      languages: '',
      categories: 'Web, Applications',
      github: '',
      live: '',
      featured: false,
    });
    setStatusMsg('✓ Project published successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title) return;
    await cms.addArticle({
      ...articleForm,
      tags: typeof articleForm.tags === 'string' ? articleForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : articleForm.tags,
    });
    setArticleForm({
      title: '',
      coverImage: '',
      summary: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      tags: 'Java, Architecture',
    });
    setStatusMsg('✓ Article published successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    if (!certForm.title) return;
    await cms.addCertificate({
      ...certForm,
      skills: typeof certForm.skills === 'string' ? certForm.skills.split(',').map((s) => s.trim()).filter(Boolean) : certForm.skills,
    });
    setCertForm({
      title: '',
      issuer: '',
      issueDate: new Date().toISOString().slice(0, 7),
      credentialId: '',
      credentialUrl: '',
      coverImage: '',
      category: 'Full-Stack',
      skills: 'Java, React',
    });
    setStatusMsg('✓ Certificate added successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!eventForm.title) return;
    await cms.addEvent({
      ...eventForm,
      highlights: typeof eventForm.highlights === 'string' ? eventForm.highlights.split(',').map((h) => h.trim()).filter(Boolean) : eventForm.highlights,
    });
    setEventForm({
      title: '',
      organization: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      role: '',
      coverImage: '',
      description: '',
      highlights: '',
    });
    setStatusMsg('✓ Event logged successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // --- UPDATE / EDIT HANDLERS ---
  const startEditProject = (p) => {
    setEditingProjectId(p.id);
    setEditProjectForm({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
      languages: Array.isArray(p.languages) ? p.languages.join(', ') : p.languages || '',
      categories: Array.isArray(p.categories) ? p.categories.join(', ') : p.categories || '',
    });
  };

  const handleUpdateProject = async (id, e) => {
    e.preventDefault();
    await cms.updateProject(id, {
      ...editProjectForm,
      tags: typeof editProjectForm.tags === 'string' ? editProjectForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : editProjectForm.tags,
      languages: typeof editProjectForm.languages === 'string' ? editProjectForm.languages.split(',').map((l) => l.trim()).filter(Boolean) : editProjectForm.languages,
      categories: typeof editProjectForm.categories === 'string' ? editProjectForm.categories.split(',').map((c) => c.trim()).filter(Boolean) : editProjectForm.categories,
    });
    setEditingProjectId(null);
    setStatusMsg('✓ Project updated successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const startEditArticle = (a) => {
    setEditingArticleId(a.id);
    setEditArticleForm({
      ...a,
      tags: Array.isArray(a.tags) ? a.tags.join(', ') : a.tags || '',
    });
  };

  const handleUpdateArticle = async (id, e) => {
    e.preventDefault();
    if (cms.updateArticle) {
      await cms.updateArticle(id, {
        ...editArticleForm,
        tags: typeof editArticleForm.tags === 'string' ? editArticleForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : editArticleForm.tags,
      });
    }
    setEditingArticleId(null);
    setStatusMsg('✓ Article updated successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const startEditCert = (c) => {
    setEditingCertId(c.id);
    setEditCertForm({
      ...c,
      skills: Array.isArray(c.skills) ? c.skills.join(', ') : c.skills || '',
    });
  };

  const handleUpdateCert = async (id, e) => {
    e.preventDefault();
    if (cms.updateCertificate) {
      await cms.updateCertificate(id, {
        ...editCertForm,
        skills: typeof editCertForm.skills === 'string' ? editCertForm.skills.split(',').map((s) => s.trim()).filter(Boolean) : editCertForm.skills,
      });
    }
    setEditingCertId(null);
    setStatusMsg('✓ Certificate updated successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const startEditEvent = (evt) => {
    setEditingEventId(evt.id);
    setEditEventForm({
      ...evt,
      highlights: Array.isArray(evt.highlights) ? evt.highlights.join(', ') : evt.highlights || '',
    });
  };

  const handleUpdateEvent = async (id, e) => {
    e.preventDefault();
    if (cms.updateEvent) {
      await cms.updateEvent(id, {
        ...editEventForm,
        highlights: typeof editEventForm.highlights === 'string' ? editEventForm.highlights.split(',').map((h) => h.trim()).filter(Boolean) : editEventForm.highlights,
      });
    }
    setEditingEventId(null);
    setStatusMsg('✓ Event updated successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '0.5px solid var(--border-accent)',
    borderRadius: '4px',
    padding: '0.65rem 0.85rem',
    fontFamily: 'var(--font-code)',
    fontSize: '0.78rem',
    color: 'var(--text-primary)',
    outline: 'none',
    marginBottom: '0.75rem',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 7, 12, 0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--accent-primary)',
          borderRadius: '8px',
          maxWidth: '880px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 0 50px var(--glow-primary)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Right Controls */}
        <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {authenticated && (
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,77,77,0.12)',
                border: '0.5px solid rgba(255,77,77,0.3)',
                borderRadius: '4px',
                padding: '0.35rem 0.7rem',
                color: '#ff4d4d',
                fontFamily: 'var(--font-code)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s ease',
              }}
              title="Logout from CMS Portal"
            >
              🔒 Logout
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '0.5px solid var(--border-accent)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Close Modal"
          >
            ✕
          </button>
        </div>

        {!authenticated ? (
          /* Authentication Screen */
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔐</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Shalom's CMS Admin Portal
            </h3>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
              Request a 6-digit security code sent to the administrator account.
            </p>

            <div style={{ maxWidth: '360px', margin: '0 auto' }}>
              {/* Button to Request Email Passcode */}
              <button
                type="button"
                onClick={handleRequestCode}
                disabled={sendingCode}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.8rem',
                  color: 'var(--accent-primary)',
                  cursor: sendingCode ? 'wait' : 'pointer',
                  marginBottom: '1.25rem',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {sendingCode ? '⏳ Requesting code...' : (codeRequested ? '🔄 Resend Passcode' : '✉️ Request Admin Passcode')}
              </button>

              {requestMsg && (
                <div style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-secondary)',
                  background: 'rgba(0, 201, 167, 0.1)',
                  border: '0.5px solid rgba(0, 201, 167, 0.3)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  textAlign: 'left',
                  lineHeight: '1.4',
                }}>
                  {requestMsg}
                </div>
              )}

              {/* Passcode Submission Form */}
              <form onSubmit={handleAuthSubmit}>
                <input
                  type="text"
                  placeholder="Enter 6-Digit Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{ ...inputStyle, textAlign: 'center', letterSpacing: '0.25em', fontSize: '1rem', fontWeight: 'bold' }}
                  required
                />

                {verifyError && (
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: '#ff4d4d', marginBottom: '0.75rem', textAlign: 'left' }}>
                    ✕ {verifyError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full"
                  style={{ marginBottom: '0.75rem' }}
                >
                  🔓 Unlock Admin Control
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Management Console */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', paddingRight: '6rem' }}>
              <div>
                <p className="section-label" style={{ marginBottom: '0.2rem' }}>// CMS BACKEND CONTROL</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Manage Portfolio Content
                </h3>
              </div>

              {statusMsg && (
                <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--accent-secondary)', background: 'rgba(0,201,167,0.1)', padding: '0.4rem 0.8rem', borderRadius: '4px', border: '0.5px solid rgba(0,201,167,0.3)' }}>
                  {statusMsg}
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '0.5px solid var(--border-accent)', pb: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'projects', label: `Projects (${cms.projects.length})` },
                { id: 'articles', label: `Articles (${cms.articles.length})` },
                { id: 'certificates', label: `Certificates (${cms.certificates.length})` },
                { id: 'events', label: `Events (${cms.events.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.45rem 0.9rem',
                    background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                    border: `0.5px solid ${activeTab === tab.id ? 'var(--accent-primary)' : 'transparent'}`,
                    borderRadius: '4px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.75rem',
                    color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                <form onSubmit={handleAddProject} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '6px', border: '0.5px solid var(--border-accent)', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>+ ADD NEW PROJECT</h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Project Title *" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} style={inputStyle} required />
                    <input type="text" placeholder="Cover Image URL (Unsplash or direct image link)" value={projectForm.coverImage} onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })} style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Tags / Stack (e.g. Java, Spring Boot, React)" value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} style={inputStyle} />
                    <input type="text" placeholder="Languages (e.g. Java, JavaScript, C++)" value={projectForm.languages} onChange={(e) => setProjectForm({ ...projectForm, languages: e.target.value })} style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="GitHub Repository URL" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} style={inputStyle} />
                    <input type="text" placeholder="Live / Hosted URL (or '#')" value={projectForm.live} onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })} style={inputStyle} />
                  </div>

                  <textarea rows={3} placeholder="Short Project Description..." value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>+ Publish Project</button>
                </form>

                <h4 style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>EXISTING PROJECTS ({cms.projects.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cms.projects.map((p) => (
                    <div key={p.id} style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: '4px', border: '0.5px solid var(--border-accent)' }}>
                      {editingProjectId === p.id ? (
                        /* EDIT PROJECT FORM */
                        <form onSubmit={(e) => handleUpdateProject(p.id, e)}>
                          <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>✏️ Editing Project: {p.title}</div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Title" value={editProjectForm.title || ''} onChange={(e) => setEditProjectForm({ ...editProjectForm, title: e.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="Cover Image URL" value={editProjectForm.coverImage || ''} onChange={(e) => setEditProjectForm({ ...editProjectForm, coverImage: e.target.value })} style={inputStyle} />
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Tags (comma separated)" value={editProjectForm.tags || ''} onChange={(e) => setEditProjectForm({ ...editProjectForm, tags: e.target.value })} style={inputStyle} />
                            <input type="text" placeholder="Languages (comma separated)" value={editProjectForm.languages || ''} onChange={(e) => setEditProjectForm({ ...editProjectForm, languages: e.target.value })} style={inputStyle} />
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="GitHub URL" value={editProjectForm.github || ''} onChange={(e) => setEditProjectForm({ ...editProjectForm, github: e.target.value })} style={inputStyle} />
                            <input type="text" placeholder="Live URL" value={editProjectForm.live || ''} onChange={(e) => setEditProjectForm({ ...editProjectForm, live: e.target.value })} style={inputStyle} />
                          </div>
                          <textarea rows={2} placeholder="Description" value={editProjectForm.description || ''} onChange={(e) => setEditProjectForm({ ...editProjectForm, description: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setEditingProjectId(null)} style={{ background: 'transparent', border: '0.5px solid var(--border-accent)', color: 'var(--text-muted)', padding: '0.35rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                              Cancel
                            </button>
                            <button type="submit" className="btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>
                              💾 Save Changes
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* REGULAR PROJECT ROW */
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</div>
                            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{Array.isArray(p.tags) ? p.tags.join(', ') : p.tags}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button onClick={() => startEditProject(p)} style={{ background: 'rgba(59, 130, 246, 0.12)', border: '0.5px solid var(--border-accent)', color: 'var(--accent-primary)', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              ✏️ Edit
                            </button>
                            <button onClick={() => cms.deleteProject(p.id)} style={{ background: 'rgba(255,77,77,0.1)', border: '0.5px solid rgba(255,77,77,0.3)', color: '#ff4d4d', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ARTICLES */}
            {activeTab === 'articles' && (
              <div>
                <form onSubmit={handleAddArticle} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '6px', border: '0.5px solid var(--border-accent)', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>+ WRITE NEW ARTICLE</h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Article Title *" value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} style={inputStyle} required />
                    <input type="text" placeholder="Cover Image URL" value={articleForm.coverImage} onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })} style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Read Time (e.g. 5 min read)" value={articleForm.readTime} onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })} style={inputStyle} />
                    <input type="text" placeholder="Tags (e.g. Spring Boot, Security)" value={articleForm.tags} onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })} style={inputStyle} />
                  </div>

                  <textarea rows={2} placeholder="Article Short Summary..." value={articleForm.summary} onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                  <textarea rows={4} placeholder="Full Article Content / Notes..." value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>+ Publish Article</button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cms.articles.map((a) => (
                    <div key={a.id} style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: '4px', border: '0.5px solid var(--border-accent)' }}>
                      {editingArticleId === a.id ? (
                        /* EDIT ARTICLE FORM */
                        <form onSubmit={(e) => handleUpdateArticle(a.id, e)}>
                          <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>✏️ Editing Article: {a.title}</div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Title" value={editArticleForm.title || ''} onChange={(e) => setEditArticleForm({ ...editArticleForm, title: e.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="Cover Image URL" value={editArticleForm.coverImage || ''} onChange={(e) => setEditArticleForm({ ...editArticleForm, coverImage: e.target.value })} style={inputStyle} />
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Read Time" value={editArticleForm.readTime || ''} onChange={(e) => setEditArticleForm({ ...editArticleForm, readTime: e.target.value })} style={inputStyle} />
                            <input type="text" placeholder="Tags (comma separated)" value={editArticleForm.tags || ''} onChange={(e) => setEditArticleForm({ ...editArticleForm, tags: e.target.value })} style={inputStyle} />
                          </div>
                          <textarea rows={2} placeholder="Summary" value={editArticleForm.summary || ''} onChange={(e) => setEditArticleForm({ ...editArticleForm, summary: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                          <textarea rows={4} placeholder="Full Content" value={editArticleForm.content || ''} onChange={(e) => setEditArticleForm({ ...editArticleForm, content: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setEditingArticleId(null)} style={{ background: 'transparent', border: '0.5px solid var(--border-accent)', color: 'var(--text-muted)', padding: '0.35rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                              Cancel
                            </button>
                            <button type="submit" className="btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>
                              💾 Save Changes
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* REGULAR ARTICLE ROW */
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</div>
                            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{a.date} • {a.readTime}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button onClick={() => startEditArticle(a)} style={{ background: 'rgba(59, 130, 246, 0.12)', border: '0.5px solid var(--border-accent)', color: 'var(--accent-primary)', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              ✏️ Edit
                            </button>
                            <button onClick={() => cms.deleteArticle(a.id)} style={{ background: 'rgba(255,77,77,0.1)', border: '0.5px solid rgba(255,77,77,0.3)', color: '#ff4d4d', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div>
                <form onSubmit={handleAddCert} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '6px', border: '0.5px solid var(--border-accent)', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--accent-secondary)', marginBottom: '1rem' }}>+ ADD CERTIFICATE / ACCREDITATION</h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Certificate Title *" value={certForm.title} onChange={(e) => setCertForm({ ...certForm, title: e.target.value })} style={inputStyle} required />
                    <input type="text" placeholder="Issuing Institution (e.g. Rwanda Polytechnic)" value={certForm.issuer} onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })} style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Credential ID" value={certForm.credentialId} onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })} style={inputStyle} />
                    <input type="text" placeholder="Credential URL" value={certForm.credentialUrl} onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })} style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Cover Image URL" value={certForm.coverImage} onChange={(e) => setCertForm({ ...certForm, coverImage: e.target.value })} style={inputStyle} />
                    <input type="text" placeholder="Skills (e.g. Java, IoT, MySQL)" value={certForm.skills} onChange={(e) => setCertForm({ ...certForm, skills: e.target.value })} style={inputStyle} />
                  </div>

                  <button type="submit" className="btn-primary" style={{ background: 'var(--accent-secondary)', color: '#07090f', width: '100%' }}>+ Save Certificate</button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cms.certificates.map((c) => (
                    <div key={c.id} style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: '4px', border: '0.5px solid var(--border-accent)' }}>
                      {editingCertId === c.id ? (
                        /* EDIT CERTIFICATE FORM */
                        <form onSubmit={(e) => handleUpdateCert(c.id, e)}>
                          <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--accent-secondary)', marginBottom: '0.75rem' }}>✏️ Editing Certificate: {c.title}</div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Title" value={editCertForm.title || ''} onChange={(e) => setEditCertForm({ ...editCertForm, title: e.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="Issuer" value={editCertForm.issuer || ''} onChange={(e) => setEditCertForm({ ...editCertForm, issuer: e.target.value })} style={inputStyle} />
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Credential ID" value={editCertForm.credentialId || ''} onChange={(e) => setEditCertForm({ ...editCertForm, credentialId: e.target.value })} style={inputStyle} />
                            <input type="text" placeholder="Credential URL" value={editCertForm.credentialUrl || ''} onChange={(e) => setEditCertForm({ ...editCertForm, credentialUrl: e.target.value })} style={inputStyle} />
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Cover Image URL" value={editCertForm.coverImage || ''} onChange={(e) => setEditCertForm({ ...editCertForm, coverImage: e.target.value })} style={inputStyle} />
                            <input type="text" placeholder="Skills (comma separated)" value={editCertForm.skills || ''} onChange={(e) => setEditCertForm({ ...editCertForm, skills: e.target.value })} style={inputStyle} />
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setEditingCertId(null)} style={{ background: 'transparent', border: '0.5px solid var(--border-accent)', color: 'var(--text-muted)', padding: '0.35rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                              Cancel
                            </button>
                            <button type="submit" className="btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem', background: 'var(--accent-secondary)', color: '#07090f' }}>
                              💾 Save Changes
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* REGULAR CERTIFICATE ROW */
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</div>
                            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.issuer} • {c.credentialId}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button onClick={() => startEditCert(c)} style={{ background: 'rgba(0,201,167,0.1)', border: '0.5px solid rgba(0,201,167,0.3)', color: 'var(--accent-secondary)', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              ✏️ Edit
                            </button>
                            <button onClick={() => cms.deleteCertificate(c.id)} style={{ background: 'rgba(255,77,77,0.1)', border: '0.5px solid rgba(255,77,77,0.3)', color: '#ff4d4d', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: EVENTS */}
            {activeTab === 'events' && (
              <div>
                <form onSubmit={handleAddEvent} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '6px', border: '0.5px solid var(--border-accent)', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>+ LOG ATTENDED EVENT / HACKATHON</h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Event Title *" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} style={inputStyle} required />
                    <input type="text" placeholder="Organization / Venue" value={eventForm.organization} onChange={(e) => setEventForm({ ...eventForm, organization: e.target.value })} style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Location (e.g. Kigali / Huye)" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} style={inputStyle} />
                    <input type="text" placeholder="Role (e.g. Presenter / Winner)" value={eventForm.role} onChange={(e) => setEventForm({ ...eventForm, role: e.target.value })} style={inputStyle} />
                  </div>

                  <input type="text" placeholder="Cover Photo URL" value={eventForm.coverImage} onChange={(e) => setEventForm({ ...eventForm, coverImage: e.target.value })} style={inputStyle} />
                  <textarea rows={2} placeholder="Event Description..." value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                  <input type="text" placeholder="Highlights (comma separated e.g. 1st Place Award, Biometric Demo)" value={eventForm.highlights} onChange={(e) => setEventForm({ ...eventForm, highlights: e.target.value })} style={inputStyle} />

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>+ Log Event</button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cms.events.map((e) => (
                    <div key={e.id} style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: '4px', border: '0.5px solid var(--border-accent)' }}>
                      {editingEventId === e.id ? (
                        /* EDIT EVENT FORM */
                        <form onSubmit={(evt) => handleUpdateEvent(e.id, evt)}>
                          <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>✏️ Editing Event: {e.title}</div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Title" value={editEventForm.title || ''} onChange={(evt) => setEditEventForm({ ...editEventForm, title: evt.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="Organization" value={editEventForm.organization || ''} onChange={(evt) => setEditEventForm({ ...editEventForm, organization: evt.target.value })} style={inputStyle} />
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input type="text" placeholder="Location" value={editEventForm.location || ''} onChange={(evt) => setEditEventForm({ ...editEventForm, location: evt.target.value })} style={inputStyle} />
                            <input type="text" placeholder="Role" value={editEventForm.role || ''} onChange={(evt) => setEditEventForm({ ...editEventForm, role: evt.target.value })} style={inputStyle} />
                          </div>
                          <input type="text" placeholder="Cover Photo URL" value={editEventForm.coverImage || ''} onChange={(evt) => setEditEventForm({ ...editEventForm, coverImage: evt.target.value })} style={inputStyle} />
                          <textarea rows={2} placeholder="Description" value={editEventForm.description || ''} onChange={(evt) => setEditEventForm({ ...editEventForm, description: evt.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                          <input type="text" placeholder="Highlights (comma separated)" value={editEventForm.highlights || ''} onChange={(evt) => setEditEventForm({ ...editEventForm, highlights: evt.target.value })} style={inputStyle} />
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setEditingEventId(null)} style={{ background: 'transparent', border: '0.5px solid var(--border-accent)', color: 'var(--text-muted)', padding: '0.35rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                              Cancel
                            </button>
                            <button type="submit" className="btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>
                              💾 Save Changes
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* REGULAR EVENT ROW */
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{e.title}</div>
                            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{e.organization} • {e.date}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button onClick={() => startEditEvent(e)} style={{ background: 'rgba(59, 130, 246, 0.12)', border: '0.5px solid var(--border-accent)', color: 'var(--accent-primary)', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              ✏️ Edit
                            </button>
                            <button onClick={() => cms.deleteEvent(e.id)} style={{ background: 'rgba(255,77,77,0.1)', border: '0.5px solid rgba(255,77,77,0.3)', color: '#ff4d4d', borderRadius: '3px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
