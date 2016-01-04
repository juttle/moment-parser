var peg_parser = require('./parser');
var errors = require('./errors');
var MomentGenerator = require('./moment-generator');
var moment = require('moment');

var parser = {
    /*
     * Parse the given input into an AST.
     */
    parse: peg_parser.parse,

    /*
     * Parse the given input into an AST and generate a moment object based on
     * the parse tree.
     *
     * To support expressions that are relative to a "current" time, options.now
     * may contain a moment instance for the current time. It defaults
     * to the time of execution.
     */
    parseMoment: function(source, options) {
        var ast = parser.parse(source);
        return parser.generateMoment(ast, options);
    },

    /*
     * Given an AST, generate a moment object based on the parse tree.
     *
     * To support expressions that are relative to a "current" time, options.now
     * may contain a moment instance for the current time. It defaults
     * to the time of execution.
     */
    generateMoment: function(ast, options) {
        var m = new MomentGenerator(options).visit(ast);
        if (!moment.isMoment(m)) {
            throw new errors.NotAMomentError();
        }
        return m;
    },

    /*
     * Parse the given input into an AST and generate a duration object based on
     * the parse tree.
     */
    parseDuration: function(source, options) {
        var ast = parser.parse(source);
        return parser.generateDuration(ast, options);
    },

    /*
     * Given an AST, generate a duration object based on the parse tree.
     */
    generateDuration: function(ast, options) {
        var duration = new MomentGenerator(options).visit(ast);
        if (moment.isMoment(duration)) {
            throw new errors.NotADurationError();
        }
        return duration;
    },

    SyntaxError: errors.SyntaxError,
    NotAMomentError: errors.NotAMomentError,
    NotADurationError: errors.NotADurationError
};

module.exports = parser;
