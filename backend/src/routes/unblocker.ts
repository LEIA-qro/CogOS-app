import { Router, Request, Response } from 'express';
import { UnblockerRequestSchema } from '../types/unblocker.js';
import { aiService } from '../services/aiService.js';

const router = Router();

router.post('/breakdown', async (req: Request, res: Response) => {
  try {
    const validatedPayload = UnblockerRequestSchema.parse(req.body);
    const result = await aiService.breakdownTask(validatedPayload);
    res.json(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
      return;
    }
    console.error('Unblocker route error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
