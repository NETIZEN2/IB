const { analyze } = require('../analysis');

test('analyzes sum correctly', () => {
  expect(analyze([1, 2, 3])).toBe(6);
});
