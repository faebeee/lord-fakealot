#!/usr/bin/env node

const yargs = require('yargs');

yargs.usage('$0 <cmd> [options]')
    .command('api', 'Expose api to fetch fake data',
        (_yargs) => {
            _yargs.count('verbose');
            _yargs.alias('v', 'verbose');

            _yargs.positional('dir', {
                type: 'path',
                describe: 'Directory where all the interfaces are stores. lord-fakealot will fetch all .ts files recursively'
            });

            _yargs.positional('port', {
                type: 'number',
                describe: 'Port for the api to be exposed on',
            });

            _yargs.positional('tsconfig', {
                type: 'file',
                describe: 'tsconfig.json path',
            });
        },
        (argv) => {
            require('./server')(argv.dir, argv.port, argv.tsconfig, argv.verbose);
        }
    )
    .example('fakealot api --port 3000 --dir ./interfaces --tsconfig ./tsconfig.json')

    .command('file', 'Generate single file with all interfaces',
        (_yargs) => {
            _yargs.count('verbose');
            _yargs.alias('v', 'verbose');

            _yargs.positional('dir', {
                type: 'path',
                describe: 'Directory where all the interfaces are stores. lord-fakealot will fetch all .ts files recursively'
            });

            _yargs.positional('file', {
                type: 'file',
                describe: 'Output file for populated data',
            });

            _yargs.positional('tsconfig', {
                type: 'file',
                describe: 'tsconfig.json path',
            });
        },
        (argv) => {
            require('./generator')(argv.dir, argv.tsconfig, null, argv.file, argv.verbose);
        }
    )
    .example('fakealot file --file ./mock.json --dir ./interfaces --tsconfig ./tsconfig.json')

    .command('files', 'Generate files with populated json datastructure',
        (_yargs) => {
            _yargs.count('verbose');
            _yargs.alias('v', 'verbose');

            _yargs.positional('dir', {
                type: 'path',
                describe: 'Directory where all the interfaces are stores. lord-fakealot will fetch all .ts files recursively'
            });

            _yargs.positional('out', {
                type: 'folder',
                describe: 'Output folder for populated data',
            });

            _yargs.positional('tsconfig', {
                type: 'file',
                describe: 'tsconfig.json path',
            });
        },
        (argv) => {
            require('./generator')(argv.dir, argv.out, null, argv.verbose);
        }
    )
    .example('fakealot files --out ./mockData/ --dir ./interfaces --tsconfig ./tsconfig.json')

    .help('h')
    .demandCommand()
    .alias('help', 'h')
    .option('v', { description: 'Verbosity level' });

yargs.help().argv;
