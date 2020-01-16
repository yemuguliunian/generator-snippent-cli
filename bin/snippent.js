#! /usr/bin/env node
const program = require('commander');
const package = require('../package.json');

const run = require('../lib/run');

program
    .version(package.version)
    .parse(process.argv);

run();
