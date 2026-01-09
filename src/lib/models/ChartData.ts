// File: lib/models/ChartData.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IChartData extends Document {
  time: string;
  requests: number;
  visitors: number;
  createdAt: Date;
  updatedAt: Date;
}

const ChartDataSchema = new Schema<IChartData>(
  {
    time: {
      type: String,
      required: [true, 'Time is required'],
      unique: true,
      trim: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time format (HH:MM)']
    },
    requests: {
      type: Number,
      required: [true, 'Requests count is required'],
      min: [0, 'Requests cannot be negative'],
      default: 0
    },
    visitors: {
      type: Number,
      required: [true, 'Visitors count is required'],
      min: [0, 'Visitors cannot be negative'],
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Create or retrieve the model
const ChartData = mongoose.models.ChartData || mongoose.model<IChartData>('ChartData', ChartDataSchema);

export default ChartData;