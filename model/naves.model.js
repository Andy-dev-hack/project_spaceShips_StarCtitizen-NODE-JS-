// src/models/Nave.model.js
import mongoose from "mongoose";

// Definición del esquema de la nave
const naveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // Se añade 'unique: true' para asegurar que no haya nombres de nave duplicados.
      unique: true,
    },
    price: {
      type: Number,
    },
    size: String, // Propiedad opcional para el tamaño
    calidad: Boolean,
  },
  // Especificamos la colección en la base de datos (aunque Mongoose lo haría automáticamente, es buena práctica)
  { collection: "naves" }
);

export const Nave = mongoose.model("Nave", naveSchema);
