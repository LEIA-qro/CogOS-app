// Switch de encendido y apagado
import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-sm text-ink"
  >
    <span>{label}</span>
    <span
      aria-hidden="true"
      className={`relative block h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 ${
        checked ? 'border-accent bg-accent' : 'border-ink-3 bg-surface'
      }`}
    >
      <span
        className={`absolute left-[3px] top-[3px] block h-3 w-3 rounded-full transition-transform duration-200 ease-out ${
          checked ? 'translate-x-4 bg-surface' : 'translate-x-0 bg-ink-3'
        }`}
      />
    </span>
  </button>
);
