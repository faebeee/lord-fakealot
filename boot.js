const { resolve } = require('path');
const args = require('minimist')(process.argv.slice(2));


module.exports = function () {
    const ServiceContainer = require('servicecontainer');
    let container = ServiceContainer.default.create(__dirname + '/config/services.json', {
        interfaceSourceDir: resolve(args.root)
    });
    return { container, args };
};
