var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

describe('literal duration parsing as durations', function() {
    var tests = {
        '1 hour': moment.duration(1,'h'),
        '100 s': moment.duration(100,'s'),
        '1.5d': moment.duration(1.5,'d'),
        '1m': moment.duration(1,'m'),
        '12 M': moment.duration(12,'M'),
        'P1W': moment.duration('P1W'),
        'P1Y2M3DT4H5M6S': moment.duration('P1Y2M3DT4H5M6S'),
        'PT4H5M': moment.duration('PT4H5M'),
        'P1Y2M': moment.duration('P1Y2M'),
        'P2MT5M': moment.duration('P2MT5M'),
        '00:00:00.123': moment.duration('00:00:00.123'),
        '01:23:45': moment.duration('01:23:45'),
        '01:23:45.678': moment.duration('01:23:45.678'),
        '23.01:23:45.067': moment.duration('23.01:23:45.067'),
        '1/23.01:23:45.067': moment.duration('23.01:23:45.067').add(1, 'M')
    };

    _.each(tests, function(duration, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parseDuration(input)).deep.equal(duration);
        });
    });

    var throws = {
        'forever': MomentParser.SyntaxError,
        '0:0:0': MomentParser.SyntaxError,
        '000:00:00': MomentParser.SyntaxError,
        '00:00:0.123': MomentParser.SyntaxError,
        '1.5/23.01:23:45.678': MomentParser.SyntaxError,
        '1.5/01:23:45.678': MomentParser.SyntaxError,
        '1/23.01:23:45.0678':MomentParser.SyntaxError
    };

    _.each(throws, function(expected, input) {
        it('fails on "' + input + '"', function() {
            function parseInput() {
                parser.parseDuration(input);
            }
            expect(parseInput).to.throw(expected);
        });
    });
});
