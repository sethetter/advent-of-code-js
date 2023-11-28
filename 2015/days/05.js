var fs = require('fs');

module.exports = function() {
  var Day5 = require('../lib/day5');
  var day5Input = fs.readFileSync('./input/day5.txt', 'utf8');

  var niceStringCount1 = 0;
  var niceStringCount2 = 0;

  day5Input.split('\n').forEach(function(str) {
    if (Day5.isStringNice1(str)) niceStringCount1++;
    if (Day5.isStringNice2(str)) niceStringCount2++;
  });

  console.log('Day 5, Part 1:', niceStringCount1);
  console.log('Day 5, Part 2:', niceStringCount2);
};
