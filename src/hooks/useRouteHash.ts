import { useState, useEffect } from 'react';

export function useRouteHash(): string {
  const isClient = typeof window !== 'undefined';
  const [route, setRoute] = useState(() => {
    if (!isClient) return '';
    return window.location.hash;
  });

  useEffect(() => {
    if (!isClient) return;

    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load', handleHashChange);
    };
  }, [isClient]);

  return route;
}
