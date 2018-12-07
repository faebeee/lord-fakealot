const boot = require('./boot');

/**
 * Populate interface by given name
 * @param {string} interfaceName
 * @param {string} sourceDir
 * @param {string} tsconfig
 * @param {number} loglevel
 * @return {Promise<void>}
 */
async function populateInterfaceByName(interfaceName, sourceDir, tsconfig, loglevel) {
    const container = boot(sourceDir, tsconfig, loglevel);

    /** @type {InterfacePopulator} */
    const interfacepopulator = container.get('service.interfacepopulator');

    return await interfacepopulator.populate(interfaceName);
};

module.exports = {
    populateInterface(interfaceName, sourceDir, tsconfig = null, loglevel = 0) {
        populateInterfaceByName(interfaceName, sourceDir, tsconfig, loglevel)
    }
};
