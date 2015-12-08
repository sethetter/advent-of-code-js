module.exports = {
  floorCount: function(input) {
    var floor = 0;

    input.split('').forEach((movement) => {
      if (movement === '(') floor++;
      if (movement === ')') floor--;
    });

    return floor;
  },
  entersBasementAt: function(input) {
    var floor = 0,
      basementAt = null;

    input.split('').forEach((movement, idx) => {
      if (movement === '(') floor++;
      if (movement === ')') floor--;
      if (!basementAt && floor === -1) {
        basementAt = idx + 1;
      }
    });

    return basementAt;
  }
};
