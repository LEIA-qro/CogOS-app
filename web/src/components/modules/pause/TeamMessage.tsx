import React from 'react';
import { Check, Copy } from 'lucide-react';
import { useClipboard } from '../../../hooks/useClipboard.js';
import { PauseDetails } from './PauseDetails.js';
import type { TeamOutreach } from './types.js';

const CopyMessage: React.FC<{ text: string }> = ({ text }) => {
  const { state, copy } = useClipboard(3000);
  const Icon = state === 'copied' ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={() => copy(text)}
        className="w-full min-h-11 bg-accent text-accent-ink hover:bg-accent/90 rounded-lg px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
        <span>{state === 'copied' ? 'Copied' : 'Copy message'}</span>
      </button>
      <p aria-live="polite" className={state === 'failed' ? 'text-sm text-danger' : 'sr-only'}>
        {state === 'copied' ? 'Copied' : state === 'failed' ? "Couldn't copy" : ''}
      </p>
    </>
  );
};

export const TeamMessage: React.FC<{ outreach: TeamOutreach; copyKey?: React.Key }> = ({ outreach, copyKey }) => (
  <PauseDetails title="Message for your team">
    <div className="px-4 pb-4 space-y-4">
      <div className="bg-sunken rounded-lg p-4 space-y-4">
        <div className="space-y-1">
          <div className="text-xs text-ink-2">Status</div>
          <div className="text-sm font-semibold text-ink">{outreach.subjectOrStatus}</div>
        </div>
        <div className="space-y-1 pt-4 border-t border-line">
          <div className="text-xs text-ink-2">Message</div>
          <p className="text-sm text-ink leading-relaxed select-all">{outreach.messageBody}</p>
        </div>
      </div>

      <p className="flex items-start gap-2 text-xs text-ink-2">
        <Check className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
        <span>{outreach.privacyGuaranteeNote}</span>
      </p>

      {/* Nueva key por break para reiniciar el botón */}
      <CopyMessage key={copyKey} text={outreach.messageBody} />
    </div>
  </PauseDetails>
);
