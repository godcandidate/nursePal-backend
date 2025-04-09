import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRank extends Document {
  numberOfTestsTaken: number;
  averageScore: number;
}

//User Schema
const rankSchema: Schema<IRank> = new mongoose.Schema({
numberOfTestsTaken: {
    type: Number,
    default: 0,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
});

const rankModel: Model<IRank> = mongoose.model("Ranks", rankSchema);
export default rankModel;
