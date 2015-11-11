var Base = require('extendable-base');
var Logger = require('logger');
var parser = require('./parser');

var MomentParser = Base.extend({

    initialize: function(options) {
        options = options || {};
        this.debug = !!options.debug;
        this.logger = Logger.get('moment-parser');
    },

    parse: function(source) {
        var ast = parser.parse(source);

        this.logger.debug('parsed AST', ast);

        return ast;
    }
});

module.exports = {
    MomentParser: MomentParser,
    SyntaxError: parser.SyntaxError
};
