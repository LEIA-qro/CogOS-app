import { Router, Request, Response } from 'express';
import { NavigatorRequestSchema } from '../types/navigator.js';
import { aiService } from '../services/aiService.js';

const router = Router();

router.post('/query', async (req: Request, res: Response) => {
  try {
    const validatedPayload = NavigatorRequestSchema.parse(req.body);
    const result = await aiService.queryCompanyNavigator(validatedPayload);
    res.json(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
      return;
    }
    console.error('Navigator route error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
