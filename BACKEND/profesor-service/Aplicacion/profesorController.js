const profesorService = require('../Servicios/profesorService');

async function obtenerProfesor(req, res) {
  try {
    const profesor = await profesorService.traerProfesor(Number(req.params.id));
    res.json(profesor);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function obtenerClases(req, res) {
  try {
    const clases = await profesorService.traerClases(Number(req.params.id));
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listar(req, res) {
  const profesores = await profesorService.listarProfesores();
  res.json(profesores);
}

module.exports = {
  obtenerProfesor,
  obtenerClases,
  listar
};
