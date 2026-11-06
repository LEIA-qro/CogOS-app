// Botones de 10, 20 y 30 minutos
import React from 'react';

const DURATIONS: { mins: number; hint: string }[] = [
  { mins: 10, hint: 'Quick breather' },
  { mins: 20, hint: 'Reset' },
  { mins: 30, hint: 'Full break' },
];

export const DurationPicker: React.FC<{ selected: number | null; onPick: (mins: number) => void }> = ({
  selected,
  onPick,
}) => (
  <section className="space-y-2" aria-labelledby="pause-length-label">
    <h3 id="pause-length-label" className="text-sm font-medium text-ink-2">
      How long?
    </h3>
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {DURATIONS.map(({ mins, hint }) => {
        const pressed = selected === mins;
        return (
          <button
            key={mins}
            type="button"
            aria-pressed={pressed}
            onClick={() => onPick(mins)}
            className={`min-h-14 px-2 py-3 rounded-xl border text-center transition-colors flex flex-col items-center justify-center gap-0.5 ${
              pressed ? 'bg-accent-soft border-accent/40 text-accent' : 'bg-surface border-line text-ink hover:bg-sunken'
            }`}
          >
            <span className="text-base sm:text-lg font-semibold tabular-nums">{mins} min</span>
            <span className={`hidden sm:block text-xs ${pressed ? 'text-accent' : 'text-ink-2'}`}>{hint}</span>
          </button>
        );
      })}
    </div>
  </section>
);
