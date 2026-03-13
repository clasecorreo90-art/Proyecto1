const profesorRepository = require('../Persistencia/profesorRepository');

async function traerProfesor(id) {
  const profesor = await profesorRepository.obtenerProfesor(id);
  if (!profesor) {
    const error = new Error('Profesor no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return profesor;
}

async function traerClases(id) {
  return profesorRepository.obtenerClasesPorProfesor(id);
}

async function listarProfesores() {
  return profesorRepository.listarProfesores();
}

module.exports = {
  traerProfesor,
  traerClases,
  listarProfesores
};
