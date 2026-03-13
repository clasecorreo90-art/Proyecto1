const pool = require('../Infraestructura/db');

async function obtenerRegistros() {
  const result = await pool.query(
    `SELECT r.id,
            r.salon,
            r.bloques,
            p.nombre AS profesor,
            c.nombre AS clase
     FROM registros r
     LEFT JOIN profesores p ON p.id = r.profesor_id
     LEFT JOIN clases c ON c.id = r.clase_id
     ORDER BY r.registrado DESC`
  );

  return result.rows;
}

module.exports = {
  obtenerRegistros
};
