import { z } from 'zod';

export const CrisisRequestSchema = z.object({
  intensity: z.enum(['sensory_overload', 'executive_shutdown', 'acute_anxiety']).default('sensory_overload'),
  durationMinutes: z.number().int().min(5).max(60).default(20),
  communicationChannel: z.enum(['Slack', 'Teams', 'Email']).default('Slack'),
});

export type CrisisRequest = z.infer<typeof CrisisRequestSchema>;

export interface CrisisResponse {
  intensity: string;
  recommendedPauseMinutes: number;
  groundingExercise: {
    technique: string;
    steps: string[];
    audioSensoryGuidance: string;
  };
  discreetCorporateOutreach: {
    subjectOrStatus: string;
    messageBody: string;
    privacyGuaranteeNote: string;
  };
  mode: 'live' | 'mock';
}
