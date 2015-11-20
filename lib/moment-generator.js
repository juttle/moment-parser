var ASTVisitor = require('./ast-visitor');
var parser = require('./parser');
var moment = require('moment');

/*
 * AST visitor that generates a moment from a parse tree.
 */
var MomentGenerator = ASTVisitor.extend({
    initialize: function(options) {
        this.now = options && options.now || moment.utc();
    },

    visit_ISODateLiteral: function(node) {
        return moment.utc(node.value);
    },

    visit_UnixTimeLiteral: function(node) {
        return moment.utc(node.value * 1000);
    },

    visit_NowLiteral: function(node) {
        return this.now.clone();
    },

    visit_BeginningLiteral: function(node) {
        throw new MomentGenerator.SyntaxError(
            "beginning is not supported for moments");
    },

    visit_EndLiteral: function(node) {
        throw new MomentGenerator.SyntaxError(
            "end is not supported for moments");
    },

    visit_YesterdayLiteral: function(node) {
        return this.now.clone().startOf('day').subtract(1, 'day');
    },

    visit_TodayLiteral: function(node) {
        return this.now.clone().startOf('day');
    },

    visit_TomorrowLiteral: function(node) {
        return this.now.clone().startOf('day').add(1, 'day');
    },

    visit_ForeverLiteral: function(node) {
        throw new MomentGenerator.SyntaxError(
            "forever is not supported for moments");
    },

    visit_MomentDuration: function(node) {
        return moment.duration(node.value, node.unit);
    },

    visit_ISODurationLiteral: function(node) {
        return moment.duration(node.value);
    },

    visit_BinaryExpression: function(node) {
        if (node.operator === '+') {
            return this.visit(node.left).add(this.visit(node.right));
        } else {
            return this.visit(node.left).subtract(this.visit(node.right));
        }
    },

    visit_CalendarExpression: function(node) {
        var expr = this.visit(node.expression);
        if (node.direction === 'down') {
            return expr.clone().startOf(node.unit);
        } else {
            return expr.clone().endOf(node.unit);
        }
    },

    visit_FormattedDuration: function(node) {
        return moment.duration(node.dotnet).add(node.months, 'M');
    }
});

MomentGenerator.SyntaxError = parser.SyntaxError;
module.exports = MomentGenerator;
