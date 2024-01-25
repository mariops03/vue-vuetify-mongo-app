const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/vuetify-login-roles');

connection.then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
  console.error('Error al conectar a la base de datos', error);
});

module.exports = connection;
