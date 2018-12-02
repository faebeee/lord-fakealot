const boot = require('./boot');

module.exports = function(sourceDir, outDir, outFile) {
    const container = boot(sourceDir);


    /** @type {DataFileGenerator} */
    const generator = container.get('service.datafilegenerator');

    if(outDir) {
        generator.generateFiles(outDir);
    }
    if(outFile) {
        generator.generateFile(outFile);
    }
};
