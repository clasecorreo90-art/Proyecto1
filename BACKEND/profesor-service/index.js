const express = require('express');
const cors = require('cors');
const routes = require('./Operacion/routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Profesor service listening on ${PORT}`);
});
