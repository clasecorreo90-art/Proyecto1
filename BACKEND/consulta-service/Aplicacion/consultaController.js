const consultaService = require('../Servicios/consultaService');

async function listarSalones(req, res) {
  try {
    const bloque = req.query.bloque ? Number(req.query.bloque) : undefined;
    const salones = await consultaService.consultarSalones(bloque);
    res.json(salones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarSalones
};
