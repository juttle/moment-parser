var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

describe('CalendarExpression parsing as AST', function() {
    var tests = {
        'this year': {
            type: 'CalendarExpression',
            valueType: 'moment',
            direction: 'down',
            unit: 'year',
            expression: {
                type: 'NowLiteral'
            }
        },
        'month of 2015-01-01T01:02:03.456': {
            type: 'CalendarExpression',
            valueType: 'moment',
            direction: 'down',
            unit: 'month',
            expression: {
                type: 'ISODateLiteral',
                valueType: 'moment',
                value: '2015-01-01T01:02:03.456'
            }
        },
        'final month of this year': {
            type: 'CalendarExpression',
            valueType: 'moment',
            direction: 'down',
            unit: 'month',
            expression: {
                type: 'CalendarExpression',
                direction: 'up',
                unit: 'year',
                expression: {
                    type: 'CalendarExpression',
                    valueType: 'moment',
                    direction: 'down',
                    unit: 'year',
                    expression: {
                        type: 'NowLiteral'
                    }
                }
            }
        },
        'final day of month of 2015-01-01T01:02:03.456': {
            type: 'CalendarExpression',
            valueType: 'moment',
            direction: 'down',
            unit: 'day',
            expression: {
                type: 'CalendarExpression',
                direction: 'up',
                unit: 'month',
                expression: {
                    type: 'CalendarExpression',
                    valueType: 'moment',
                    direction: 'down',
                    unit: 'month',
                    expression: {
                        type: 'ISODateLiteral',
                        valueType: 'moment',
                        value: '2015-01-01T01:02:03.456'
                    }
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
