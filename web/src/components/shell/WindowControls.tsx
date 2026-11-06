// Botones de minimizar, maximizar y cerrar
import React from 'react';
import { Maximize2, Minimize2, Minus, X } from 'lucide-react';
import { useWindows } from '../../context/WindowContext.js';
import { ModuleId } from '../../types/modules.js';
import { ChromeButton } from './ChromeButton.js';

interface WindowControlsProps {
  id: ModuleId;
  canMaximize: boolean;
}

export const WindowControls: React.FC<WindowControlsProps> = ({ id, canMaximize }) => {
  const { windows, closeWindow, minimizeWindow, toggleMaximizeWindow } = useWindows();
  const { title, isMaximized } = windows[id];

  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <ChromeButton label={`Minimize ${title}`} onClick={() => minimizeWindow(id)}>
        <Minus className="h-4 w-4" />
      </ChromeButton>
      {canMaximize && (
        <ChromeButton
          label={isMaximized ? `Restore ${title}` : `Maximize ${title}`}
          onClick={() => toggleMaximizeWindow(id)}
        >
          {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </ChromeButton>
      )}
      <ChromeButton label={`Close ${title}`} danger onClick={() => closeWindow(id)}>
        <X className="h-4 w-4" />
      </ChromeButton>
    </div>
  );
};
