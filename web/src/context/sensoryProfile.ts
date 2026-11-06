import { SensoryProfile, SensoryTheme, TextScale } from '../types/modules.js';

export const PROFILE_STORAGE_KEY = 'cogos_sensory_profile';

export const SENSORY_THEMES: readonly SensoryTheme[] = ['calm', 'low-contrast', 'warm-amber', 'dark'];
export const TEXT_SCALES: readonly TextScale[] = ['normal', 'large', 'extra-large'];

// Arranca en Dark si el sistema está oscuro
const prefersDark = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export const defaultProfile: SensoryProfile = {
  theme: prefersDark() ? 'dark' : 'calm',
  dyslexicFont: false,
  textScale: 'normal',
  reducedMotion: false,
  soundDampened: true,
};

const isOneOf = <T extends string>(options: readonly T[], value: unknown): value is T =>
  options.includes(value as T);

// Datos rotos regresan a los defaults
export const parseStoredProfile = (raw: string | null, defaults: SensoryProfile): SensoryProfile => {
  if (!raw) return defaults;
  try {
    const profile: SensoryProfile = { ...defaults, ...JSON.parse(raw) };
    if (!isOneOf(SENSORY_THEMES, profile.theme)) profile.theme = defaults.theme;
    if (!isOneOf(TEXT_SCALES, profile.textScale)) profile.textScale = 'normal';
    return profile;
  } catch {
    return defaults;
  }
};
