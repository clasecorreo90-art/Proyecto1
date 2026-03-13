const express = require('express');
const cors = require('cors');
const routes = require('./Operacion/routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Notificacion service listening on ${PORT}`);
});
