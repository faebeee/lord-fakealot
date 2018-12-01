#!/usr/bin/env node

const boot = require('./boot');
const container = boot();
container.addParamters({
    port: argv.port,
    host: 'localhost',
});
container.get('service.server').start();

const tsSchemaController = container.get('controller.ts.schema');
container.get('service.server').route({
    method: 'GET',
    path: '/api/ts/schema/{interface}',
    handler: tsSchemaController.getData.bind(tsSchemaController)
});
