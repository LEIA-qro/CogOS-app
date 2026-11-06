// Qué sí y qué no para el manager
import React from 'react';
import { Check, X } from 'lucide-react';
import type { PassportData } from './types.js';

interface GuidanceListProps {
  title: string;
  icon: React.ReactNode;
  toneClass: string;
  items: string[];
}

const GuidanceList: React.FC<GuidanceListProps> = ({ title, icon, toneClass, items }) => (
  <div>
    <div className={`flex items-center gap-1.5 font-semibold text-xs mb-2 ${toneClass}`}>
      {icon}
      <span>{title}</span>
    </div>
    <ul className="list-disc pl-5 space-y-1 text-ink-2 marker:text-ink-3">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

export const ManagerQuickReference: React.FC<{ reference: PassportData['managerQuickReference'] }> = ({ reference }) => (
  <div className="border-t border-line pt-5">
    <h4 className="font-semibold text-ink text-sm mb-3">Manager Quick Reference</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      <GuidanceList
        title="Do"
        icon={<Check className="w-4 h-4" aria-hidden="true" />}
        toneClass="text-success"
        items={reference.doList}
      />
      <GuidanceList
        title="Don't"
        icon={<X className="w-4 h-4" aria-hidden="true" />}
        toneClass="text-danger"
        items={reference.dontList}
      />
    </div>
  </div>
);
