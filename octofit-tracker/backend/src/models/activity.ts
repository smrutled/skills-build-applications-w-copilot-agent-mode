import { Schema, model } from 'mongoose';

const ActivitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    distanceKm: { type: Number },
    durationMin: { type: Number },
    calories: { type: Number },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model('Activity', ActivitySchema);
