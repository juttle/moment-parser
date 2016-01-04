var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2015-01-01T01:02:03.456');

describe('Full moment grammar expression parsing', function() {
    var tests = {
        'day 5 of next month':
            now.clone().startOf('month').add(1, 'month').add(4, 'day'),
        'month 2 of last year':
            now.clone().startOf('year').subtract(1, 'year').add(1, 'month'),
        '2 days after month of 2000-01-01T01:02:03.456':
            moment.utc('2000-01-01T01:02:03.456').startOf('month').add(2, 'day'),
        '-m':
            now.clone().subtract(1, 'minute'),
        '-M':
            now.clone().subtract(1, 'month'),
        'last month':
            now.clone().startOf('month').subtract(1, 'month'),
        'next year':
            now.clone().startOf('year').add(1, 'year'),
        '4 months after 2015-06-15':
            moment.utc('2015-06-15').add(4, 'month'),
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parse(input).valueType).equal('moment');
            expect(parser.parseMoment(input, {now: now}).isSame(expected)).is.true;
        });
    });

    var throws = {
        'last 3 months': parser.SyntaxError,
        'next 2 days': parser.SyntaxError
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
