import mongoose, { Document, Model, Schema } from "mongoose";

export interface IScore extends Document {
  userId: string
  testId: string;
  courseId: string;
  score: number;
  dateTaken: Date;
}

//User Schema
const scoreSchema: Schema<IScore> = new mongoose.Schema({
  userId: {
        type: String,
        required: [true, "Enter user Id"],
        index: true,
      },
  testId: {
    type: String,
    required: [true, "Enter test Id"],
  },
  courseId: {
    type: String,
    required: [true, "Enter course Id"],
    index: true,
  },
  score: {
    type: Number,
    required: [true, "Enter user score "],
  },
  dateTaken: {
    type: Date,
    required: [true, "Enter date "],
  },
});

const scoreModel: Model<IScore> = mongoose.model("Scores", scoreSchema);
export default scoreModel;
