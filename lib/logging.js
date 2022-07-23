const options = {
  logEvents:
    process.env.NODE_ENV !== 'test'
      ? ['onPostStart', 'onPostStop', 'request-error', 'response']
      : false,
  redact: ['req.headers.authorization'],
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
  } : undefined,
};

module.exports = options;
