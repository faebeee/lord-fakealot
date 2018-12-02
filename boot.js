const { resolve } = require('path');

/**
 *
 * @param root
 * @return {Container}
 */
module.exports = function (root) {
    const ServiceContainer = require('servicecontainer');
    const container = ServiceContainer.default.create(__dirname + '/config/services.json', {
        interfaceSourceDir: resolve(root)
    });

    return container;
};
