const { basename } = require('path');

/**
 * Get interface name from file
 * @param {string} file
 * @return {string}
 */
module.exports = function getInterfaceNameFromFile(file) {
    return basename(file, '.ts');
};
