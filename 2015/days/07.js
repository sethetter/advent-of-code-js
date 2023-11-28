var fs = require('fs');

module.exports = function() {
  var Day7 = require('../lib/day7');
  var day7Input = fs.readFileSync('./input/day7.txt', 'utf8');

  day7Input.split('\n').forEach(function(instruction) {
    Day7.processInstruction(instruction);
  });

  var signalA = Day7.getWireSignal('a');
  console.log('Day 7, Part 1:', signalA);

  Day7.resetWires();

  day7Input.split('\n').forEach(function(instruction) {
    Day7.processInstruction(instruction);
  });

  Day7.setSignal('b', signalA);

  var newSignalA = Day7.getWireSignal('a');
  console.log('Day 7, Part 2:', newSignalA);
};
