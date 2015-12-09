var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

var now = moment.utc('2015-01-01T01:02:03.456');

describe('moment-parser API ', function() {
    it('parses moment strings and returns moments', function() {
        expect(parser.parseAsMoment("now", {now: now}).isSame(now)).is.true;
    });

    it('parses moment strings and returns Dates', function() {
        var now = new Date();
        var parsed = parser.parseAsDate("now", {now: now});
        expect(parsed.getTime() === now.getTime()).is.true;
    });

    it('parses duration strings and returns durations', function() {
        var dur = moment.duration(3, 'weeks')
        expect(parser.parseAsDuration("3 weeks")).deep.equal(dur);
    });

    it('parses duration strings and returns milliseconds', function() {
        var ms = moment.duration(3, 'weeks').asMilliseconds();
        expect(parser.parseAsMs("3 weeks") === ms).is.true;
    });

    it('rejects durations when expecting a moment', function() {
        expect(function() {
            parser.parseAsMoment("3 weeks");
        }).to.throw(MomentParser.NotAMomentError);
    });

    it('rejects durations when expecting a date', function() {
        expect(function() {
            parser.parseAsDate("3 weeks");
        }).to.throw(MomentParser.NotAMomentError);
    });

    it('rejects moments when expecting a duration', function() {
        expect(function() {
            parser.parseAsDuration("now", {now: now});
        }).to.throw(MomentParser.NotADurationError);
    });

    it('rejects moments when expecting a duration', function() {
        expect(function() {
            parser.parseAsMs("now", {now: now});
        }).to.throw(MomentParser.NotADurationError);
    });

});
