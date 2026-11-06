// Mensaje seguro para copiar
import React from 'react';
import { CopyButton } from '../../ui/index.js';

export const SafeScript: React.FC<{ script: string }> = ({ script }) => (
  <div className="flex flex-col gap-3 rounded-xl bg-sunken p-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-ink">Safe Script to Use</h3>
      <p className="max-w-prose text-sm leading-relaxed text-ink">"{script}"</p>
    </div>
    <CopyButton text={script} className="shrink-0 self-start" />
  </div>
);
