var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

var now = moment.utc('2015-01-01');

describe('literal moment parsing as AST', function() {
    var tests = {
        'beginning': {
            type: 'BeginningLiteral'
        },

        '300': {
            type: 'UnixTimeLiteral',
            value: 300
        },

        '2015-01-01': {
            type: 'ISODateLiteral',
            value: "2015-01-01T00:00:00"
        },

        'yesterday': {
            type: 'YesterdayLiteral'
        },

        'today': {
            type: 'TodayLiteral'
        },

        'now': {
            type: 'NowLiteral'
        },

        'tomorrow': {
            type: 'TomorrowLiteral'
        },

        'end': {
            type: 'EndLiteral'
        }
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(expected);
        });
    });

    var throws = {
        '2012/01/01': MomentParser.SyntaxError
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
