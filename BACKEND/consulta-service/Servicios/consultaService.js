const consultaRepository = require('../Persistencia/consultaRepository');
const SALONES_PREDETERMINADOS = ['Salon 101', 'Salon 102', 'Salon 201', 'Salon 202', 'Laboratorio A'];

function calcularEstado(bloques, bloqueConsultado) {
  if (!bloqueConsultado) {
    return bloques && bloques.length ? 'ocupado' : 'disponible';
  }

  return bloques.includes(Number(bloqueConsultado)) ? 'ocupado' : 'disponible';
}

async function consultarSalones(bloque) {
  const registros = await consultaRepository.obtenerRegistros();
  const mapaSalones = new Map();

  registros.forEach((registro) => {
    const estado = calcularEstado(registro.bloques, bloque);
    mapaSalones.set(registro.salon, {
      salon: registro.salon,
      estado,
      profesor: registro.profesor || 'Sin registro',
      clase: registro.clase || 'Sin clase',
      bloques: registro.bloques || []
    });
  });

  SALONES_PREDETERMINADOS.forEach((salon) => {
    if (!mapaSalones.has(salon)) {
      mapaSalones.set(salon, {
        salon,
        estado: 'disponible',
        profesor: null,
        clase: null,
        bloques: []
      });
    }
  });

  return Array.from(mapaSalones.values());
}

module.exports = {
  consultarSalones
};
