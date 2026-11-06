import { PassportResponse } from '../types/passport.js';
import { UnblockerResponse } from '../types/unblocker.js';
import { DecoderResponse } from '../types/decoder.js';
import { CrisisResponse } from '../types/crisis.js';
import { NavigatorResponse } from '../types/navigator.js';

export const mockPassportData: PassportResponse = {
  passportId: 'PASS-2026-90D',
  generatedAt: new Date().toISOString(),
  employeeInfo: {
    fullName: 'Alex Morgan',
    roleTitle: 'Associate Software Engineer (First 90 Days)',
  },
  executiveSummary:
    'Alex operates with peak performance in written-first, asynchronous task architectures with explicit definitions of done and controlled sensory environments.',
  formalAccommodations: [
    {
      category: 'Sensory Environment',
      need: 'High sensitivity to ambient noise and fluctuating fluorescent lighting.',
      reasonableAccommodation:
        'Permission to use noise-canceling headphones throughout core hours; desk allocation in a perimeter zone away from heavy foot traffic.',
      impactOnRetention: 'Reduces midday cognitive exhaustion and prevents sensory burnout.',
    },
    {
      category: 'Communication & Feedback',
      need: 'Anxiety stemming from unannounced calendar invites or ambiguous conversational pivots.',
      reasonableAccommodation:
        'All meetings require a 2-sentence agenda in the invite. Performance feedback is delivered in written bullet points prior to verbal review.',
      impactOnRetention: 'Neutralizes catastrophizing and guarantees actionable comprehension.',
    },
    {
      category: 'Task Architecture & Executive Function',
      need: 'Susceptibility to initiation paralysis when tasks lack granular acceptance criteria.',
      reasonableAccommodation:
        'Work assignments must include a clear "Definition of Done" and allow 5-minute micro-chunking intervals.',
      impactOnRetention: 'Eliminates stalled workflows and accelerates ramp-up velocity during the first 90 days.',
    },
  ],
  managerQuickReference: {
    doList: [
      'Share meeting objectives at least 2 hours in advance.',
      'Provide asynchronous feedback via Slack or email before formal 1-on-1s.',
      'Specify clear completion criteria for deliverables.',
    ],
    dontList: [
      'Do not send ambiguous meeting invites titled "Sync" or "Catch up" without context.',
      'Avoid relying exclusively on verbal instructions without written follow-up.',
      'Do not evaluate quiet focus or camera-off deep work as lack of engagement.',
    ],
  },
  legalAndComplianceNote:
    'Structured in compliance with standard workplace inclusion guidelines to support 90-day retention.',
  mode: 'mock',
};

export const mockUnblockerData: UnblockerResponse = {
  originalTask: 'Prepare the quarterly performance analysis for the leadership review',
  clarifiedObjective:
    'Assemble a 5-slide summary highlighting Q3 software delivery metrics, budget variance, and three key team achievements for senior leadership.',
  definitionOfDone: [
    'Slide 1: Executive KPI overview table with target vs actual delivery metrics.',
    'Slide 2: Budget utilization chart with 1-sentence annotation per variance.',
    'Slide 3: Top 3 team deliverables completed on time.',
    'Slide 4: Known bottlenecks and mitigation roadmap.',
    'Slide 5: Q4 resource request summary.',
    'All numbers cross-verified with JIRA sprint reports.',
  ],
  cognitiveLoadRating: 'medium',
  firstStepStarterKit:
    'Open the slide deck template and paste the 5 slide headers listed above. Do not worry about content yet—just establish the skeleton.',
  microSteps: [
    {
      stepNumber: 1,
      title: 'Initialize Document Skeleton',
      actionableDirective: 'Create a new presentation using the corporate template and create 5 blank slides with the DoD titles.',
      estimatedMinutes: 3,
      starterTemplateOrPrompt: 'Title: Q3 Performance Review - Engineering Operations',
      definitionOfDoneCriteria: '5 blank titled slides saved in Google Drive folder.',
    },
    {
      stepNumber: 2,
      title: 'Pull Raw Sprint Metrics',
      actionableDirective: 'Open the JIRA Dashboard and copy the velocity and completion rate percentages into Slide 1.',
      estimatedMinutes: 5,
      definitionOfDoneCriteria: 'Raw percentages visible on Slide 1 table.',
    },
    {
      stepNumber: 3,
      title: 'Draft Top 3 Highlights',
      actionableDirective: 'Write three single-sentence bullets describing completed project milestones.',
      estimatedMinutes: 5,
      starterTemplateOrPrompt: '1. Delivered Module X ahead of schedule. 2. Reduced onboarding lag by 20%. 3. Resolved P1 tickets.',
      definitionOfDoneCriteria: '3 clear bullets on Slide 3.',
    },
    {
      stepNumber: 4,
      title: 'Sanity Check & Format',
      actionableDirective: 'Review font consistency and run spellcheck.',
      estimatedMinutes: 4,
      definitionOfDoneCriteria: 'Consistent fonts and zero typos.',
    },
  ],
  mode: 'mock',
};

