// Comparte el fin del break con barra y dock
import { useEffect, useState, useSyncExternalStore } from 'react';

let endAt: number | null = null;
const subscribers = new Set<() => void>();

export const setPauseEnd = (value: number | null) => {
  endAt = value;
  subscribers.forEach((notify) => notify());
};

const subscribe = (notify: () => void) => {
  subscribers.add(notify);
  return () => {
    subscribers.delete(notify);
  };
};

export const formatClock = (ms: number) => {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const usePauseRemaining = (): number | null => {
  const end = useSyncExternalStore(subscribe, () => endAt);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (end === null) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [end]);

  if (end === null) return null;
  const left = end - now;
  return left > 0 ? left : null;
};
