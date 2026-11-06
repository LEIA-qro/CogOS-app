import React from 'react';
import { SensoryTheme } from '../../types/modules.js';

const THEME_OPTIONS: readonly { id: SensoryTheme; label: string }[] = [
  { id: 'calm', label: 'Ivory' },
  { id: 'low-contrast', label: 'Soft' },
  { id: 'warm-amber', label: 'Warm' },
  { id: 'dark', label: 'Dark' },
];

interface ThemePickerProps {
  value: SensoryTheme;
  onChange: (theme: SensoryTheme) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({ value, onChange }) => (
  <div className="mt-4">
    <div className="mb-2 text-xs text-ink-2">Background</div>
    <div className="grid grid-cols-4 gap-2">
      {THEME_OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          className={`flex flex-col items-center gap-1.5 rounded-lg border p-2 text-xs transition-colors duration-200 ${
            value === id ? 'border-accent text-ink' : 'border-line text-ink-2 hover:bg-sunken'
          }`}
        >
          <span className="h-6 w-full rounded border border-line">
            {/* Cada muestra toma el fondo de su tema */}
            <span className={`theme-${id} block h-full w-full rounded-[calc(0.25rem_-_1px)] bg-paper`} />
          </span>
          {label}
        </button>
      ))}
    </div>
  </div>
);
