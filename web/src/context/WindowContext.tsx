import React, { createContext, useContext, useState } from 'react';
import { ModuleId, Point, WindowMap, WindowState } from '../types/modules.js';
import { clampPosition, defaultPos, initialWindows, restack, topVisible } from './windowLayout.js';

export { TOP_BAR, DOCK_SPACE, clampPosition, windowWidth } from './windowLayout.js';

interface WindowContextType {
  windows: WindowMap;
  openWindow: (id: ModuleId) => void;
  closeWindow: (id: ModuleId) => void;
  minimizeWindow: (id: ModuleId) => void;
  toggleMaximizeWindow: (id: ModuleId) => void;
  bringToFront: (id: ModuleId) => void;
  toggleWindow: (id: ModuleId) => void;
  updatePosition: (id: ModuleId, pos: Point) => void;
  activeWindowId: ModuleId | null;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowMap>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<ModuleId | null>(null);

  const patchWindow = (id: ModuleId, patch: (win: WindowState) => Partial<WindowState>) =>
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], ...patch(prev[id]) } }));

  const bringToFront = (id: ModuleId) => {
    setWindows((prev) => {
      const position = prev[id].isOpen ? clampPosition(prev[id].position) : defaultPos(id);
      return restack({ ...prev, [id]: { ...prev[id], isOpen: true, isMinimized: false, position } }, id);
    });
    setActiveWindowId(id);
  };

  // El foco pasa a la siguiente ventana visible
  const hide = (id: ModuleId, patch: Partial<WindowState>) => {
    const next = { ...windows, [id]: { ...windows[id], ...patch } };
    setWindows(next);
    if (activeWindowId === id) setActiveWindowId(topVisible(next, id));
  };

  const closeWindow = (id: ModuleId) => hide(id, { isOpen: false, isMinimized: false, isMaximized: false });

  const minimizeWindow = (id: ModuleId) => hide(id, { isMinimized: true });

  const toggleMaximizeWindow = (id: ModuleId) => patchWindow(id, (win) => ({ isMaximized: !win.isMaximized }));

  const updatePosition = (id: ModuleId, pos: Point) => patchWindow(id, () => ({ position: clampPosition(pos) }));

  const toggleWindow = (id: ModuleId) => {
    const win = windows[id];
    if (win.isOpen && !win.isMinimized && activeWindowId === id) minimizeWindow(id);
    else bringToFront(id);
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow: bringToFront,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        bringToFront,
        toggleWindow,
        updatePosition,
        activeWindowId,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) throw new Error('useWindows must be used within WindowProvider');
  return context;
};
