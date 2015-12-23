var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

describe('BinaryExpression parsing as AST', function() {
    var tests = {
        '+2h': {
            type: 'BinaryExpression',
            valueType: 'moment',
            operator: '+',
            left: {
                type: 'NowLiteral'
            },
            right: {
                type: 'MomentDuration',
                valueType: 'duration',
                unit: "h",
                value: 2
            }
        },

        '-12M': {
            type: 'BinaryExpression',
            operator: '-',
            valueType: 'moment',
            left: {
                type: 'NowLiteral'
            },
            right: {
                type: 'MomentDuration',
                valueType: 'duration',
                unit: "M",
                value: 12
            }
        },

        '2 minutes ago': {
            type: 'BinaryExpression',
            operator: '-',
            valueType: 'moment',
            left: {
                type: 'NowLiteral'
            },
            right: {
                type: 'MomentDuration',
                valueType: 'duration',
                unit: "minute",
                value: 2
            }
        },

        '2 minutes before 2015-01-01': {
            type: 'BinaryExpression',
            valueType: 'moment',
            operator: '-',
            left: {
                type: 'ISODateLiteral',
                valueType: 'moment',
                value: "2015-01-01T00:00:00"
            },
            right: {
                type: 'MomentDuration',
                valueType: 'duration',
                unit: "minute",
                value: 2
            }
        },

        '3 days after 2015-01-01': {
            type: 'BinaryExpression',
            valueType: 'moment',
            operator: '+',
            left: {
                type: 'ISODateLiteral',
                valueType: 'moment',
                value: "2015-01-01T00:00:00"
            },
            right: {
                type: 'MomentDuration',
                valueType: 'duration',
                unit: "day",
                value: 3
            }
        },

        '6 hours and 2 minutes and 30 seconds': {
            type: 'BinaryExpression',
            valueType: 'duration',
            operator: '+',
            left: {
                type: 'MomentDuration',
                valueType: 'duration',
                unit: "hour",
                value: 6
            },
            right: {
                type: 'BinaryExpression',
                valueType: 'duration',
                operator: '+',
                left: {
                    type: 'MomentDuration',
                    valueType: 'duration',
                    unit: "minute",
                    value: 2
                },
                right: {
                    type: 'MomentDuration',
                    valueType: 'duration',
                    unit: "second",
                    value: 30
                }
            }
        }
    };

    _.each(tests, function(output, input) {
        it('parses "' + input + '"', function() {
            expect(parser.parse(input)).deep.equal(output);
        });
    });

});
