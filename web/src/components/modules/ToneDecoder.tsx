// Herramienta que lee el tono de un mensaje
import React, { useRef, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { api } from '../../services/api.js';
import { useLatestRequest } from '../../hooks/useLatestRequest.js';
import { useScrollIntoViewOnChange } from '../../hooks/useScrollIntoViewOnChange.js';
import { isSample } from '../SampleNotice.js';
import { ResultRegion } from '../ui/index.js';
import { DecoderForm } from './decoder/DecoderForm.js';
import { DecodedQuote } from './decoder/DecodedQuote.js';
import { IntentSummary } from './decoder/IntentSummary.js';
import { RealityCheck } from './decoder/RealityCheck.js';
import { ReplyScripts } from './decoder/ReplyScripts.js';
import { urgencyFor } from './decoder/urgency.js';
import type { ToneReading } from './decoder/types.js';

export const ToneDecoder: React.FC = () => {
  const [rawMessage, setRawMessage] = useState('We need to talk at 4 PM today.');
  const [senderRole, setSenderRole] = useState('Direct Manager');
  const [channel, setChannel] = useState('Slack');
  const [inputError, setInputError] = useState<string | null>(null);
  const req = useLatestRequest(
    (message: string, role: string, via: string) => api.decodeMessage(message, role, via) as Promise<ToneReading>,
    { errorMessage: "Couldn't read this message. Try again." }
  );
  const resultRef = useRef<HTMLElement>(null);
  useScrollIntoViewOnChange(resultRef, req.data);

  const handleDecode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawMessage.trim()) {
      setInputError('Paste a message to decode.');
      return;
    }
    setInputError(null);
    void req.run(rawMessage, senderRole, channel);
  };

  const changeMessage = (value: string) => {
    setRawMessage(value);
    setInputError(null);
  };

  const { data, lastArgs } = req;
  const stale =
    lastArgs !== null && (lastArgs[0] !== rawMessage || lastArgs[1] !== senderRole || lastArgs[2] !== channel);
  const urgency = urgencyFor(data?.perceivedUrgency);
  const subtext = data?.subtextAnalysis;
  const replies = Array.isArray(data?.responseOptions) ? data.responseOptions : [];

  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />
          <span>What does this message mean?</span>
        </h2>
        <p className="text-sm text-ink-2 max-w-prose">Paste a message. See the likely intent and a few calm replies.</p>
      </header>

      <DecoderForm
        message={rawMessage}
        senderRole={senderRole}
        channel={channel}
        error={inputError}
        loading={req.loading}
        onMessageChange={changeMessage}
        onPresetPick={setRawMessage}
        onSenderRoleChange={setSenderRole}
        onChannelChange={setChannel}
        onSubmit={handleDecode}
      />

      <ResultRegion ref={resultRef} busy={req.loading} className="space-y-8 scroll-mt-4">
        {req.error && <p className="text-sm text-danger">{req.error}</p>}

        {data && lastArgs && (
          <>
            <DecodedQuote
              message={lastArgs[0]}
              senderRole={lastArgs[1]}
              channel={lastArgs[2]}
              sample={isSample(data)}
              stale={stale}
            />
            {(urgency || subtext) && <IntentSummary urgency={urgency} subtext={subtext} />}
            {data.catastrophizingNeutralizer && <RealityCheck neutralizer={data.catastrophizingNeutralizer} />}
            {replies.length > 0 && <ReplyScripts options={replies} />}
          </>
        )}
      </ResultRegion>
    </div>
  );
};
