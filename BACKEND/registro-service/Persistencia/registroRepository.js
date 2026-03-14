const pool = require('../Infraestructura/db');

async function crearRegistro({ profesorId, claseId, salon, bloques }) {
  const result = await pool.query(
    `INSERT INTO registros (profesor_id, clase_id, salon, bloques)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [profesorId, claseId, salon, bloques]
  );

  return result.rows[0];
}

async function bloquesOcupadosEnSalon(salon) {
  const result = await pool.query(
    `SELECT SUM(bloques) AS ocupados FROM registros WHERE salon = $1`,
    [salon]
  );

  return result.rows[0]?.ocupados || 0;
}

async function listarRegistros() {
  const result = await pool.query(
    `SELECT id, bloques, registrado
     FROM registros
     ORDER BY registrado ASC`
  );
  return result.rows;
}

async function actualizarBloques(id, bloques) {
  await pool.query(
    `UPDATE registros
     SET bloques = $2
     WHERE id = $1`,
    [id, bloques]
  );
}

async function eliminarRegistro(id) {
  await pool.query(
    `DELETE FROM registros
     WHERE id = $1`,
    [id]
  );
}

module.exports = {
  crearRegistro,
  bloquesOcupadosEnSalon,
  listarRegistros,
  actualizarBloques,
  eliminarRegistro
};
