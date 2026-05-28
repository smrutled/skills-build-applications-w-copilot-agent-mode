import { Router } from 'express';

const router = Router();

// GET /api/users/
router.get('/', (_req, res) => {
  res.json({ users: [] });
});

// POST /api/users/
router.post('/', (req, res) => {
  const user = req.body;
  // stub: would create user via Mongoose model
  res.status(201).json({ user });
});

export default router;
