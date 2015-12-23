var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2015-01-01');

describe('CalendarExpression parsing as moment', function() {
    var tests = {
        'this year':
            now.clone().startOf('year'),
        'month of 2015-01-01T01:02:03.456':
            moment.utc('2015-01-01T01:02:03.456').startOf('month'),
        'final month of this year':
            now.clone().endOf('year').startOf('month'),
        'final day of month of 2015-01-01T01:02:03.456':
            moment.utc('2015-01-01T01:02:03.456').endOf('month').startOf('day')
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parse(input).valueType).equal('moment');
            expect(parser.parseMoment(input, {now: now}).isSame(expected)).is.true;
        });
    });

    var throws = {
        'last week of this year': parser.SyntaxError // last != final!
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
