var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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


describe('generateLocationMessage', () => {
  it ('should generate location message', () => {
    var from = 'User';
    var latitude = 32.790093
    var longitude = -117.081036
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`

    var generatedLocationMessage = generateLocationMessage(from, latitude, longitude);

    expect(generatedLocationMessage).toMatchObject({
      from, url
    });
    expect(typeof generatedLocationMessage.createdAt).toBe('number');
  });
});
