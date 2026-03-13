const pool = require('../Infraestructura/db');

async function obtenerProfesor(id) {
  const result = await pool.query(
    'SELECT id, nombre, departamento FROM profesores WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

async function obtenerClasesPorProfesor(id) {
  const result = await pool.query(
    'SELECT id, nombre FROM clases WHERE profesor_id = $1',
    [id]
  );
  return result.rows;
}

async function listarProfesores() {
  const result = await pool.query('SELECT id, nombre, departamento FROM profesores ORDER BY nombre');
  return result.rows;
}

module.exports = {
  obtenerProfesor,
  obtenerClasesPorProfesor,
  listarProfesores
};
