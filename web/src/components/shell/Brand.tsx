// Logo, nombre y botón de info
import React from 'react';
import { Info } from 'lucide-react';
import { useWindows } from '../../context/WindowContext.js';
import { Logo } from '../Logo.js';

export const Brand: React.FC = () => {
  const { toggleWindow, windows } = useWindows();
  const aboutOpen = windows.about.isOpen && !windows.about.isMinimized;

  return (
    <div className="flex items-center gap-1">
      <span className="flex items-center gap-2 font-semibold tracking-tight text-ink">
        <Logo className="h-5 w-5 text-accent" />
        CogOS
      </span>
      <button
        type="button"
        onClick={() => toggleWindow('about')}
        aria-label="About CogOS"
        aria-pressed={aboutOpen}
        title="About CogOS"
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 sm:h-8 sm:w-8 ${
          aboutOpen ? 'bg-sunken text-ink' : 'text-ink-3 hover:bg-sunken hover:text-ink'
        }`}
      >
        <Info className="h-4 w-4" />
      </button>
    </div>
  );
};
