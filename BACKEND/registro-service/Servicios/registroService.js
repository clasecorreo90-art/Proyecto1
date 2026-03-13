const registroRepository = require('../Persistencia/registroRepository');

async function registrarUso(payload) {
  const { profesorId, claseId, salon, bloques, cantidadBloques } = payload;
  if (!profesorId || !claseId || !salon || (!bloques && !cantidadBloques)) {
    throw new Error('Faltan campos requeridos para el registro');
  }

  const bloquesArray = Array.isArray(bloques)
    ? bloques
    : Array.from({ length: cantidadBloques || bloques }, (_, index) => index + 1);

  const registro = await registroRepository.crearRegistro({
    profesorId,
    claseId,
    salon,
    bloques: bloquesArray
  });

  return registro;
}

module.exports = {
  registrarUso
};
