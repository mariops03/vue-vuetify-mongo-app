const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, 'GARNACHO');

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ error: e.message });
  }
};

module.exports = auth;
