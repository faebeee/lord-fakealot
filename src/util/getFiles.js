const glob = require('glob');


const GLOB_SETTINGS = {
    ignore: ['**/node_modules/**'],
};

module.exports = function getFiles(searchPath) {
    return new Promise((res, rej) => {
        glob(searchPath, GLOB_SETTINGS, (err, files) => {
            if (err) {
                return rej(err);
            }
            return res(files);
        });
    });
}