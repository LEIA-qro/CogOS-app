export interface ReplyOption {
  key: string;
  label: string;
  suggestedText: string;
  rationale?: string;
}

export interface Neutralizer {
  irrationalFear?: string;
  probableReality?: string;
}

export interface Subtext {
  explicitMeaning?: string;
  implicitIntent?: string;
}

export interface ToneReading {
  perceivedUrgency?: string;
  subtextAnalysis?: Subtext;
  catastrophizingNeutralizer?: Neutralizer;
  responseOptions?: ReplyOption[];
  mode?: string;
}
