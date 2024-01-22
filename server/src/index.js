const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3001;

require('./config/db');

app.use(cors({
  origin: 'http://localhost:3000', // reemplaza esto con la URL de tu aplicación Vue.js
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
