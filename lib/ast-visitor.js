var Base = require('extendable-base');

/*
 * Base class for recursively walking the parse tree and optionally generating
 * output.
 *
 * A derived class should implement functions caled visit_<ASTNodeType> for each
 * node type in the grammar.
 */
var ASTVisitor = Base.extend({
    visit: function(node) {
        var type = node.type;
        if (! type) {
            throw new Error("visitor called on non-node " + JSON.stringify(node));
        }

        var visitor = this['visit_' + type];
        if (!visitor) {
            throw new Error("no handler for node type " + type);
        }

        return visitor.apply(this, [node]);
    }
});

module.exports = ASTVisitor;
