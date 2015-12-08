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

        'P1W': {
            type: 'ISODurationLiteral',
            value: 'P1W'
        },

        'P1Y2M3DT4H5M6S': {
            type: 'ISODurationLiteral',
            value: 'P1Y2M3DT4H5M6S'
        },

        'PT4H5M': {
            type: 'ISODurationLiteral',
            value: 'PT4H5M'
        },

        'P1Y2M': {
            type: 'ISODurationLiteral',
            value: 'P1Y2M'
        },

        'P2MT5M': {
            type: 'ISODurationLiteral',
            value: 'P2MT5M'
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
