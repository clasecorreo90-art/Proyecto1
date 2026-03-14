const express = require('express');
const cors = require('cors');
const routes = require('./Operacion/routes');
const { createLogger } = require('../../lib/logger');
require('dotenv').config();

const app = express();
const logger = createLogger('notificacion-service');
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Notificacion service listening on ${PORT}`);
});
