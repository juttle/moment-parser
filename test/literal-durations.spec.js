var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;

var parser = new MomentParser();

describe('literal durations', function() {
    var tests = {
        '1 hour': {
            type: 'MomentDuration',
            unit: "hour",
            value: 1
        },

        '100 s': {
            type: 'MomentDuration',
            unit: "s",
            value: 100
        },

        '1.5d': {
            type: 'MomentDuration',
            unit: "d",
            value: 1.5
        },

        '1m': {
            type: 'MomentDuration',
            unit: "m",
            value: 1
        }
    };

    _.each(tests, function(output, input) {
        it('parses "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(output);
        });
    });

    it('syntax error results from duration nonsense', function() {
      function parseNonsense() {
        parser.parse('1 nonesense');
      }
      expect(parseNonsense).to.throw(MomentParser.SyntaxError);
    });
});
