// Campo de minutos disponibles
import React from 'react';
import { Clock } from 'lucide-react';
import { cx } from '../../ui/index.js';
import { MAX_MINUTES, MIN_MINUTES } from './validation.js';

export const MINUTES_ID = 'task-unblocker-minutes';
export const MINUTES_ERROR_ID = `${MINUTES_ID}-error`;
const HINT_ID = `${MINUTES_ID}-hint`;

const boxClass =
  'flex items-center gap-2 min-h-11 sm:min-h-0 sm:h-10 bg-sunken border border-line rounded-lg px-3 text-base sm:text-sm text-ink focus-within:border-accent';

export interface MinutesInputProps {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
}

export const MinutesInput: React.FC<MinutesInputProps> = ({ value, error, onChange }) => (
  <div className={boxClass}>
    <Clock className="w-4 h-4 text-ink-3" aria-hidden="true" />
    <input
      id={MINUTES_ID}
      type="number"
      inputMode="numeric"
      min={MIN_MINUTES}
      max={MAX_MINUTES}
      step={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Minutes available"
      aria-invalid={error ? true : undefined}
      aria-describedby={cx(HINT_ID, error && MINUTES_ERROR_ID)}
      className="w-12 h-11 sm:h-auto bg-transparent text-center text-base sm:text-sm text-ink"
    />
    <span id={HINT_ID} className="text-xs text-ink-3 whitespace-nowrap">
      {MIN_MINUTES}–{MAX_MINUTES} min
    </span>
  </div>
);
