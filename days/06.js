var fs = require('fs');

module.exports = function() {
  var Day6 = require('../lib/day6');
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
};
