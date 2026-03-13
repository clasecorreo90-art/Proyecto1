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

module.exports = {
  crearRegistro,
  bloquesOcupadosEnSalon
};
