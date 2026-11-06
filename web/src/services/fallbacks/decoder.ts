import type { DecoderResponse } from '../apiTypes.js';

export const decoderFallback = (rawMessage: string, senderRole: string): DecoderResponse => ({
  rawMessage,
  senderRole,
  perceivedUrgency: 'normal',
  catastrophizingNeutralizer: {
    irrationalFear: 'This might mean I did something wrong.',
    probableReality: 'Short messages are often written in a hurry. The tone alone does not tell you much.',
    statisticalContext: 'Short messages can mean time pressure. They can also mean something else.',
  },
  subtextAnalysis: {
    explicitMeaning: 'A conversation is requested.',
    implicitIntent: 'The intent is unclear from this message alone.',
    corporateTone: 'Direct, neutral, operational brevity.',
  },
  responseOptions: [
    {
      key: 'clarification',
      label: 'Ask for context',
      suggestedText: 'Thanks for the message. Could you tell me a bit more about what this is about, so I can respond properly?',
      rationale: 'Gets the missing context without guessing.',
    },
    {
      key: 'affirmation',
      label: 'Acknowledge',
      suggestedText: "Got it, thanks. I'll take a look and get back to you.",
      rationale: 'Confirms you saw it without committing to more.',
    },
    {
      key: 'boundary_setting',
      label: 'Ask about timing',
      suggestedText: 'Thanks. Is this something you need from me today, or can it wait until later?',
      rationale: 'Finds out how soon to act, without pushing back.',
    },
  ],
  mode: 'mock',
});
