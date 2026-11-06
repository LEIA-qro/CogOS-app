// Botón de pausa sensorial con el tiempo restante
import React from 'react';
import { HeartPulse } from 'lucide-react';
import { useWindows } from '../../context/WindowContext.js';
import { formatClock, usePauseRemaining } from '../../context/pauseClock.js';

export const PauseButton: React.FC = () => {
  const { toggleWindow, windows, activeWindowId } = useWindows();
  const pauseLeft = usePauseRemaining();
  const pauseOpen = windows.crisis.isOpen && !windows.crisis.isMinimized && activeWindowId === 'crisis';

  return (
    <button
      type="button"
      onClick={() => toggleWindow('crisis')}
      aria-pressed={pauseOpen}
      className="flex h-10 items-center sm:h-8 gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 text-xs font-medium text-accent transition-colors duration-200 hover:border-accent/50"
    >
      <HeartPulse className="h-3.5 w-3.5" />
      {pauseLeft !== null ? (
        <span>
          <span className="hidden sm:inline">Break </span>
          <span className="tabular-nums">{formatClock(pauseLeft)}</span>
          <span className="sr-only"> left</span>
        </span>
      ) : (
        'Sensory Pause'
      )}
    </button>
  );
};