export const mockDecoderData: DecoderResponse = {
  rawMessage: 'We need to talk at 4 PM today.',
  senderRole: 'Direct Manager',
  perceivedUrgency: 'normal',
  catastrophizingNeutralizer: {
    irrationalFear: 'I made a catastrophic mistake or I am about to get fired.',
    probableReality:
      'In corporate environments, managers write terse messages when multi-tasking between meetings. 85% of such invites are routine status check-ins, sprint balance reassignments, or clarifying a detail.',
    statisticalContext:
      'Manager calendar slots at 4 PM are typically end-of-day sync windows, not disciplinary actions.',
  },
  subtextAnalysis: {
    explicitMeaning: 'A 1-on-1 discussion is scheduled for 16:00.',
    implicitIntent: 'Sender did not provide context due to time compression, not malice or urgency.',
    corporateTone: 'Terse, neutral, operational brevity.',
  },
  responseOptions: [
    {
      key: 'clarification',
      label: 'Context Request (Anxiety Neutralizer)',
      suggestedText:
        'Hi! Sounds good. To make sure I come prepared and bring any relevant files, could you let me know which topic or project we will be covering?',
      rationale: 'Professionally elicits an agenda while signaling preparedness and reducing suspense.',
    },
    {
      key: 'affirmation',
      label: 'Standard Professional Confirmation',
      suggestedText: 'Acknowledged. I have that blocked on my calendar and will join the call at 4:00 PM.',
      rationale: 'Clean, confident, and demonstrates adherence to schedule without over-explaining.',
    },
    {
      key: 'boundary_setting',
      label: 'Rescheduling / Deep Work Buffer',
      suggestedText:
        'Hi, I have a deep focus block scheduled until 4:30 PM to finish the sprint deliverable. Can we connect at 4:30 PM, or would you prefer I pause the deliverable?',
      rationale: 'Transparently communicates work state while placing the prioritization call on the manager.',
    },
  ],
  mode: 'mock',
};

export const mockCrisisData: CrisisResponse = {
  intensity: 'sensory_overload',
  recommendedPauseMinutes: 20,
  groundingExercise: {
    technique: '5-4-3-2-1 Sensory Grounding Reset',
    steps: [
      'Acknowledge 5 things you can see around your desk (e.g., monitor frame, notebook color, pen, light reflection, cup).',
      'Touch 4 physical textures (e.g., keyboard edge, fabric of your sleeve, smooth desk surface, paper sheet).',
      'Listen for 3 distinct ambient sounds (e.g., fan hum, distant footsteps, keyboard clicks).',
      'Identify 2 physical scents or take two deep nasal breaths.',
      'Take 1 slow sip of cool water and feel the temperature sensation in your throat.',
    ],
    audioSensoryGuidance: 'Breathe in for 4 seconds, hold gently for 2 seconds, exhale for 6 seconds.',
  },
  discreetCorporateOutreach: {
    subjectOrStatus: 'Deep Focus & Async Mode (20 min)',
    messageBody:
      'Stepping into a deep focus / async sprint block for the next 20 minutes to finish core deliverable components. Will be back online and reviewing messages at :TIME_RECOVERY.',
    privacyGuaranteeNote:
      'This message establishes a professional boundary without disclosing health, sensory, or neurodivergent details.',
  },
  mode: 'mock',
};

export const mockNavigatorData: NavigatorResponse = {
  query: 'What is the unwritten rule about keeping cameras on during Zoom calls?',
  directPlainAnswer:
    'In small team standups (<6 people) having cameras on is socially expected for rapport, but in company-wide all-hands (>20 people) having cameras off is standard and completely acceptable.',
  explicitRuleVsSocialNorm: {
    officialPolicy:
      'The company handbook recommends visual presence to foster team unity whenever bandwidth permits.',
    unwrittenCultureNorm:
      'Senior engineers and managers frequently switch cameras off during all-hands meetings or when eating/taking notes. If you need your camera off during a team meeting, sending a 1-sentence note in chat ("Camera off today while I take notes on second screen") gives you 100% social cover.',
  },
  stepByStepActionPlan: [
    'If the meeting has >15 attendees: Leave camera off by default; no explanation needed.',
    'If the meeting is a 1-on-1 or small team: Keep camera on for the first 2 minutes of greeting, then you can say "Dropping off camera to focus on screen share".',
    'Use a static professional avatar photo so your box is never a blank silhouette.',
  ],
  safeTemplateToUse:
    'Turning off my video feed to preserve bandwidth and take detailed notes on my secondary monitor.',
  relevantDepartmentOrContact: 'Engineering People Ops / Internal Culture Guide',
  mode: 'mock',
};
