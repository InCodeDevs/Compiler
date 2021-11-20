const { program } = require('commander');
const { readFileSync } = require('fs');
const { join } = require('path');

program
    .requiredOption("-f, --file", "Set the InCode File")
    .option("-l, --language", "Set the InCode Language", "german")
    .option("-o, --output", "Set the output File (will be printed to STDOUT if not set)")
    .option("-m, --minify", "Minify the final code (this disabled the --comments option)", false)
    .option("-c, --comments", "Comments the final JavaScript Code.", false);

program.parse(process.argv);
