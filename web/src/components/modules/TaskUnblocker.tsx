// Herramienta que parte tareas en pasos
import React, { useRef, useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { api } from '../../services/api.js';
import { useLatestRequest } from '../../hooks/useLatestRequest.js';
import { useScrollIntoViewOnChange } from '../../hooks/useScrollIntoViewOnChange.js';
import { SampleNotice, isSample } from '../SampleNotice.js';
import { ResultRegion, StaleNote } from '../ui/index.js';
import { TaskForm } from './unblocker/TaskForm.js';
import { DefinitionOfDone } from './unblocker/DefinitionOfDone.js';
import { StepList } from './unblocker/StepList.js';
import { useDoneTicks } from './unblocker/useDoneTicks.js';
import { doneCriteria, microSteps } from './unblocker/breakdown.js';
import { validateMinutes, validateTask } from './unblocker/validation.js';
import type { TaskBreakdown } from './unblocker/types.js';

export const TaskUnblocker: React.FC = () => {
  const [task, setTask] = useState('Prepare the quarterly engineering review deck for leadership');
  const [minutes, setMinutes] = useState('45');
  const [taskError, setTaskError] = useState<string | null>(null);
  const [minutesError, setMinutesError] = useState<string | null>(null);
  const req = useLatestRequest(
    (vagueTask: string, totalMinutes: number) => api.breakdownTask(vagueTask, totalMinutes) as Promise<TaskBreakdown>,
    { errorMessage: 'Could not break it down. Try again.' }
  );
  const ticks = useDoneTicks();
  const resultRef = useRef<HTMLElement>(null);
  useScrollIntoViewOnChange(resultRef, req.data);

  const changeTask = (value: string) => {
    setTask(value);
    setTaskError(null);
  };

  const changeMinutes = (value: string) => {
    setMinutes(value);
    setMinutesError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (req.loading) return;
    const trimmedTask = task.trim();
    const rawMinutes = minutes.trim();
    const nextTaskError = validateTask(trimmedTask);
    const nextMinutesError = validateMinutes(rawMinutes);
    setTaskError(nextTaskError);
    setMinutesError(nextMinutesError);
    if (nextTaskError || nextMinutesError) return;

    const totalMinutes = Number(rawMinutes);
    ticks.start(trimmedTask, totalMinutes);
    const result = await req.run(trimmedTask, totalMinutes);
    if (result) ticks.finish(trimmedTask, totalMinutes, result);
  };

  const args = req.lastArgs;
  const edited = args !== null && (task.trim() !== args[0] || minutes.trim() !== String(args[1]));

  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
          <span>Break a task into small steps</span>
        </h2>
        <p className="text-sm text-ink-2 max-w-prose">A clear definition of done, then steps of a few minutes each.</p>
      </header>

      <TaskForm
        task={task}
        minutes={minutes}
        taskError={taskError}
        minutesError={minutesError}
        loading={req.loading}
        onTaskChange={changeTask}
        onMinutesChange={changeMinutes}
        onSubmit={handleSubmit}
      />

      <ResultRegion ref={resultRef} busy={req.loading}>
        {req.error && <p className="text-sm text-danger">{req.error}</p>}

        {req.data && args && (
          <div className="border-t border-line pt-6 space-y-6">
            <div className="space-y-2">
              {isSample(req.data) && <SampleNotice />}
              <p className="text-sm text-ink-2 break-words">
                For: {args[0]} · {args[1]} min
              </p>
              {edited && <StaleNote action="Break it down" />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DefinitionOfDone items={doneCriteria(req.data)} checked={ticks.checked} onToggle={ticks.toggle} />
              <StepList steps={microSteps(req.data)} starter={req.data.firstStepStarterKit} availableMinutes={args[1]} />
            </div>
          </div>
        )}
      </ResultRegion>
    </div>
  );
};
