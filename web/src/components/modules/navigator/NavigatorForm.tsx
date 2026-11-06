// Formulario de la pregunta y presets
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Chip, Field, PrimaryButton, controlHeight, cx, fieldClass } from '../../ui/index.js';
import { MAX_QUERY, PRESETS } from './presets.js';

interface NavigatorFormProps {
  query: string;
  loading: boolean;
  onQueryChange: (query: string) => void;
  onAsk: (query: string) => void;
}

export const NavigatorForm: React.FC<NavigatorFormProps> = ({ query, loading, onQueryChange, onAsk }) => {
  const [error, setError] = useState<string | null>(null);

  const changeQuery = (value: string) => {
    onQueryChange(value);
    if (error && value.trim()) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Type a question first.');
      return;
    }
    setError(null);
    onAsk(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field id="company-navigator-query" label="Your question" error={error}>
        {(control) => (
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              {...control}
              type="text"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
              maxLength={MAX_QUERY}
              className={cx(fieldClass, controlHeight.md, 'flex-1')}
              placeholder="e.g. Can I decline a lunch social without being rude?"
            />
            <PrimaryButton
              className="shrink-0"
              loading={loading}
              loadingLabel="Searching…"
              icon={<Search className="h-4 w-4" aria-hidden="true" />}
            >
              Ask
            </PrimaryButton>
          </div>
        )}
      </Field>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-ink-3">Common queries:</span>
        {PRESETS.map((preset) => (
          <Chip key={preset.label} pressed={query === preset.query} onClick={() => changeQuery(preset.query)}>
            {preset.label}
          </Chip>
        ))}
      </div>
    </form>
  );
};
