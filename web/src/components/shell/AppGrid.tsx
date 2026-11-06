// Grid de apps de la pantalla de inicio
import React from 'react';
import { useWindows } from '../../context/WindowContext.js';
import { dockItems } from '../Dock.js';

export const AppGrid: React.FC = () => {
  const { openWindow, windows } = useWindows();

  return (
    <section aria-labelledby="apps-heading" className="mx-auto flex w-full max-w-4xl flex-col items-center">
      <h1 id="apps-heading" className="mb-8 text-balance text-center text-2xl font-semibold tracking-tight text-ink sm:mb-12 sm:text-3xl">
        Tools for your first 90 days at a new job.
      </h1>
      <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {dockItems.map(({ id, label, hint, icon: Icon }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => openWindow(id)}
              className="group flex h-full w-full flex-col items-center gap-3 rounded-2xl px-3 py-5 text-center transition-colors duration-200 hover:bg-surface"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-[20px] border transition-transform duration-200 ease-out group-hover:-translate-y-0.5 ${
                  id === 'crisis' ? 'border-accent/20 bg-accent-soft text-accent' : 'border-line bg-surface text-accent'
                }`}
              >
                <Icon className="h-7 w-7" />
              </span>
              <span className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
                  {label}
                  {windows[id].isOpen && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-label="open" />}
                </span>
                <span className="max-w-[12rem] text-xs leading-snug text-ink-3">{hint}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
