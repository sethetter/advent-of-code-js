var expect = require('chai').expect;
var Day6 = require('../lib/day6');

describe('Day6', function() {
  var grid;

  beforeEach(function() {
    grid = Day6.buildGrid(2, 3);
  });

  describe('#buildGrid', function() {
    it('builds a grid of booleans from specified dimensions', function() {
      expect(grid).to.eql([
        [0, 0],
        [0, 0],
        [0, 0]
      ]);
    });
  });

  describe('#turnOn', function() {
    it('makes sure lights are ON in specified range', function() {
      grid = Day6.turnOn(grid, [0,0], [1,1]);
      expect(grid).to.eql([
        [1, 1],
        [1, 1],
        [0, 0]
      ]);
    });
  });

  describe('#turnOff', function() {
    it('makes sure lights are OFF in specified range', function() {
      grid = Day6.turnOn(grid, [0,0], [1,1]);
      grid = Day6.turnOff(grid, [0,1], [1,1]);

      expect(grid).to.eql([
        [1, 0],
        [1, 0],
        [0, 0]
      ]);
    });
  });

  describe('#toggle', function() {
    it('TOGGLES the lights at specified range', function() {
      grid = Day6.turnOn(grid, [0,0], [1,1]);
      grid = Day6.toggle(grid, [0,1], [1,1]);

      expect(grid).to.eql([
        [1, 0],
        [1, 0],
        [0, 0]
      ]);
    });
  });

  describe('#reduceBrightness', function() {
    it('reduces the brightness of specified range by 1, to a min of 0', function() {
      grid = Day6.toggle(grid, [0,0], [2,1]);
      grid = Day6.reduceBrightness(grid, [0,0], [0,1]);
      grid = Day6.reduceBrightness(grid, [0,0], [0,1]);

      expect(grid).to.eql([
        [0, 0],
        [1, 1],
        [1, 1]
      ]);
    });
  });

  describe('#increaseBrightness', function() {
    it('increase the brightness of a specified range by 1', function() {
      grid = Day6.toggle(grid, [0,0], [2,1]);
      grid = Day6.increaseBrightness(grid, [0,0], [0,1]);

      expect(grid).to.eql([
        [2, 2],
        [1, 1],
        [1, 1]
      ]);
    });
  });

  describe('#totalBrightness', function() {
    it('calculates the total brightness of all lights in the grid', function() {
      grid = Day6.toggle(grid, [0,0], [2,1]);

      expect(grid).to.eql([
        [1, 1],
        [1, 1],
        [1, 1]
      ]);

      expect(Day6.totalBrightness(grid)).to.equal(6);
    });
  });

  describe('#processInstruction1', function() {
    it('turns a text instruction into a command with to and from coords', function() {
      var instructions = [
        'turn on 0,0 through 1,1',
        'turn off 0,1 through 1,1',
        'toggle 0,0 through 2,0'
      ];

      instructions.forEach(function(instruction) {
        grid = Day6.processInstruction1(grid, instruction);
      });

      expect(grid).to.eql([
        [0, 0],
        [0, 0],
        [1, 0]
      ]);
    });
  });

  describe('#processInstruction2', function() {
    it('turns a text instruction into a command with to and from coords', function() {
      var instructions = [
        'turn off 0,0 through 2,1',
        'turn on 0,0 through 1,1',
        'turn off 0,1 through 1,1',
        'toggle 0,0 through 2,0'
      ];

      instructions.forEach(function(instruction) {
        grid = Day6.processInstruction2(grid, instruction);
      });

      expect(grid).to.eql([
        [3, 0],
        [3, 0],
        [2, 0]
      ]);
    });
  });

  describe('#countLightsOn', function() {
    it('returns the number of lights that are on', function() {
      grid = Day6.turnOn(grid, [0,0], [1,0]);
      expect(Day6.countLightsOn(grid)).to.equal(2);
    });
  });
});
