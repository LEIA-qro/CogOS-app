// Campo con label, pista y error
import React from 'react';
import { cx } from './cx.js';

export const fieldClass =
  'w-full bg-surface border border-line rounded-lg px-3 text-base sm:text-sm text-ink focus:border-accent';

export const sunkenFieldClass =
  'w-full bg-sunken border border-line rounded-lg px-3 text-base sm:text-sm text-ink focus:border-accent';

export interface FieldControlProps {
  id: string;
  'aria-invalid': true | undefined;
  'aria-describedby': string | undefined;
}

export interface FieldProps {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string | null;
  quiet?: boolean;
  className?: string;
  children: (control: FieldControlProps) => React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ id, label, hint, error, quiet = false, className, children }) => {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = cx(hintId, errorId) || undefined;

  return (
    <div className={cx('space-y-1.5', className)}>
      <label
        htmlFor={id}
        className={quiet ? 'block text-xs font-medium text-ink-2' : 'block text-sm font-medium text-ink'}
      >
        {label}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {hint && (
        <p id={hintId} className="text-xs text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
};
