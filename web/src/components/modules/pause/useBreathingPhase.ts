import { useEffect, useState } from 'react';

export type BreathPhase = 'in' | 'hold' | 'out';

export const PHASE_LABEL: Record<BreathPhase, string> = { in: 'Breathe in', hold: 'Hold', out: 'Breathe out' };

const PHASE_MS: Record<BreathPhase, number> = { in: 4000, hold: 2000, out: 6000 };
const NEXT_PHASE: Record<BreathPhase, BreathPhase> = { in: 'hold', hold: 'out', out: 'in' };
// Espera para animar la primera inhalación
const START_DELAY_MS = 50;

export const useBreathingPhase = (running: boolean) => {
  const [phase, setPhase] = useState<'idle' | BreathPhase>('idle');

  useEffect(() => {
    setPhase('idle');
    if (!running) return;
    let id: number;
    const enter = (p: BreathPhase) => {
      setPhase(p);
      id = window.setTimeout(() => enter(NEXT_PHASE[p]), PHASE_MS[p]);
    };
    id = window.setTimeout(() => enter('in'), START_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [running]);

  return phase;
};
