const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const signUp = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return {
        success: false,
        message: "El nombre de usuario ya está en uso.",
      };
    } else {
      const hash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hash,
        role: "user",
      });

      await newUser.save();

      const token = jwt.sign(
        {
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
        "GARNACHO",
        { expiresIn: "30m" }
      );

      return { success: true, message: "Usuario registrado con éxito.", token };
    }
  } catch (error) {
    console.error("Error durante el registro:", error);
    return { success: false, message: "Error interno del servidor" };
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          "GARNACHO",
          { expiresIn: "30m" }
        );
        return {
          success: true,
          message: "Inicio de sesión exitoso",
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        };
      } else {
        return { success: false, message: "Credenciales incorrectas" };
      }
    } else {
      return { success: false, message: "El usuario introducido no existe" };
    }
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    return { success: false, message: "Error interno del servidor" };
  }
};

module.exports = { signUp, login };
