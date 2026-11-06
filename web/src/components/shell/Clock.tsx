// Reloj de la barra de arriba
import React, { useEffect, useState } from 'react';

const CLOCK_TICK_MS = 15000;

const currentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const Clock: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(currentTime());
    update();
    const interval = setInterval(update, CLOCK_TICK_MS);
    return () => clearInterval(interval);
  }, []);

  return <time className="hidden whitespace-nowrap text-right text-xs text-ink-3 sm:block">{time}</time>;
};
