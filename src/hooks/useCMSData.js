import { useState, useEffect, useCallback, useRef } from 'react';
import { initialProjects } from '../data/projects';
import { initialArticles } from '../data/articles';
import { initialCertificates } from '../data/certificates';
import { initialEvents } from '../data/events';
import { apiRequest, hasAdminSession } from '../services/api';

const seeds = { projects: initialProjects, articles: initialArticles, certificates: initialCertificates, events: initialEvents };
export function useCMSData() {
  // Public fallback remains available; drafts and authentication are never cached.
  const generationRef = useRef(0);
  const [data, setData] = useState(seeds);
  const clearPrivateData = useCallback(() => { generationRef.current++; setData(seeds); }, []);
  const [loading, setLoading] = useState(true);
  const refreshAll = useCallback(async () => {
    const request = ++generationRef.current;
    try {
      const entries = await Promise.all(Object.keys(seeds).map(async kind => [kind, await apiRequest('/api/' + kind + (hasAdminSession() ? '?includeDrafts=true' : ''), { admin: hasAdminSession() })]));
      if (request === generationRef.current) setData(Object.fromEntries(entries));
    } catch { /* Retain last known content when public reads are unavailable. */ }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    let disposed = false;
    queueMicrotask(() => { if (!disposed) void refreshAll(); });
    return () => { disposed = true; };
  }, [refreshAll]);
  const mutate = async (kind, method, id, body) => {
    const result = await apiRequest('/api/' + kind + (id ? '/' + encodeURIComponent(id) : ''), { method, body: body || {}, admin: true });
    setData(previous => ({ ...previous, [kind]: method === 'POST' ? [result, ...previous[kind]] : method === 'PUT' ? previous[kind].map(item => item.id === id ? result : item) : previous[kind].filter(item => item.id !== id) }));
    return result;
  };
  return { ...data, loading, refreshAll, clearPrivateData,
    addProject: body => mutate('projects', 'POST', null, body),
    updateProject: (id, body) => mutate('projects', 'PUT', id, body),
    deleteProject: id => mutate('projects', 'DELETE', id),
    addArticle: body => mutate('articles', 'POST', null, body),
    updateArticle: (id, body) => mutate('articles', 'PUT', id, body),
    deleteArticle: id => mutate('articles', 'DELETE', id),
    addCertificate: body => mutate('certificates', 'POST', null, body),
    updateCertificate: (id, body) => mutate('certificates', 'PUT', id, body),
    deleteCertificate: id => mutate('certificates', 'DELETE', id),
    addEvent: body => mutate('events', 'POST', null, body),
    updateEvent: (id, body) => mutate('events', 'PUT', id, body),
    deleteEvent: id => mutate('events', 'DELETE', id),
  };
}
export default useCMSData;
