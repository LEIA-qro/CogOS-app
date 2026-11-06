// Dock de abajo para abrir y minimizar herramientas
import React from 'react';
import { useWindows } from '../context/WindowContext.js';
import { ModuleId } from '../types/modules.js';
import { FileText, CheckSquare, MessageSquare, Compass, HeartPulse } from 'lucide-react';
import { formatClock, usePauseRemaining } from '../context/pauseClock.js';

interface DockItem {
  id: ModuleId;
  label: string;
  hint: string;
  icon: React.FC<{ className?: string }>;
}

export const dockItems: DockItem[] = [
  { id: 'passport', label: 'Accommodation Passport', hint: 'What helps you work well', icon: FileText },
  { id: 'unblocker', label: 'Task Unblocker', hint: 'Turn a vague task into small steps', icon: CheckSquare },
  { id: 'decoder', label: 'Tone Decoder', hint: 'What a message really means', icon: MessageSquare },
  { id: 'navigator', label: 'Culture Navigator', hint: 'Ask about policies and norms', icon: Compass },
  { id: 'crisis', label: 'Sensory Pause', hint: 'Step away and reset', icon: HeartPulse },
];

const stateSuffix = (isMinimized: boolean, isOpen: boolean, isActive: boolean) =>
  isMinimized ? ', minimized' : isOpen && !isActive ? ', open' : '';

const buttonTone = (isActive: boolean, isCrisis: boolean) =>
  isActive ? 'bg-accent-soft text-accent' : isCrisis ? 'text-accent hover:bg-accent-soft' : 'text-ink-2 hover:bg-sunken hover:text-ink';

export const Dock: React.FC = () => {
  const { windows, toggleWindow, activeWindowId } = useWindows();
  const pauseLeft = usePauseRemaining();

  return (
    <nav
      aria-label="Tools"
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-line bg-surface p-1.5 shadow-lift"
    >
      {dockItems.map(({ id, label, icon: Icon }) => {
        const { isOpen, isMinimized } = windows[id];
        const isActive = activeWindowId === id && isOpen && !isMinimized;
        const isCrisis = id === 'crisis';

        return (
          <button
            key={id}
            type="button"
            onClick={() => toggleWindow(id)}
            aria-label={`${label}${stateSuffix(isMinimized, isOpen, isActive)}`}
            aria-pressed={isActive}
            className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 ease-out ${buttonTone(isActive, isCrisis)}`}
          >
            <Icon className="h-5 w-5" />
            {isOpen && (
              <span
                aria-hidden="true"
                className={`absolute bottom-1 h-1 w-1 rounded-full ${isMinimized ? 'bg-ink-3' : 'bg-accent'}`}
              />
            )}
            <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-paper opacity-0 shadow-soft transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
              {label}
              {isCrisis && pauseLeft !== null ? ` · ${formatClock(pauseLeft)} left` : ''}
              {isMinimized ? ' · minimized' : ''}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
