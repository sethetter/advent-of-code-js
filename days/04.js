var fs = require('fs');

module.exports = function() {
  var Day4 = require('../lib/day4');
  var day4Input = fs.readFileSync('./input/day4.txt', 'utf8').replace(/[^A-z0-9]/g, '');

  var day4Part1Answer = Day4.adventCoinSecret(day4Input, '00000');
  var day4Part2Answer = Day4.adventCoinSecret(day4Input, '000000');

  console.log('Day 4, Part 1:', day4Part1Answer);
  console.log('Day 4, Part 2:', day4Part2Answer);
};
