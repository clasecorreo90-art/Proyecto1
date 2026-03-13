const notificacionService = require('../Servicios/notificacionService');

async function revisarAusencias(req, res) {
  try {
    const ausencias = await notificacionService.detectarAusencias();
    res.json({ ausencias, alerta: ausencias.length > 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  revisarAusencias
};
