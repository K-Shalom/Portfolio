import { useEffect, useRef } from 'react';
import PHYSICS from '../config/physics';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * useScrollTrigger — attaches IntersectionObserver to a ref element
 * and fires onEnter / onLeave callbacks at the configured threshold.
 */
export function useScrollTrigger(onEnter, onLeave = null, options = {}) {
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      onEnter && onEnter(el);
      return;
    }

    const threshold = options.threshold ?? PHYSICS.scrollReveal.threshold;
    const once = options.once ?? true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && triggered.current) return;
            triggered.current = true;
            onEnter && onEnter(el);
          } else {
            if (!once) {
              triggered.current = false;
              onLeave && onLeave(el);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onEnter, onLeave, options.threshold, options.once, options.rootMargin]);

  return ref;
}

export default useScrollTrigger;
