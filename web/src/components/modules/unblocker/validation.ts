// Valida tarea y minutos
export const MIN_MINUTES = 10;
export const MAX_MINUTES = 120;
export const MAX_TASK_LENGTH = 500;

export const validateTask = (task: string): string | null => (task ? null : 'Enter a task.');

export const validateMinutes = (raw: string): string | null => {
  if (raw === '') return `Enter minutes, ${MIN_MINUTES}–${MAX_MINUTES}.`;
  const minutes = Number(raw);
  return !Number.isInteger(minutes) || minutes < MIN_MINUTES || minutes > MAX_MINUTES
    ? `Use a whole number from ${MIN_MINUTES} to ${MAX_MINUTES}.`
    : null;
};
