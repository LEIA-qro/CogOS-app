// Aviso de que el resultado es de ejemplo
import React from 'react';
import { Info } from 'lucide-react';

export const isSample = (data: unknown): boolean =>
  !!data && typeof data === 'object' && (data as { mode?: string }).mode === 'mock';

export const SampleNotice: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <p role="note" className="flex items-start gap-2 rounded-lg border border-warn/25 bg-warn-soft px-3 py-2 text-sm text-ink">
    <Info className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
    <span>{children ?? 'Sample result. It is not based on what you entered.'}</span>
  </p>
);
