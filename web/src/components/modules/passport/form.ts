export const COMM_OPTIONS = [
  { value: 'written_first', label: 'Written first, async' },
  { value: 'structured_bulletin', label: 'Structured updates with checklists' },
  { value: 'direct_sync', label: 'Scheduled 1-on-1 with an agenda' },
] as const;

export type CommFormat = (typeof COMM_OPTIONS)[number]['value'];

export interface PassportFormValues {
  fullName: string;
  roleTitle: string;
  sensoryPref: string;
  commFormat: CommFormat;
}

export interface PassportFormErrors {
  fullName: string | null;
  roleTitle: string | null;
}

export const initialPassportForm: PassportFormValues = {
  fullName: '',
  roleTitle: '',
  sensoryPref: '',
  commFormat: 'written_first',
};

export const validatePassportForm = ({ fullName, roleTitle }: PassportFormValues): PassportFormErrors => ({
  fullName: fullName.trim() ? null : 'Enter your name.',
  roleTitle: roleTitle.trim() ? null : 'Enter your job title.',
});

export const samePassportForm = (a: PassportFormValues, b: PassportFormValues) =>
  a.fullName === b.fullName &&
  a.roleTitle === b.roleTitle &&
  a.sensoryPref === b.sensoryPref &&
  a.commFormat === b.commFormat;

export const toPassportPayload = ({ fullName, roleTitle, sensoryPref, commFormat }: PassportFormValues) => ({
  fullName: fullName.trim(),
  roleTitle: roleTitle.trim(),
  // El backend pide al menos uno, va la opción elegida
  workStylePreferences: [COMM_OPTIONS.find((o) => o.value === commFormat)?.label ?? commFormat],
  sensoryTriggers: sensoryPref
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  communicationPreferences: {
    preferredFormat: commFormat,
  },
});
