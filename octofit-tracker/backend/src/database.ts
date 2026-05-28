import mongoose from 'mongoose';

const DEFAULT_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDB(uri?: string) {
  const connectUri = uri || DEFAULT_URI;
  return mongoose.connect(connectUri);
}

export default connectDB;
