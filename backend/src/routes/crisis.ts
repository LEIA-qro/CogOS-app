import { Router, Request, Response } from 'express';
import { CrisisRequestSchema } from '../types/crisis.js';
import { aiService } from '../services/aiService.js';

const router = Router();

router.post('/pause', async (req: Request, res: Response) => {
  try {
    const validatedPayload = CrisisRequestSchema.parse(req.body);
    const result = await aiService.triggerSensoryPause(validatedPayload);
    res.json(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
      return;
    }
    console.error('Crisis route error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
