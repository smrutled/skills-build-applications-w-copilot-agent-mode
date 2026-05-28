import { Schema, model } from 'mongoose';

const LeaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

export default model('LeaderboardEntry', LeaderboardEntrySchema);
