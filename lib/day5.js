var VOWELS = ['a', 'e', 'i', 'o', 'u'];
var BAD_COMBOS = ['ab', 'cd', 'pq', 'xy'];

module.exports = {
  isStringNice1: function(str) {
    return (
      this.hasThreeVowels(str) &&
      this.hasDoubleLetter(str) &&
      !this.hasBadCombos(str)
    );
  },

  isStringNice2: function(str) {
    return (
      this.hasRepeatWithBreak(str) && 
      this.hasMatchingPairs(str)
    );
  },

  hasThreeVowels: function(str) {
    var count = 0;

    str.split('').forEach(function(char) {
      if (VOWELS.indexOf(char) !== -1) count++;
    });

    return count >= 3;
  },

  hasDoubleLetter: function(str) {
    var lastChar = null;
    var chars = str.split('');

    for (var i = 0; i < chars.length; i++) {
      if (chars[i] === lastChar) return true;
      lastChar = chars[i];
    }

    return false;
  },

  hasBadCombos: function(str) {
    for (var i = 0; i < BAD_COMBOS.length; i++) {
      if (str.indexOf(BAD_COMBOS[i]) !== -1) return true;
    }
    return false;
  },

  hasMatchingPairs: function(str) {
    var currentPair = null;
    
    for (var i = 0; i < str.length; i++) {
      var remainderOfStr = str.substring(i + 2, str.length);
      currentPair = str[i] + str[i + 1];
      if (remainderOfStr.indexOf(currentPair) !== -1) {
        return true;
      }
    }

    return false;
  },

  hasRepeatWithBreak: function(str) {
    var currentChar = null;

    for (var i = 0; i < str.length; i++) {
      currentChar = str[i];
      if (str[i+2] == currentChar) return true;
    }

    return false;
  }
};
