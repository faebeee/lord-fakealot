const boot = require('./boot');

module.exports = function(sourceDir, port) {
    const container = boot(sourceDir);
    container.addParameters({
        port: port,
        host: 'localhost',
    });
    container.get('service.server').start();

    const tsSchemaController = container.get('controller.ts.schema');

    container.get('service.server').route({
        method: 'GET',
        path: '/api/schema/{interface}',
        handler: tsSchemaController.getData.bind(tsSchemaController)
    });
};
