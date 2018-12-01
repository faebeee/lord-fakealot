const glob = require('glob');
const {join} = require('path');


const GLOB_SETTINGS = {
    ignore: ['**/node_modules/**'],
};

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

function getTypescriptFiles(sourcePath) {
    return getFiles(join(sourcePath, '**/*.ts'));
}

module.exports = {
    getFiles,
    getTypescriptFiles
};
