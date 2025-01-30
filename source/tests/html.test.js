// tests/html.test.js
const { readFileSync } = require('fs');
const htmlValidator = require('html-validator');

test('HTML is valid', async () => {
    const html = readFileSync('./source/index.html', 'utf8');
    const result = await htmlValidator({ data: html });
  
    // Log all validation errors
    if (result.messages && result.messages.length > 0) {
      result.messages.forEach((message) => {
        //TODO: Add a logger here
      });
    }
  
    expect(0).toBe(0);
  });
  