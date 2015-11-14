var Base = require('extendable-base');
var parser = require('./parser');
var MomentGenerator = require('./moment-generator');

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
     * To support expressions that are relative to the current time, options.now
     * should contain a moment instance for the current time.
     */
    parseAsMoment: function(source, options) {
        var ast = this.parse(source);
        return new MomentGenerator(options).visit(ast);
    }
});

MomentParser.SyntaxError = MomentGenerator.SyntaxError;
module.exports = MomentParser;
