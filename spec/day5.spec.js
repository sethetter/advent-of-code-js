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

  describe('#hasMatchingPairs', function() {
    it('finds matching pairs of any two letters', function() {
      var goodStr = 'abasdofijabfji';
      var badStr = 'absdoifjojsf';
      expect(Day5.hasMatchingPairs(goodStr)).to.equal(true);
      expect(Day5.hasMatchingPairs(badStr)).to.equal(false);
    });

    it('does not count pairs that overlap', function() {
      var badStr = 'jiosdfaaabxo';
      expect(Day5.hasMatchingPairs(badStr)).to.equal(false);
    });
  });

  describe('#hasRepeatWithBreak', function() {
    it('finds a repeated letter with one letter in between', function() {
      var goodStrings = ['xnsabaf', 'fbdaaa', 'dsoinfnsa'];
      var badStrings = ['fajsdol', 'aosidjf', 'fjdosiap'];
      goodStrings.forEach(function(str) {
        expect(Day5.hasRepeatWithBreak(str)).to.equal(true);
      })
      badStrings.forEach(function(str) {
        expect(Day5.hasRepeatWithBreak(str)).to.equal(false);
      })
    });
  });

  describe('#isStringNice1', function() {
    it('checks hasThreeVowels, hasDoubleLetter and !hasBadCombos', function() {
      var goodStrings = ['aeibb', 'oouidd', 'lkajlsdffie'];
      var badStrings = ['bbbbbbb', 'abbei', 'aeiobx'];

      goodStrings.forEach(function(str) {
        expect(Day5.isStringNice1(str)).to.equal(true);
      });

      badStrings.forEach(function(str) {
        expect(Day5.isStringNice1(str)).to.equal(false);
      });
    });
  });

  describe('#isStringNice2', function() {
    it('checks hasRepeatWithBreak and hasMatchingPairs', function() {
      var goodStrings = ['abfjdsioaba', 'djojdj', 'aspobibsp'];
      var badStrings = ['asdaf', 'basdgf', 'poiqhbo'];

      goodStrings.forEach(function(str) {
        expect(Day5.isStringNice2(str)).to.equal(true);
      });

      badStrings.forEach(function(str) {
        expect(Day5.isStringNice2(str)).to.equal(false);
      });
    });
  });
});
