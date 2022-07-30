const app = require('./app');

module.exports = async function start(routes, config, defaultPort, options) {
  const server = await app(routes, config, defaultPort, options);

  try {
    console.log('Starting server');
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
  return server;
};
