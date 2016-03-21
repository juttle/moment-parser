var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2016-04-01T01:02:03.456');

describe('Month literals parsing', function() {
    var tests = {
        'next february':
            now.clone().startOf('month').add(10, 'month'),
        'this Feb':
            now.clone().startOf('month').subtract(2, 'month'),
        'feb':
            now.clone().startOf('month').add(10, 'month'),
    };

    _.each(tests, function(expected, input) {
        it('handles "' + input + '"', function() {
            expect(parser.parseMoment(input, {now: now}).isSame(expected)).is.true;
        });
    });

});
