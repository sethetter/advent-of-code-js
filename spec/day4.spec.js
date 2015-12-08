var expect = require('chai').expect;

var Day4 = require('../lib/day4');

describe('Day4', function() {
  describe('#adventCoinSecret', function() {
    it('returns the correct answer', function() {
      expect(Day4.adventCoinSecret('abcdef', '00000')).to.equal(609043);
    });
  });
});
