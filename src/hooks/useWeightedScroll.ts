import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ScrollState {
  _timestamp: number;
  _scrollY: number;
}

export function useWeightedScroll(): number {
  const prefersReduced = useReducedMotion();
  const [fontWeight, setFontWeight] = useState(950);
  const scrollState = useRef<ScrollState>({
    _timestamp: 0,
    _scrollY: 0,
  });
  const rafId = useRef(0);

  useEffect(() => {
    if (prefersReduced) {
      setFontWeight(950);
      return;
    }

    const isClient = typeof window !== 'undefined';
    if (!isClient) return;

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const now = performance.now();
        const currentScrollY = window.scrollY;
        const prev = scrollState.current;

        const deltaY = Math.abs(currentScrollY - prev._scrollY);
        const deltaT = Math.max(now - prev._timestamp, 1);
        const velocity = deltaY / deltaT;

        // Map velocity to font-weight: fast = thin (200), slow = heavy (950)
        const minWeight = 200;
        const maxWeight = 950;
        const velocityThreshold = 2.5;
        const normalizedVelocity = Math.min(velocity / velocityThreshold, 1);
        const weight = Math.round(maxWeight - normalizedVelocity * (maxWeight - minWeight));

        setFontWeight(weight);

        scrollState.current = {
          _timestamp: now,
          _scrollY: currentScrollY,
        };
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [prefersReduced]);

  return fontWeight;
}
