var R_INSTRUCTION_PARSER = /^([0-9a-z]+)?\s*([A-Z]+)?\s*([0-9a-z]+)?\s+\->\s+([a-z]+)$/;

var wires = {};

module.exports = {

  processInstruction: function(instruction) {
    if (!instruction.match(R_INSTRUCTION_PARSER)) return;
    var parts = this.parseParts(instruction);
    this.registerWire(parts);
  },

  parseParts: function(instruction) {
    var parts = instruction.match(R_INSTRUCTION_PARSER);

    parts[1] = convertToNumberIfNumber(parts[1]);
    parts[3] = convertToNumberIfNumber(parts[3]);

    var returnObj = {
      // convert missing input1 to null instead of undefined
      input1: typeof(parts[1]) === 'undefined' ? null : parts[1],
      input2: typeof(parts[3]) === 'undefined' ? null : parts[3],
      operation: typeof(parts[2]) === 'undefined' ? null : parts[2],
      output: parts[4]
    };

    return returnObj;
  },

  registerWire: function(parts) {
    wires[parts.output] = function() {
      var getInput1 = useNumberOrWireInput(parts.input1);
      var getInput2 = useNumberOrWireInput(parts.input2);

      var result;

      if (parts.operation !== 'NOT') {
        switch(parts.operation) {
          case 'AND': result = getInput1() & getInput2(); break;
          case 'OR': result = getInput1() | getInput2(); break;
          case 'LSHIFT': result = getInput1() << getInput2(); break;
          case 'RSHIFT': result = getInput1() >> getInput2(); break;
          case null: result = getInput1(); break;
        }
      } else {
        result = getInput2() ^ 65535
      }

      wires[parts.output] = function() { return result };
      return result;
    };
  },

  getWireSignal: function(wire) {
    return wires[wire]();
  },

  setSignal: function(wire, signal) {
    wires[wire] = function() { return signal };
  },

  resetWires: function() {
    wires = {};
  }

};

function convertToNumberIfNumber(x) {
  return parseInt(x) == x ? parseInt(x) : x;
}

function useNumberOrWireInput(input) {
  if (typeof(input) === 'number') {
    return function() { return input };
  } else {
    return function() { return wires[input]() };
  }
}
