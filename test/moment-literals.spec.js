var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2015-01-01');

describe('literal moment parsing as moments', function() {
    var tests = {
        '300': moment.utc(300 * 1000),
        '2015-01-01': moment.utc('2015-01-01'),
        'yesterday': now.clone().startOf('day').subtract(1, 'day'),
        'today': now.clone().startOf('day'),
        'now': now,
        'tomorrow': now.clone().startOf('day').add(1, 'day')
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parse(input).valueType).equal('moment');
            var m = parser.parseMoment(input, {now: now});
            expect(m.isSame(expected)).is.true;
        });
    });

    var throws = {
        'beginning': parser.SyntaxError,
        'end': parser.SyntaxError
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
