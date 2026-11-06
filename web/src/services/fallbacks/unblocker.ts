import type { UnblockerResponse } from '../apiTypes.js';

export const unblockerFallback = (vagueTask: string): UnblockerResponse => ({
  originalTask: vagueTask,
  clarifiedObjective: 'A short plan with a clear finish line.',
  definitionOfDone: [
    'Core requirements extracted and mapped into checklist.',
    'First draft done.',
    'Sanity check completed against acceptance criteria.',
  ],
  cognitiveLoadRating: 'medium',
  firstStepStarterKit: 'Create the file and write the 3 checklist items above as headings. That is step 1.',
  microSteps: [
    {
      stepNumber: 1,
      title: 'Establish Document Skeleton',
      actionableDirective: 'Create file and write the 3 Definition of Done headers.',
      estimatedMinutes: 3,
      definitionOfDoneCriteria: 'File created and saved.',
    },
    {
      stepNumber: 2,
      title: 'Collect Source Data / Links',
      actionableDirective: 'Gather the links or files you need.',
      estimatedMinutes: 5,
      definitionOfDoneCriteria: 'Links pasted in working notes.',
    },
    {
      stepNumber: 3,
      title: 'Draft Core Section',
      actionableDirective: 'Write the first 2 key findings without worrying about polish.',
      estimatedMinutes: 5,
      definitionOfDoneCriteria: 'Two solid paragraphs or bullet points written.',
    },
  ],
  mode: 'mock',
});
