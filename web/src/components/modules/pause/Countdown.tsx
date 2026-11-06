// Cuenta regresiva del break
import React from 'react';
import { formatClock } from '../../../context/pauseClock.js';
import { useCountdown } from './useCountdown.js';

export const Countdown: React.FC<{ endAt: number; onDone: () => void }> = ({ endAt, onDone }) => {
  const remaining = useCountdown(endAt, onDone);

  return (
    <p role="timer" className="text-5xl font-semibold text-ink tabular-nums">
      {formatClock(remaining)}
    </p>
  );
};
