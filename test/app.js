const { expect } = require('chai');
const request = require('supertest');

const app = require('../lib/app');
const routes = require('./setup/routes');

const config = { key: 1 };

describe('app', () => {
  it('serves configured routes', async () => {
    const server = await app(routes, config, '4570');
    return request(server.listener)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .then((response) => expect(response.body).to.eql(config));
  });
});
