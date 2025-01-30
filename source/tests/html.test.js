// tests/html.test.js
const { readFileSync } = require('fs');
const { getHTMLValidator } = require('html-validator');

test('HTML is valid', async () => {
  const html = readFileSync('./index.html', 'utf8');
  const result = await getHTMLValidator({ data: html });
  expect(result.isValid).toBe(true);
});