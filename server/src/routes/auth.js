const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { auth, authAdmin } = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "El nombre de usuario ya está en uso.",
      });
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

      res.cookie("token", token, { httpOnly: true });

      res.json({ success: true, message: "Usuario registrado con éxito." });
    }
  } catch (error) {
    console.error("Error durante el registro:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            _id: user._id, // Incluye el _id del usuario
            username: user.username,
            email: user.email,
            role: user.role,
          },
          "GARNACHO",
          { expiresIn: "30m" }
        );
        res.cookie("token", token, { httpOnly: true });
        res
          .status(200)
          .json({ success: true, message: "Inicio de sesión exitoso" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Credenciales incorrectas" });
      }
    } else {
      res
        .status(401)
        .json({ success: false, message: "El usuario introducido no existe" });
    }
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
});

router.get("/user", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/admin", auth, authAdmin, async (req, res) => {
    if (req.user.role === "admin") {
        res.send("Acceso concedido");
    } else {
        res.status(401).send("Acceso denegado");
    }
});

router.post("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .send({ success: true, message: "Sesión cerrada con éxito" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
