import type { PassportRequest, PassportResponse } from '../apiTypes.js';

export const passportFallback = ({ fullName, roleTitle }: PassportRequest): PassportResponse => ({
  passportId: 'PASS-2026-90D',
  generatedAt: new Date().toISOString(),
  employeeInfo: { fullName, roleTitle },
  executiveSummary: 'Works best with written updates and clear acceptance criteria.',
  formalAccommodations: [
    {
      category: 'Sensory Environment',
      need: 'Noise sensitivity in open workplace.',
      reasonableAccommodation: 'Option to use headphones and sit away from high-traffic areas.',
      impactOnRetention: 'Helps me stay focused through the day.',
    },
    {
      category: 'Communication & Feedback',
      need: 'Unannounced meetings and unclear invites make it hard to prepare.',
      reasonableAccommodation: 'Please share an agenda ahead of meetings, and written notes before 1-on-1s when possible.',
      impactOnRetention: 'Helps me prepare and know what is expected.',
    },
    {
      category: 'Task Architecture & Executive Function',
      need: 'Vague assignments are hard to start.',
      reasonableAccommodation: 'A clear definition of done for each task.',
      impactOnRetention: 'Helps me get started faster in the first 90 days.',
    },
  ],
  managerQuickReference: {
    doList: ['Share meeting agendas in advance', 'Use written checklists for deliverables', 'Allow camera-off deep work'],
    dontList: ['Avoid unannounced catch-ups', 'Follow up multi-step instructions in writing'],
  },
  legalAndComplianceNote: 'Based on common reasonable accommodation practice. No medical details included.',
  mode: 'mock',
});
