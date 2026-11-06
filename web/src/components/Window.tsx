import React, { useEffect, useRef } from 'react';
import { useWindows, clampPosition, DOCK_SPACE, TOP_BAR } from '../context/WindowContext.js';
import { ModuleId, Point, WindowState } from '../types/modules.js';
import { useViewport } from './shell/useViewport.js';
import { useWindowDrag } from './shell/useWindowDrag.js';
import { WindowControls } from './shell/WindowControls.js';

interface WindowProps {
  id: ModuleId;
  children: React.ReactNode;
}

const PHONE_MAX_WIDTH = 640;
const GUTTER = 8;

const frameStyle = (win: WindowState, pos: Point, fill: boolean, isPhone: boolean): React.CSSProperties => {
  const top = fill ? TOP_BAR + (isPhone && !win.isMaximized ? GUTTER : 0) : pos.y;
  if (!fill) return { zIndex: win.zIndex, left: pos.x, top, maxHeight: `calc(100dvh - ${top}px - ${DOCK_SPACE}px)` };
  const inset = win.isMaximized ? 0 : GUTTER;
  return { zIndex: win.zIndex, top, left: inset, right: inset, bottom: DOCK_SPACE - GUTTER };
};

const frameShape = (win: WindowState, fill: boolean) =>
  win.isMaximized ? 'rounded-none border-x-0' : fill ? 'rounded-2xl' : 'w-[min(calc(100vw-16px),56rem)] rounded-2xl';

export const Window: React.FC<WindowProps> = ({ id, children }) => {
  const { windows, closeWindow, toggleMaximizeWindow, bringToFront, activeWindowId } = useWindows();
  useViewport();

  const win = windows[id];
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = win.isOpen && !win.isMinimized;
  const isActive = activeWindowId === id && visible;
  const isPhone = window.innerWidth < PHONE_MAX_WIDTH;
  const fill = win.isMaximized || isPhone;
  const pos = clampPosition(win.position);
  const dragHandlers = useWindowDrag(id, pos, !fill);

  useEffect(() => {
    if (isActive && rootRef.current && !rootRef.current.contains(document.activeElement)) {
      rootRef.current.focus({ preventScroll: true });
    }
  }, [isActive]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-labelledby={`window-title-${id}`}
      tabIndex={-1}
      // Se esconde sin desmontar para no perder lo escrito
      hidden={!visible}
      onClick={() => !isActive && bringToFront(id)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          closeWindow(id);
        }
      }}
      style={frameStyle(win, pos, fill, isPhone)}
      className={`fixed flex-col overflow-hidden border border-line bg-surface outline-none transition-shadow duration-200 ${
        visible ? 'flex' : ''
      } ${isActive ? 'shadow-lift' : 'shadow-soft'} ${frameShape(win, fill)}`}
    >
      <div
        {...dragHandlers}
        onDoubleClick={() => toggleMaximizeWindow(id)}
        className={`flex h-12 shrink-0 select-none items-center justify-between gap-3 border-b border-line pl-4 pr-1 touch-none sm:h-11 sm:pr-2 ${
          fill ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <h2 id={`window-title-${id}`} className={`truncate text-sm font-medium ${isActive ? 'text-ink' : 'text-ink-3'}`}>
          {win.title}
        </h2>
        <WindowControls id={id} canMaximize={!isPhone} />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain p-5 text-ink md:p-8">{children}</div>
    </div>
  );
};
