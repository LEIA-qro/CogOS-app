export interface TeamOutreach {
  subjectOrStatus: string;
  messageBody: string;
  privacyGuaranteeNote: string;
}

export interface PauseData {
  groundingExercise: {
    steps: string[];
  };
  discreetCorporateOutreach: TeamOutreach;
}
