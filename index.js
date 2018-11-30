#!/usr/bin/env node

const { resolve } = require('path');
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);


//dataCreator(, join(process.cwd(), argv.out));
const ServiceContainer = require('servicecontainer');
let container = ServiceContainer.default.create(__dirname + '/config/services.json', {
    port: argv.port,
    host: 'localhost',
    interfaceSourceDir: resolve(argv.root)
});

container.get('service.server').start();

const jsonSchemaController = container.get('controller.json.schema');
container.get('service.server').route({
    method: 'GET',
    path: '/api/schema/{interface}',
    handler: jsonSchemaController.getData.bind(jsonSchemaController)
});