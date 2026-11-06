// Utilidades para leer el desglose
import type { MicroStep, TaskBreakdown } from './types.js';

export const doneCriteria = (data: TaskBreakdown | null): string[] =>
  Array.isArray(data?.definitionOfDone) ? data.definitionOfDone : [];

export const microSteps = (data: TaskBreakdown | null): MicroStep[] =>
  Array.isArray(data?.microSteps) ? data.microSteps : [];

export const totalMinutes = (steps: MicroStep[]): number =>
  steps.reduce((sum, step) => sum + (Number(step?.estimatedMinutes) || 0), 0);

export const criteriaKey = (data: TaskBreakdown | null): string => JSON.stringify(data?.definitionOfDone ?? null);
