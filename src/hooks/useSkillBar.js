import { useEffect, useRef, useCallback } from 'react';
import PHYSICS from '../config/physics';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * useSkillBar — animates a skill bar fill from 0 to targetLevel (%)
 * Returns a ref to attach to the bar's fill element.
 */
export function useSkillBar(targetLevel, delay = 0) {
  const barRef = useRef(null);
  const animated = useRef(false);

  const animate = useCallback(() => {
    const el = barRef.current;
    if (!el || animated.current) return;
    animated.current = true;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (prefersReducedMotion()) {
      el.style.width = `${targetLevel}%`;
      return;
    }

    const { duration, easing } = PHYSICS.skillBar;
    const effectiveDelay = isMobile ? Math.round(delay / 2) : delay;

    // Start from 0
    el.style.width = '0%';
    el.style.transition = 'none';
    void el.offsetHeight;

    // Animate to target with delay
    setTimeout(() => {
      el.style.transition = `width ${duration}ms ${easing}`;
      el.style.width = `${targetLevel}%`;
    }, effectiveDelay);
  }, [targetLevel, delay]);

  const reset = useCallback(() => {
    animated.current = false;
    const el = barRef.current;
    if (el) {
      el.style.width = '0%';
      el.style.transition = 'none';
    }
  }, []);

  return { barRef, animate, reset };
}

export default useSkillBar;
