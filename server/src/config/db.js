const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://marioprieta:06012003@cluster0.qnqhlum.mongodb.net/');

connection.then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
  console.error('Error al conectar a la base de datos', error);
});

module.exports = connection;
