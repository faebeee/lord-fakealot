const { resolve } = require('path');

/**
 *
 * @param root
 * @param tsconfig
 * @param loglevel
 * @return {Container}
 */
module.exports = function(root, tsconfig, loglevel) {
    const ServiceContainer = require('servicecontainer');
    return ServiceContainer.default.create(__dirname + '/config/services.json', {
        interfaceSourceDir: resolve(root),
        loglevel,
        tsconfig: tsconfig ? resolve(tsconfig) : null,
    });
};
