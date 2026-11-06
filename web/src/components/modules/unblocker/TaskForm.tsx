// Formulario de la tarea y minutos
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Chip, Field, PrimaryButton, controlHeight, cx, sunkenFieldClass } from '../../ui/index.js';
import { MAX_TASK_LENGTH } from './validation.js';
import { MINUTES_ERROR_ID, MinutesInput } from './MinutesInput.js';

const PRESETS = [
  { label: 'Onboarding Docs', task: 'Organize documentation for new team onboarding' },
  { label: 'Client Email', task: 'Respond to critical client email about delayed deliverables' },
];

export interface TaskFormProps {
  task: string;
  minutes: string;
  taskError: string | null;
  minutesError: string | null;
  loading: boolean;
  onTaskChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  minutes,
  taskError,
  minutesError,
  loading,
  onTaskChange,
  onMinutesChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} noValidate className="space-y-4">
    <div className="space-y-1.5">
      <Field id="task-unblocker-task" label="The task" error={taskError}>
        {(control) => (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              {...control}
              type="text"
              value={task}
              onChange={(e) => onTaskChange(e.target.value)}
              maxLength={MAX_TASK_LENGTH}
              className={cx(sunkenFieldClass, 'flex-1 min-w-0', controlHeight.lg)}
              placeholder="e.g. Put together the new sprint report"
              required
            />
            <MinutesInput value={minutes} error={minutesError} onChange={onMinutesChange} />
          </div>
        )}
      </Field>
      {minutesError && (
        <p id={MINUTES_ERROR_ID} className="text-sm text-danger">
          {minutesError}
        </p>
      )}
    </div>

    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-ink-3">Presets:</span>
      {PRESETS.map((preset) => (
        <Chip key={preset.label} pressed={task === preset.task} onClick={() => onTaskChange(preset.task)}>
          {preset.label}
        </Chip>
      ))}
    </div>

    <PrimaryButton
      size="lg"
      fullWidth
      loading={loading}
      loadingLabel="Breaking it down…"
      icon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
    >
      Break it down
    </PrimaryButton>
  </form>
);
