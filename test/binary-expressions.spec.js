var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

var now = moment.utc('2015-01-01');

function is_same(a, b) {
    // compare a and b as moments or durations, return true if same
    if (a.isSame) {
        return a.isSame(b); // a moment
    } else {
        // duration. compare calendar and literal times separately
        return (a._milliseconds === b._milliseconds &&
                a._days === b._days &&
                a._months === b._months)
    }
}

describe('BinaryExpression parsing as moment', function() {
    var tests = {
        '+2h': now.clone().add(2, 'h'),
        '-12M': now.clone().subtract(12, 'M'),
        '2 minutes ago': now.clone().subtract(2, 'm'),
        '2 minutes before 2015-01-01': moment.utc('2015-01-01').subtract(2, 'm'),
        '3 days after 2015-01-01': moment.utc('2015-01-01').add(3, 'd'),
        '6 hours and 2 minutes and 30 seconds': moment.duration('06:02:30'),
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(is_same(expected, parser.parseAsMoment(input, {now: now}))).is.true;
        });
    });

});
