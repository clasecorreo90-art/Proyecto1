const express = require('express');
const cors = require('cors');
const routes = require('./Operacion/routes');
const { createLogger } = require('../../lib/logger');
require('dotenv').config();

const app = express();
const logger = createLogger('profesor-service');
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  logger.info(`Profesor service listening on ${PORT}`);
});
