export interface PassportAccommodation {
  category: string;
  need?: string;
  reasonableAccommodation: string;
  impactOnRetention: string;
}

export interface PassportData {
  employeeInfo: { fullName: string; roleTitle: string };
  executiveSummary: string;
  formalAccommodations: PassportAccommodation[];
  managerQuickReference: { doList: string[]; dontList: string[] };
  mode?: string;
}
