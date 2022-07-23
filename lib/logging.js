const options = {
  prettyPrint: process.env.NODE_ENV !== 'production',
  redact: ['req.headers.authorization'],
};

module.exports = options;
