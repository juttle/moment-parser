var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

var now = moment.utc('2015-01-01');

describe('literal moments', function() {
    var tests = {
        'now': {
            ast: {
                type: 'NowLiteral'
            },

            moment: now
        },

        'today': {
            ast: {
                type: 'TodayLiteral'
            },

            moment: now
        },

        '2015-01-01': {
            ast: {
                type: 'ISODateLiteral',
                value: "2015-01-01T00:00:00"
            },

            moment: moment.utc('2015-01-01')
        }
    };

    _.each(tests, function(expected, input) {
        it('parses "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(expected.ast);
            var m = parser.parseAsMoment(input, {now: now});
            expect(m._isAMomentObject).is.true;
            expect(m.toISOString()).deep.equal(expected.moment.toISOString());
        });
    });
});
