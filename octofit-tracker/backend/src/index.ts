import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { connectDB } from './database';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

// Build Codespaces-aware base URL (prefers Codespaces forwarded URL when available)
const BASE_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const app = express();
app.use(express.json());

// Configure CORS to allow local development and Codespaces forwarded URL when available
const allowedOrigins = new Set<string>(['http://localhost:5173']);
if (process.env.CODESPACE_NAME) {
  // Codespaces forwards the port under <name>-<port>.app.github.dev
  allowedOrigins.add(`https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error('CORS not allowed'), false);
    },
  })
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Expose config endpoint so Codespaces/clients can discover backend base URL
app.get('/api/config', (_req, res) => {
  res.json({ baseUrl: BASE_URL });
});

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function start() {
  // Attempt to connect to MongoDB but do not prevent the server from starting
  connectDB()
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.warn('MongoDB connection failed (continuing without DB):', err.message || err));

  app.listen(PORT, () => {
    console.log(`Backend listening on ${BASE_URL}`);
    if (process.env.CODESPACE_NAME) {
      console.log(`Codespaces URL: https://${process.env.CODESPACE_NAME}-8000.app.github.dev`);
    }
  });
}

start();
