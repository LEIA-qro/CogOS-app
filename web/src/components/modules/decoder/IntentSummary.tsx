// Urgencia e intención del mensaje
import React from 'react';
import { UrgencyChip } from './UrgencyChip.js';
import type { UrgencyStyle } from './urgency.js';
import type { Subtext } from './types.js';

export interface IntentSummaryProps {
  urgency?: UrgencyStyle;
  subtext?: Subtext;
}

export const IntentSummary: React.FC<IntentSummaryProps> = ({ urgency, subtext }) => (
  <section className="space-y-2">
    {urgency && <UrgencyChip urgency={urgency} />}
    {subtext && (subtext.explicitMeaning || subtext.implicitIntent) && (
      <p className="text-sm text-ink-2 max-w-prose">
        {subtext.explicitMeaning}
        {subtext.explicitMeaning && subtext.implicitIntent ? ' ' : ''}
        {subtext.implicitIntent}
      </p>
    )}
  </section>
);
