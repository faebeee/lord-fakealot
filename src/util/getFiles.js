const glob = require('glob');
const {join} = require('path');


const GLOB_SETTINGS = {
    ignore: ['**/node_modules/**'],
};

/**
 *
 * @param {string} searchPath
 * @return {Promise<string[]>}
 */
function getFiles(searchPath) {
    return new Promise((res, rej) => {
        glob(searchPath, GLOB_SETTINGS, (err, files) => {
            if (err) {
                return rej(err);
            }
            return res(files);
        });
    });
}

/**
 * Get all typescriptfiles
 * @param sourcePath
 * @return {Promise<string[]>}
 */
function getTypescriptFiles(sourcePath) {
    return getFiles(join(sourcePath, '**/*.ts'));
}

module.exports = {
    getFiles,
    getTypescriptFiles
};
