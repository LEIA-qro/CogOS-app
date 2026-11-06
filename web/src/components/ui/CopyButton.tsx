// Botón de copiar con estado de copiado o error
import React from 'react';
import { Check, Copy, X } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard.js';
import { SecondaryButton } from './Button.js';

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'> {
  text: string;
  label?: string;
  srLabel?: string;
  resetMs?: number;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label = 'Copy', srLabel, resetMs, ...rest }) => {
  const { state, copy } = useClipboard(resetMs);

  return (
    <SecondaryButton onClick={() => copy(text)} {...rest}>
      {state === 'copied' ? (
        <Check className="w-4 h-4 text-success" aria-hidden="true" />
      ) : state === 'failed' ? (
        <X className="w-4 h-4 text-danger" aria-hidden="true" />
      ) : (
        <Copy className="w-4 h-4" aria-hidden="true" />
      )}
      <span className={state === 'copied' ? 'text-success font-medium' : state === 'failed' ? 'text-danger font-medium' : undefined}>
        {state === 'copied' ? 'Copied' : state === 'failed' ? "Couldn't copy" : label}
      </span>
      {srLabel && <span className="sr-only">{` ${srLabel}`}</span>}
    </SecondaryButton>
  );
};
