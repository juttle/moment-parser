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
        '1m': moment.duration(1,'m')
    };

    _.each(tests, function(duration, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parseAsMoment(input)).deep.equal(duration);
        });
    });

    var throws = {
        'forever': MomentParser.SyntaxError
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
