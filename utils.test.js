const utils = require('./utils');

test('trancate long selector to get safe-length url', () => {
  const baseUrl = 'base_url';
  const longSelector = '.very .long .selector '.repeat(1000);
  const result = utils.getSafeUrl(baseUrl, longSelector);

  expect(result).toBe(`${baseUrl}?${longSelector}`.substring(0, utils.MAX_URL_LENGTH));
});
