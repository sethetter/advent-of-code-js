var fs = require('fs');

module.exports = function() {
  var Day1 = require('../lib/day1');
  var day1Input = fs.readFileSync('./input/day1.txt', 'utf8');

  var day1Part1Answer = Day1.floorCount(day1Input);
  var day1Part2Answer = Day1.entersBasementAt(day1Input);

  console.log('Day 1, Part 1:', day1Part1Answer);
  console.log('Day 1, Part 2:', day1Part2Answer);
};
