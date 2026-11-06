// Checklist de cuándo está terminada
import React from 'react';
import { Check } from 'lucide-react';
import { cx } from '../../ui/index.js';

const HEADING_ID = 'task-unblocker-dod';

interface DoneItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const DoneItem: React.FC<DoneItemProps> = ({ label, checked, onToggle }) => (
  <li>
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="w-full min-h-9 flex items-start gap-3 px-2 py-2 rounded-lg text-left text-sm hover:bg-sunken transition-colors"
    >
      <span
        className={cx(
          'mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors',
          checked ? 'bg-accent border-accent text-accent-ink' : 'bg-surface border-line'
        )}
        aria-hidden="true"
      >
        {checked && <Check className="w-3 h-3" strokeWidth={3} />}
      </span>
      <span className={checked ? 'text-ink-3 line-through' : 'text-ink'}>{label}</span>
    </button>
  </li>
);

export interface DefinitionOfDoneProps {
  items: string[];
  checked: Record<number, boolean>;
  onToggle: (idx: number) => void;
}

export const DefinitionOfDone: React.FC<DefinitionOfDoneProps> = ({ items, checked, onToggle }) => {
  const doneCount = items.filter((_, idx) => checked[idx]).length;
  const allDone = items.length > 0 && doneCount === items.length;

  return (
    <section className="space-y-3" aria-labelledby={HEADING_ID}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 id={HEADING_ID} className="text-sm font-semibold text-ink">
          1. Definition of Done (DoD)
        </h3>
        {items.length > 0 && (
          <span className="text-xs text-ink-3 whitespace-nowrap">
            {doneCount} of {items.length} done
          </span>
        )}
      </div>
      <p className="text-sm text-ink-2">Done when all of these are true:</p>
      {items.length ? (
        <ul role="group" aria-labelledby={HEADING_ID} className="space-y-1">
          {items.map((item, idx) => (
            <DoneItem key={idx} label={item} checked={Boolean(checked[idx])} onToggle={() => onToggle(idx)} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-3">No completion criteria were returned.</p>
      )}
      {allDone && <p className="text-sm text-success">All done. The task meets its definition of done.</p>}
    </section>
  );
};
