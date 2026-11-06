import type { PauseResponse } from '../apiTypes.js';

export const pauseFallback = (durationMinutes: number, intensity: string): PauseResponse => {
  const returnTime = new Date(Date.now() + durationMinutes * 60000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return {
    intensity,
    recommendedPauseMinutes: durationMinutes,
    groundingExercise: {
      technique: '5-4-3-2-1 Sensory Grounding Reset',
      steps: [
        'Name 5 things you can see.',
        'Touch 4 things near you.',
        'Listen for 3 sounds.',
        'Notice 2 smells, or take 2 slow breaths.',
        'Take 1 sip of water.',
      ],
      audioSensoryGuidance: 'Breathe in for 4 seconds, pause for 2, exhale slowly for 6.',
    },
    discreetCorporateOutreach: {
      subjectOrStatus: `Short break, back at ${returnTime}`,
      messageBody: `Taking a short break, back at ${returnTime}.`,
      privacyGuaranteeNote: "Says nothing about why you're away.",
    },
    mode: 'mock',
  };
};
