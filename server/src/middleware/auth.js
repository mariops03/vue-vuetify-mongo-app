const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const decoded = jwt.verify(token, 'GARNACHO');

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token ha expirado' });
    }

    console.error(error);
    res.status(401).send({ error: error.message });
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const decoded = jwt.verify(token, 'GARNACHO');

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    if (user.role !== 'admin') {
      throw new Error('Usuario no autorizado');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token ha expirado' });
    }

    console.error(error);
    res.status(401).send({ error: error.message });
  }
}

module.exports = { auth, authAdmin };
