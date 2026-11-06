export interface NavigatorAnswerData {
  query?: string;
  directPlainAnswer?: string;
  explicitRuleVsSocialNorm?: {
    officialPolicy?: string;
    unwrittenCultureNorm?: string;
  };
  stepByStepActionPlan?: string[];
  safeTemplateToUse?: string;
  relevantDepartmentOrContact?: string;
  mode?: string;
}
