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

async function crearProfesor({ nombre, departamento }) {
  const nombreNormalizado = String(nombre || '').trim();
  const departamentoNormalizado = String(departamento || '').trim();

  if (!nombreNormalizado || !departamentoNormalizado) {
    const error = new Error('Nombre y departamento son obligatorios');
    error.statusCode = 400;
    throw error;
  }

  return profesorRepository.crearProfesor({
    nombre: nombreNormalizado,
    departamento: departamentoNormalizado
  });
}

async function crearMateria({ nombre, profesorId }) {
  const nombreNormalizado = String(nombre || '').trim();
  const profesorIdNormalizado = Number(profesorId);

  if (!nombreNormalizado || !Number.isInteger(profesorIdNormalizado) || profesorIdNormalizado <= 0) {
    const error = new Error('Nombre y profesorId son obligatorios');
    error.statusCode = 400;
    throw error;
  }

  await traerProfesor(profesorIdNormalizado);

  const materia = await profesorRepository.crearMateria({
    nombre: nombreNormalizado,
    profesorId: profesorIdNormalizado
  });

  return {
    id: materia.id,
    nombre: materia.nombre,
    profesorId: materia.profesor_id
  };
}

module.exports = {
  traerProfesor,
  traerClases,
  listarProfesores,
  crearProfesor,
  crearMateria
};
