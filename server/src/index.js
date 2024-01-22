const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3001;

require('./config/db');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
