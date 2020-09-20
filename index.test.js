const postcss = require('postcss');
const deadCss = require('./index');
const utils = require('./utils');

const process = async (input, opts) => postcss([deadCss(opts)]).process(input, { from: undefined });

test('prepend bg-image to each rule', async () => {
  const result = await process('a { color: red; } @media screen { .b { background-image: url(url); } }');

  expect(result.css).toBe("a { background-image: url('/pixel.png?a'); color: red; } @media screen { .b { background-image: url('/pixel.png?.b'); background-image: url(url); } }");
});

test('apped bg-image to rule', async () => {
  const result = await process('a { color: red; }', { append: true });

  expect(result.css).toBe("a { color: red; background-image: url('/pixel.png?a'); }");
});

test('trancate long selector to get safe-length url', () => {
  const baseUrl = 'base_url';
  const longSelector = '.very .long .selector '.repeat(1000);
  const result = utils.getSafeUrl(baseUrl, longSelector);

  expect(result).toBe(`${baseUrl}?${longSelector}`.substring(0, utils.MAX_URL_LENGTH));
});

test('hash selectors', async () => {
  const randomSelector = Math.random().toString(36).substring(1);
  const hash = utils.hashString(randomSelector);
  const result = await process(`${randomSelector} { color: red; }`, { hash: true });

  expect(result.css).toBe(`${randomSelector} { background-image: url('${utils.DEFAULT_BASE_URL}?${hash}'); color: red; }`);
});
