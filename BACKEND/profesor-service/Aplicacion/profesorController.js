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
  try {
    const profesores = await profesorService.listarProfesores();
    res.json(profesores);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function crearProfesor(req, res) {
  try {
    const profesor = await profesorService.crearProfesor(req.body || {});
    res.status(201).json(profesor);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function crearMateria(req, res) {
  try {
    const materia = await profesorService.crearMateria(req.body || {});
    res.status(201).json(materia);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  obtenerProfesor,
  obtenerClases,
  listar,
  crearProfesor,
  crearMateria
};
