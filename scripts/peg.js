/*
 * Build the parser.js from the peg grammar.
 */

var path = require('path');
var PEG = require('pegjs');
var fs = require('fs');

var grammar = fs.readFileSync(path.join(__dirname, '../lib/parser.pegjs'), 'utf8');

var source = PEG.buildParser(grammar, {
    output: 'source',
    cache: true,
    exportVar: 'module.exports'
});

var parser = "module.exports = " + source + ';\n';

fs.writeFileSync(path.join(__dirname, '../lib/parser.js'), parser, 'utf8');
