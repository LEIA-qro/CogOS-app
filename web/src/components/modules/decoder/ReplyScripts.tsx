// Respuestas sugeridas para copiar
import React from 'react';
import { CopyButton } from '../../ui/index.js';
import type { ReplyOption } from './types.js';

const ReplyCard: React.FC<{ option: ReplyOption }> = ({ option }) => (
  <div className="border border-line rounded-xl p-4 flex flex-col justify-between gap-4">
    <div className="space-y-2">
      <div className="text-sm font-semibold text-ink">{option.label}</div>
      <p className="text-xs text-ink-3">{option.rationale}</p>
      <p className="text-sm text-ink leading-relaxed pt-1">"{option.suggestedText}"</p>
    </div>
    <CopyButton text={option.suggestedText} srLabel={`reply: ${option.label}`} className="w-full" />
  </div>
);

export const ReplyScripts: React.FC<{ options: ReplyOption[] }> = ({ options }) => (
  <section className="border-t border-line pt-5 space-y-3">
    <h3 className="text-sm font-semibold text-ink">Replies you can send</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {options.map((option) => (
        <ReplyCard key={option.key} option={option} />
      ))}
    </div>
  </section>
);
