import type { Variants, Transition } from 'framer-motion';

// Spring presets per DESIGN_SPEC.
export const springSnap: Transition = { type: 'spring', stiffness: 400, damping: 17 };
export const springSettle: Transition = { type: 'spring', stiffness: 300, damping: 30 };

// Scroll entrance easing: expo-out cubic bezier.
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

// Underline draw for section headings.
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

// Shared whileInView config so every section behaves consistently.
export const inView = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, amount: 0.2 },
};
