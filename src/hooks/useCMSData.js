import { useState, useEffect, useCallback } from 'react';
import { initialProjects } from '../data/projects';
import { initialArticles } from '../data/articles';
import { initialCertificates } from '../data/certificates';
import { initialEvents } from '../data/events';

export function useCMSData() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('sk_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('sk_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('sk_certificates');
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('sk_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [loading, setLoading] = useState(false);

  // Sync with Express API
  const refreshAll = useCallback(async () => {
    try {
      const [pRes, aRes, cRes, eRes] = await Promise.all([
        fetch('/api/projects').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/articles').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/certificates').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/events').then((r) => (r.ok ? r.json() : null)),
      ]);

      if (pRes) {
        setProjects(pRes);
        localStorage.setItem('sk_projects', JSON.stringify(pRes));
      }
      if (aRes) {
        setArticles(aRes);
        localStorage.setItem('sk_articles', JSON.stringify(aRes));
      }
      if (cRes) {
        setCertificates(cRes);
        localStorage.setItem('sk_certificates', JSON.stringify(cRes));
      }
      if (eRes) {
        setEvents(eRes);
        localStorage.setItem('sk_events', JSON.stringify(eRes));
      }
    } catch (err) {
      console.warn('[CMS Data Hook] Express API fetch failed, using local cache:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [pRes, aRes, cRes, eRes] = await Promise.all([
          fetch('/api/projects').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/articles').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/certificates').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/events').then((r) => (r.ok ? r.json() : null)),
        ]);

        if (isMounted) {
          if (pRes) {
            setProjects(pRes);
            localStorage.setItem('sk_projects', JSON.stringify(pRes));
          }
          if (aRes) {
            setArticles(aRes);
            localStorage.setItem('sk_articles', JSON.stringify(aRes));
          }
          if (cRes) {
            setCertificates(cRes);
            localStorage.setItem('sk_certificates', JSON.stringify(cRes));
          }
          if (eRes) {
            setEvents(eRes);
            localStorage.setItem('sk_events', JSON.stringify(eRes));
          }
        }
      } catch (err) {
        console.warn('[CMS Data Hook] Express API fetch failed, using local cache:', err);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // CRUD for Projects
  const addProject = async (projectData) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (res.ok) {
        const created = await res.json();
        const updated = [created, ...projects];
        setProjects(updated);
        localStorage.setItem('sk_projects', JSON.stringify(updated));
        return created;
      }
    } catch (err) {
      console.error('Error adding project:', err);
    }
    // Local fallback
    const fallback = { id: `proj-${Date.now()}`, ...projectData };
    const updated = [fallback, ...projects];
    setProjects(updated);
    localStorage.setItem('sk_projects', JSON.stringify(updated));
    return fallback;
  };

  const updateProject = async (id, projectData) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (res.ok) {
        const updatedObj = await res.json();
        const updated = projects.map((p) => (p.id === id ? updatedObj : p));
        setProjects(updated);
        localStorage.setItem('sk_projects', JSON.stringify(updated));
        return updatedObj;
      }
    } catch (err) {
      console.error('Error updating project:', err);
    }
    const updated = projects.map((p) => (p.id === id ? { ...p, ...projectData } : p));
    setProjects(updated);
    localStorage.setItem('sk_projects', JSON.stringify(updated));
  };

  const deleteProject = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting project:', err);
    }
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem('sk_projects', JSON.stringify(updated));
  };

  // CRUD for Articles
  const addArticle = async (articleData) => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });
      if (res.ok) {
        const created = await res.json();
        const updated = [created, ...articles];
        setArticles(updated);
        localStorage.setItem('sk_articles', JSON.stringify(updated));
        return created;
      }
    } catch (err) {
      console.error('Error adding article:', err);
    }
    const fallback = { id: `art-${Date.now()}`, ...articleData };
    const updated = [fallback, ...articles];
    setArticles(updated);
    localStorage.setItem('sk_articles', JSON.stringify(updated));
    return fallback;
  };

  const updateArticle = async (id, articleData) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });
      if (res.ok) {
        const updatedObj = await res.json();
        const updated = articles.map((a) => (a.id === id ? updatedObj : a));
        setArticles(updated);
        localStorage.setItem('sk_articles', JSON.stringify(updated));
        return updatedObj;
      }
    } catch (err) {
      console.error('Error updating article:', err);
    }
    const updated = articles.map((a) => (a.id === id ? { ...a, ...articleData } : a));
    setArticles(updated);
    localStorage.setItem('sk_articles', JSON.stringify(updated));
  };

  const deleteArticle = async (id) => {
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting article:', err);
    }
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    localStorage.setItem('sk_articles', JSON.stringify(updated));
  };

  // CRUD for Certificates
  const addCertificate = async (certData) => {
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certData),
      });
      if (res.ok) {
        const created = await res.json();
        const updated = [created, ...certificates];
        setCertificates(updated);
        localStorage.setItem('sk_certificates', JSON.stringify(updated));
        return created;
      }
    } catch (err) {
      console.error('Error adding certificate:', err);
    }
    const fallback = { id: `cert-${Date.now()}`, ...certData };
    const updated = [fallback, ...certificates];
    setCertificates(updated);
    localStorage.setItem('sk_certificates', JSON.stringify(updated));
    return fallback;
  };

  const updateCertificate = async (id, certData) => {
    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certData),
      });
      if (res.ok) {
        const updatedObj = await res.json();
        const updated = certificates.map((c) => (c.id === id ? updatedObj : c));
        setCertificates(updated);
        localStorage.setItem('sk_certificates', JSON.stringify(updated));
        return updatedObj;
      }
    } catch (err) {
      console.error('Error updating certificate:', err);
    }
    const updated = certificates.map((c) => (c.id === id ? { ...c, ...certData } : c));
    setCertificates(updated);
    localStorage.setItem('sk_certificates', JSON.stringify(updated));
  };

  const deleteCertificate = async (id) => {
    try {
      await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting certificate:', err);
    }
    const updated = certificates.filter((c) => c.id !== id);
    setCertificates(updated);
    localStorage.setItem('sk_certificates', JSON.stringify(updated));
  };

  // CRUD for Events
  const addEvent = async (eventData) => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (res.ok) {
        const created = await res.json();
        const updated = [created, ...events];
        setEvents(updated);
        localStorage.setItem('sk_events', JSON.stringify(updated));
        return created;
      }
    } catch (err) {
      console.error('Error adding event:', err);
    }
    const fallback = { id: `evt-${Date.now()}`, ...eventData };
    const updated = [fallback, ...events];
    setEvents(updated);
    localStorage.setItem('sk_events', JSON.stringify(updated));
    return fallback;
  };

  const updateEvent = async (id, eventData) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (res.ok) {
        const updatedObj = await res.json();
        const updated = events.map((e) => (e.id === id ? updatedObj : e));
        setEvents(updated);
        localStorage.setItem('sk_events', JSON.stringify(updated));
        return updatedObj;
      }
    } catch (err) {
      console.error('Error updating event:', err);
    }
    const updated = events.map((e) => (e.id === id ? { ...e, ...eventData } : e));
    setEvents(updated);
    localStorage.setItem('sk_events', JSON.stringify(updated));
  };

  const deleteEvent = async (id) => {
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting event:', err);
    }
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem('sk_events', JSON.stringify(updated));
  };

  return {
    projects,
    articles,
    certificates,
    events,
    loading,
    refreshAll,
    addProject,
    updateProject,
    deleteProject,
    addArticle,
    updateArticle,
    deleteArticle,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}

export default useCMSData;
