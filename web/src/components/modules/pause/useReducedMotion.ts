import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const readReducedMotion = () =>
  document.body.classList.contains('reduce-motion') || (window.matchMedia?.(QUERY).matches ?? false);

export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(readReducedMotion);

  useEffect(() => {
    const update = () => setReduced(readReducedMotion());
    const mq = window.matchMedia?.(QUERY);
    mq?.addEventListener?.('change', update);
    // Sistema o switch de la app, cualquiera apaga el movimiento
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    update();
    return () => {
      mq?.removeEventListener?.('change', update);
      observer.disconnect();
    };
  }, []);

  return reduced;
};
