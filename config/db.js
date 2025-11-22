import mongoose from "mongoose";

// ❌ Eliminamos la URL hardcodeada
// const dbUrl = "mongodb+srv://andy-dev:andymongodev@cluster-0.2xwgxs2.mongodb.net/naves";

/**
 * Función para establecer la conexión a la base de datos MongoDB.
 * Utiliza Mongoose y la URL de conexión definida en el archivo .env (MONGO_URI).
 */
export const connectDB = async () => {
  // Aseguramos que la URI esté disponible
  const dbUrl = process.env.MONGO_URI;
  if (!dbUrl) {
    console.error(
      "Error: La variable MONGO_URI no está definida en el archivo .env"
    );
    process.exit(1);
  }

  try {
    // Intenta conectar a la base de datos usando la URL
    await mongoose.connect(dbUrl);
    console.log("📀 DB conectada");
  } catch (err) {
    // Si la conexión falla, registra el error y termina el proceso.
    console.error("Error de conexión:", err);
    // Terminar el proceso con fallo si la conexión falla
    process.exit(1);
  }
};

// import mongoose from "mongoose";

// // URL de conexión a MongoDB Atlas
// const dbUrl =
//   "mongodb+srv://andy-dev:andymongodev@cluster-0.2xwgxs2.mongodb.net/naves";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(dbUrl);
//     console.log("📀 DB conectada");
//   } catch (err) {
//     console.error("Error de conexión:", err);
//     // Terminar el proceso con fallo si la conexión falla
//     process.exit(1);
//   }
// };
