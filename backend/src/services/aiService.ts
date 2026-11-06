import { GoogleGenAI } from '@google/genai';
import { config } from '../config.js';
import { PassportRequest, PassportResponse } from '../types/passport.js';
import { UnblockerRequest, UnblockerResponse } from '../types/unblocker.js';
import { DecoderRequest, DecoderResponse } from '../types/decoder.js';
import { CrisisRequest, CrisisResponse } from '../types/crisis.js';
import { NavigatorRequest, NavigatorResponse } from '../types/navigator.js';
import { PASSPORT_SYSTEM_PROMPT } from '../prompts/passportPrompt.js';
import { UNBLOCKER_SYSTEM_PROMPT } from '../prompts/unblockerPrompt.js';
import { DECODER_SYSTEM_PROMPT } from '../prompts/decoderPrompt.js';
import { CRISIS_SYSTEM_PROMPT } from '../prompts/crisisPrompt.js';
import { NAVIGATOR_SYSTEM_PROMPT } from '../prompts/navigatorPrompt.js';
import {
  mockPassportData,
  mockUnblockerData,
  mockDecoderData,
  mockCrisisData,
  mockNavigatorData,
} from './mockData.js';

class AIService {
  private client: GoogleGenAI | null = null;

  constructor() {
    if (config.geminiApiKey) {
      this.client = new GoogleGenAI({ apiKey: config.geminiApiKey });
    }
  }

  private isLiveAvailable(): boolean {
    return Boolean(this.client && config.geminiApiKey);
  }

