const H2o2 = require('@hapi/h2o2');
const Hapi = require('@hapi/hapi');
const HapiAuthBasic = require('@hapi/basic');
const HapiPino = require('hapi-pino');
const Inert = require('@hapi/inert');

const env = require('./env');
const logging = require('./logging');
const validate = require('./auth');

module.exports = async function app(
  routes,
  config,
  defaultPort,
  { loggingOptions, staticFilesDir } = {},
) {
  // Create a server with a host and port
  const server = Hapi.server({
    host: '0.0.0.0',
    port: env('PORT', defaultPort),
    routes: {
      files: {
        relativeTo: staticFilesDir,
      },
    },
  });

  console.log('Registering plugins');
  await server.register(H2o2);
  await server.register(Inert);
  await server.register({ plugin: HapiPino, options: { ...logging, ...loggingOptions } });

  if (env('BASIC_AUTH_DISABLED', false)) {
    console.warn('Disabling Basic Authentication');
  } else {
    console.log('Enabling Basic Authentication');
    await server.register(HapiAuthBasic);
    server.auth.strategy('simple', 'basic', { validate });
    server.auth.default('simple');
  }

  console.log('Adding routes');
  routes(server, config);

  // Optionally serve static files
  if (staticFilesDir) {
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true,
        },
      },
    });
  }

  return server;
};
