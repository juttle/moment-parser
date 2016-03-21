var ASTVisitor = require('./ast-visitor');
var parser = require('./parser');
var errors = require('./errors');
var moment = require('moment');

/*
 * AST visitor that generates a moment from a parse tree.
 */
var MomentGenerator = ASTVisitor.extend({
    initialize: function(options) {
        options = options || {};
        this.now = options.now || moment.utc();
        this.beginning = options.beginning || moment.utc(-100 * 1000000 * 1000 * 24 * 3600);
        this.end = options.end || moment.utc(100 * 1000000 * 1000 * 24 * 3600);
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
        return this.beginning.clone();
    },

    visit_EndLiteral: function(node) {
        return this.end.clone();
    },

    visit_monthLiteration: function(node) {
        if (this.now.clone().month() >= node.value) {
            node.value += 12;
        }
        return this.now.clone().startOf('year').add(node.value - 1, 'month');
    },

    visit_nextMonthLiteration: function(node) {
        return this.now.clone().startOf('year').add(1, 'year').add(node.value - 1, 'month');
    },

    visit_thisMonthLiteration: function(node) {
        return this.now.clone().startOf('year').add(node.value - 1, 'month');
    },

    visit_weekdayLiteration: function(node) {
        if (this.now.clone().weekday() >= node.value) {
            node.value += 7;
        }
        return this.now.clone().startOf('week').add(node.value, 'day');
    },

    visit_nextWeekdayLiteration: function(node) {
        return this.now.clone().startOf('week').add(1, 'week').add(node.value, 'day');
    },

    visit_thisWeekdayLiteration: function(node) {
        return this.now.clone().startOf('week').add(node.value, 'day');
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
        return moment.duration(Infinity);
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

    visit_TimeSpan: function(node) {
        return moment.duration({
            milliseconds: node.milliseconds,
            seconds: node.seconds,
            minutes: node.minutes,
            hours: node.hours,
            days: node.days,
            months: node.months
        });
    }
});

module.exports = MomentGenerator;
