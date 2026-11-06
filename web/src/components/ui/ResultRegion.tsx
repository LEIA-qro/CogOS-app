// Zona que anuncia resultados al lector de pantalla
import React, { forwardRef } from 'react';

export interface ResultRegionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'aria-live' | 'aria-busy'> {
  busy: boolean;
}

export const ResultRegion = forwardRef<HTMLElement, ResultRegionProps>(({ busy, ...rest }, ref) => (
  <section ref={ref} aria-live="polite" aria-busy={busy} {...rest} />
));

ResultRegion.displayName = 'ResultRegion';
