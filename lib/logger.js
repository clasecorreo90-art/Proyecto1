const LOG_LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

function resolveLevel() {
  const level = (process.env.LOG_LEVEL || 'info').toLowerCase();
  return LOG_LEVELS[level] ? level : 'info';
}

function formatMeta(meta) {
  if (!meta || Object.keys(meta).length === 0) {
    return '';
  }

  try {
    return ` ${JSON.stringify(meta)}`;
  } catch (error) {
    return ' {"meta":"[unserializable]"}';
  }
}

function createLogger(serviceName) {
  const currentLevel = resolveLevel();

  function shouldLog(level) {
    return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
  }

  function log(level, message, meta = {}) {
    if (!shouldLog(level)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level.toUpperCase()}] [${serviceName}] ${message}${formatMeta(meta)}`;

    if (level === 'error') {
      console.error(line);
      return;
    }

    if (level === 'warn') {
      console.warn(line);
      return;
    }

    console.log(line);
  }

  return {
    debug: (message, meta) => log('debug', message, meta),
    info: (message, meta) => log('info', message, meta),
    warn: (message, meta) => log('warn', message, meta),
    error: (message, meta) => log('error', message, meta)
  };
}

module.exports = {
  createLogger
};