  public async generatePassport(payload: PassportRequest): Promise<PassportResponse> {
    if (!this.isLiveAvailable()) {
      return {
        ...mockPassportData,
        employeeInfo: {
          fullName: payload.fullName,
          roleTitle: payload.roleTitle,
        },
        mode: 'mock',
      };
    }

    try {
      const prompt = `Generate a Sovereign Workplace Accommodation Passport in JSON format adhering to the system prompt instructions.
User Payload:
- Full Name: ${payload.fullName}
- Role: ${payload.roleTitle}
- Work Preferences: ${JSON.stringify(payload.workStylePreferences)}
- Sensory Triggers: ${JSON.stringify(payload.sensoryTriggers)}
- Communication: ${JSON.stringify(payload.communicationPreferences)}
- Executive Support Needs: ${JSON.stringify(payload.executiveSupportNeeds)}

Return JSON matching this TypeScript interface:
{
  "passportId": string,
  "generatedAt": string,
  "employeeInfo": { "fullName": string, "roleTitle": string },
  "executiveSummary": string,
  "formalAccommodations": Array<{ "category": string, "need": string, "reasonableAccommodation": string, "impactOnRetention": string }>,
  "managerQuickReference": { "doList": string[], "dontList": string[] },
  "legalAndComplianceNote": string
}`;

      const response = await this.client!.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: PASSPORT_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        ...parsed,
        mode: 'live',
      };
    } catch (error) {
      console.warn('Live Gemini call failed for Passport. Falling back to mock:', error);
      return { ...mockPassportData, mode: 'mock' };
    }
  }

  public async breakdownTask(payload: UnblockerRequest): Promise<UnblockerResponse> {
    if (!this.isLiveAvailable()) {
      return {
        ...mockUnblockerData,
        originalTask: payload.vagueTask,
        mode: 'mock',
      };
    }

    try {
      const prompt = `Deconstruct the following vague assignment into an explicit Definition of Done and 3-5 micro-steps (2-5 mins each):
Task: "${payload.vagueTask}"
Context: "${payload.context}"
Total Available Time: ${payload.totalAvailableMinutes} minutes.

Return JSON matching:
{
  "originalTask": string,
  "clarifiedObjective": string,
  "definitionOfDone": string[],
  "cognitiveLoadRating": "low" | "medium" | "high",
  "firstStepStarterKit": string,
  "microSteps": Array<{ "stepNumber": number, "title": string, "actionableDirective": string, "estimatedMinutes": number, "starterTemplateOrPrompt": string, "definitionOfDoneCriteria": string }>
}`;

      const response = await this.client!.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: UNBLOCKER_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        ...parsed,
        mode: 'live',
      };
    } catch (error) {
      console.warn('Live Gemini call failed for Unblocker. Falling back to mock:', error);
      return { ...mockUnblockerData, originalTask: payload.vagueTask, mode: 'mock' };
    }
  }

  public async decodeMessage(payload: DecoderRequest): Promise<DecoderResponse> {
    if (!this.isLiveAvailable()) {
      return {
        ...mockDecoderData,
        rawMessage: payload.rawMessage,
        senderRole: payload.senderRole,
        mode: 'mock',
      };
    }

    try {
      const prompt = `Analyze this message and neutralize catastrophizing anxiety:
Message: "${payload.rawMessage}"
Sender Role: "${payload.senderRole}"
Channel: "${payload.channel}"

Return JSON matching:
{
  "rawMessage": string,
  "senderRole": string,
  "perceivedUrgency": "low" | "normal" | "high" | "immediate",
  "catastrophizingNeutralizer": { "irrationalFear": string, "probableReality": string, "statisticalContext": string },
  "subtextAnalysis": { "explicitMeaning": string, "implicitIntent": string, "corporateTone": string },
  "responseOptions": Array<{ "key": "clarification" | "affirmation" | "boundary_setting", "label": string, "suggestedText": string, "rationale": string }>
}`;

      const response = await this.client!.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: DECODER_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        ...parsed,
        mode: 'live',
      };
    } catch (error) {
      console.warn('Live Gemini call failed for Decoder. Falling back to mock:', error);
      return {
        ...mockDecoderData,
        rawMessage: payload.rawMessage,
        senderRole: payload.senderRole,
        mode: 'mock',
      };
    }
  }

  public async triggerSensoryPause(payload: CrisisRequest): Promise<CrisisResponse> {
    const returnTime = new Date(Date.now() + payload.durationMinutes * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (!this.isLiveAvailable()) {
      const customizedBody = mockCrisisData.discreetCorporateOutreach.messageBody.replace(
        ':TIME_RECOVERY',
        returnTime
      );
      return {
        ...mockCrisisData,
        recommendedPauseMinutes: payload.durationMinutes,
        discreetCorporateOutreach: {
          ...mockCrisisData.discreetCorporateOutreach,
          messageBody: customizedBody,
        },
        mode: 'mock',
      };
    }

    try {
      const prompt = `Generate an immediate sensory pause grounding routine and discreet workplace notice:
Intensity: "${payload.intensity}"
Requested duration: ${payload.durationMinutes} minutes
Channel: "${payload.communicationChannel}"
Back Online Time: "${returnTime}"

Return JSON matching:
{
  "intensity": string,
  "recommendedPauseMinutes": number,
  "groundingExercise": { "technique": string, "steps": string[], "audioSensoryGuidance": string },
  "discreetCorporateOutreach": { "subjectOrStatus": string, "messageBody": string, "privacyGuaranteeNote": string }
}`;

      const response = await this.client!.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: CRISIS_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        ...parsed,
        mode: 'live',
      };
    } catch (error) {
      console.warn('Live Gemini call failed for Crisis. Falling back to mock:', error);
      return { ...mockCrisisData, recommendedPauseMinutes: payload.durationMinutes, mode: 'mock' };
    }
  }

  public async queryCompanyNavigator(payload: NavigatorRequest): Promise<NavigatorResponse> {
    if (!this.isLiveAvailable()) {
      return {
        ...mockNavigatorData,
        query: payload.query,
        mode: 'mock',
      };
    }

    try {
      const prompt = `Answer the neurodivergent onboarding question by explicitly separating official rule from unwritten social norm:
Query: "${payload.query}"
Company Context: "${payload.companyContext}"

Return JSON matching:
{
  "query": string,
  "directPlainAnswer": string,
  "explicitRuleVsSocialNorm": { "officialPolicy": string, "unwrittenCultureNorm": string },
  "stepByStepActionPlan": string[],
  "safeTemplateToUse": string,
  "relevantDepartmentOrContact": string
}`;

      const response = await this.client!.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: NAVIGATOR_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        ...parsed,
        mode: 'live',
      };
    } catch (error) {
      console.warn('Live Gemini call failed for Navigator. Falling back to mock:', error);
      return { ...mockNavigatorData, query: payload.query, mode: 'mock' };
    }
  }
}

export const aiService = new AIService();
