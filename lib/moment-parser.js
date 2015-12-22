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
     *
     * An error is thrown if the input is actually a duration expression, unless
     * options.acceptDuration is true.
     */
    parseMoment: function(source, options) {
        options = options || {};
        var ast = this.parse(source);
        var moment = new MomentGenerator(options).visit(ast);
        if (!moment._isAMomentObject && !options.acceptDuration) {
            throw new errors.NotAMomentError();
        }
        return moment;
    },

    /*
     * Parse the given input into an AST and generate a duration object based on
     * the parse tree.
     */
    parseDuration: function(source, options) {
        var ast = this.parse(source);
        var duration = new MomentGenerator(options).visit(ast);
        if (duration._isAMomentObject) {
            throw new errors.NotADurationError();
        }
        return duration;
    }

});

module.exports = MomentParser;
