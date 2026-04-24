const express = require('express');
const cors = require('cors');
const routes = require('./Operacion/routes');
const { iniciarLiberacionBloques } = require('./Servicios/bloqueScheduler');
const { createLogger } = require('../../lib/logger');
require('dotenv').config();

const app = express();
const logger = createLogger('registro-service');

app.use(cors());
app.use(express.json());
app.use('/registro', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Registro service listening on ${PORT}`);
});

iniciarLiberacionBloques();
logger.info('Bloque scheduler initialized');
