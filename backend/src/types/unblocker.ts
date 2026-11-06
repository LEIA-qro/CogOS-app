import { z } from 'zod';

export const UnblockerRequestSchema = z.object({
  vagueTask: z.string().min(3, 'Task description must be at least 3 characters'),
  context: z.string().optional().default('Standard corporate workplace onboarding'),
  totalAvailableMinutes: z.number().positive().optional().default(60),
});

export type UnblockerRequest = z.infer<typeof UnblockerRequestSchema>;

export interface MicroStep {
  stepNumber: number;
  title: string;
  actionableDirective: string;
  estimatedMinutes: number;
  starterTemplateOrPrompt?: string;
  definitionOfDoneCriteria: string;
}

export interface UnblockerResponse {
  originalTask: string;
  clarifiedObjective: string;
  definitionOfDone: string[];
  cognitiveLoadRating: 'low' | 'medium' | 'high';
  firstStepStarterKit: string;
  microSteps: MicroStep[];
  mode: 'live' | 'mock';
}
