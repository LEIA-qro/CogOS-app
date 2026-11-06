// Lista de ajustes con su impacto
import React from 'react';
import type { PassportAccommodation } from './types.js';

export const AccommodationList: React.FC<{ items: PassportAccommodation[] }> = ({ items }) => (
  <div className="border-t border-line pt-5">
    <h4 className="font-semibold text-ink text-sm mb-2">Accommodations</h4>
    <ul className="divide-y divide-line">
      {items.map((acc, i) => (
        <li key={i} className="py-3 first:pt-1 last:pb-0 space-y-1">
          <div className="text-accent font-medium text-xs">{acc.category}</div>
          <div className="text-ink">{acc.reasonableAccommodation}</div>
          <div className="text-xs text-ink-3">Impact: {acc.impactOnRetention}</div>
        </li>
      ))}
    </ul>
  </div>
);
