// Sección desplegable de la pausa
import React from 'react';

export const PauseDetails: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <details className="rounded-xl border border-line bg-surface">
    <summary className="min-h-11 px-4 py-3 cursor-pointer text-sm font-medium text-ink">{title}</summary>
    {children}
  </details>
);
