var expect = require('chai').expect;
var Day5 = require('../lib/day5');

describe('Day5', function() {
  describe('#hasThreeVowels', function() {
    it('checks for at least 3 vowels', function() {
      var niceString = 'axcejill';
      var badString = 'aell';
      expect(Day5.hasThreeVowels(niceString)).to.equal(true);
      expect(Day5.hasThreeVowels(badString)).to.equal(false);
    });
  });

  describe('#hasDoubleLetter', function() {
    it('has at least one double letter', function() {
      var niceString = 'asddfmn';
      var badString = 'bniosdnf';
      expect(Day5.hasDoubleLetter(niceString)).to.equal(true);
      expect(Day5.hasDoubleLetter(badString)).to.equal(false);
    });
  });

  describe('#hasBadCombos', function() {
    it('does not contain "ab" "cd" "pq" or "xy"', function() {
      var niceString = 'aosidfjo';
      var badStrings = [
        'oisdjfoiab',
        'ajossdjfcd',
        'ajossdjfpq',
        'ajossdjfxy'
      ];

      expect(Day5.hasBadCombos(niceString)).to.equal(false);
      badStrings.forEach(function(str) {
        expect(Day5.hasBadCombos(str)).to.equal(true);
      });
    });
  });

  describe('#isStringNice', function() {
    it('checks for all three nice conditions', function() {
      var goodStrings = ['aeibb', 'oouidd', 'lkajlsdffie'];
      var badStrings = ['bbbbbbb', 'abbei', 'aeiobx'];

      goodStrings.forEach(function(str) {
        expect(Day5.isStringNice(str)).to.equal(true);
      });

      badStrings.forEach(function(str) {
        expect(Day5.isStringNice(str)).to.equal(false);
      });
    });
  });
});
