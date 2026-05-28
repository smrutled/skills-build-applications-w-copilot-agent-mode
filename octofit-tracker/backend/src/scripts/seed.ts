/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import LeaderboardEntry from '../models/leaderboard';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URI);

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);

  // Create teams
  const alpha = await Team.create({ name: 'Team Alpha', description: 'First team' });
  const beta = await Team.create({ name: 'Team Beta', description: 'Second team' });

  // Create users
  const users = await User.create([
    { name: 'Alice Runner', email: 'alice@example.com', team: alpha._id },
    { name: 'Bob Cyclist', email: 'bob@example.com', team: beta._id },
    { name: 'Carol Swimmer', email: 'carol@example.com', team: alpha._id },
  ]);

  // Attach members to teams
  alpha.members = [users[0]._id, users[2]._id];
  beta.members = [users[1]._id];
  await alpha.save();
  await beta.save();

  // Create workouts
  const workouts = await Workout.create([
    { name: 'Quick HIIT', description: 'High intensity interval training', durationMin: 20, difficulty: 'hard' },
    { name: 'Evening Yoga', description: 'Relaxing stretch', durationMin: 30, difficulty: 'easy' },
  ]);

  // Create activities
  await Activity.create([
    { user: users[0]._id, type: 'run', distanceKm: 5.2, durationMin: 28, calories: 320 },
    { user: users[1]._id, type: 'cycle', distanceKm: 20.5, durationMin: 56, calories: 900 },
    { user: users[2]._id, type: 'swim', distanceKm: 1.0, durationMin: 35, calories: 450 },
  ]);

  // Create leaderboard entries
  await LeaderboardEntry.create([
    { user: users[1]._id, points: 1200, rank: 1 },
    { user: users[0]._id, points: 900, rank: 2 },
    { user: users[2]._id, points: 700, rank: 3 },
  ]);

  // Verification: print counts
  const [uCount, tCount, aCount, wCount, lCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    LeaderboardEntry.countDocuments(),
  ]);

  console.log('Seeding complete:');
  console.log({ users: uCount, teams: tCount, activities: aCount, workouts: wCount, leaderboard: lCount });

  // Optional: if BACKEND_URL provided, try to verify via API
  const backendUrl = process.env.BACKEND_URL;
  if (backendUrl) {
    try {
      console.log(`Verifying API responses at ${backendUrl}`);
      const resUsers = await fetch(`${backendUrl}/api/users`);
      const resTeams = await fetch(`${backendUrl}/api/teams`);
      console.log('/api/users ->', await resUsers.json());
      console.log('/api/teams ->', await resTeams.json());
    } catch (err) {
      console.warn('API verification failed:', err);
    }
  } else {
    console.log('To verify via API routes, run the backend and set BACKEND_URL (e.g. http://localhost:8000) then re-run the seed script.');
  }

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
