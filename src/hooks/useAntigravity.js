import { useRef, useCallback } from 'react';
import PHYSICS from '../config/physics';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * useAntigravity — core physics hook
 * Returns a ref and a trigger function that applies
 * the antigravity upward-reveal animation to the element.
 */
export function useAntigravity(delay = 0) {
  const ref = useRef(null);

  const activate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const { duration, easing, fromY } = PHYSICS.scrollReveal;
    const effectiveFromY = isMobile ? 12 : fromY;

    // Set initial state
    el.style.opacity = '0';
    el.style.transform = `translateY(${effectiveFromY}px)`;
    el.style.transition = 'none';

    // Force reflow
    void el.offsetHeight;

    // Apply animated state with delay
    el.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, [delay]);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = `translateY(${PHYSICS.scrollReveal.fromY}px)`;
    el.style.transition = 'none';
  }, []);

  return { ref, activate, reset };
}

export default useAntigravity;
