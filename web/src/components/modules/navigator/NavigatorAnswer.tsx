// Respuesta con pasos y a quién preguntar
import React from 'react';
import { SampleNotice, isSample } from '../../SampleNotice.js';
import { StaleNote } from '../../ui/index.js';
import { PolicyVsPractice } from './PolicyVsPractice.js';
import { SafeScript } from './SafeScript.js';
import type { NavigatorAnswerData } from './types.js';

interface NavigatorAnswerProps {
  data: NavigatorAnswerData;
  askedQuery: string;
  stale: boolean;
}

export const NavigatorAnswer: React.FC<NavigatorAnswerProps> = ({ data, askedQuery, stale }) => {
  const steps = (data.stepByStepActionPlan ?? []).filter((s) => typeof s === 'string' && s.trim());
  const policy = data.explicitRuleVsSocialNorm?.officialPolicy;
  const norm = data.explicitRuleVsSocialNorm?.unwrittenCultureNorm;
  const contact = data.relevantDepartmentOrContact;

  return (
    <div className="space-y-6 border-t border-line pt-6">
      <div className="space-y-2">
        {isSample(data) && <SampleNotice>Sample answer picked by topic. It is not about your company.</SampleNotice>}
        <p className="max-w-prose break-words text-sm text-ink-3">Answer to: “{askedQuery}”</p>
        {stale && <StaleNote action="Ask" />}
      </div>

      {data.directPlainAnswer && (
        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-ink">Direct Answer</h3>
          <p className="max-w-prose text-base leading-relaxed text-ink">{data.directPlainAnswer}</p>
        </div>
      )}

      {(policy || norm) && <PolicyVsPractice policy={policy} norm={norm} />}

      {steps.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-ink">What to do</h3>
          <ol className="max-w-prose list-decimal space-y-1 pl-5 text-sm leading-relaxed text-ink">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {contact && (
        <p className="max-w-prose text-sm text-ink-2">
          <span className="font-semibold text-ink">Who to ask:</span> {contact}
        </p>
      )}

      {data.safeTemplateToUse && <SafeScript script={data.safeTemplateToUse} />}
    </div>
  );
};
