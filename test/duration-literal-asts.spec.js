var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

describe('literal duration parsing as AST', function() {
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
        },

        'forever': {
            type: 'ForeverLiteral',
        }
    };

    _.each(tests, function(output, input) {
        it('parses "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(output);
        });
    });

    var throws = {
        '32 WHA': MomentParser.SyntaxError
    };

    _.each(throws, function(expected, input) {
        it('fails on "' + input + '"', function() {
            function parseInput() {
                parser.parseAsMoment(input);
            }
            expect(parseInput).to.throw(expected);
        });
    });
});
