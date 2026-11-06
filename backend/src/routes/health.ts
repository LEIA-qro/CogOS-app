import { Router, Request, Response } from 'express';
import { config } from '../config.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    project: 'CogOS — Cognitive Operating System',
    version: '1.0.0',
    environment: config.nodeEnv,
    aiMode: config.isMockMode ? 'mock_sandbox' : 'live_gemini',
    partner: 'Kairós Inclusión (Monterrey, NL)',
    timestamp: new Date().toISOString(),
    modules: [
      { id: 'passport', name: 'Accommodation Passport', endpoint: '/api/passport/generate' },
      { id: 'unblocker', name: 'Task Unblocker', endpoint: '/api/unblocker/breakdown' },
      { id: 'decoder', name: 'Tone & Message Decoder', endpoint: '/api/decoder/analyze' },
      { id: 'crisis', name: 'Sensory Pause / Crisis Breaker', endpoint: '/api/crisis/pause' },
      { id: 'navigator', name: 'Company Culture Navigator', endpoint: '/api/navigator/query' },
    ],
  });
});

export default router;
