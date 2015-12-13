var VOWELS = ['a', 'e', 'i', 'o', 'u'];
var BAD_COMBOS = ['ab', 'cd', 'pq', 'xy'];

module.exports = {
  isStringNice: function(str) {
    return (
      this.hasThreeVowels(str)
      && this.hasDoubleLetter(str)
      && !this.hasBadCombos(str)
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
  }
};
