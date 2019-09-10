const app = require('../src/app');

let myApp;

beforeAll((done) => {
  myApp = app();
  done();
});

afterAll((done) => {
  myApp.close();
  done();
});
