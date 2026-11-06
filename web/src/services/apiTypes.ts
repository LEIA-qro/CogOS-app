// Tipos de las peticiones y respuestas
export type ResultMode = 'live' | 'mock';

export interface PassportRequest {
  fullName: string;
  roleTitle: string;
  workStylePreferences: string[];
  sensoryTriggers?: string[];
  communicationPreferences: { preferredFormat?: string; feedbackStyle?: string };
  executiveSupportNeeds?: string[];
}

export interface PassportAccommodation {
  category: 'Sensory Environment' | 'Communication & Feedback' | 'Task Architecture & Executive Function';
  need: string;
  reasonableAccommodation: string;
  impactOnRetention: string;
}

export interface PassportResponse {
  passportId: string;
  generatedAt: string;
  employeeInfo: { fullName: string; roleTitle: string };
  executiveSummary: string;
  formalAccommodations: PassportAccommodation[];
  managerQuickReference: { doList: string[]; dontList: string[] };
  legalAndComplianceNote: string;
  mode: ResultMode;
}

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
  mode: ResultMode;
}

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
  catastrophizingNeutralizer: { irrationalFear: string; probableReality: string; statisticalContext: string };
  subtextAnalysis: { explicitMeaning: string; implicitIntent: string; corporateTone: string };
  responseOptions: ResponseOption[];
  mode: ResultMode;
}

export interface PauseResponse {
  intensity: string;
  recommendedPauseMinutes: number;
  groundingExercise: { technique: string; steps: string[]; audioSensoryGuidance: string };
  discreetCorporateOutreach: { subjectOrStatus: string; messageBody: string; privacyGuaranteeNote: string };
  mode: ResultMode;
}

export interface NavigatorResponse {
  query: string;
  directPlainAnswer: string;
  explicitRuleVsSocialNorm: { officialPolicy: string; unwrittenCultureNorm: string };
  stepByStepActionPlan: string[];
  safeTemplateToUse: string;
  relevantDepartmentOrContact: string;
  mode: ResultMode;
}
