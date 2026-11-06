// Herramienta de reglas no escritas
import React, { useRef, useState } from 'react';
import { Compass } from 'lucide-react';
import { api } from '../../services/api.js';
import { useLatestRequest } from '../../hooks/useLatestRequest.js';
import { useScrollIntoViewOnChange } from '../../hooks/useScrollIntoViewOnChange.js';
import { ResultRegion } from '../ui/index.js';
import { NavigatorAnswer } from './navigator/NavigatorAnswer.js';
import { NavigatorForm } from './navigator/NavigatorForm.js';
import { PRESETS } from './navigator/presets.js';
import type { NavigatorAnswerData } from './navigator/types.js';

export const CompanyNavigator: React.FC = () => {
  const [query, setQuery] = useState(PRESETS[0].query);
  const req = useLatestRequest((q: string) => api.queryNavigator(q) as Promise<NavigatorAnswerData>, {
    errorMessage: "Couldn't answer. Try again.",
  });
  const resultRef = useRef<HTMLElement>(null);
  useScrollIntoViewOnChange(resultRef, req.data);

  const askedQuery = req.lastArgs?.[0] ?? '';
  const stale = !!req.data && query.trim() !== askedQuery;

  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <Compass className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <span>Ask about the unwritten rules</span>
        </h2>
        <p className="max-w-prose text-sm text-ink-2">What the handbook says, next to how the team actually works.</p>
      </header>

      <NavigatorForm query={query} loading={req.loading} onQueryChange={setQuery} onAsk={req.run} />

      <ResultRegion ref={resultRef} busy={req.loading} aria-label="Answer">
        {req.data && <NavigatorAnswer data={req.data} askedQuery={askedQuery} stale={stale} />}
        {req.error && <p className="border-t border-line pt-6 text-sm text-danger">{req.error}</p>}
      </ResultRegion>
    </div>
  );
};
