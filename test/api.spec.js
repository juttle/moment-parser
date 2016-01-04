var parser = require('..');
var _ = require('underscore');
var expect = require('chai').expect;
var moment = require('moment');

var now = moment.utc('2015-01-01T01:02:03.456');

describe('moment-parser API ', function() {
    it('parses moment strings and returns moments', function() {
        expect(parser.parseMoment("now", {now: now}).isSame(now)).is.true;
        expect(parser.generateMoment(parser.parse("now"), {now: now}).isSame(now)).is.true;
    });

    it('parses duration strings and returns durations', function() {
        var dur = moment.duration(3, 'weeks')
        expect(parser.parseDuration("3 weeks")).deep.equal(dur);
        expect(parser.generateDuration(parser.parse("3 weeks"))).deep.equal(dur);
    });

    it('rejects durations when expecting a moment', function() {
        expect(function() {
            parser.parseMoment("3 weeks");
        }).to.throw(parser.NotAMomentError);
    });

    it('rejects moments when expecting a duration', function() {
        expect(function() {
            parser.parseDuration("now", {now: now});
        }).to.throw(parser.NotADurationError);
    });
});
