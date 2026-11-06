// Formulario del mensaje, remitente y canal
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Field, PrimaryButton, cx, sunkenFieldClass } from '../../ui/index.js';
import { channelLabels, senderLabels } from './format.js';

const presetClass =
  'h-9 px-3 rounded-lg border border-line bg-surface text-ink-2 hover:bg-sunken text-xs transition-colors';

const PRESETS = [
  { label: '"We need to talk"', text: 'We need to talk at 4 PM today.' },
  { label: '"Did you see my email?"', text: 'Did you see my previous email?' },
];

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, value, options, onChange }) => (
  <Field id={id} label={label}>
    {(control) => (
      <select {...control} value={value} onChange={(e) => onChange(e.target.value)} className={cx(sunkenFieldClass, 'h-9')}>
        {Object.entries(options).map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    )}
  </Field>
);

export interface DecoderFormProps {
  message: string;
  senderRole: string;
  channel: string;
  error: string | null;
  loading: boolean;
  onMessageChange: (value: string) => void;
  onPresetPick: (value: string) => void;
  onSenderRoleChange: (value: string) => void;
  onChannelChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const DecoderForm: React.FC<DecoderFormProps> = (props) => (
  <form onSubmit={props.onSubmit} className="space-y-4" noValidate>
    <Field id="tone-raw-message" label="Message" error={props.error}>
      {(control) => (
        <textarea
          {...control}
          rows={3}
          value={props.message}
          onChange={(e) => props.onMessageChange(e.target.value)}
          className={`${sunkenFieldClass} py-2 leading-relaxed resize-y`}
          placeholder="Paste a Slack, Teams or email message"
          aria-required="true"
        />
      )}
    </Field>

    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-ink-3">Try:</span>
      {PRESETS.map((preset) => (
        <button key={preset.text} type="button" onClick={() => props.onPresetPick(preset.text)} className={presetClass}>
          {preset.label}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField
        id="tone-sender-role"
        label="From"
        value={props.senderRole}
        options={senderLabels}
        onChange={props.onSenderRoleChange}
      />
      <SelectField
        id="tone-channel"
        label="Channel"
        value={props.channel}
        options={channelLabels}
        onChange={props.onChannelChange}
      />
    </div>

    <PrimaryButton loading={props.loading} loadingLabel="Reading…" icon={<Sparkles className="w-4 h-4" aria-hidden="true" />}>
      Decode
    </PrimaryButton>
  </form>
);
