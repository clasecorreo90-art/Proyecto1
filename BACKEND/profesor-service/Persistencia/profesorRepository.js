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

async function crearProfesor({ nombre, departamento }) {
  const result = await pool.query(
    'INSERT INTO profesores (nombre, departamento) VALUES ($1, $2) RETURNING id, nombre, departamento',
    [nombre, departamento]
  );
  return result.rows[0];
}

async function crearMateria({ nombre, profesorId }) {
  const result = await pool.query(
    'INSERT INTO clases (nombre, profesor_id) VALUES ($1, $2) RETURNING id, nombre, profesor_id',
    [nombre, profesorId]
  );
  return result.rows[0];
}

module.exports = {
  obtenerProfesor,
  obtenerClasesPorProfesor,
  listarProfesores,
  crearProfesor,
  crearMateria
};
