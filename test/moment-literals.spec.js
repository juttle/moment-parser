var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2015-01-01');

describe('literal moment parsing as moments', function() {
    var tests = {
        'beginning': moment.utc(-100 * 1000000 * 1000 * 24 * 3600),
        'end': moment.utc(100 * 1000000 * 1000 * 24 * 3600),
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
            expect(m.toISOString()).equal(expected.toISOString());
            expect(m.isSame(expected)).is.true;
        });
    });

    it('allows the beginning / end value to be overridden', function() {
        var m;

        m = parser.parseMoment('beginning', {beginning: moment.utc(-Infinity)});
        expect(m.valueOf().toString()).equals('NaN');
        expect(m._i).equals(-Infinity);

        m = parser.parseMoment('beginning', {beginning: moment.utc(0)});
        expect(m.toISOString()).equals('1970-01-01T00:00:00.000Z');
        expect(m.valueOf().toString()).equals('0');

        m = parser.parseMoment('end', {end: moment.utc('1234-05-06')});
        expect(m.toISOString()).equals('1234-05-06T00:00:00.000Z');

        m = parser.parseMoment('end', {end: moment.utc('6543-02-01')});
        expect(m.toISOString()).equals('6543-02-01T00:00:00.000Z');

        m = parser.parseMoment('end', {end: moment.utc(Infinity)});
        expect(m.valueOf().toString()).equals('NaN');
        expect(m._i).equals(Infinity);
    });
});
