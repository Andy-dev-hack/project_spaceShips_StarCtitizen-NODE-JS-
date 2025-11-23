import mongoose from "mongoose";

const patrolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
    },
    size: String,
    minCrew: Number,
    recomendedCrew: Number,
  },
  { collection: "patrol" }
);
export const Patrol = mongoose.model("Patrol", patrolSchema);
