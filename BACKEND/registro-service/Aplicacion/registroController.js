const registroService = require('../Servicios/registroService');

async function registrar(req, res) {
  try {
    const payload = {
      ...req.body,
      profesorId: Number(req.body.profesorId),
      claseId: Number(req.body.claseId),
      cantidadBloques: req.body.cantidadBloques ? Number(req.body.cantidadBloques) : undefined
    };
    const registro = await registroService.registrarUso(payload);
    res.status(201).json({ mensaje: 'Registro guardado', registro });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registrar
};
