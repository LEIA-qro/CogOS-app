// Botón y menú de ergonomía
import React, { useCallback, useRef, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useDismiss } from './useDismiss.js';
import { SensoryPanel } from './SensoryPanel.js';

export const ErgonomicsMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(menuRef, open, close);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Ergonomics"
        className={`flex h-10 min-w-10 items-center justify-center sm:h-8 gap-1.5 rounded-full px-3 text-xs font-medium transition-colors duration-200 ${
          open ? 'bg-sunken text-ink' : 'text-ink-2 hover:bg-sunken hover:text-ink'
        }`}
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        <span className="hidden md:inline">Ergonomics</span>
      </button>
      {open && <SensoryPanel />}
    </div>
  );
};
