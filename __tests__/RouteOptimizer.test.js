const request = require('supertest');
const assert = require('assert');

const inputData = {
  departureTime: 1508756400,
  home: {
    lat: 48.83310530000001,
    lng: 2.333563799999979,
  },
  tasks: [
    {
      id: 1,
      lat: 48.8623348,
      lng: 2.3447356000000354,
      duration: 45,
    },
  ],
};

test('check router configuration with wrong url', async () => {
  await request('http://localhost:8001')
    .post('/route')
    .send(inputData)
    .set('Accept', 'application/json')
    .expect(404);
});

test('test ', async () => {
  const { body } = await request('http://localhost:8001')
    .post('/routeOptimizer')
    .send(inputData)
    .set('Accept', 'application/json')
    .expect(200);

  assert.equal(body.totalTime > 45, true);
  assert.equal(body.schedule[0].lat, 48.8623348);
  assert.equal(body.schedule[0].lng, 2.3447356000000354);
});
