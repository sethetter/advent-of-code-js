var Day1 = require('../lib/day1');

var expect = require('chai').expect;

describe('Day1', function() {
  describe('#floorCount', function() {
    it('returns appropriate floor count from input', function() {
      expect(Day1.floorCount('(((())')).to.equal(2);
      expect(Day1.floorCount('))))')).to.equal(-4);
    });
  });

  describe('#entersBasementAt', function() {
    it('returns the char position when first entering basement', function() {
      expect(Day1.entersBasementAt(')')).to.equal(1);
      expect(Day1.entersBasementAt('((())))(()))')).to.equal(7);
    });
  });
});
