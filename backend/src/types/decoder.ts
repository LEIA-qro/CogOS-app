import { z } from 'zod';

export const DecoderRequestSchema = z.object({
  rawMessage: z.string().min(2, 'Message must be at least 2 characters'),
  senderRole: z.string().default('Direct Manager'),
  channel: z.enum(['Slack', 'Teams', 'Email', 'In-Person Sync']).default('Slack'),
});

export type DecoderRequest = z.infer<typeof DecoderRequestSchema>;

export interface ResponseOption {
  key: 'clarification' | 'affirmation' | 'boundary_setting';
  label: string;
  suggestedText: string;
  rationale: string;
}

export interface DecoderResponse {
  rawMessage: string;
  senderRole: string;
  perceivedUrgency: 'low' | 'normal' | 'high' | 'immediate';
  catastrophizingNeutralizer: {
    irrationalFear: string;
    probableReality: string;
    statisticalContext: string;
  };
  subtextAnalysis: {
    explicitMeaning: string;
    implicitIntent: string;
    corporateTone: string;
  };
  responseOptions: ResponseOption[];
  mode: 'live' | 'mock';
}
