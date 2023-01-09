import { Schema, model, Document } from "mongoose";

export interface IDevotional extends Document {
  date: any;
  title: string;
  text: string;
  mainText: string;
  content: string;
  confession: string;
  furtherReading: string[];
  oneYearBibleReading: string[];
  twoYearsBibleReading: string[];
  createdBy: string;
  views: number
}


const devotionalSchema = new Schema<IDevotional>({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  mainText: { type: String, required: true },
  content: { type: String, required: true },
  confession: { type: String, required: true },
  furtherReading: { type: [String], required: true },
  oneYearBibleReading: { type: [String], required: true },
  twoYearsBibleReading: { type: [String], required: true },
  createdBy: { type: String, required: true },
  views: { type: Number, required: true, default: 0 },
}, { timestamps: true });

// Hide Password in responses
devotionalSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

const DevotionalModel = model<IDevotional>('Devotional', devotionalSchema)

export default DevotionalModel