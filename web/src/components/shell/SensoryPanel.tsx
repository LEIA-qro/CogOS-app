// Contenido del menú de ergonomía
import React from 'react';
import { useSensory } from '../../context/SensoryContext.js';
import { ThemePicker } from './ThemePicker.js';
import { TextScalePicker } from './TextScalePicker.js';
import { Toggle } from './Toggle.js';

export const SensoryPanel: React.FC = () => {
  const { profile, setTheme, toggleDyslexicFont, setTextScale, toggleReducedMotion } = useSensory();

  return (
    <div
      role="dialog"
      aria-label="Sensory profile"
      className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-line bg-surface p-4 shadow-lift"
    >
      <h2 className="text-sm font-semibold text-ink">Sensory profile</h2>
      <p className="mt-0.5 text-xs text-ink-3">Saved on this device.</p>
      <ThemePicker value={profile.theme} onChange={setTheme} />
      <TextScalePicker value={profile.textScale} onChange={setTextScale} />
      <div className="mt-3 divide-y divide-line border-t border-line">
        <Toggle label="OpenDyslexic font" checked={profile.dyslexicFont} onChange={toggleDyslexicFont} />
        <Toggle label="Reduce motion" checked={profile.reducedMotion} onChange={toggleReducedMotion} />
      </div>
    </div>
  );
};
