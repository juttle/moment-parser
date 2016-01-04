var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

describe('literal duration parsing as AST', function() {
    var tests = {
        '1 hour': {
            type: 'MomentDuration',
            valueType: 'duration',
            unit: "hour",
            value: 1
        },

        '100 s': {
            type: 'MomentDuration',
            valueType: 'duration',
            unit: "s",
            value: 100
        },

        '1.5d': {
            type: 'MomentDuration',
            valueType: 'duration',
            unit: "d",
            value: 1.5
        },

        '1m': {
            type: 'MomentDuration',
            valueType: 'duration',
            unit: "m",
            value: 1
        },

        '12 M': {
            type: 'MomentDuration',
            valueType: 'duration',
            unit: "M",
            value: 12
        },

        'P1W': {
            type: 'ISODurationLiteral',
            valueType: 'duration',
            value: 'P1W'
        },

        'P1Y2M3DT4H5M6S': {
            type: 'ISODurationLiteral',
            valueType: 'duration',
            value: 'P1Y2M3DT4H5M6S'
        },

        'PT4H5M': {
            type: 'ISODurationLiteral',
            valueType: 'duration',
            value: 'PT4H5M'
        },

        'P1Y2M': {
            type: 'ISODurationLiteral',
            valueType: 'duration',
            value: 'P1Y2M'
        },

        'P2MT5M': {
            type: 'ISODurationLiteral',
            valueType: 'duration',
            value: 'P2MT5M'
        },

        'forever': {
            type: 'ForeverLiteral',
            valueType: 'duration'
        },

        '01:23:45': {
            type: 'TimeSpan',
            valueType: 'duration',
            milliseconds: 0,
            seconds: 45,
            minutes: 23,
            hours: 1,
            days: 0,
            months: 0
        },

        '1/23.01:23:45.067': {
            type: 'TimeSpan',
            valueType: 'duration',
            milliseconds: 67,
            seconds: 45,
            minutes: 23,
            hours: 1,
            days: 23,
            months: 1
        }

    };

    _.each(tests, function(output, input) {
        it('parses "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(output);
        });
    });

    var throws = {
        '32 WHA': parser.SyntaxError
    };

    _.each(throws, function(expected, input) {
        it('fails on "' + input + '"', function() {
            function parseInput() {
                parser.parseMoment(input);
            }
            expect(parseInput).to.throw(expected);
        });
    });
});
