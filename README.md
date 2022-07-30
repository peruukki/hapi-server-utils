# hapi-server-utils

This package contains some handy utility methods that I use in my [hapi.js](https://hapijs.com/)
(v20) server applications.

## Installation

The package is not in the npm registry (don’t think it’s general-purpose enough), but you can install
it from GitHub:

```sh
npm install -S peruukki/hapi-server-utils#v2.0.0
```

## Available methods

### server(routes, config, defaultPort, [options])

Starts a hapi.js server with Basic Authentication (using
[@hapi/basic](https://github.com/hapijs/basic)), serving static files (using
[@hapi/inert](https://github.com/hapijs/inert)) and request proxying (using
[@hapi/h2o2](https://github.com/hapijs/h2o2)).

Basic Authentication is enabled by default, but can be disabled by defining the environment variable
`BASIC_AUTH_DISABLED=true`. If it is enabled, all requests are authenticated and access is allowed with
the credentials from the environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD` (see `lib/auth.js`).

The server serves given `routes` and all route handlers are passed the hapi.js server instance and the given
`config` value, see the example below.

The server listens on port from the environment variable `PORT` or the given `defaultPort`.

The optional `options` object can contain:

- `loggingOptions`: additional [hapi-pino options](https://github.com/pinojs/hapi-pino#options)
  to override the defaults
- `staticFilesDir`: if given, static files are served from that directory. Pass e.g.
  `path.join(__dirname, 'public')` if you have a top-level `public` directory.

#### Example usage

```javascript
// server.js
const { env, server } = require('hapi-server-utils');
const path = require('path');
const routes = require('./routes');

const config = { apiHost: env('API_HOST', 'http://127.0.0.1:8081') };
const staticFilesDir = path.join(__dirname, 'public');
server(routes, config, '8080', staticFilesDir);
```

```javascript
// routes.js
module.exports = function routes(server, config) {
  // Proxy API requests
  server.route({
    method: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
    path: '/api/{param*}',
    handler: {
      proxy: {
        uri: `${config.apiHost}/api/{param}`,
        passThrough: true,
      },
    },
  });
};
```

### app(routes, config, defaultPort, [options])

Similar to `server` but doesn't actually start a server, just returns the value from the `Hapi.server()` call.
Useful in tests with e.g. [supertest](https://github.com/visionmedia/supertest).

#### Example usage

```javascript
// app.js
const { app } = require('hapi-server-utils');
const routes = require('../../../routes');

const config = {
  /* Some test config */
};

module.exports = app(routes, config, '8080');
```

```javascript
// assertions.js
const request = require('supertest');

module.exports = async function assertResponse(app, requestUrl, statusCode) {
  const server = await app;
  return request(server.listener)
    .get(requestUrl)
    .expect(statusCode)
    .expect('Content-Type', 'application/json; charset=utf-8');
};
```

### env(key, [defaultValue])

Returns the value of the environment variable denoted by `key`, or `defaultValue` if the environment
variable is not defined. Just a wrapper for non-prefixed
[habitat#get](https://github.com/brianloveswords/habitat#habitatgetkey-default).

#### Example usage

```javascript
const { env } = require('hapi-server-utils');

const apiHost = env('API_HOST', 'http://127.0.0.1:8080');
```

## Testing

Run basic tests and lint the JavaScript with [ESLint](https://eslint.org/):

```sh
npm test
```

## Formatting

The code is formatted using [Prettier](https://prettier.io/) (see `.prettierrc` for the configuration).

## License

[MIT](LICENSE)

## Acknowledgements

This project has been a grateful recipient of the
[Futurice Open Source sponsorship program](https://www.futurice.com/blog/sponsoring-free-time-open-source-activities/?utm_source=github&utm_medium=spice).
