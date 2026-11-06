// Pasos para aterrizar los sentidos
import React from 'react';
import { PauseDetails } from './PauseDetails.js';

export const GroundingSteps: React.FC<{ steps: string[] }> = ({ steps }) => (
  <PauseDetails title="Grounding steps">
    <ol className="px-4 pb-4 space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-accent-soft text-accent text-sm font-semibold flex items-center justify-center tabular-nums">
            {i + 1}
          </span>
          <span className="text-base text-ink leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  </PauseDetails>
);
