const express = require('express');
const notificacionController = require('../Aplicacion/notificacionController');

const router = express.Router();

router.get('/notificaciones', notificacionController.revisarAusencias);

module.exports = router;
