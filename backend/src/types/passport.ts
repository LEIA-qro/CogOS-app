import { z } from 'zod';

export const PassportRequestSchema = z.object({
  fullName: z.string().min(1).default('Alex Morgan'),
  roleTitle: z.string().min(1).default('Associate Software Engineer'),
  workStylePreferences: z.array(z.string()).nonempty({
    message: 'At least one work preference is required',
  }),
  sensoryTriggers: z.array(z.string()).default([]),
  communicationPreferences: z.object({
    preferredFormat: z.enum(['written_first', 'direct_sync', 'structured_bulletin']).default('written_first'),
    feedbackStyle: z.enum(['explicit_direct', 'context_then_feedback', 'sandbox_coaching']).default('explicit_direct'),
  }),
  executiveSupportNeeds: z.array(z.string()).default([]),
});

export type PassportRequest = z.infer<typeof PassportRequestSchema>;

export interface PassportResponse {
  passportId: string;
  generatedAt: string;
  employeeInfo: {
    fullName: string;
    roleTitle: string;
  };
  executiveSummary: string;
  formalAccommodations: Array<{
    category: 'Sensory Environment' | 'Communication & Feedback' | 'Task Architecture & Executive Function';
    need: string;
    reasonableAccommodation: string;
    impactOnRetention: string;
  }>;
  managerQuickReference: {
    doList: string[];
    dontList: string[];
  };
  legalAndComplianceNote: string;
  mode: 'live' | 'mock';
}
