const boot = require('./boot');

/**
 *
 * @param {string} sourceDir
 * @param {string} tsconfig
 * @param {string} outDir
 * @param {string} outFile
 * @param {number} loglevel
 * @return {Promise<void>}
 */
module.exports = async function(sourceDir, tsconfig = null, outDir = null, outFile = null, loglevel = 0) {
    const container = boot(sourceDir, tsconfig, loglevel);

    /** @type {FileGenerator} */
    const generator = container.get('service.filegenerator');

    if (outDir) {
        await generator.generateFiles(outDir);
    }

    if (outFile) {
        await generator.generateFile(outFile);
    }
};
