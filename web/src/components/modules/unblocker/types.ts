export interface MicroStep {
  stepNumber?: number;
  title?: string;
  actionableDirective?: string;
  estimatedMinutes?: number;
  definitionOfDoneCriteria?: string;
}

export interface TaskBreakdown {
  definitionOfDone?: string[];
  microSteps?: MicroStep[];
  firstStepStarterKit?: string;
  mode?: string;
}
