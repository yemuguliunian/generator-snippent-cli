#! /usr/bin/env node
const program = require('commander');
const package = require('../package.json');

const run = require('../lib/run');

program
    .version(package.version)
    .option('-s, --sublime', 'generate snippent of sublime ')
    .option('-v, --vscode', 'generate snippent of vscode')
    .parse(process.argv);

if (!program.sublime && !program.vscode) {
    run();
}
