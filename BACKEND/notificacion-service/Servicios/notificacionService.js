const notificacionRepository = require('../Persistencia/notificacionRepository');

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function obtenerDiaActual() {
  const hoy = new Date();
  return DIAS[hoy.getDay()];
}

async function detectarAusencias() {
  const diaActual = obtenerDiaActual();
  const horarios = await notificacionRepository.obtenerHorariosPorDia(diaActual);
  const ausencias = [];

  for (const horario of horarios) {
    const bloques = horario.bloques || [];
    const tieneRegistro = await notificacionRepository.registroExiste(horario.profesor_id, bloques);

    if (!tieneRegistro) {
      ausencias.push({
        profesorId: horario.profesor_id,
        profesor: horario.profesor,
        clase: horario.clase,
        dia: horario.dia,
        bloques
      });
    }
  }

  return ausencias;
}

module.exports = {
  detectarAusencias
};
