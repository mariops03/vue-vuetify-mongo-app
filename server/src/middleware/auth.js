const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

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

    const exp = decoded.exp;
    if (exp - Math.floor(Date.now() / 1000) < 600) {
      try {
        const newToken = jwt.sign(
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          'GARNACHO',
          { expiresIn: '30m' }
        );

        res.cookie('token', newToken, { httpOnly: true });
      } catch (tokenError) {
        console.error('Error al renovar el token:', tokenError);
        return res.status(500).send({ error: 'Error al renovar el token' });
      }
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token ha expirado' });
    }
    res.status(401).send({ error: 'Error de autenticación' });
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

    const exp = decoded.exp;
    if (exp - Math.floor(Date.now() / 1000) < 600) {
      try {
        const newToken = jwt.sign(
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          'GARNACHO',
          { expiresIn: '30m' }
        );

        res.cookie('token', newToken, { httpOnly: true });
      } catch (tokenError) {
        console.error('Error al renovar el token:', tokenError);
        return res.status(500).send({ error: 'Error al renovar el token' });
      }
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token ha expirado' });
    }

    //console.error(error);
    res.status(401).send({ error: error.message });
  }
}


module.exports = { auth, authAdmin };
