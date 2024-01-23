const authService = require('../services/authService');

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const result = await authService.signUp(username, email, password);
  if (result.success) {
    res.cookie("token", result.token, { httpOnly: true });
  }
  res.json(result);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.login(username, password);
  if (result.success) {
    res.cookie("token", result.token, { httpOnly: true });
  }
  res.json(result);
};

const getUser = async (req, res) => {
  res.send(req.user);
};

const getAdmin = async (req, res) => {
  if (req.user.role === "admin") {
    res.send("Acceso concedido");
  } else {
    res.status(401).send("Acceso denegado");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .send({ success: true, message: "Sesión cerrada con éxito" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e.message });
  }
};

module.exports = { signUp, login, getUser, getAdmin, logout };
