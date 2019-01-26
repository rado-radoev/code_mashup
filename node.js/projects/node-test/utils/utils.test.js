const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
  var res = utils.add(33, 11);

  expect(res)
    .toBe(44, `Expected 44, but got ${res}`)
    .toBeA('number', `Expected typeof number, got ${typeof res} instead.`)
});


it('should square a number', () => {
  var res = utils.square(5);

  expect(res)
    .toBe(25, `Expected 25, but got ${res}`)
    .toBeA('number', `Expected typeof number, got ${typeof res} instead.`)
});

it ('should return username', () => {
  var user = {location: 'Philadelphia', age: 34};
  var res = utils.setName(user, "Radoslav Radoev");

  expect(res)
    .toInclude({
      firstName: 'Radoslav',
      lastName: 'Radoev'
    });
});
