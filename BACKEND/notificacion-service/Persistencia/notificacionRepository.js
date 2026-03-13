const pool = require('../Infraestructura/db');

async function obtenerHorariosPorDia(dia) {
  const result = await pool.query(
    `SELECT h.*, p.nombre AS profesor
     FROM horarios h
     LEFT JOIN profesores p ON p.id = h.profesor_id
     WHERE LOWER(h.dia) = LOWER($1)`,
    [dia]
  );

  return result.rows;
}

async function registroExiste(profesorId, bloques) {
  const result = await pool.query(
    `SELECT id FROM registros
     WHERE profesor_id = $1
       AND bloques && $2::int[]
     LIMIT 1`,
    [profesorId, bloques]
  );

  return result.rowCount > 0;
}

module.exports = {
  obtenerHorariosPorDia,
  registroExiste
};
