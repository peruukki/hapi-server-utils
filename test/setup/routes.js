module.exports = (server, config) => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: () => config, // Just return passed configuration
  });
};
