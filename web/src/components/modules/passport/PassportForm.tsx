import React, { useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Field, PrimaryButton, controlHeight, cx, fieldClass } from '../../ui/index.js';
import {
  COMM_OPTIONS,
  validatePassportForm,
  type CommFormat,
  type PassportFormErrors,
  type PassportFormValues,
} from './form.js';

interface PassportFormProps {
  value: PassportFormValues;
  loading: boolean;
  onChange: (next: PassportFormValues) => void;
  onGenerate: (values: PassportFormValues) => void;
}

const noErrors: PassportFormErrors = { fullName: null, roleTitle: null };

export const PassportForm: React.FC<PassportFormProps> = ({ value, loading, onChange, onGenerate }) => {
  const [errors, setErrors] = useState<PassportFormErrors>(noErrors);
  const nameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  const setText = (key: 'fullName' | 'roleTitle' | 'sensoryPref', text: string) => {
    onChange({ ...value, [key]: text });
    if (key !== 'sensoryPref' && errors[key]) setErrors({ ...errors, [key]: null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const next = validatePassportForm(value);
    setErrors(next);
    if (next.fullName || next.roleTitle) {
      // Foco al primer campo con error
      (next.fullName ? nameRef : roleRef).current?.focus();
      return;
    }
    onGenerate(value);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="lg:col-span-5 space-y-4 bg-sunken p-4 md:p-5 rounded-xl self-start">
      <h3 className="text-sm font-semibold text-ink">Your profile</h3>

      <Field id="passport-full-name" label="Your name" quiet error={errors.fullName}>
        {(control) => (
          <input
            {...control}
            ref={nameRef}
            type="text"
            autoComplete="name"
            maxLength={120}
            value={value.fullName}
            onChange={(e) => setText('fullName', e.target.value)}
            className={cx(fieldClass, 'py-2')}
            placeholder="e.g. Sofía Hernández"
            required
          />
        )}
      </Field>

      <Field id="passport-role-title" label="Job title" quiet error={errors.roleTitle}>
        {(control) => (
          <input
            {...control}
            ref={roleRef}
            type="text"
            autoComplete="organization-title"
            maxLength={160}
            value={value.roleTitle}
            onChange={(e) => setText('roleTitle', e.target.value)}
            className={cx(fieldClass, 'py-2')}
            placeholder="e.g. Data Analyst"
            required
          />
        )}
      </Field>

      <Field id="passport-sensory" label="Sensory triggers" quiet>
        {(control) => (
          <textarea
            {...control}
            rows={2}
            maxLength={500}
            value={value.sensoryPref}
            onChange={(e) => setText('sensoryPref', e.target.value)}
            className={cx(fieldClass, 'py-2 resize-y')}
            placeholder="e.g. Open-office noise, rapid lighting changes"
          />
        )}
      </Field>

      <Field id="passport-comm-format" label="Preferred communication" quiet>
        {(control) => (
          <select
            {...control}
            value={value.commFormat}
            onChange={(e) => onChange({ ...value, commFormat: e.target.value as CommFormat })}
            className={cx(fieldClass, controlHeight.md)}
          >
            {COMM_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <PrimaryButton
        fullWidth
        loading={loading}
        loadingLabel="Generating…"
        icon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
      >
        Generate passport
      </PrimaryButton>
    </form>
  );
};
