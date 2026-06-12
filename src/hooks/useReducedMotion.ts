import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const isClient = typeof window !== 'undefined';

  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (!isClient) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [isClient]);

  return prefersReduced;
}
