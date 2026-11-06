import React, { createContext, useContext, useEffect, useState } from 'react';
import { SensoryProfile, SensoryTheme, TextScale } from '../types/modules.js';
import { PROFILE_STORAGE_KEY, SENSORY_THEMES, defaultProfile, parseStoredProfile } from './sensoryProfile.js';

interface SensoryContextType {
  profile: SensoryProfile;
  setTheme: (theme: SensoryTheme) => void;
  toggleDyslexicFont: () => void;
  setTextScale: (scale: TextScale) => void;
  toggleReducedMotion: () => void;
}

const SensoryContext = createContext<SensoryContextType | undefined>(undefined);

const readStoredProfile = (): SensoryProfile => {
  try {
    return parseStoredProfile(localStorage.getItem(PROFILE_STORAGE_KEY), defaultProfile);
  } catch {
    return defaultProfile;
  }
};

const applyProfile = (profile: SensoryProfile) => {
  const body = document.body;
  body.classList.remove(...SENSORY_THEMES.map((theme) => `theme-${theme}`));
  body.classList.add(`theme-${profile.theme}`);
  body.classList.toggle('font-dyslexic', profile.dyslexicFont);
  body.classList.toggle('reduce-motion', profile.reducedMotion);
  document.documentElement.dataset.scale = profile.textScale;
  // Barra del navegador del color del tema
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(body).backgroundColor);
};

export const SensoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<SensoryProfile>(readStoredProfile);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      void 0;
    }
    applyProfile(profile);
  }, [profile]);

  return (
    <SensoryContext.Provider
      value={{
        profile,
        setTheme: (theme) => setProfile((p) => ({ ...p, theme })),
        toggleDyslexicFont: () => setProfile((p) => ({ ...p, dyslexicFont: !p.dyslexicFont })),
        setTextScale: (textScale) => setProfile((p) => ({ ...p, textScale })),
        toggleReducedMotion: () => setProfile((p) => ({ ...p, reducedMotion: !p.reducedMotion })),
      }}
    >
      {children}
    </SensoryContext.Provider>
  );
};

export const useSensory = () => {
  const context = useContext(SensoryContext);
  if (!context) throw new Error('useSensory must be used within SensoryProvider');
  return context;
};
