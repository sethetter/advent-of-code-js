var fs = require('fs');

/**
 * Day 1!
 * ----------------------------------
 */
var Day1 = require('./lib/day1');
var day1Input = fs.readFileSync('./input/day1.txt', 'utf8');

var day1Part1Answer = Day1.floorCount(day1Input);
var day1Part2Answer = Day1.entersBasementAt(day1Input);

console.log('Day 1, Part 1:', day1Part1Answer);
console.log('Day 1, Part 2:', day1Part2Answer);

// TODO: Go back and redo days 2 & 3, for consistency :)

/*
 * Day 4!
 * ----------------------------------
 */
var Day4 = require('./lib/day4');
var day4Input = fs.readFileSync('./input/day4.txt', 'utf8').replace(/[^A-z0-9]/g, '');

var day4Part1Answer = Day4.adventCoinSecret(day4Input, '00000');
var day4Part2Answer = Day4.adventCoinSecret(day4Input, '000000');

console.log('Day 4, Part 1:', day4Part1Answer);
console.log('Day 4, Part 2:', day4Part2Answer);

/*
 * Day 5!
 * ----------------------------------
 */
var Day5 = require('./lib/day5');
var day5Input = fs.readFileSync('./input/day5.txt', 'utf8');

var niceStringCount1 = 0;
var niceStringCount2 = 0;

day5Input.split('\n').forEach(function(str) {
  if (Day5.isStringNice1(str)) niceStringCount1++;
  if (Day5.isStringNice2(str)) niceStringCount2++;
});

console.log('Day 5, Part 1:', niceStringCount1);
console.log('Day 5, Part 2:', niceStringCount2);

/**
 * Day 6!
 * ----------------------------------
 */
var Day6 = require('./lib/day6');
var day6Input = fs.readFileSync('./input/day6.txt', 'utf8');

var grid1 = Day6.buildGrid(1000, 1000);
day6Input.split('\n').forEach(function(instruction) {
  grid1 = Day6.processInstruction1(grid1, instruction);
});
var count = Day6.countLightsOn(grid1);
console.log('Day 6, Part 1:', count);

var grid2 = Day6.buildGrid(1000, 1000);
day6Input.split('\n').forEach(function(instruction) {
  grid2 = Day6.processInstruction2(grid2, instruction);
});
var totalBrightness = Day6.totalBrightness(grid2);
console.log('Day 6, Part 2:', totalBrightness);

/**
 * Day 7!
 * -----------------------------------
 */
var Day7 = require('./lib/day7');
var day7Input = fs.readFileSync('./input/day7.txt', 'utf8');

day7Input.split('\n').forEach(function(instruction) {
  Day7.processInstruction(instruction);
});

console.log('Day 7, Part 1:', Day7.getWireSignal('a'));
