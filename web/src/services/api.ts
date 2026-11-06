// Llamadas a la API de cada herramienta
import { postJson } from './http.js';
import { passportFallback } from './fallbacks/passport.js';
import { unblockerFallback } from './fallbacks/unblocker.js';
import { decoderFallback } from './fallbacks/decoder.js';
import { pauseFallback } from './fallbacks/pause.js';
import { navigatorFallback } from './fallbacks/navigator.js';
import type {
  DecoderResponse,
  NavigatorResponse,
  PassportRequest,
  PassportResponse,
  PauseResponse,
  UnblockerResponse,
} from './apiTypes.js';

export type * from './apiTypes.js';

export const api = {
  generatePassport(payload: PassportRequest): Promise<PassportResponse> {
    return postJson('/api/passport/generate', payload, passportFallback(payload));
  },

  breakdownTask(vagueTask: string, totalMinutes: number = 45): Promise<UnblockerResponse> {
    return postJson(
      '/api/unblocker/breakdown',
      { vagueTask, totalAvailableMinutes: totalMinutes },
      unblockerFallback(vagueTask),
    );
  },

  decodeMessage(
    rawMessage: string,
    senderRole: string = 'Direct Manager',
    channel: string = 'Slack',
  ): Promise<DecoderResponse> {
    return postJson(
      '/api/decoder/analyze',
      { rawMessage, senderRole, channel },
      decoderFallback(rawMessage, senderRole),
    );
  },

  triggerSensoryPause(durationMinutes: number = 20, intensity: string = 'sensory_overload'): Promise<PauseResponse> {
    return postJson(
      '/api/crisis/pause',
      { durationMinutes, intensity, communicationChannel: 'Slack' },
      pauseFallback(durationMinutes, intensity),
    );
  },

  queryNavigator(query: string): Promise<NavigatorResponse> {
    return postJson('/api/navigator/query', { query }, navigatorFallback(query));
  },
};
