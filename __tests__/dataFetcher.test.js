const { fetchData } = require('../dataFetcher');

test('fetchData resolves with value', async () => {
  await expect(fetchData()).resolves.toEqual({ value: 42 });
});
