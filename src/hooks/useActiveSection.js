import { useState, useEffect, useRef } from 'react';

/**
 * useActiveSection — detects which section is currently in view
 * using IntersectionObserver on all section elements.
 * Returns the id of the active section.
 */
export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const observersRef = useRef([]);
  const joinedIds = sectionIds.join(',');

  useEffect(() => {
    // Clean up previous observers
    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    const sectionMap = new Map();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sectionMap.set(id, entry.intersectionRatio);

            // Find the section with highest intersection ratio
            let maxRatio = 0;
            let mostVisible = null;

            sectionMap.forEach((ratio, sectionId) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisible = sectionId;
              }
            });

            if (maxRatio > 0 && mostVisible) {
              setActiveSection(mostVisible);
            }
          });
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75],
          rootMargin: '-80px 0px -20% 0px',
        }
      );

      observer.observe(el);
      observersRef.current.push(observer);
    });

    return () => {
      observersRef.current.forEach((obs) => obs.disconnect());
    };
  }, [joinedIds, sectionIds]);

  return activeSection;
}

export default useActiveSection;
