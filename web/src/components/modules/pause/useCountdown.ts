import { useLayoutEffect, useRef, useState } from 'react';

const TICK_MS = 250;

export const useCountdown = (endAt: number | null, onDone: () => void) => {
  const [now, setNow] = useState(Date.now);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useLayoutEffect(() => {
    if (endAt === null) return;
    // Usa el reloj real para no desfasarse
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= endAt) onDoneRef.current();
    };
    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [endAt]);

  return endAt === null ? 0 : Math.max(0, endAt - now);
};
