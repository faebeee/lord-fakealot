const { getTypescriptFiles } = require('./util/getFiles');
const getInterfaceNameFromFile = require('./util/getInterfaceNameFromFile');

class FileGenerator {
    /**
     * DataFileGenerator
     * @param {string} sourceDir
     * @param {SchemaLoader} schemaLoader
     * @param {DataGenerator} dataGenerator
     * @param {SchemaDataWriter} dataWriter
     * @param {Logger} logger
     */
    constructor(sourceDir, schemaLoader, dataGenerator, dataWriter, logger) {
        this.sourceDir = sourceDir;
        this.schemaLoader = schemaLoader;
        this.dataGenerator = dataGenerator;
        this.dataWriter = dataWriter;
        this.logger = logger.getTagged('FileGenerator');
        this.files = null;
    }

    /**
     * Load all .ts files
     * @return {Promise<string[]>}
     * @private
     */
    _getFiles() {
        if (this.files) {
            return Promise.resolve(this.files);
        }

        return getTypescriptFiles(this.sourceDir)
            .then(files => {
                this.logger.debug(`Loaded ${files.length} files`);
                this.files = files;
                return this.files;
            });
    }

    /**
     * Generate fakedata json files
     * @param {string} outDir directory or file where to store the data
     * @return {Promise<void>}
     */
    async generateFiles(outDir) {
        this.logger.debug(`Generating files in ${outDir}`);
        const schemas = await this._getInterfaceSchemas();
        await this.dataWriter.writeFiles(outDir, schemas);
    }

    /**
     * Generate fake data json file
     * @param {string} outFile Destination file
     * @return {Promise<void>}
     */
    async generateFile(outFile) {
        this.logger.debug(`Generating file  ${outFile}`);
        const schemas = await this._getInterfaceSchemas();
        await this.dataWriter.writeFile(outFile, schemas);
    }

    /**
     * Get all interfaces
     * @return {Promise<*>}
     * @private
     */
    async _getInterfaceSchemas() {
        const files = await this._getFiles();
        const acc = {};
        this.logger.debug(`Generating schemas`);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const interfaceName = getInterfaceNameFromFile(file);
            const interfaceData = await this._generateDataForInterface(interfaceName);
            if (interfaceData) {
                acc[interfaceName] = interfaceData;
            } else {
                this.logger.debug(`No data for ${interfaceName}`);
            }
        }
        return acc;
    }

    /**
     * Generate fakedata for interface schema
     * @param {string} interfaceName
     * @return {Promise<data>}
     * @private
     */
    async _generateDataForInterface(interfaceName) {
        const schema = await this.schemaLoader.getSchema(interfaceName);
        if (!schema) {
            return null;
        }
        return await this.dataGenerator.populateData(schema);
    }
}

module.exports = FileGenerator;
