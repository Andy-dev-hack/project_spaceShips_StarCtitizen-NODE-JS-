// src/models/Nave.model.js
import mongoose from "mongoose";

// Ship schema definition
const naveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // Added 'unique: true' to ensure no duplicate ship names.
      unique: true,
    },
    price: {
      type: Number,
    },
    size: String, // Optional property for size
    calidad: Boolean,
  },
  // Specify collection in database (although Mongoose would do it automatically, it's good practice)
  { collection: "naves" }
);

export const Nave = mongoose.model("Nave", naveSchema);
