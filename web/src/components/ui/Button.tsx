// Botones primario y secundario
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cx } from './cx.js';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const controlHeight = {
  md: 'h-11 sm:h-9',
  lg: 'h-11 sm:h-10',
} as const;

export type ControlSize = keyof typeof controlHeight;

export interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
  loadingLabel?: React.ReactNode;
  icon?: React.ReactNode;
  size?: ControlSize;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  loading = false,
  loadingLabel,
  icon,
  size = 'md',
  fullWidth = false,
  disabled,
  type = 'submit',
  className,
  children,
  ...rest
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    className={cx(
      fullWidth ? 'flex w-full' : 'inline-flex',
      controlHeight[size],
      'px-4 bg-accent text-accent-ink hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium items-center justify-center gap-2 transition-colors',
      className
    )}
    {...rest}
  >
    {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : icon}
    <span>{loading && loadingLabel !== undefined ? loadingLabel : children}</span>
  </button>
);

export const secondaryButtonClass =
  'h-9 px-3 border border-line bg-surface text-ink hover:bg-sunken rounded-lg text-sm inline-flex items-center justify-center gap-1.5 transition-colors';

export const SecondaryButton: React.FC<ButtonProps> = ({ type = 'button', className, ...rest }) => (
  <button type={type} className={cx(secondaryButtonClass, className)} {...rest} />
);
