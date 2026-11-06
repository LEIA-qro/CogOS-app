// Círculo que guía la respiración
import React from 'react';
import type { BreathPhase } from './useBreathingPhase.js';
import { useReducedMotion } from './useReducedMotion.js';

const CIRCLE_MOTION: Record<'idle' | BreathPhase, string> = {
  idle: 'scale-75 duration-[4000ms]',
  in: 'scale-100 duration-[4000ms]',
  hold: 'scale-100 duration-[2000ms]',
  out: 'scale-75 duration-[6000ms]',
};

export const BreathingCircle: React.FC<{ phase: 'idle' | BreathPhase }> = ({ phase }) => {
  const reducedMotion = useReducedMotion();
  const motion = reducedMotion ? 'scale-100' : `transition-transform ease-in-out ${CIRCLE_MOTION[phase]}`;

  return (
    <div className="h-32 w-32 flex items-center justify-center" aria-hidden="true">
      <div className={`h-28 w-28 rounded-full bg-accent-soft ring-8 ring-accent/30 ${motion}`} />
    </div>
  );
};
