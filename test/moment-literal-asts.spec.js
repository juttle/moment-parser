var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2015-01-01');

describe('literal moment parsing as AST', function() {
    var tests = {
        'beginning': {
            type: 'BeginningLiteral',
            valueType: 'moment'
        },

        '300': {
            type: 'UnixTimeLiteral',
            valueType: 'moment',
            value: 300
        },

        '2015-01-01': {
            type: 'ISODateLiteral',
            valueType: 'moment',
            value: "2015-01-01T00:00:00"
        },

        'yesterday': {
            type: 'YesterdayLiteral',
            valueType: 'moment'
        },

        'today': {
            type: 'TodayLiteral',
            valueType: 'moment'
        },

        'now': {
            type: 'NowLiteral',
            valueType: 'moment'
        },

        'tomorrow': {
            type: 'TomorrowLiteral',
            valueType: 'moment'
        },

        'end': {
            type: 'EndLiteral',
            valueType: 'moment'
        }
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(expected);
        });
    });

    var throws = {
        '2012/01/01': parser.SyntaxError
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
