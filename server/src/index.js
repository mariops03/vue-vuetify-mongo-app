const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
const authRoutes = require('./routes/auth.routes');
const excersiseRoutes = require('./routes/api.routes');

require('./config/db');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', excersiseRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
