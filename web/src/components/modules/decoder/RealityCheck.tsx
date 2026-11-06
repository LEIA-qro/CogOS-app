// Tu preocupación contra lo más probable
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import type { Neutralizer } from './types.js';

const Perspective: React.FC<{ title: string; text?: string }> = ({ title, text }) => (
  <div className="space-y-1">
    <div className="text-xs font-medium text-ink-2">{title}</div>
    <p className="text-sm text-ink leading-relaxed max-w-prose">{text}</p>
  </div>
);

export const RealityCheck: React.FC<{ neutralizer: Neutralizer }> = ({ neutralizer }) => (
  <section className="bg-sunken rounded-xl p-4 md:p-5 space-y-4">
    <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
      <ShieldAlert className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
      <span>Reality check</span>
    </h3>
    <Perspective title="Your worry" text={neutralizer.irrationalFear} />
    <Perspective title="More likely" text={neutralizer.probableReality} />
    <p className="text-xs text-ink-3">Neither is certain. If it matters, ask the sender.</p>
  </section>
);
