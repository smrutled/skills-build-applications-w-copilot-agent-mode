import { Router } from 'express';

const router = Router();

// GET /api/workouts/
router.get('/', (_req, res) => {
  res.json({ workouts: [] });
});

// POST /api/workouts/
router.post('/', (req, res) => {
  const workout = req.body;
  res.status(201).json({ workout });
});

export default router;
