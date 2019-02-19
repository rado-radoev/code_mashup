var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it ('should generate the correct message object', () => {
    var from = 'Alex';
    var text = 'Kirkland Purified Water';

    var generatedMessage = generateMessage(from, text);
    expect(generatedMessage).toMatchObject({
      from, text
    });
    expect(typeof generatedMessage.createdAt).toBe('number');
  });
});
