import { Router, Request, Response } from 'express';
import { PassportRequestSchema } from '../types/passport.js';
import { aiService } from '../services/aiService.js';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const validatedPayload = PassportRequestSchema.parse(req.body);
    const result = await aiService.generatePassport(validatedPayload);
    res.json(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
      return;
    }
    console.error('Passport route error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
