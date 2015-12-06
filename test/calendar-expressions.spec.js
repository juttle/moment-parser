var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

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
            expect(parser.parseAsMoment(input, {now: now}).isSame(expected)).is.true;
        });
    });

});
