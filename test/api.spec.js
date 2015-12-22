var MomentParser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var parser = new MomentParser();

var now = moment.utc('2015-01-01T01:02:03.456');

describe('moment-parser API ', function() {
    it('parses moment strings and returns moments', function() {
        expect(parser.parseMoment("now", {now: now}).isSame(now)).is.true;
    });

    it('parses duration strings and returns durations', function() {
        var dur = moment.duration(3, 'weeks')
        expect(parser.parseDuration("3 weeks")).deep.equal(dur);
    });

    it('rejects durations when expecting a moment', function() {
        expect(function() {
            parser.parseMoment("3 weeks");
        }).to.throw(MomentParser.NotAMomentError);
    });

    it('accepts durations when parsing a moment with acceptDuration=true', function() {
        var duration = parser.parseMoment("30 seconds", {acceptDuration: true});
        expect(duration).is.defined;
        expect(duration.asMilliseconds()).equal(30000);
    });

    it('rejects durations when expecting a date', function() {
        expect(function() {
            parser.parseDate("3 weeks");
        }).to.throw(MomentParser.NotAMomentError);
    });

    it('rejects moments when expecting a duration', function() {
        expect(function() {
            parser.parseDuration("now", {now: now});
        }).to.throw(MomentParser.NotADurationError);
    });

    it('rejects moments when expecting a duration', function() {
        expect(function() {
            parser.parseMs("now", {now: now});
        }).to.throw(MomentParser.NotADurationError);
    });

});
