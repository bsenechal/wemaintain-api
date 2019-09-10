const assert = require('assert');
const TimeHelper = require('../src/helpers/TimeHelper');

test('time addition from strings', () => {
  const result = TimeHelper.addTime('23', '12');
  assert.equal(result, 35);
});

test('convert time to timestamp with offset', () => {
  const result = TimeHelper.computeTimestamp(1568122246, '17:00');

  assert.equal(result, 1568170846);
});
