const options = {
  redact: ['req.headers.authorization'],
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
  } : undefined,
};

module.exports = options;
