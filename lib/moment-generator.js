var ASTVisitor = require('./ast-visitor');
var moment = require('moment');

/*
 * AST visitor that generates a moment from a parse tree.
 */
var MomentGenerator = ASTVisitor.extend({
    initialize: function(options) {
        this.now = options.now;
    },

    visit_ISODateLiteral: function(node) {
        return moment.utc(node.value);
    },

    visit_NowLiteral: function(node) {
        return this.now.clone();
    },

    visit_TodayLiteral: function(node) {
        return this.now.startOf('day');
    }
})

module.exports = MomentGenerator;
