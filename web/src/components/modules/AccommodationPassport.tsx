// Herramienta del passport de ajustes
import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { api } from '../../services/api.js';
import { useLatestRequest } from '../../hooks/useLatestRequest.js';
import { initialPassportForm, samePassportForm, toPassportPayload, type PassportFormValues } from './passport/form.js';
import { PassportForm } from './passport/PassportForm.js';
import { PassportPreview } from './passport/PassportPreview.js';
import type { PassportData } from './passport/types.js';

export const AccommodationPassport: React.FC = () => {
  const [form, setForm] = useState<PassportFormValues>(initialPassportForm);
  const req = useLatestRequest(
    (values: PassportFormValues) => api.generatePassport(toPassportPayload(values)) as Promise<PassportData>,
    { errorMessage: "Couldn't generate the passport. Try again." }
  );
  const stale = !!req.data && !!req.lastArgs && !samePassportForm(req.lastArgs[0], form);

  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
            <span>Share what helps you work well</span>
          </h2>
        </div>
        <p className="text-sm text-ink-2 max-w-prose">A one-page summary for HR and your manager. No medical details.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <PassportForm value={form} loading={req.loading} onChange={setForm} onGenerate={req.run} />
        <PassportPreview data={req.data} loading={req.loading} error={req.error} stale={stale} />
      </div>
    </div>
  );
};
