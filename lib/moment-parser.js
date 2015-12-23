var Base = require('extendable-base');
var parser = require('./parser');
var errors = require('./errors');
var MomentGenerator = require('./moment-generator');
var moment = require('moment');

var MomentParser = Base.extend({
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
    parseMoment: function(source, options) {
        var ast = this.parse(source);
        return this.generateMoment(ast, options);
    },

    /*
     * Given an AST, generate a moment object based on the parse tree.
     *
     * To support expressions that are relative to a "current" time, options.now
     * may contain a moment instance for the current time. It defaults
     * to the time of execution.
     */
    generateMoment: function(ast, options) {
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
    parseDuration: function(source, options) {
        var ast = this.parse(source);
        return this.generateDuration(ast, options);
    },

    /*
     * Given an AST, generate a duration object based on the parse tree.
     */
    generateDuration: function(ast, options) {
        var duration = new MomentGenerator(options).visit(ast);
        if (duration._isAMomentObject) {
            throw new errors.NotADurationError();
        }
        return duration;
    }
});

module.exports = {
    parse: function(source) {
        return new MomentParser().parse(source);
    },
    parseMoment: function(source, options) {
        return new MomentParser().parseMoment(source, options);
    },
    parseDuration: function(source, options) {
        return new MomentParser().parseDuration(source, options);
    },
    generateMoment: function(ast, options) {
        return new MomentParser().generateMoment(ast, options);
    },
    generateDuration: function(ast, options) {
        return new MomentParser().generateDuration(ast, options);
    },
    SyntaxError: errors.SyntaxError,
    NotAMomentError: errors.NotAMomentError,
    NotADurationError: errors.NotADurationError
}
