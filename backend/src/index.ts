import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import healthRouter from './routes/health.js';
import passportRouter from './routes/passport.js';
import unblockerRouter from './routes/unblocker.js';
import decoderRouter from './routes/decoder.js';
import crisisRouter from './routes/crisis.js';
import navigatorRouter from './routes/navigator.js';

export const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/health', healthRouter);
app.use('/api/passport', passportRouter);
app.use('/api/unblocker', unblockerRouter);
app.use('/api/decoder', decoderRouter);
app.use('/api/crisis', crisisRouter);
app.use('/api/navigator', navigatorRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, config.host, () => {
    console.log(`🧠 CogOS API server active on http://${config.host}:${config.port}`);
    console.log(`Mode: ${config.isMockMode ? 'Mock Sandbox (Zero-failure demo mode)' : 'Live Gemini 2.5 Flash'}`);
  });
}
