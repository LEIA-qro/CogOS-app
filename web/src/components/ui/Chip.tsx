// Chip seleccionable
import React from 'react';
import { cx } from './cx.js';

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> {
  pressed: boolean;
}

export const Chip: React.FC<ChipProps> = ({ pressed, type = 'button', className, ...rest }) => (
  <button
    type={type}
    aria-pressed={pressed}
    className={cx(
      'inline-flex h-9 items-center rounded-lg border px-3 text-sm transition-colors',
      pressed ? 'border-accent/30 bg-accent-soft text-accent' : 'border-line bg-surface text-ink-2 hover:bg-sunken',
      className
    )}
    {...rest}
  />
);
