import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  host: process.env.HOST || '0.0.0.0',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  isMockMode: !process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
};
