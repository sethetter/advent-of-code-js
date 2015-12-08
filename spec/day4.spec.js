var expect = require('chai').expect;

var Day4 = require('../lib/day4');

describe('getTheAnswer', function() {
  it('returns the correct answer', function() {
    expect(Day4.getTheAnswer('abcdef', '00000')).to.equal(609043);
  });
});
