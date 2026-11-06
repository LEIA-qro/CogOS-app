// Respuestas de ejemplo por tema
import type { NavigatorResponse } from '../apiTypes.js';

type Answer = Omit<NavigatorResponse, 'query' | 'mode'>;

const topics: { match: RegExp; answer: Answer }[] = [
  {
    match: /camera|zoom|video call|webcam|c[aá]mara/i,
    answer: {
      directPlainAnswer:
        'Many teams accept cameras off in large meetings, but the official policy may ask for cameras on. In small meetings, turning it on to say hello is a common middle ground.',
      explicitRuleVsSocialNorm: {
        officialPolicy: 'Many handbooks ask for cameras on when possible. Check yours for the exact wording.',
        unwrittenCultureNorm: 'On many teams, people turn cameras off now and then to rest or focus. A short chat note is usually enough.',
      },
      stepByStepActionPlan: [
        'In large meetings, follow what most people there do.',
        'In a 1-on-1, ask your manager what they prefer.',
        'Use a clear, friendly profile photo.',
      ],
      safeTemplateToUse: "I'm going to turn my camera off for a bit. I'm still here and listening.",
      relevantDepartmentOrContact: 'Your manager or HR',
    },
  },
  {
    match: /clarif|unclear|understand|question|incapable|aclara|entiendo/i,
    answer: {
      directPlainAnswer:
        'Asking for clarity early is seen as careful, not incapable. Most managers prefer one specific question now over a wrong result later.',
      explicitRuleVsSocialNorm: {
        officialPolicy: 'Most teams expect you to raise blockers as soon as you notice them.',
        unwrittenCultureNorm: 'Questions land best when you show what you already understood and ask about one thing.',
      },
      stepByStepActionPlan: [
        'Write down what you think the task is in one sentence.',
        'List the one or two things you are unsure about.',
        'Ask in writing, so the answer stays for later.',
      ],
      safeTemplateToUse:
        "To make sure I get this right: I understand the goal is X. Could you confirm Y before I start?",
      relevantDepartmentOrContact: 'Your manager or onboarding buddy',
    },
  },
  {
    match: /sick|leave|pto|vacation|mental health|day off|ill|enferm|permiso|vacaci/i,
    answer: {
      directPlainAnswer:
        'Time off usually has a written process: who to tell, how far ahead, and where to log it. You do not have to explain a health reason in detail.',
      explicitRuleVsSocialNorm: {
        officialPolicy: 'The handbook or HR portal lists the steps and how many days you have.',
        unwrittenCultureNorm: 'A short, early message to your manager is expected; details about your health are not.',
      },
      stepByStepActionPlan: [
        'Find the time-off section in the handbook or HR portal.',
        'Tell your manager as early as you can, in writing.',
        'Log the day off where your team tracks it.',
      ],
      safeTemplateToUse: "I'm not well today and will be offline. I'll update you tomorrow morning.",
      relevantDepartmentOrContact: 'HR and your manager',
    },
  },
  {
    match: /headphone|noise|quiet|desk|loud|light|aud[ií]fono|ruido|escritorio/i,
    answer: {
      directPlainAnswer:
        'Asking for a quieter spot or using headphones is a common, reasonable request. Framing it around focus works better than explaining why.',
      explicitRuleVsSocialNorm: {
        officialPolicy: 'Many workplaces have a process for workspace adjustments through HR or facilities.',
        unwrittenCultureNorm: 'Headphones during focus time are widely accepted; take one side off when someone talks to you.',
      },
      stepByStepActionPlan: [
        'Say what helps you focus, in one sentence.',
        'Suggest a specific option, like a desk away from traffic.',
        'Agree on a simple signal for when you are reachable.',
      ],
      safeTemplateToUse: 'I focus best with less noise. Could I sit somewhere quieter, or use headphones during focus time?',
      relevantDepartmentOrContact: 'Your manager or facilities',
    },
  },
  {
    match: /deadline|late|miss|behind|overdue|retras|fecha/i,
    answer: {
      directPlainAnswer:
        'Missing a deadline early on is usually recoverable if you say so before it passes and offer a new date.',
      explicitRuleVsSocialNorm: {
        officialPolicy: 'Performance reviews look at patterns over time, not one late task.',
        unwrittenCultureNorm: 'Managers mind surprises more than delays. A heads-up a day early builds trust.',
      },
      stepByStepActionPlan: [
        'Tell your manager as soon as you know it will be late.',
        'Share what is done and what is left.',
        'Propose a realistic new date.',
      ],
      safeTemplateToUse: "Heads-up: X will take longer than planned. Here's what's done; I can deliver the rest by Thursday.",
      relevantDepartmentOrContact: 'Your manager',
    },
  },
];

const general: Answer = {
  directPlainAnswer:
    'This depends on your company. The safest path is to check the handbook first, then ask one specific question to someone you trust.',
  explicitRuleVsSocialNorm: {
    officialPolicy: 'Look for it in the handbook, the HR portal or the team wiki.',
    unwrittenCultureNorm: 'Watch what experienced teammates do, and ask your onboarding buddy what is normal.',
  },
  stepByStepActionPlan: [
    'Search the handbook or wiki for the topic.',
    'Note what is still unclear.',
    'Ask your manager or buddy, in writing.',
  ],
  safeTemplateToUse: "Quick question about how we usually handle this here. What's the normal way to do it?",
  relevantDepartmentOrContact: 'Your manager or onboarding buddy',
};

export const navigatorFallback = (query: string): NavigatorResponse => ({
  query,
  ...(topics.find((t) => t.match.test(query))?.answer ?? general),
  mode: 'mock',
});
