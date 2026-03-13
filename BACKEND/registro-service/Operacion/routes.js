const express = require('express');
const registroController = require('../Aplicacion/registroController');

const router = express.Router();

router.post('/', registroController.registrar);

module.exports = router;
