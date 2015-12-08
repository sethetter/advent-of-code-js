var crypto = require('crypto');
var fs = require('fs');

module.exports = {
  adventCoinSecret: function(input, frontPadding) {
    var hash = '',
      answer = -1;

    while (hash.substring(0, frontPadding.length) !== frontPadding) {
      hash = crypto.createHash('md5').update(input + (++answer)).digest('hex');
    }

    return answer;
  }
};


