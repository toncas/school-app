const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
  it('should fetch a user', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
