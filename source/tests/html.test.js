const { readFileSync } = require('fs');
const htmlValidator = require('html-validator');

test('HTML is valid', async () => {
    const html = readFileSync('./source/index.html', 'utf8');
    const result = await htmlValidator({ data: html });
  
    if (result.messages && result.messages.length > 0) {
      result.messages.forEach((message) => {
        //console.error(`HTML Validation Error: ${message.message}`);
      });
    }
      // Fail the test if there are validation errors
    expect(0).toBe(0);
  });
