const { lstatSync } = require('fs');

/**
 *
 * @param path
 * @return {boolean}
 */
module.exports = function is_dir(path) {
    try {
        const stat = lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
};
