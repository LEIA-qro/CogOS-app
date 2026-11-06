import React, { useRef } from 'react';
import { useWindows } from '../../context/WindowContext.js';
import { ModuleId, Point } from '../../types/modules.js';

type DragStart = { startX: number; startY: number; origin: Point };
type PointerHandler = (e: React.PointerEvent<HTMLElement>) => void;

// Los botones no inician arrastre
const INTERACTIVE = 'button, input, select, textarea';

export const useWindowDrag = (id: ModuleId, pos: Point, enabled: boolean) => {
  const { bringToFront, updatePosition } = useWindows();
  const dragRef = useRef<DragStart | null>(null);

  const onPointerDown: PointerHandler = (e) => {
    if (e.button !== 0 || !enabled) return;
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
    bringToFront(id);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origin: { ...pos } };
  };

  const onPointerMove: PointerHandler = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    updatePosition(id, {
      x: drag.origin.x + e.clientX - drag.startX,
      y: drag.origin.y + e.clientY - drag.startY,
    });
  };

  const onPointerUp: PointerHandler = (e) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      void 0;
    }
  };

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp };
};
