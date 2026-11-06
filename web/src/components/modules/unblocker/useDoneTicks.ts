import { useCallback, useState } from 'react';
import { criteriaKey } from './breakdown.js';
import type { TaskBreakdown } from './types.js';

interface Ticks {
  input: string;
  criteria: string | null;
  checked: Record<number, boolean>;
}

const inputKey = (task: string, minutes: number) => JSON.stringify([task, minutes]);

export const useDoneTicks = () => {
  const [ticks, setTicks] = useState<Ticks>({ input: '', criteria: null, checked: {} });

  // Misma tarea conserva palomitas, otra las borra
  const start = useCallback((task: string, minutes: number) => {
    const input = inputKey(task, minutes);
    setTicks((t) => (t.input === input ? t : { input, criteria: null, checked: {} }));
  }, []);

  const finish = useCallback((task: string, minutes: number, result: TaskBreakdown) => {
    const input = inputKey(task, minutes);
    const criteria = criteriaKey(result);
    setTicks((t) => (t.input === input && t.criteria === criteria ? t : { input, criteria, checked: {} }));
  }, []);

  const toggle = useCallback((idx: number) => {
    setTicks((t) => ({ ...t, checked: { ...t.checked, [idx]: !t.checked[idx] } }));
  }, []);

  return { checked: ticks.checked, start, finish, toggle };
};
