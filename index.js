var fs = require('fs');

// TODO: Go back and redo days 1 - 3, for consistency :)

/**
 * Day 4!
 * ----------------------------------
 */
var day4Input = fs.readFileSync('./input/day4.txt', 'utf8').replace(/[^A-z0-9]/g, '');
var day4Part1Answer = require('./lib/day4').getTheAnswer(day4Input, '00000');
var day4Part2Answer = require('./lib/day4').getTheAnswer(day4Input, '000000');
console.log('Day 4, Part 1: ', day4Part1Answer);
console.log('Day 4, Part 2: ', day4Part2Answer);
