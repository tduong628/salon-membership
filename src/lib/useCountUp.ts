import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './useReducedMotion';

interface Options {
  /** Final value to count to. */
  to: number;
  /** Start counting only when this is true (e.g. in view). */
  active: boolean;
  /** Animation length in ms. */
  duration?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Animates an integer from 0 to `to` once `active` flips true. Static if reduced motion. */
export function useCountUp({ to, active, duration = 1100 }: Options): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setValue(to);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration, reduced]);

  return value;
}
