import { useEffect, type RefObject } from 'react';

const prefersReducedMotion = () =>
  document.body.classList.contains('reduce-motion') ||
  (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

export const useScrollIntoViewOnChange = (ref: RefObject<Element | null>, trigger: unknown) => {
  useEffect(() => {
    if (!trigger) return;
    // Sin animación si piden menos movimiento
    ref.current?.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [ref, trigger]);
};
