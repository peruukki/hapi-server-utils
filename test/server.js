const { expect } = require('chai');

const startServer = require('../lib/server');
const routes = require('./setup/routes');

const config = {};

let server = null;
let error = null;

before(async () => {
  try {
    server = await startServer(routes, config, '4570');
  } catch (err) {
    console.error('Exception when starting server', err);
    error = err;
  }
});

after(() => {
  if (server) {
    server.stop();
  }
});

describe('server', () => {
  it('starts without errors', () => {
    expect(error).to.eql(null);
  });
});
