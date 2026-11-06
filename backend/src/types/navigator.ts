import { z } from 'zod';

export const NavigatorRequestSchema = z.object({
  query: z.string().min(3, 'Query must be at least 3 characters'),
  companyContext: z.string().optional().default('Standard modern enterprise onboarding policies'),
});

export type NavigatorRequest = z.infer<typeof NavigatorRequestSchema>;

export interface NavigatorResponse {
  query: string;
  directPlainAnswer: string;
  explicitRuleVsSocialNorm: {
    officialPolicy: string;
    unwrittenCultureNorm: string;
  };
  stepByStepActionPlan: string[];
  safeTemplateToUse: string;
  relevantDepartmentOrContact: string;
  mode: 'live' | 'mock';
}
