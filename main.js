import express from "express";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import navesRouter from "./routes/naves.routes.js";
import patrolRouter from "./routes/patrol.routes.js";
import authRouter from "./routes/auth.routes.js";
// import auth from "./middleware/auth.middleware.js"; // Removed global auth

const app = express();
const PORT = process.env.PORT || 3000; // Changed to 3000

// Middleware de seguridad y logs
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Middleware para manejar peticiones JSON
app.use(express.json());

// Definición de rutas
app.use("/auth", authRouter);
// app.use(auth); // Removed global auth
app.use("/naves", navesRouter);
app.use("/patrol", patrolRouter);

// Conexión a la base de datos y levantamiento del servidor
await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});
