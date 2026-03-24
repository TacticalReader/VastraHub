import { useState, useEffect } from 'react';

/**
 * Returns the current vertical scroll position.
 * Throttled via requestAnimationFrame to prevent excessive re-renders.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId;
    const handler = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}
