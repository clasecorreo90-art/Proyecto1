const registroRepository = require('../Persistencia/registroRepository');

const DEFAULT_BLOCK_MINUTES = 1;
const DEFAULT_INTERVAL_MS = 10 * 1000;

async function liberarBloquesExpirados(blockDurationMs) {
  const registros = await registroRepository.listarRegistros();
  const now = Date.now();

  for (const registro of registros) {
    if (!registro.registrado || !Array.isArray(registro.bloques)) {
      continue;
    }

    const registradoMs = new Date(registro.registrado).getTime();
    if (Number.isNaN(registradoMs)) {
      continue;
    }

    const elapsedMs = now - registradoMs;
    const bloquesExpirados = Math.floor(elapsedMs / blockDurationMs);

    if (bloquesExpirados <= 0) {
      continue;
    }

    if (bloquesExpirados >= registro.bloques.length) {
      await registroRepository.eliminarRegistro(registro.id);
      continue;
    }

    const bloquesRestantes = registro.bloques.slice(bloquesExpirados);
    await registroRepository.actualizarBloques(registro.id, bloquesRestantes);
  }
}

function iniciarLiberacionBloques() {
  const blockMinutes = Number(process.env.BLOCK_DURATION_MINUTES || DEFAULT_BLOCK_MINUTES);
  const blockDurationMs = Math.max(1, blockMinutes) * 60 * 1000;
  const intervalMs = Number(process.env.BLOCK_CHECK_INTERVAL_MS || DEFAULT_INTERVAL_MS);

  setInterval(() => {
    liberarBloquesExpirados(blockDurationMs).catch((error) => {
      console.error('Error liberando bloques:', error.message);
    });
  }, intervalMs);
}

module.exports = {
  iniciarLiberacionBloques
};
