var expect = require('chai').expect;
var Day7 = require('../lib/day7');

describe('Day7', function() {

  it('does the thing', function() {
    var instructions = [
      'x AND y -> d',
      'x OR y -> e',
      '123 -> x',
      '456 -> y',
      'x LSHIFT 2 -> f',
      'y RSHIFT 2 -> g',
      'NOT x -> h',
      'NOT y -> i'
    ];

    instructions.forEach(function(instruction) {
      Day7.processInstruction(instruction);
    });

    expect(Day7.getWireSignal('x')).to.equal(123);
    expect(Day7.getWireSignal('y')).to.equal(456);
    expect(Day7.getWireSignal('d')).to.equal(72);
    expect(Day7.getWireSignal('e')).to.equal(507);
    expect(Day7.getWireSignal('f')).to.equal(492);
    expect(Day7.getWireSignal('g')).to.equal(114);
    expect(Day7.getWireSignal('h')).to.equal(65412);
    expect(Day7.getWireSignal('i')).to.equal(65079);
  });


  describe('#parseParts', function() {
    it('breaks instruction into parts', function() {
      var instruction1 = 'fl LSHIFT 1 -> gf';
      var instruction2 = '1 AND ds -> dt';
      var instruction3 = 'NOT kt -> ku';
      var instruction4 = 'lv LSHIFT 15 -> lz';
      var instruction5 = 'la -> aa';

      expect(Day7.parseParts(instruction1)).to.eql({
        input1: 'fl',
        input2: 1,
        operation: 'LSHIFT',
        output: 'gf'
      });

      expect(Day7.parseParts(instruction2)).to.eql({
        input1: 1,
        input2: 'ds',
        operation: 'AND',
        output: 'dt'
      });

      expect(Day7.parseParts(instruction3)).to.eql({
        input1: null,
        input2: 'kt',
        operation: 'NOT',
        output: 'ku'
      });

      expect(Day7.parseParts(instruction4)).to.eql({
        input1: 'lv',
        input2: 15,
        operation: 'LSHIFT',
        output: 'lz'
      });

      expect(Day7.parseParts(instruction5)).to.eql({
        input1: 'la',
        input2: null,
        operation: null,
        output: 'aa'
      });
    });
  });
});
