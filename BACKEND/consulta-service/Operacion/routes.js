const express = require('express');
const consultaController = require('../Aplicacion/consultaController');

const router = express.Router();

router.get('/salones', consultaController.listarSalones);

module.exports = router;
