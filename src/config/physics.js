/**
 * ╔═══════════════════════════════════════════════════╗
 * ║   ANTIGRAVITY PHYSICS ENGINE — CONFIG              ║
 * ║   All animation coefficients centralized here      ║
 * ╚═══════════════════════════════════════════════════╝
 */

export const PHYSICS = {
  // ── Gravity Drop (Hero Letter Reveal) ──────────────
  letterDrop: {
    staggerMs: 50,            // ms per letter index
    duration: 600,            // ms total fall duration
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    fromY: -60,               // start above
    gravity: 9.8,
  },

  // ── Antigravity Scroll Trigger ──────────────────────
  scrollReveal: {
    threshold: 0.15,          // IntersectionObserver threshold
    fromY: 40,                // px to travel upward
    duration: 700,            // ms
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    opacityFrom: 0,
    opacityTo: 1,
  },

  // ── Skill Bar Refill ────────────────────────────────
  skillBar: {
    duration: 1200,           // ms
    easing: 'ease-out',
    delay: 100,               // ms stagger per bar
  },

  // ── Float Lift (Hover Antigravity) ──────────────────
  floatLift: {
    translateY: -6,           // px upward on hover
    duration: 300,            // ms
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // ── Idle Float Loop (Avatar Oscillation) ────────────
  floatLoop: {
    amplitude: 12,            // px (0 → -12 → 0)
    period: 4000,             // ms full cycle
    easing: 'cosine',
  },

  // ── Nav Letter Micro-Bounce ──────────────────────────
  navBounce: {
    staggerMs: 30,
    translateY: -4,
    duration: 250,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // ── Timeline Node Pop ───────────────────────────────
  timelineNode: {
    fromScale: 0,
    toScale: 1,
    duration: 500,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    delay: 150,               // ms stagger between nodes
  },

  // ── Subtitle Rotation ───────────────────────────────
  subtitleRotation: {
    intervalMs: 2800,
    fadeDuration: 400,
  },

  // ── Reduced Motion Guard ────────────────────────────
  reducedMotion: {
    transitionOverride: '0.01ms',
    disabled: true,
  },
};

export default PHYSICS;
