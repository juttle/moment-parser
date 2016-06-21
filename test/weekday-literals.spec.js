var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2016-01-01T01:02:03.456');

describe('Weekday literals parsing', function() {
    var tests = {
        'next wednesday':
            now.clone().startOf('day').add(5, 'day'),
        'this Wed':
            now.clone().startOf('day').subtract(2, 'day'),
        'wed':
            now.clone().startOf('day').add(5, 'day'),
        'last wed':
            now.clone().startOf('day').add(-9, 'day'),
        'sat':
            now.clone().startOf('day').add(1, 'day'),
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parseMoment(input, {now: now}).isSame(expected)).is.true;
        });
    });

});
