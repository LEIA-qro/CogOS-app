export type ModuleId = 'passport' | 'unblocker' | 'decoder' | 'crisis' | 'navigator' | 'about';

export interface Point {
  x: number;
  y: number;
}

export interface WindowState {
  id: ModuleId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: Point;
}

export type WindowMap = Record<ModuleId, WindowState>;

export type SensoryTheme = 'calm' | 'low-contrast' | 'warm-amber' | 'dark';
export type TextScale = 'normal' | 'large' | 'extra-large';

export interface SensoryProfile {
  theme: SensoryTheme;
  dyslexicFont: boolean;
  textScale: TextScale;
  reducedMotion: boolean;
  soundDampened: boolean;
}
