var MomentParser = require('..').MomentParser;
var _ = require('underscore');
var expect = require('chai').expect;

var parser = new MomentParser();

describe('literal moments', function() {
    var tests = {
        'now': {
            type: 'NowLiteral'
        },

        'today': {
            type: 'TodayLiteral'
        },

        '2015-01-01': {
            type: 'ISODateLiteral',
            value: "2015-01-01T00:00:00"
        }
    };

    _.each(tests, function(output, input) {
        it('parses "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(output);
        });
    });
});
