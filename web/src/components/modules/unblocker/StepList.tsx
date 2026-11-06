// Lista de pasos cortos
import React from 'react';
import { Zap } from 'lucide-react';
import { totalMinutes } from './breakdown.js';
import type { MicroStep } from './types.js';

const HEADING_ID = 'task-unblocker-steps';

const StarterKit: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-sunken rounded-xl p-4 flex items-start gap-2.5 text-sm text-ink-2">
    <Zap className="w-4 h-4 mt-0.5 text-accent shrink-0" aria-hidden="true" />
    <p>
      <strong className="font-semibold text-ink">Start here:</strong> {text}
    </p>
  </div>
);

const StepItem: React.FC<{ step: MicroStep; number: number }> = ({ step, number }) => (
  <li className="py-3 first:pt-1 flex items-start gap-3">
    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-accent-soft text-accent flex items-center justify-center text-xs font-semibold">
      {number}
    </span>
    <div className="flex-1 min-w-0 space-y-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{step.title}</span>
        <span className="text-xs text-ink-3 whitespace-nowrap">~{step.estimatedMinutes} min</span>
      </div>
      <p className="text-sm text-ink-2">{step.actionableDirective}</p>
      <p className="text-xs text-ink-3">Criteria: {step.definitionOfDoneCriteria}</p>
    </div>
  </li>
);

export interface StepListProps {
  steps: MicroStep[];
  starter?: string;
  availableMinutes: number;
}

export const StepList: React.FC<StepListProps> = ({ steps, starter, availableMinutes }) => {
  const total = totalMinutes(steps);

  return (
    <section className="space-y-3" aria-labelledby={HEADING_ID}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 id={HEADING_ID} className="text-sm font-semibold text-ink">
          2. Micro-Actions (2–5 Min)
        </h3>
        {total > 0 && <span className="text-xs text-ink-3 whitespace-nowrap">~{total} min total</span>}
      </div>

      {total > availableMinutes && (
        <p className="text-xs text-warn">
          These steps add up to ~{total} min, more than the {availableMinutes} you have.
        </p>
      )}

      {starter && <StarterKit text={starter} />}

      {steps.length ? (
        <ol className="divide-y divide-line">
          {steps.map((step, idx) => (
            <StepItem key={step.stepNumber ?? idx} step={step} number={step.stepNumber ?? idx + 1} />
          ))}
        </ol>
      ) : (
        <p className="text-sm text-ink-3">No micro-steps were returned.</p>
      )}
    </section>
  );
};
