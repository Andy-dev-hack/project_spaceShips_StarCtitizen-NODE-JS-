import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_dev_123";

/**
 * Registra un nuevo usuario
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validar existencia previa
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: role || "user", // Por defecto user, pero permitimos enviar admin por ahora para pruebas
    });

    const userSaved = await newUser.save();

    // Crear token (opcional al registrar, pero útil)
    const token = jwt.sign(
      { id: userSaved._id, role: userSaved.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Inicia sesión y devuelve un token
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      { id: userFound._id, role: userFound.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
