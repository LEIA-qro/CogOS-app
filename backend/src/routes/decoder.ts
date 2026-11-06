import { Router, Request, Response } from 'express';
import { DecoderRequestSchema } from '../types/decoder.js';
import { aiService } from '../services/aiService.js';

const router = Router();

router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const validatedPayload = DecoderRequestSchema.parse(req.body);
    const result = await aiService.decodeMessage(validatedPayload);
    res.json(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
      return;
    }
    console.error('Decoder route error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
