import { ModuleId, Point, WindowMap, WindowState } from '../types/modules.js';

export const TOP_BAR = 48;
export const DOCK_SPACE = 88;
const EDGE = 8;
const MAX_WIDTH_REM = 56;
const BASE_Z = 10;

export const windowWidth = () => {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return Math.min(window.innerWidth - EDGE * 2, MAX_WIDTH_REM * rem);
};

// Mantiene la ventana dentro de la pantalla
export const clampPosition = (pos: Point): Point => {
  const maxX = Math.max(EDGE, window.innerWidth - windowWidth() - EDGE);
  const maxY = Math.max(TOP_BAR + EDGE, window.innerHeight - DOCK_SPACE - 160);
  return {
    x: Math.round(Math.min(maxX, Math.max(EDGE, pos.x))),
    y: Math.round(Math.min(maxY, Math.max(TOP_BAR + EDGE, pos.y))),
  };
};

const cascadeOrder: ModuleId[] = ['passport', 'unblocker', 'decoder', 'navigator', 'crisis', 'about'];

export const defaultPos = (id: ModuleId): Point => {
  const i = cascadeOrder.indexOf(id);
  const centered = (window.innerWidth - windowWidth()) / 2;
  return clampPosition({ x: centered + i * 28, y: TOP_BAR + 16 + i * 20 });
};

const closedWindow = (id: ModuleId, title: string): WindowState => ({
  id,
  title,
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: BASE_Z,
  position: { x: EDGE, y: TOP_BAR + EDGE },
});

export const initialWindows: WindowMap = {
  passport: closedWindow('passport', 'Accommodation Passport'),
  unblocker: closedWindow('unblocker', 'Task Unblocker'),
  decoder: closedWindow('decoder', 'Tone Decoder'),
  crisis: closedWindow('crisis', 'Sensory Pause'),
  navigator: closedWindow('navigator', 'Culture Navigator'),
  about: closedWindow('about', 'About CogOS'),
};

const ids = (wins: WindowMap) => Object.keys(wins) as ModuleId[];

// z-index desde 10 para no tapar dock ni barra
export const restack = (wins: WindowMap, top: ModuleId): WindowMap => {
  const ranked = ids(wins)
    .filter((k) => k !== top)
    .sort((a, b) => wins[a].zIndex - wins[b].zIndex);
  ranked.push(top);
  const next = { ...wins };
  ranked.forEach((k, i) => {
    next[k] = { ...next[k], zIndex: BASE_Z + i };
  });
  return next;
};

export const topVisible = (wins: WindowMap, except: ModuleId): ModuleId | null => {
  const visible = ids(wins)
    .filter((k) => k !== except && wins[k].isOpen && !wins[k].isMinimized)
    .sort((a, b) => wins[b].zIndex - wins[a].zIndex);
  return visible[0] ?? null;
};
