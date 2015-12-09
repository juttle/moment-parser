var Base = require('extendable-base');
var parser = require('./parser');
var errors = require('./errors');
var MomentGenerator = require('./moment-generator');
var moment = require('moment');

var MomentParser = Base.extend({
    initialize: function(options) {
        options = options || {};
        this.debug = !!options.debug;
    },

    /*
     * Parse the given input into an AST.
     */
    parse: function(source) {
        var ast = parser.parse(source);
        return ast;
    },

    /*
     * Parse the given input into an AST and generate a moment object based on
     * the parse tree.
     *
     * To support expressions that are relative to a "current" time, options.now
     * may contain a moment instance for the current time. It defaults
     * to the time of execution.
     */
    parseAsMoment: function(source, options) {
        var ast = this.parse(source);
        var moment = new MomentGenerator(options).visit(ast);
        if (!moment._isAMomentObject) {
            throw new errors.NotAMomentError();
        }
        return moment;
    },

    /*
     * Parse the given input into an AST and generate a duration object based on
     * the parse tree.
     */
    parseAsDuration: function(source, options) {
        var ast = this.parse(source);
        var duration = new MomentGenerator(options).visit(ast);
        if (duration._isAMomentObject) {
            throw new errors.NotADurationError();
        }
        return duration;
    },

    /*
     * Parse the given input and return a javascript Date.
     *
     * To support expressions that are relative to a "current" time, options.now
     * may contain a Date instance for the current time. It defaults
     * to the time of execution.
     */
    parseAsDate: function(source, options) {
        var m_options = {now: options ? new moment(options.now) : null}; // Date -> Moment
        return this.parseAsMoment(source, m_options).toDate();
    },

    /*
     * Parse the given input and return milliseconds
     */
    parseAsMs: function(source, options) {
        return this.parseAsDuration(source, options).asMilliseconds();
    }
});

module.exports = MomentParser;
