// Botón de la barra de título de una ventana
import React from 'react';

interface ChromeButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  danger?: boolean;
}

export const ChromeButton: React.FC<ChromeButtonProps> = ({ label, onClick, children, danger }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`flex h-11 w-11 items-center justify-center rounded-md text-ink-3 transition-colors duration-150 sm:h-8 sm:w-8 ${
      danger ? 'hover:bg-danger-soft hover:text-danger' : 'hover:bg-sunken hover:text-ink'
    }`}
  >
    {children}
  </button>
);
