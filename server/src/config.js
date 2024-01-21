const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/vuetify-login-roles');

connection.then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
  console.error('Error al conectar a la base de datos', error);
});

const LoginSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        required: true
    }
    });

const collection = mongoose.model('users', LoginSchema);

module.exports = collection;