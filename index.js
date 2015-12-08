var fs = require('fs');

/**
 * Day 1!
 * ----------------------------------
 */
var Day1 = require('./lib/day1');
var day1Input = fs.readFileSync('./input/day1.txt', 'utf8');
var day1Part1Answer = require('./lib/day1').floorCount(day1Input);
var day1Part2Answer = require('./lib/day1').entersBasementAt(day1Input);
console.log('Day 1, Part 1:', day1Part1Answer);
console.log('Day 1, Part 2:', day1Part2Answer);

// TODO: Go back and redo days 1 - 3, for consistency :)

/**
 * Day 4!
 * ----------------------------------
 */
var Day4 = require('./lib/day4');
var day4Input = fs.readFileSync('./input/day4.txt', 'utf8').replace(/[^A-z0-9]/g, '');
var day4Part1Answer = Day4.adventCoinSecret(day4Input, '00000');
var day4Part2Answer = Day4.adventCoinSecret(day4Input, '000000');
console.log('Day 4, Part 1:', day4Part1Answer);
console.log('Day 4, Part 2:', day4Part2Answer);
