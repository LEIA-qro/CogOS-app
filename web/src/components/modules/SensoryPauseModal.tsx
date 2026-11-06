import React, { useEffect, useState } from 'react';
import { Wind } from 'lucide-react';
import { setPauseEnd } from '../../context/pauseClock.js';
import { useLatestRequest } from '../../hooks/useLatestRequest.js';
import { api } from '../../services/api.js';
import { BreathingCircle } from './pause/BreathingCircle.js';
import { Countdown } from './pause/Countdown.js';
import { DurationPicker } from './pause/DurationPicker.js';
import { GroundingSteps } from './pause/GroundingSteps.js';
import { TeamMessage } from './pause/TeamMessage.js';
import { PHASE_LABEL, useBreathingPhase } from './pause/useBreathingPhase.js';
import type { PauseData } from './pause/types.js';

type Status = 'idle' | 'running' | 'done';

export const SensoryPauseModal: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [pause, setPause] = useState<{ mins: number; endAt: number } | null>(null);
  // Aparte para que no parpadee al cambiar duración
  const [content, setContent] = useState<PauseData | null>(null);
  const { run, error } = useLatestRequest(
    (mins: number): Promise<PauseData> => api.triggerSensoryPause(mins),
    { errorMessage: "Couldn't load the grounding steps or message." }
  );

  const running = status === 'running';
  const phase = useBreathingPhase(running);
  const endAt = running && pause ? pause.endAt : null;

  useEffect(() => {
    setPauseEnd(endAt);
    return () => setPauseEnd(null);
  }, [endAt]);

  const startPause = (mins: number) => {
    setPause({ mins, endAt: Date.now() + mins * 60000 });
    setStatus('running');
    run(mins).then((res) => {
      if (res) setContent(res);
    });
  };

  const liveText = status === 'done' ? 'Pause complete' : running ? PHASE_LABEL[phase === 'idle' ? 'in' : phase] : '';

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
          <Wind className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
          <span>Take a break</span>
        </h2>
        <p className="text-sm text-ink-2">Pick a length. Breathing starts right away.</p>
      </header>

      <DurationPicker selected={status === 'idle' ? null : pause?.mins ?? null} onPick={startPause} />

      <section
        className={status === 'idle' ? 'sr-only' : 'bg-sunken rounded-xl px-4 py-8 flex flex-col items-center gap-5 text-center'}
      >
        {running && <BreathingCircle phase={phase} />}
        <p aria-live="polite" className={`text-xl font-medium ${status === 'done' ? 'text-success' : 'text-ink'}`}>
          {liveText}
        </p>
        {endAt !== null && (
          <>
            <p className="text-sm text-ink-2">In 4 s, hold 2 s, out 6 s.</p>
            <Countdown endAt={endAt} onDone={() => setStatus('done')} />
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="min-h-11 px-5 rounded-lg border border-line bg-surface text-sm font-medium text-ink-2 hover:bg-paper transition-colors"
            >
              End pause
            </button>
          </>
        )}
        {status === 'done' && <p className="text-sm text-ink-2">Pick a length to start again.</p>}
      </section>

      {status !== 'idle' && error && !content && <p className="text-sm text-ink-2">{error}</p>}

      {content && (
        <div className="space-y-3">
          <GroundingSteps steps={content.groundingExercise.steps} />
          <TeamMessage outreach={content.discreetCorporateOutreach} copyKey={pause?.endAt} />
        </div>
      )}
    </div>
  );
};
