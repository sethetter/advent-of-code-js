var R_PARSE_INSTRUCTION = /^(.+)\s(\d+),(\d+)\sthrough\s(\d+),(\d+)/;

module.exports = {

  processInstruction1: function(grid, instruction) {
    var parts = instruction.match(R_PARSE_INSTRUCTION);

    if (!parts) return grid; // Invalid instruction

    var command = parts[1];
    var from = [parseInt(parts[2]), parseInt(parts[3])];
    var to = [parseInt(parts[4]), parseInt(parts[5])];

    switch (command) {
      case 'turn on': return this.turnOn(grid, from, to);
      case 'turn off': return this.turnOff(grid, from, to);
      case 'toggle': return this.toggle(grid, from, to);
    }
  },

  processInstruction2: function(grid, instruction) {
    var parts = instruction.match(R_PARSE_INSTRUCTION);

    if (!parts) return grid; // Invalid instruction

    var command = parts[1];
    var from = [parseInt(parts[2]), parseInt(parts[3])];
    var to = [parseInt(parts[4]), parseInt(parts[5])];

    switch (command) {
      case 'turn on': return this.increaseBrightness(grid, from, to);
      case 'turn off': return this.reduceBrightness(grid, from, to);
      case 'toggle':
        return this.increaseBrightness(
          this.increaseBrightness(grid, from, to),
        from, to);
    }
  },

  buildGrid: function(x, y) {
    var grid = [];

    for (var i = 0; i < y; i++) {
      grid.push([]);
    }

    grid.forEach(function(row) {
      for (var i = 0; i < x; i++) {
        row.push(0);
      }
    });

    return grid;
  },

  turnOn: function(grid, from, to) {
    return setGridValues(grid, from, to, 1);
  },
  turnOff: function(grid, from, to) {
    return setGridValues(grid, from, to, 0);
  },
  toggle: function(grid, from, to) {
    return setGridValues(grid, from, to, 'toggle');
  },
  increaseBrightness: function(grid, from, to) {
    return changeGridValues(grid, from, to, 1);
  },
  reduceBrightness: function(grid, from, to) {
    return changeGridValues(grid, from, to, -1);
  },

  countLightsOn: function(grid) {
    var count = 0;

    grid.forEach(function(row) {
      row.forEach(function(light) {
        if (light) count++;
      });
    });

    return count;
  },

  totalBrightness: function(grid) {
    var total = 0;

    grid.forEach(function(row) {
      row.forEach(function(light) {
        total += light;
      });
    });

    return total;
  }
};

function setGridValues(grid, from, to, value) {
  var newGrid = grid;
  for (var i = from[0]; i <= to[0]; i++) {
    for (var j = from[1]; j <= to[1]; j++) {
      if (value === 'toggle') {
        newGrid[i][j] = grid[i][j] === 0 ? 1 : 0;
      } else {
        newGrid[i][j] = value;
      }
    }
  }
  return grid;
}

function changeGridValues(grid, from, to, value) {
  var newGrid = grid;
  for (var i = from[0]; i <= to[0]; i++) {
    for (var j = from[1]; j <= to[1]; j++) {
      newGrid[i][j] = grid[i][j] + (value);
      if (newGrid[i][j] < 0) newGrid[i][j] = 0;
    }
  }
  return grid;
}
