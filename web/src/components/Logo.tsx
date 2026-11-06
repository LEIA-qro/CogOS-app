import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
    <path
      d="M5.5 15.5v1.5a9 9 0 0 0 9 9h3a9 9 0 0 0 9-9v-1.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.2"
    />
    <circle cx="16" cy="12.5" r="5" fill="currentColor" />
  </svg>
);
