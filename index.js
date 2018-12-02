#!/usr/bin/env node
const yargs = require('yargs');

yargs.usage('$0 <cmd> [options]')
    .command('api', 'Expose api to fetch fake data',
        (yargs) => {
            yargs.positional('sourceDir', {
                type: 'path',
                describe: 'Directory where all the interfaces are stores. lord-fakealot will fetch all .ts files recursively'
            });

            yargs.positional('port', {
                type: 'number',
                describe: 'Port for the api to be exposed on'
            });
        },
        (argv) => {
            require('./server')(argv.sourceDir, argv.port);
        }
    )
    .example('fakealot api --port=3000 --sourceDir=./interfaces')

    .command('file', 'Generate single file with all interfaces',
        (yargs) => {
            yargs.positional('sourceDir', {
                type: 'path',
                describe: 'Directory where all the interfaces are stores. lord-fakealot will fetch all .ts files recursively'
            });

            yargs.positional('file', {
                type: 'file',
                describe: 'Output file for populated data'
            });
        },
        (argv) => {
            require('./generator')(argv.sourceDir, null, argv.file);
        }
    )
    .example('fakealot file --file=./mock.json --sourceDir=./interfaces')

    .command('files', 'Generate files with populated json datastructure',
        (yargs) => {
            yargs.positional('sourceDir', {
                type: 'path',
                describe: 'Directory where all the interfaces are stores. lord-fakealot will fetch all .ts files recursively'
            });

            yargs.positional('out', {
                type: 'folder',
                describe: 'Output folder for populated data'
            });
        },
        (argv) => {
            require('./generator')(argv.sourceDir, argv.out, null);
        }
    )
    .example('fakealot files --out=./mockData/ --sourceDir=./interfaces')
    .help('h')
    .argv
