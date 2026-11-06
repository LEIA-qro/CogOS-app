import { useCallback, useEffect, useRef, useState } from 'react';

export type ClipboardState = 'idle' | 'copied' | 'failed';

export const useClipboard = (resetMs = 2000) => {
  const [state, setState] = useState<ClipboardState>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // No actualiza estado si ya se desmontó
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      if (timer.current) clearTimeout(timer.current);
      let next: ClipboardState;
      try {
        await navigator.clipboard.writeText(text);
        next = 'copied';
      } catch {
        next = 'failed';
      }
      if (!mounted.current) return;
      setState(next);
      timer.current = setTimeout(() => setState('idle'), resetMs);
    },
    [resetMs]
  );

  return { state, copy };
};
