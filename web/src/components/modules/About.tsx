// Página de qué es CogOS y para quién
import React from 'react';
import { Logo } from '../Logo.js';
import { dockItems } from '../Dock.js';
import { useWindows } from '../../context/WindowContext.js';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-2 border-t border-line pt-5">
    <h3 className="text-sm font-semibold text-ink">{title}</h3>
    {children}
  </section>
);

export const About: React.FC = () => {
  const { openWindow } = useWindows();

  return (
    <div className="mx-auto max-w-prose space-y-6">
      <header className="space-y-3">
        <Logo className="h-10 w-10 text-accent" />
        <h2 className="text-2xl font-semibold tracking-tight text-ink text-balance">
          A calm workspace for your first 90 days at a new job.
        </h2>
        <p className="text-base leading-relaxed text-ink-2">
          CogOS helps neurodivergent people settle into a new job and keep it. It turns what you know about how you work into
          clear requests, small steps and calm replies.
        </p>
      </header>

      <Section title="Who it's for">
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-2 marker:text-ink-3">
          <li>Autistic, ADHD and dyslexic people starting a new job.</li>
          <li>Managers and HR teams who want practical, specific requests instead of guesswork.</li>
        </ul>
      </Section>

      <Section title="What's inside">
        <ul className="divide-y divide-line">
          {dockItems.map(({ id, label, hint, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => openWindow(id)}
                className="flex w-full items-center gap-3 py-2.5 text-left transition-colors duration-150 hover:text-accent"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm font-medium text-ink">{label}</span>
                <span className="text-sm text-ink-3">{hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How it works">
        <p className="text-sm leading-relaxed text-ink-2">
          Each tool sends what you write to an AI model with a prompt built for that job, and shows the answer in plain language.
          Ergonomics, in the top bar, sets the background, text size, a dyslexia-friendly font and reduced motion.
        </p>
      </Section>

      <Section title="Privacy">
        <p className="text-sm leading-relaxed text-ink-2">
          CogOS never asks for a diagnosis, and nothing it writes mentions one. Your ergonomics settings stay on this device.
        </p>
      </Section>

      <p className="border-t border-line pt-5 text-xs text-ink-3">
        Built for the North American AI Challenge for Neurodiverse Learning, 2026. When the AI service is offline, tools show
        labelled sample results.
      </p>
    </div>
  );
};
