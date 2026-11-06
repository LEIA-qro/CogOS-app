// Muestra el mensaje que se leyó
import React from 'react';
import { SampleNotice } from '../../SampleNotice.js';
import { StaleNote } from '../../ui/index.js';
import { channelLabels, excerpt, senderLabels } from './format.js';

export interface DecodedQuoteProps {
  message: string;
  senderRole: string;
  channel: string;
  sample: boolean;
  stale: boolean;
}

export const DecodedQuote: React.FC<DecodedQuoteProps> = ({ message, senderRole, channel, sample, stale }) => (
  <div className="space-y-3">
    {sample && <SampleNotice>Sample reading. It is not based on your message, so don't rely on it.</SampleNotice>}
    <div className="space-y-1">
      <blockquote className="border-l-2 border-line pl-3 text-sm text-ink-2 break-words">"{excerpt(message)}"</blockquote>
      <p className="text-xs text-ink-3 pl-3">
        {senderLabels[senderRole] ?? senderRole} · {channelLabels[channel] ?? channel}
      </p>
    </div>
    {stale && <StaleNote action="Decode" />}
  </div>
);
