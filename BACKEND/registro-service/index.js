const express = require('express');
const cors = require('cors');
const routes = require('./Operacion/routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/registro', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Registro service listening on ${PORT}`);
});
