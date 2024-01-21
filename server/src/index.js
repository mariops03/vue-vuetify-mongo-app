const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const collection = require('./config');
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await collection.findOne({ username });

    if (existingUser) {
      res.status(400).json({ success: false, message: 'El nombre de usuario ya está en uso.' });
    } else {
        const hash = await bcrypt.hash(password, 10);
        
      const newUser = new collection({
        username,
        email,
        password: hash,
        role: 'user'
      });

      await newUser.save();

      res.json({ success: true, message: 'Usuario registrado con éxito.' });
    }
  } catch (error) {
    console.error('Error durante el registro:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await collection.findOne({ username });

    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if(match){
            res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
        }
        else{
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    } else {
      res.status(401).json({ success: false, message: 'El usuario introducido no existe' });
    }
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
