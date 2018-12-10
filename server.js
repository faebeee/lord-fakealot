const boot = require('./boot');

module.exports = async function(sourceDir, port, tsconfig, logLevel) {
    const container = boot(sourceDir, tsconfig, logLevel);
    container.addParameters({
        port: port,
        host: 'localhost',
    });
    await container.get('service.server').start();

    /** @type {SchemaController} */
    const schemaController = container.get('controller.schema');

    container.get('service.server').route({
        method: 'GET',
        path: '/api/{interface}',
        handler: schemaController.getData.bind(schemaController),
    });

    return container;
};
