// Selector de tamaño de texto
import React from 'react';
import { TextScale } from '../../types/modules.js';

const TEXT_SCALE_OPTIONS: readonly { id: TextScale; label: string }[] = [
  { id: 'normal', label: 'A' },
  { id: 'large', label: 'A+' },
  { id: 'extra-large', label: 'A++' },
];

interface TextScalePickerProps {
  value: TextScale;
  onChange: (scale: TextScale) => void;
}

export const TextScalePicker: React.FC<TextScalePickerProps> = ({ value, onChange }) => (
  <div className="mt-4">
    <div className="mb-2 text-xs text-ink-2">Text size</div>
    <div className="grid grid-cols-3 gap-1 rounded-lg bg-sunken p-1">
      {TEXT_SCALE_OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          aria-label={`Text size ${id}`}
          className={`h-8 rounded-md text-xs font-medium transition-colors duration-200 ${
            value === id ? 'bg-surface text-ink shadow-soft' : 'text-ink-2 hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);
