const { basename } = require('path');

/**
 *
 * @param {string} file
 * @return {string}
 */
module.exports = function getInterfaceNameFromFile(file) {
    return basename(file, '.ts');
};
