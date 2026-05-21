import { useEffect, useRef } from 'react';
import PHYSICS from '../config/physics';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * useFloatLoop — cosine-wave idle oscillation for avatar/elements
 * Loops a smooth translateY oscillation indefinitely.
 */
export function useFloatLoop() {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (prefersReducedMotion() || isMobile) return;

    const { amplitude, period } = PHYSICS.floatLoop;

    const tick = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Cosine wave: cos(2π * t / T) → smooth oscillation
      const progress = (elapsed % period) / period;
      const y = -amplitude * Math.abs(Math.sin(Math.PI * progress));

      el.style.transform = `translateY(${y}px)`;
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return ref;
}

export default useFloatLoop;
