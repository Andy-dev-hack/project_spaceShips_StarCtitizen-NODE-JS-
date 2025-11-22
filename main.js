import express from "express";
import { connectDB } from "./config/db.js";
import "dotenv/config";

import navesRouter from "./routes/naves.routes.js";
import patrolRouter from "./routes/patrol.routes.js";
import auth from "./middleware/auth.middleware.js";

const app = express();
const PORT = 6000;

// Middleware para manejar peticiones JSON
app.use(express.json());

// Definición de rutas
app.use(auth);
app.use("/naves", navesRouter);
app.use("/patrol", patrolRouter);

// Conexión a la base de datos y levantamiento del servidor
await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});
