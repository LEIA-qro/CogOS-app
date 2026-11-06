// Aviso de que el resultado ya no coincide con lo editado
import React from 'react';
import { cx } from './cx.js';

export interface StaleNoteProps {
  action: string;
  className?: string;
}

export const StaleNote: React.FC<StaleNoteProps> = ({ action, className }) => (
  <p className={cx('text-xs text-ink-3', className)}>Edited. {action} again to update.</p>
);
