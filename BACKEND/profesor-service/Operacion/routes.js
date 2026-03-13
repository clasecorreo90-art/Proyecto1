const express = require('express');
const profesorController = require('../Aplicacion/profesorController');

const router = express.Router();

router.get('/profesores', profesorController.listar);
router.get('/profesor/:id', profesorController.obtenerProfesor);
router.get('/profesor/:id/clases', profesorController.obtenerClases);

module.exports = router;
