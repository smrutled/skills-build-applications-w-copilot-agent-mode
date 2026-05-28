import { Schema, model } from 'mongoose';

const WorkoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    durationMin: { type: Number },
    difficulty: { type: String },
  },
  { timestamps: true }
);

export default model('Workout', WorkoutSchema);
